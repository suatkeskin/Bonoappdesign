import { Calendar, MapPin, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { useState } from "react";

export function HistoryScreen() {
  const [activeFilter, setActiveFilter] = useState("all");

  const sessions = [
    {
      id: 1,
      date: "Today, 14:30",
      duration: "45 min",
      distance: "42.5 km",
      avgSpeed: "87 km/h",
      maxSpeed: "145 km/h",
    },
    {
      id: 2,
      date: "Yesterday, 09:15",
      duration: "1h 12min",
      distance: "95.2 km",
      avgSpeed: "105 km/h",
      maxSpeed: "178 km/h",
    },
    {
      id: 3,
      date: "Apr 28, 2026",
      duration: "28 min",
      distance: "31.8 km",
      avgSpeed: "68 km/h",
      maxSpeed: "120 km/h",
    },
    {
      id: 4,
      date: "Apr 27, 2026",
      duration: "52 min",
      distance: "58.3 km",
      avgSpeed: "92 km/h",
      maxSpeed: "165 km/h",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border z-10 p-4">
        <h1 className="mb-2">Session History</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
              activeFilter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-muted"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>All Time</span>
          </button>
          <button
            onClick={() => setActiveFilter("week")}
            className={`px-4 py-2 rounded-xl text-sm transition-all ${
              activeFilter === "week"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-muted"
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setActiveFilter("month")}
            className={`px-4 py-2 rounded-xl text-sm transition-all ${
              activeFilter === "month"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-muted"
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-4 border border-primary/30">
            <p className="text-xs text-muted-foreground mb-1">Total Sessions</p>
            <p className="text-2xl font-bold text-primary">24</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 rounded-2xl p-4 border border-purple-600/30">
            <p className="text-xs text-muted-foreground mb-1">Total Distance</p>
            <p className="text-2xl font-bold text-purple-400">1,248</p>
            <p className="text-xs text-muted-foreground">km</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-2xl p-4 border border-green-500/30">
            <p className="text-xs text-muted-foreground mb-1">Avg Speed</p>
            <p className="text-2xl font-bold text-green-400">94</p>
            <p className="text-xs text-muted-foreground">km/h</p>
          </div>
        </div>

        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-card rounded-2xl p-4 border border-border hover:border-primary/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{session.date}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <div className="bg-secondary rounded-xl p-3 mb-3 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  <svg viewBox="0 0 200 60" className="w-full h-full">
                    <path
                      d="M 0 40 Q 50 10 100 30 T 200 25"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-primary"
                    />
                  </svg>
                </div>
                <div className="relative grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                      <Clock className="w-3 h-3" />
                      <span>Duration</span>
                    </div>
                    <p className="font-bold">{session.duration}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>Distance</span>
                    </div>
                    <p className="font-bold">{session.distance}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-1 bg-secondary rounded-lg p-2">
                  <p className="text-xs text-muted-foreground">Avg Speed</p>
                  <p className="text-sm font-bold">{session.avgSpeed}</p>
                </div>
                <div className="flex-1 bg-secondary rounded-lg p-2">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Max Speed
                  </p>
                  <p className="text-sm font-bold text-primary">{session.maxSpeed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
