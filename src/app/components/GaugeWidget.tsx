interface GaugeWidgetProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  color?: string;
  size?: "small" | "large";
}

export function GaugeWidget({
  label,
  value,
  max,
  unit,
  color = "#ef4444",
  size = "large",
}: GaugeWidgetProps) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const isLarge = size === "large";
  const svgSize = isLarge ? 180 : 120;
  const radius = isLarge ? 70 : 45;
  const fontSize = isLarge ? "text-5xl" : "text-3xl";

  return (
    <div className={`flex flex-col items-center justify-center ${isLarge ? "p-6" : "p-4"}`}>
      <div className="relative">
        <svg
          width={svgSize}
          height={svgSize}
          className="transform -rotate-90"
        >
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={isLarge ? "12" : "8"}
            fill="none"
          />
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke={color}
            strokeWidth={isLarge ? "12" : "8"}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              filter: `drop-shadow(0 0 10px ${color}40)`,
              transition: "stroke-dashoffset 0.3s ease",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className={`${fontSize} font-bold tracking-tight`}>{value}</p>
          <p className="text-sm text-muted-foreground">{unit}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
}
