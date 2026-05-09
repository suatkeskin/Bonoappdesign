import {
  Car,
  Plus,
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
  User,
  Monitor,
  Sun,
  Moon,
  Check,
  Image,
} from "lucide-react";
import { useState, useEffect } from "react";
import { LogoExportScreen } from "./LogoExportScreen";

export function SettingsScreen() {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showLogoExport, setShowLogoExport] = useState(false);
  const [theme, setTheme] = useState<"system" | "light" | "dark">(() => {
    const saved = localStorage.getItem("theme") as "system" | "light" | "dark";
    return saved || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const handleThemeChange = (newTheme: "system" | "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    const root = document.documentElement;

    if (newTheme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    setShowThemeMenu(false);
  };

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

  const getThemeIcon = () => {
    if (theme === "system") return Monitor;
    if (theme === "light") return Sun;
    return Moon;
  };

  const getThemeLabel = () => {
    if (theme === "system") return "Same as system";
    if (theme === "light") return "Light";
    return "Dark";
  };

  const ThemeIcon = getThemeIcon();

  if (showLogoExport) {
    return <LogoExportScreen onBack={() => setShowLogoExport(false)} />;
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-24">
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border z-10 p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="mb-1">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your account</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gradient-to-br from-card to-secondary rounded-3xl p-6 mb-6 border border-border">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 via-red-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-red-500/30">
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

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 px-2">
            <h3>My Cars</h3>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm">
              <Plus className="w-4 h-4" />
              <span>Add</span>
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
        </div>

        <div className="bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-500/15 rounded-2xl p-4 border border-amber-500/25 mb-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center backdrop-blur-sm">
              <Crown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium mb-1">Upgrade to Pro</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Unlock advanced metrics, custom dashboards, and cloud sync
              </p>
              <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md">
                View Plans
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="mb-3 px-2">General</h3>
          <div className="space-y-2">
            <button
              onClick={() => {
                localStorage.removeItem("hasSeenOnboarding");
                window.location.reload();
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-card border border-border hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5" />
                <span className="text-sm">View Onboarding</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => setShowLogoExport(true)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-card border border-border hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <Image className="w-5 h-5" />
                <span className="text-sm">Export Logo</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-card border border-border hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5" />
                <span className="text-sm">Account</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-card border border-border hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ThemeIcon className="w-5 h-5" />
                  <span className="text-sm">Theme</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{getThemeLabel()}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </button>
              {showThemeMenu && (
                <div className="absolute left-0 right-0 mt-2 bg-popover rounded-xl border border-border shadow-2xl overflow-hidden z-50">
                  <button
                    onClick={() => handleThemeChange("system")}
                    className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5" />
                      <span className="text-sm">Same as system</span>
                    </div>
                    {theme === "system" && <Check className="w-5 h-5 text-primary" />}
                  </button>
                  <button
                    onClick={() => handleThemeChange("light")}
                    className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Sun className="w-5 h-5" />
                      <span className="text-sm">Light</span>
                    </div>
                    {theme === "light" && <Check className="w-5 h-5 text-primary" />}
                  </button>
                  <button
                    onClick={() => handleThemeChange("dark")}
                    className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Moon className="w-5 h-5" />
                      <span className="text-sm">Dark</span>
                    </div>
                    {theme === "dark" && <Check className="w-5 h-5 text-primary" />}
                  </button>
                </div>
              )}
            </div>
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-card border border-border hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" />
                <span className="text-sm">Notifications</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-card border border-border hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5" />
                <span className="text-sm">Language & Region</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-card border border-border hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Privacy & Security</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
