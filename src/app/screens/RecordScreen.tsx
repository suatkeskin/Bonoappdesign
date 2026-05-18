import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ScanSearch,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Play,
  RotateCw,
  FileText,
  Cpu,
  Settings2,
  Zap,
  Info,
} from "lucide-react";

type ScanStatus = "idle" | "scanning" | "completed";

interface ErrorCode {
  code: string;
  description: string;
  severity: "critical" | "warning" | "info";
  system: "engine" | "transmission" | "sensor";
}

export function RecordScreen() {
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [errorCodes, setErrorCodes] = useState<ErrorCode[]>([]);

  const mockErrorCodes: ErrorCode[] = [
    {
      code: "P0171",
      description: "Sistem Çok Zayıf (Banka 1)",
      severity: "critical",
      system: "engine",
    },
    {
      code: "P0420",
      description: "Katalitik Konvertör Verimliliği (Banka 1)",
      severity: "warning",
      system: "engine",
    },
    {
      code: "P0741",
      description: "Tork Konvertörü Kavrama Devresi",
      severity: "warning",
      system: "transmission",
    },
  ];

  const startScan = () => {
    setScanStatus("scanning");
    setProgress(0);
    setErrorCodes([]);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanStatus("completed");
          setErrorCodes(mockErrorCodes);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetScan = () => {
    setScanStatus("idle");
    setProgress(0);
    setErrorCodes([]);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <XCircle className="w-5 h-5 text-danger-red" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning-orange" />;
      default:
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-danger-red/10 border-danger-red/20";
      case "warning":
        return "bg-warning-orange/10 border-warning-orange/20";
      default:
        return "bg-primary/10 border-primary/20";
    }
  };

  const getSystemIcon = (system: string) => {
    switch (system) {
      case "engine":
        return <Cpu className="w-4 h-4" />;
      case "transmission":
        return <Settings2 className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full overflow-y-auto pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Arıza Tarama</h1>
          <p className="text-sm text-muted-foreground">
            Motor ve şanzıman arıza kodlarını tespit edin
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Scan Control Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-6 text-center"
        >
          <div className="mb-6">
            <motion.div
              animate={
                scanStatus === "scanning"
                  ? { rotate: 360 }
                  : { rotate: 0 }
              }
              transition={
                scanStatus === "scanning"
                  ? { repeat: Infinity, duration: 2, ease: "linear" }
                  : { duration: 0.3 }
              }
              className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
                scanStatus === "completed"
                  ? "bg-success-green/20"
                  : scanStatus === "scanning"
                  ? "bg-primary/20"
                  : "bg-muted"
              }`}
            >
              {scanStatus === "completed" ? (
                <CheckCircle2 className="w-12 h-12 text-success-green" />
              ) : scanStatus === "scanning" ? (
                <ScanSearch className="w-12 h-12 text-primary" />
              ) : (
                <Play className="w-12 h-12 text-muted-foreground" />
              )}
            </motion.div>

            <h3 className="text-xl font-bold mb-2">
              {scanStatus === "idle" && "Taramaya Hazır"}
              {scanStatus === "scanning" && "Tarama Devam Ediyor..."}
              {scanStatus === "completed" && "Tarama Tamamlandı"}
            </h3>

            <p className="text-sm text-muted-foreground">
              {scanStatus === "idle" &&
                "Arıza kodlarını tespit etmek için tarama başlatın"}
              {scanStatus === "scanning" &&
                "Sistem arıza kodları kontrol ediliyor"}
              {scanStatus === "completed" &&
                `${errorCodes.length} arıza kodu tespit edildi`}
            </p>
          </div>

          {/* Progress Bar */}
          {scanStatus === "scanning" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent-red"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                %{progress} tamamlandı
              </p>
            </motion.div>
          )}

          {/* Action Button */}
          {scanStatus === "idle" && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={startScan}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent-red text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
            >
              <Play className="w-5 h-5" />
              Taramayı Başlat
            </motion.button>
          )}

          {scanStatus === "completed" && (
            <div className="space-y-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={resetScan}
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2"
              >
                <RotateCw className="w-5 h-5" />
                Yeniden Tara
              </motion.button>
              {errorCodes.length > 0 && (
                <button className="w-full py-3 rounded-xl border-2 border-primary text-primary font-semibold flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" />
                  Rapor Oluştur
                </button>
              )}
            </div>
          )}
        </motion.div>

        {/* System Status */}
        {scanStatus !== "idle" && (
          <div>
            <h3 className="font-semibold mb-3">Sistem Durumu</h3>
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Motor</span>
                </div>
                <p
                  className={`text-lg font-bold ${
                    errorCodes.filter((e) => e.system === "engine").length > 0
                      ? "text-warning-orange"
                      : "text-success-green"
                  }`}
                >
                  {scanStatus === "completed"
                    ? errorCodes.filter((e) => e.system === "engine").length >
                      0
                      ? `${errorCodes.filter((e) => e.system === "engine").length} Uyarı`
                      : "Normal"
                    : "Taranıyor..."}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Settings2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Şanzıman</span>
                </div>
                <p
                  className={`text-lg font-bold ${
                    errorCodes.filter((e) => e.system === "transmission")
                      .length > 0
                      ? "text-warning-orange"
                      : "text-success-green"
                  }`}
                >
                  {scanStatus === "completed"
                    ? errorCodes.filter((e) => e.system === "transmission")
                        .length > 0
                      ? `${errorCodes.filter((e) => e.system === "transmission").length} Uyarı`
                      : "Normal"
                    : "Taranıyor..."}
                </p>
              </motion.div>
            </div>
          </div>
        )}

        {/* Error Codes List */}
        <AnimatePresence>
          {scanStatus === "completed" && errorCodes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h3 className="font-semibold mb-3">
                Tespit Edilen Arıza Kodları
              </h3>
              <div className="space-y-3">
                {errorCodes.map((error, index) => (
                  <motion.div
                    key={error.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border rounded-xl p-4 ${getSeverityBg(error.severity)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getSeverityIcon(error.severity)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-lg">{error.code}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              {getSystemIcon(error.system)}
                              <span className="text-xs text-muted-foreground capitalize">
                                {error.system === "engine"
                                  ? "Motor"
                                  : error.system === "transmission"
                                  ? "Şanzıman"
                                  : "Sensör"}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              error.severity === "critical"
                                ? "bg-danger-red text-white"
                                : error.severity === "warning"
                                ? "bg-warning-orange text-white"
                                : "bg-primary text-white"
                            }`}
                          >
                            {error.severity === "critical"
                              ? "Kritik"
                              : error.severity === "warning"
                              ? "Uyarı"
                              : "Bilgi"}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/80 mb-3">
                          {error.description}
                        </p>
                        <button className="text-sm font-medium text-primary">
                          Detaylı Bilgi →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Errors Found */}
        {scanStatus === "completed" && errorCodes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-success-green/10 border border-success-green/20 rounded-xl p-6 text-center"
          >
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-success-green" />
            <h3 className="font-bold text-lg mb-2 text-success-green">
              Arıza Bulunamadı
            </h3>
            <p className="text-sm text-foreground/80">
              Aracınızda herhangi bir arıza kodu tespit edilmedi. Sisteminiz
              normal çalışıyor.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
