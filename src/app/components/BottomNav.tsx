import { Activity, Circle, History, Home, Settings } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "timeline", icon: Home, label: "Timeline" },
    { id: "record", icon: Circle, label: "Record" },
    { id: "live", icon: Activity, label: "Live" },
    { id: "history", icon: History, label: "History" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border backdrop-blur-lg bg-opacity-80">
      <div className="max-w-md mx-auto flex justify-around items-center h-20 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon
                className={`${isActive ? "w-7 h-7" : "w-6 h-6"}`}
                strokeWidth={isActive ? 2.5 : 2}
                style={
                  isActive
                    ? {
                        filter: "drop-shadow(0 0 8px var(--neon-glow))",
                      }
                    : {}
                }
              />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
