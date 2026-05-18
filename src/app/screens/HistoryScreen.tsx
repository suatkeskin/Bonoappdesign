import { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  FileText,
  Trash2,
  Download,
  Filter,
  Cpu,
  Settings2,
  XCircle,
} from "lucide-react";

interface ScanHistory {
  id: string;
  date: string;
  time: string;
  errorCount: number;
  status: "normal" | "warning" | "critical";
  errors: string[];
  vehicle: string;
}

export function HistoryScreen() {
  const [filter, setFilter] = useState<"all" | "normal" | "warning" | "critical">("all");

  const scanHistory: ScanHistory[] = [
    {
      id: "1",
      date: "18 Mayıs 2026",
      time: "14:30",
      errorCount: 3,
      status: "warning",
      errors: ["P0171", "P0420", "P0741"],
      vehicle: "Toyota Corolla 2020",
    },
    {
      id: "2",
      date: "17 Mayıs 2026",
      time: "09:15",
      errorCount: 0,
      status: "normal",
      errors: [],
      vehicle: "Toyota Corolla 2020",
    },
    {
      id: "3",
      date: "15 Mayıs 2026",
      time: "16:45",
      errorCount: 5,
      status: "critical",
      errors: ["P0300", "P0171", "P0420", "P0741", "P0505"],
      vehicle: "Toyota Corolla 2020",
    },
    {
      id: "4",
      date: "12 Mayıs 2026",
      time: "11:20",
      errorCount: 1,
      status: "warning",
      errors: ["P0420"],
      vehicle: "Toyota Corolla 2020",
    },
    {
      id: "5",
      date: "10 Mayıs 2026",
      time: "08:00",
      errorCount: 0,
      status: "normal",
      errors: [],
      vehicle: "Toyota Corolla 2020",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return {
          bg: "bg-danger-red/10",
          border: "border-danger-red/20",
          text: "text-danger-red",
          icon: XCircle,
        };
      case "warning":
        return {
          bg: "bg-warning-orange/10",
          border: "border-warning-orange/20",
          text: "text-warning-orange",
          icon: AlertTriangle,
        };
      default:
        return {
          bg: "bg-success-green/10",
          border: "border-success-green/20",
          text: "text-success-green",
          icon: CheckCircle2,
        };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "critical":
        return "Kritik";
      case "warning":
        return "Uyarı";
      default:
        return "Normal";
    }
  };

  const filteredHistory =
    filter === "all"
      ? scanHistory
      : scanHistory.filter((item) => item.status === filter);

  const stats = {
    total: scanHistory.length,
    normal: scanHistory.filter((s) => s.status === "normal").length,
    warning: scanHistory.filter((s) => s.status === "warning").length,
    critical: scanHistory.filter((s) => s.status === "critical").length,
  };

  return (
    <div className="h-full overflow-y-auto pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-1">Tarama Geçmişi</h1>
          <p className="text-sm text-muted-foreground">
            Geçmiş arıza taramaları ve raporlar
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter("all")}
            className={`p-3 rounded-xl border-2 transition-all ${
              filter === "all"
                ? "border-primary bg-primary/10"
                : "border-border bg-card"
            }`}
          >
            <p className="text-xl font-bold">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Toplam</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter("normal")}
            className={`p-3 rounded-xl border-2 transition-all ${
              filter === "normal"
                ? "border-success-green bg-success-green/10"
                : "border-border bg-card"
            }`}
          >
            <p className="text-xl font-bold text-success-green">
              {stats.normal}
            </p>
            <p className="text-xs text-muted-foreground">Normal</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter("warning")}
            className={`p-3 rounded-xl border-2 transition-all ${
              filter === "warning"
                ? "border-warning-orange bg-warning-orange/10"
                : "border-border bg-card"
            }`}
          >
            <p className="text-xl font-bold text-warning-orange">
              {stats.warning}
            </p>
            <p className="text-xs text-muted-foreground">Uyarı</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter("critical")}
            className={`p-3 rounded-xl border-2 transition-all ${
              filter === "critical"
                ? "border-danger-red bg-danger-red/10"
                : "border-border bg-card"
            }`}
          >
            <p className="text-xl font-bold text-danger-red">
              {stats.critical}
            </p>
            <p className="text-xs text-muted-foreground">Kritik</p>
          </motion.button>
        </div>

        {/* History List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">
              {filter === "all"
                ? "Tüm Taramalar"
                : `${getStatusLabel(filter)} Taramalar`}
            </h3>
            <span className="text-sm text-muted-foreground">
              {filteredHistory.length} kayıt
            </span>
          </div>

          <div className="space-y-3">
            {filteredHistory.map((scan, index) => {
              const statusStyle = getStatusColor(scan.status);
              const StatusIcon = statusStyle.icon;

              return (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border rounded-xl p-4 ${statusStyle.border} ${statusStyle.bg}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${statusStyle.bg} border ${statusStyle.border} flex items-center justify-center flex-shrink-0`}
                    >
                      <StatusIcon className={`w-6 h-6 ${statusStyle.text}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold mb-1">{scan.vehicle}</h4>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {scan.date}
                            </span>
                            <span>{scan.time}</span>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                        >
                          {getStatusLabel(scan.status)}
                        </span>
                      </div>

                      {scan.errorCount > 0 ? (
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-2">
                            {scan.errorCount} Arıza Kodu Tespit Edildi
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {scan.errors.slice(0, 3).map((error) => (
                              <span
                                key={error}
                                className="px-2 py-1 rounded bg-card text-xs font-mono"
                              >
                                {error}
                              </span>
                            ))}
                            {scan.errors.length > 3 && (
                              <span className="px-2 py-1 rounded bg-card text-xs">
                                +{scan.errors.length - 3} daha
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground mb-3">
                          Arıza tespit edilmedi
                        </p>
                      )}

                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 text-sm font-medium text-primary">
                          Detayları Gör
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button className="ml-auto p-2 rounded-lg hover:bg-card transition-colors">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-card transition-colors">
                          <Download className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-danger-red/10 transition-colors">
                          <Trash2 className="w-4 h-4 text-danger-red" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-2xl p-12 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Kayıt Bulunamadı</h3>
            <p className="text-sm text-muted-foreground">
              Bu filtre için henüz tarama kaydı bulunmuyor
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
