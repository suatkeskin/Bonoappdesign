import { Search, Filter, X } from "lucide-react";
import { SessionCard } from "../components/SessionCard";
import { useState } from "react";

export function TimelineScreen() {
  const [activeFilter, setActiveFilter] = useState("friends");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sessions = [
    {
      user: { name: "Alex Turner", avatar: "" },
      car: "BMW M3 Competition",
      duration: "45 min",
      distance: "42.5 km",
      avgSpeed: "87 km/h",
      highlight: "0-100 in 3.8s",
      likes: 24,
      comments: 5,
    },
    {
      user: { name: "Sarah Chen", avatar: "" },
      car: "Porsche 911 GT3",
      duration: "1h 12min",
      distance: "95.2 km",
      avgSpeed: "105 km/h",
      highlight: "Top speed 275 km/h",
      likes: 38,
      comments: 12,
    },
    {
      user: { name: "Mike Johnson", avatar: "" },
      car: "Tesla Model 3 Performance",
      duration: "28 min",
      distance: "31.8 km",
      avgSpeed: "68 km/h",
      highlight: "0-100 in 3.3s",
      likes: 16,
      comments: 3,
    },
  ];

  const filterOptions = [
    { id: "recent", label: "Most Recent" },
    { id: "popular", label: "Most Popular" },
    { id: "distance", label: "Longest Distance" },
    { id: "speed", label: "Highest Speed" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-border z-10">
        <div className="p-4">
          <h1 className="mb-4">Timeline</h1>
          <div className="flex gap-2">
            <div className="flex-1 bg-card rounded-xl px-4 py-3 flex items-center gap-2 border border-border">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sessions..."
                className="bg-transparent outline-none w-full text-foreground placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`bg-card px-4 rounded-xl border transition-colors ${
                  showFilterMenu
                    ? "border-primary bg-primary/10"
                    : "border-border hover:bg-secondary"
                }`}
              >
                <Filter className="w-5 h-5" />
              </button>
              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-popover rounded-xl border border-border shadow-2xl overflow-hidden">
                  {filterOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setShowFilterMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors text-sm"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setActiveFilter("friends")}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeFilter === "friends"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              Friends
            </button>
            <button
              onClick={() => setActiveFilter("public")}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeFilter === "public"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              Public
            </button>
            <button
              onClick={() => setActiveFilter("private")}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeFilter === "private"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              Private
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {sessions.map((session, index) => (
          <SessionCard key={index} {...session} />
        ))}
      </div>
    </div>
  );
}
