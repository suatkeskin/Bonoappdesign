import { Heart, MessageCircle, Share2, MapPin, Clock, Gauge } from "lucide-react";

interface SessionCardProps {
  user: {
    name: string;
    avatar: string;
  };
  car: string;
  duration: string;
  distance: string;
  avgSpeed: string;
  highlight: string;
  likes: number;
  comments: number;
}

export function SessionCard({
  user,
  car,
  duration,
  distance,
  avgSpeed,
  highlight,
  likes,
  comments,
}: SessionCardProps) {
  return (
    <div className="bg-card rounded-2xl p-4 mb-4 border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 via-red-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-red-500/30">
          <span className="text-lg font-bold">{user.name[0]}</span>
        </div>
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-muted-foreground">{car}</p>
        </div>
      </div>

      <div className="bg-secondary rounded-xl p-4 mb-3 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <path
              d="M 0 80 Q 50 20 100 50 T 200 40"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-primary"
            />
          </svg>
        </div>
        <div className="relative grid grid-cols-3 gap-4">
          <div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
              <Clock className="w-3 h-3" />
              <span>Duration</span>
            </div>
            <p className="font-bold">{duration}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
              <MapPin className="w-3 h-3" />
              <span>Distance</span>
            </div>
            <p className="font-bold">{distance}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
              <Gauge className="w-3 h-3" />
              <span>Avg Speed</span>
            </div>
            <p className="font-bold">{avgSpeed}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-xl p-3 mb-4 border border-primary/30">
        <p className="text-sm text-muted-foreground mb-1">Best Performance</p>
        <p className="text-primary font-bold text-lg">{highlight}</p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex gap-6">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Heart className="w-5 h-5" />
            <span className="text-sm">{likes}</span>
          </button>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{comments}</span>
          </button>
        </div>
        <button className="text-muted-foreground hover:text-primary transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
