import { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Car,
  Bell,
  Moon,
  Sun,
  Monitor,
  Bluetooth,
  Info,
  HelpCircle,
  LogOut,
  ChevronRight,
  Shield,
  Globe,
  Smartphone,
} from "lucide-react";

export function SettingsScreen() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [notifications, setNotifications] = useState(true);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    const root = document.documentElement;

    if (newTheme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
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
  };

  const settingsGroups = [
    {
      title: "Hesap",
      items: [
        {
          icon: User,
          label: "Profil Bilgileri",
          description: "Adınız, e-posta ve telefon",
          action: () => {},
        },
        {
          icon: Car,
          label: "Araç Bilgileri",
          description: "Toyota Corolla 2020",
          action: () => {},
        },
      ],
    },
    {
      title: "Cihaz",
      items: [
        {
          icon: Bluetooth,
          label: "OBD2 Bağlantısı",
          description: "ELM327 Adaptör",
          action: () => {},
        },
        {
          icon: Smartphone,
          label: "Cihaz Ayarları",
          description: "Bağlantı ve senkronizasyon",
          action: () => {},
        },
      ],
    },
    {
      title: "Tercihler",
      items: [
        {
          icon: Bell,
          label: "Bildirimler",
          description: notifications ? "Açık" : "Kapalı",
          action: () => setNotifications(!notifications),
          toggle: true,
          toggleValue: notifications,
        },
        {
          icon: Globe,
          label: "Dil",
          description: "Türkçe",
          action: () => {},
        },
      ],
    },
    {
      title: "Hakkında",
      items: [
        {
          icon: Info,
          label: "Uygulama Bilgisi",
          description: "Versiyon 1.0.0",
          action: () => {},
        },
        {
          icon: HelpCircle,
          label: "Yardım & Destek",
          description: "SSS ve iletişim",
          action: () => {},
        },
        {
          icon: Shield,
          label: "Gizlilik Politikası",
          description: "Şartlar ve koşullar",
          action: () => {},
        },
      ],
    },
  ];

  return (
    <div className="h-full overflow-y-auto pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Ayarlar</h1>
          <p className="text-sm text-muted-foreground">
            Uygulama ve hesap ayarları
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* User Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-accent-red rounded-2xl p-6 text-white"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold">
              AY
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Ahmet Yılmaz</h3>
              <p className="text-sm opacity-90">ahmet@example.com</p>
            </div>
            <button className="p-2 rounded-lg bg-white/20 backdrop-blur">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Theme Selector */}
        <div>
          <h3 className="font-semibold mb-3">Tema</h3>
          <div className="grid grid-cols-3 gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleThemeChange("light")}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme === "light"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card"
              }`}
            >
              <Sun
                className={`w-6 h-6 mx-auto mb-2 ${
                  theme === "light" ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <p className="text-sm font-medium">Açık</p>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleThemeChange("dark")}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme === "dark"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card"
              }`}
            >
              <Moon
                className={`w-6 h-6 mx-auto mb-2 ${
                  theme === "dark" ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <p className="text-sm font-medium">Koyu</p>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleThemeChange("system")}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme === "system"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card"
              }`}
            >
              <Monitor
                className={`w-6 h-6 mx-auto mb-2 ${
                  theme === "system" ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <p className="text-sm font-medium">Sistem</p>
            </motion.button>
          </div>
        </div>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <div key={group.title}>
            <h3 className="font-semibold mb-3">{group.title}</h3>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {group.items.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (groupIndex * 0.1) + (index * 0.05) }}
                  whileTap={{ scale: 0.98 }}
                  onClick={item.action}
                  className={`w-full flex items-center gap-4 p-4 text-left transition-colors hover:bg-muted/50 ${
                    index < group.items.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  {item.toggle ? (
                    <div
                      className={`w-12 h-7 rounded-full transition-colors ${
                        item.toggleValue ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full shadow mt-1"
                        animate={{ x: item.toggleValue ? 28 : 4 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </div>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }}
          className="w-full bg-danger-red/10 border border-danger-red/20 rounded-xl p-4 text-danger-red font-semibold flex items-center justify-center gap-2 hover:bg-danger-red/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Çıkış Yap
        </motion.button>

        {/* App Info */}
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>OBD2 Arıza Teşhis Uygulaması</p>
          <p>Versiyon 1.0.0 (Build 2026.05.18)</p>
          <p className="mt-2">© 2026 Tüm hakları saklıdır</p>
        </div>
      </div>
    </div>
  );
}
