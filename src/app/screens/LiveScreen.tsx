import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Gauge,
  Thermometer,
  Droplet,
  Wind,
  Zap,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

interface SensorData {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: any;
  min: number;
  max: number;
  normalRange: [number, number];
  color: string;
}

export function LiveScreen() {
  const [isLive, setIsLive] = useState(true);

  const [sensors, setSensors] = useState<SensorData[]>([
    {
      id: "rpm",
      label: "Motor Devri",
      value: 2450,
      unit: "RPM",
      icon: Gauge,
      min: 0,
      max: 7000,
      normalRange: [800, 4500],
      color: "text-primary",
    },
    {
      id: "temp",
      label: "Motor Sıcaklığı",
      value: 92,
      unit: "°C",
      icon: Thermometer,
      min: 0,
      max: 120,
      normalRange: [85, 95],
      color: "text-warning-orange",
    },
    {
      id: "voltage",
      label: "Batarya Voltajı",
      value: 14.2,
      unit: "V",
      icon: Zap,
      min: 0,
      max: 16,
      normalRange: [13.5, 14.5],
      color: "text-success-green",
    },
    {
      id: "fuel",
      label: "Yakıt Seviyesi",
      value: 65,
      unit: "%",
      icon: Gauge,
      min: 0,
      max: 100,
      normalRange: [20, 100],
      color: "text-primary",
    },
    {
      id: "airflow",
      label: "Hava Akışı",
      value: 12.5,
      unit: "g/s",
      icon: Wind,
      min: 0,
      max: 30,
      normalRange: [5, 25],
      color: "text-primary",
    },
    {
      id: "throttle",
      label: "Gaz Kelebeği",
      value: 35,
      unit: "%",
      icon: Activity,
      min: 0,
      max: 100,
      normalRange: [0, 100],
      color: "text-accent-red",
    },
    {
      id: "o2",
      label: "Oksijen Sensörü",
      value: 0.45,
      unit: "V",
      icon: Droplet,
      min: 0,
      max: 1,
      normalRange: [0.1, 0.9],
      color: "text-primary",
    },
    {
      id: "pressure",
      label: "Yakıt Basıncı",
      value: 3.2,
      unit: "bar",
      icon: TrendingUp,
      min: 0,
      max: 5,
      normalRange: [2.5, 4],
      color: "text-success-green",
    },
  ]);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setSensors((prev) =>
        prev.map((sensor) => {
          let newValue = sensor.value;
          const variance = (sensor.max - sensor.min) * 0.02;

          switch (sensor.id) {
            case "rpm":
              newValue += (Math.random() - 0.5) * 200;
              newValue = Math.max(800, Math.min(4500, newValue));
              break;
            case "temp":
              newValue += (Math.random() - 0.5) * 2;
              newValue = Math.max(85, Math.min(95, newValue));
              break;
            case "voltage":
              newValue += (Math.random() - 0.5) * 0.2;
              newValue = Math.max(13.5, Math.min(14.5, newValue));
              break;
            case "fuel":
              newValue -= Math.random() * 0.1;
              newValue = Math.max(0, newValue);
              break;
            default:
              newValue += (Math.random() - 0.5) * variance;
              newValue = Math.max(sensor.min, Math.min(sensor.max, newValue));
          }

          return { ...sensor, value: newValue };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getStatus = (sensor: SensorData) => {
    const { value, normalRange } = sensor;
    if (value < normalRange[0]) return "low";
    if (value > normalRange[1]) return "high";
    return "normal";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "low":
        return <TrendingDown className="w-4 h-4 text-primary" />;
      case "high":
        return <TrendingUp className="w-4 h-4 text-danger-red" />;
      default:
        return <Minus className="w-4 h-4 text-success-green" />;
    }
  };

  const getProgressPercentage = (sensor: SensorData) => {
    return ((sensor.value - sensor.min) / (sensor.max - sensor.min)) * 100;
  };

  return (
    <div className="h-full overflow-y-auto pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold">Canlı Veri</h1>
              <p className="text-sm text-muted-foreground">
                Gerçek zamanlı sensör verileri
              </p>
            </div>
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isLive
                  ? "bg-success-green text-white"
                  : "bg-muted text-foreground"
              }`}
            >
              {isLive ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Canlı
                </span>
              ) : (
                "Duraklat"
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Main Gauges */}
        <div className="grid grid-cols-2 gap-4">
          {sensors.slice(0, 2).map((sensor) => {
            const status = getStatus(sensor);
            const percentage = getProgressPercentage(sensor);

            return (
              <motion.div
                key={sensor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-border rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <sensor.icon className={`w-6 h-6 ${sensor.color}`} />
                  {getStatusIcon(status)}
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  {sensor.label}
                </p>
                <p className="text-2xl font-bold mb-2">
                  {sensor.value.toFixed(sensor.id === "voltage" ? 1 : 0)}
                  <span className="text-sm text-muted-foreground ml-1">
                    {sensor.unit}
                  </span>
                </p>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${
                      status === "high"
                        ? "bg-danger-red"
                        : status === "low"
                        ? "bg-primary"
                        : "bg-success-green"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Sensor List */}
        <div className="space-y-3">
          <h3 className="font-semibold">Tüm Sensörler</h3>
          {sensors.map((sensor, index) => {
            const status = getStatus(sensor);
            const percentage = getProgressPercentage(sensor);

            return (
              <motion.div
                key={sensor.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${
                      status === "high"
                        ? "bg-danger-red/10"
                        : status === "low"
                        ? "bg-primary/10"
                        : "bg-success-green/10"
                    } flex items-center justify-center flex-shrink-0`}
                  >
                    <sensor.icon
                      className={`w-6 h-6 ${
                        status === "high"
                          ? "text-danger-red"
                          : status === "low"
                          ? "text-primary"
                          : "text-success-green"
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">{sensor.label}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                          {sensor.value.toFixed(
                            sensor.id === "voltage" || sensor.id === "o2"
                              ? 2
                              : sensor.id === "pressure"
                              ? 1
                              : 0
                          )}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {sensor.unit}
                        </span>
                        {getStatusIcon(status)}
                      </div>
                    </div>

                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          status === "high"
                            ? "bg-gradient-to-r from-warning-orange to-danger-red"
                            : status === "low"
                            ? "bg-gradient-to-r from-primary to-primary/60"
                            : "bg-gradient-to-r from-success-green to-success-green/60"
                        }`}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                      <span>{sensor.min}</span>
                      <span>{sensor.max}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="bg-muted/50 rounded-xl p-4 text-center">
          <p className="text-xs text-muted-foreground">
            Veriler OBD2 adaptöründen gerçek zamanlı olarak alınmaktadır
          </p>
        </div>
      </div>
    </div>
  );
}
