import { Play, Square, Wifi, WifiOff, MapPin, Timer, Navigation } from "lucide-react";
import { useState } from "react";

export function RecordScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected] = useState(true);
  const [duration, setDuration] = useState("00:00:00");
  const [distance] = useState("0.0");
  const [currentSpeed] = useState(0);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-background to-secondary/20">
      <div className="p-6 pt-8">
        <div className="flex items-center justify-between mb-8">
          <h1>Record Session</h1>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <div className="flex items-center gap-2 text-success-green text-sm">
                <Wifi className="w-4 h-4" />
                <span>OBD Connected</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <WifiOff className="w-4 h-4" />
                <span>Disconnected</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center my-12">
          <div className="relative">
            <div
              className={`w-64 h-64 rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording
                  ? "bg-gradient-to-br from-danger-red/20 to-danger-red/5 border-4 border-danger-red shadow-2xl"
                  : "bg-gradient-to-br from-red-600/20 via-red-500/15 to-rose-600/20 border-4 border-primary shadow-2xl"
              }`}
              style={{
                boxShadow: isRecording
                  ? "0 0 60px rgba(239, 68, 68, 0.4)"
                  : "0 0 80px rgba(239, 68, 68, 0.3)",
              }}
            >
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`w-48 h-48 rounded-full flex items-center justify-center transition-all ${
                  isRecording
                    ? "bg-danger-red hover:bg-danger-red/90"
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {isRecording ? (
                  <Square className="w-16 h-16" fill="currentColor" />
                ) : (
                  <Play className="w-16 h-16" fill="currentColor" />
                )}
              </button>
            </div>
            {isRecording && (
              <div className="absolute -top-2 -right-2">
                <div className="w-6 h-6 bg-danger-red rounded-full animate-pulse" />
              </div>
            )}
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-4xl font-bold mb-2">{isRecording ? duration : "Ready"}</p>
          <p className="text-muted-foreground">
            {isRecording ? "Recording in progress" : "Tap to start recording"}
          </p>
        </div>

        {isRecording && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-card rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                <Timer className="w-3 h-3" />
                <span>Duration</span>
              </div>
              <p className="text-2xl font-bold">{duration}</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                <MapPin className="w-3 h-3" />
                <span>Distance</span>
              </div>
              <p className="text-2xl font-bold">{distance}</p>
              <p className="text-xs text-muted-foreground">km</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                <Navigation className="w-3 h-3" />
                <span>Speed</span>
              </div>
              <p className="text-2xl font-bold">{currentSpeed}</p>
              <p className="text-xs text-muted-foreground">km/h</p>
            </div>
          </div>
        )}

        <div className="bg-muted/30 rounded-2xl p-4 border border-border backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-1">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">GPS Status</p>
              <p className="text-xs text-muted-foreground">
                GPS signal strong • 12 satellites • Accuracy: 3m
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
