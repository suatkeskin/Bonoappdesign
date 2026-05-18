import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";

interface OTPScreenProps {
  email: string;
  onVerify: () => void;
  onBack: () => void;
}

export function OTPScreen({ email, onVerify, onBack }: OTPScreenProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();

    // Timer countdown
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all filled
    if (newOtp.every((digit) => digit !== "") && index === 5) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
    setOtp(newOtp);

    // Focus last filled input
    const lastFilledIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastFilledIndex]?.focus();

    // Auto-verify if complete
    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  const handleVerify = (code: string) => {
    setIsVerifying(true);

    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      onVerify();
    }, 1500);
  };

  const handleResend = () => {
    setTimer(60);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="h-full bg-gradient-to-br from-primary via-accent-red to-charcoal flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="mb-6 p-3 rounded-xl bg-white/20 backdrop-blur text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-card rounded-2xl p-6 shadow-2xl"
        >
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-2">
            Doğrulama Kodu
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            <Mail className="w-4 h-4 inline mr-1" />
            {email} adresine gönderilen 6 haneli kodu girin
          </p>

          {/* OTP Input */}
          <div className="flex gap-2 justify-center mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-border bg-input focus:border-primary focus:outline-none transition-colors"
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-center mb-6">
            {timer > 0 ? (
              <p className="text-sm text-muted-foreground">
                Kod {timer} saniye içinde geçerli
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sm text-primary font-medium hover:underline"
              >
                Kodu Tekrar Gönder
              </button>
            )}
          </div>

          {/* Verify Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => handleVerify(otp.join(""))}
            disabled={otp.some((digit) => !digit) || isVerifying}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent-red text-white font-semibold hover:shadow-lg transition-shadow disabled:opacity-50"
          >
            {isVerifying ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Doğrulanıyor...
              </span>
            ) : (
              "Doğrula"
            )}
          </motion.button>

          {/* Help Text */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Kod gelmedi mi? Spam klasörünü kontrol edin veya{" "}
            <button className="text-primary hover:underline">
              farklı bir e-posta deneyin
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
