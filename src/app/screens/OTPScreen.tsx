import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Mail } from "lucide-react";

interface OTPScreenProps {
  email: string;
  onVerify: () => void;
  onBack: () => void;
}

export function OTPScreen({ email, onVerify, onBack }: OTPScreenProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all filled
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

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or first empty
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();

    // Auto-submit if complete
    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  const handleVerify = (code: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onVerify();
    }, 1000);
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setCountdown(60);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="size-full bg-gradient-to-b from-background to-secondary flex flex-col max-w-md mx-auto">
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Title */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl mb-2">Enter Verification Code</h1>
          <p className="text-muted-foreground">
            We sent a 6-digit code to
          </p>
          <p className="text-foreground font-medium mt-1">{email}</p>
        </div>

        {/* OTP Input */}
        <div className="mb-8">
          <div className="flex gap-2 justify-center mb-4">
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
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                disabled={isLoading}
              />
            ))}
          </div>

          {/* Resend */}
          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-sm text-muted-foreground">
                Resend code in{" "}
                <span className="text-foreground font-medium">
                  {countdown}s
                </span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sm text-primary hover:underline"
              >
                Didn't receive the code? Resend
              </button>
            )}
          </div>
        </div>

        {/* Verify Button */}
        <button
          onClick={() => handleVerify(otp.join(""))}
          disabled={isLoading || otp.some((digit) => !digit)}
          className="w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </button>

        {/* Change Email */}
        <button
          onClick={onBack}
          className="text-center text-sm text-muted-foreground hover:text-foreground mt-6 transition-colors"
        >
          Wrong email address? Change it
        </button>
      </div>

      {/* Footer */}
      <div className="p-6 text-center text-xs text-muted-foreground">
        Enter the 6-digit code we sent to your email address
      </div>
    </div>
  );
}
