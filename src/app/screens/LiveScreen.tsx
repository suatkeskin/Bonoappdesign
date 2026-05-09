import { GaugeWidget } from "../components/GaugeWidget";
import { Thermometer, Droplets, Zap, TrendingUp } from "lucide-react";
import { useState } from "react";

export function LiveScreen() {
  const [speed] = useState(87);
  const [rpm] = useState(3200);
  const [temp] = useState(92);
  const [fuel] = useState(68);

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-24">
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-10 p-4">
        <h1>Live Dashboard</h1>
        <p className="text-sm text-muted-foreground">Real-time vehicle data</p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-2 bg-gradient-to-br from-card to-secondary rounded-3xl border border-border p-4 shadow-lg shadow-red-500/5">
            <GaugeWidget
              label="Speed"
              value={speed}
              max={240}
              unit="km/h"
              color="#ef4444"
              size="large"
            />
          </div>

          <div className="bg-gradient-to-br from-card to-secondary rounded-3xl border border-border shadow-lg shadow-red-500/5">
            <GaugeWidget
              label="RPM"
              value={rpm}
              max={8000}
              unit="rpm"
              color="#dc2626"
              size="small"
            />
          </div>

          <div className="bg-gradient-to-br from-card to-secondary rounded-3xl border border-border shadow-lg">
            <GaugeWidget
              label="Fuel"
              value={fuel}
              max={100}
              unit="%"
              color="#71717a"
              size="small"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Thermometer className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-sm text-muted-foreground">Coolant</span>
            </div>
            <p className="text-3xl font-bold">{temp}°</p>
            <p className="text-xs text-muted-foreground mt-1">Celsius</p>
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-zinc-500/20 flex items-center justify-center">
                <Droplets className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              </div>
              <span className="text-sm text-muted-foreground">Oil Pressure</span>
            </div>
            <p className="text-3xl font-bold">45</p>
            <p className="text-xs text-muted-foreground mt-1">PSI</p>
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="text-sm text-muted-foreground">Battery</span>
            </div>
            <p className="text-3xl font-bold">12.8</p>
            <p className="text-xs text-muted-foreground mt-1">Volts</p>
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-sm text-muted-foreground">Throttle</span>
            </div>
            <p className="text-3xl font-bold">34</p>
            <p className="text-xs text-muted-foreground mt-1">Percent</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600/10 via-red-500/8 to-rose-600/10 rounded-2xl p-4 border border-red-500/30 shadow-lg shadow-red-500/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Performance Mode</p>
            <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium">
              Active
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Enhanced monitoring • Real-time diagnostics • Advanced metrics
          </p>
        </div>
      </div>
    </div>
  );
}
