import {
  Car,
  Plus,
  Settings,
  Crown,
  TrendingUp,
  MapPin,
  Clock,
  Wifi,
  ChevronRight,
  LogOut,
  Bell,
  Shield,
  Globe,
} from "lucide-react";
import { useState } from "react";

export function GarageScreen() {
  const [showSettings, setShowSettings] = useState(false);

  const cars = [
    {
      id: 1,
      name: "BMW M3 Competition",
      year: "2023",
      vin: "WBS8M9C5XJ5K12345",
      isActive: true,
    },
    {
      id: 2,
      name: "Porsche 911 GT3",
      year: "2022",
      vin: "WP0AC2A99NS123456",
      isActive: false,
    },
  ];

  const stats = [
    { label: "Total Drives", value: "24", icon: TrendingUp },
    { label: "Total Distance", value: "1,248 km", icon: MapPin },
    { label: "Total Time", value: "18h 42m", icon: Clock },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-24">
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border z-10 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="mb-1">Garage</h1>
            <p className="text-sm text-muted-foreground">Manage your vehicles</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                showSettings
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary hover:bg-muted"
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
            {showSettings && (
              <div className="absolute right-0 mt-2 w-56 bg-popover rounded-xl border border-border shadow-2xl overflow-hidden">
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors text-sm flex items-center gap-3"
                >
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors text-sm flex items-center gap-3"
                >
                  <Globe className="w-4 h-4" />
                  <span>Language</span>
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors text-sm flex items-center gap-3"
                >
                  <Shield className="w-4 h-4" />
                  <span>Privacy</span>
                </button>
                <div className="border-t border-border my-1" />
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors text-sm flex items-center gap-3 text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gradient-to-br from-card to-secondary rounded-3xl p-6 mb-6 border border-border">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <span className="text-3xl font-bold">AT</span>
            </div>
            <div className="flex-1">
              <h2>Alex Turner</h2>
              <p className="text-sm text-muted-foreground">@alexturner</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3>My Cars</h3>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Car</span>
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className={`bg-card rounded-2xl p-4 border transition-all cursor-pointer group ${
                car.isActive
                  ? "border-primary/50"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    car.isActive
                      ? "bg-gradient-to-br from-primary/20 to-purple-600/20"
                      : "bg-secondary"
                  }`}
                >
                  <Car
                    className={`w-7 h-7 ${
                      car.isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-base">{car.name}</h4>
                    {car.isActive && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs">
                        <Wifi className="w-3 h-3" />
                        <span>Connected</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {car.year} • VIN: {car.vin}
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 rounded-lg bg-secondary hover:bg-muted transition-colors text-xs">
                      View Details
                    </button>
                    <button className="flex-1 px-3 py-2 rounded-lg bg-secondary hover:bg-muted transition-colors text-xs">
                      Diagnostics
                    </button>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-4 border border-yellow-500/30 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Crown className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium mb-1">Upgrade to Pro</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Unlock advanced metrics, custom dashboards, and cloud sync
              </p>
              <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                View Plans
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-card border border-border hover:bg-secondary transition-colors">
            <span className="text-sm">Units & Preferences</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-card border border-border hover:bg-secondary transition-colors">
            <span className="text-sm">Connection Settings</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-card border border-border hover:bg-secondary transition-colors">
            <span className="text-sm">Privacy & Security</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
