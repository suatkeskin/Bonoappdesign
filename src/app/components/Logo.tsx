import { useMemo } from "react";

interface LogoProps {
  variant?: "icon" | "full";
  size?: "sm" | "md" | "lg";
  className?: string;
  theme?: "light" | "dark" | "auto";
}

export function Logo({ variant = "icon", size = "md", className = "", theme = "auto" }: LogoProps) {
  // Generate unique ID once per component instance
  const uniqueId = useMemo(() => `logo-${Math.random().toString(36).substr(2, 9)}`, []);
  const sizes = {
    sm: { container: "h-8", icon: "h-8 w-8", text: "text-lg" },
    md: { container: "h-12", icon: "h-12 w-12", text: "text-2xl" },
    lg: { container: "h-20", icon: "h-20 w-20", text: "text-4xl" },
  };

  const sizeClasses = sizes[size];

  // Determine gradient colors based on theme
  const gradientColors = theme === "dark"
    ? { start: "#991b1b", mid: "#dc2626", end: "#ef4444" }
    : { start: "#dc2626", mid: "#ef4444", end: "#f87171" };

  return (
    <div className={`flex items-center gap-3 ${sizeClasses.container} ${className}`}>
      {/* Hexagon Badge Icon */}
      <div className="relative">
        <svg
          viewBox="17.5 10 65.056 80"
          className={sizeClasses.icon}
          style={{
            filter: "drop-shadow(0 4px 12px rgba(239, 68, 68, 0.3))",
          }}
        >
          {/* Hexagon Background with Gradient */}
          <defs>
            <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0" stopColor={gradientColors.start} />
              <stop offset="0.5" stopColor={gradientColors.mid} />
              <stop offset="1" stopColor={gradientColors.end} />
            </linearGradient>
          </defs>

          {/* Hexagon Shape */}
          <path
            d="M 50 10 L 82.5 30 L 82.5 70 L 50 90 L 17.5 70 L 17.5 30 L 50 10 Z"
            fill={`url(#${uniqueId})`}
            transform="matrix(1, 0, 0, 1, 0, -2.220446049250313e-16)"
          />

          {/* Inner Hexagon Border */}
          <path
            d="M 50 15.6 L 77.95 32.8 L 77.95 67.2 L 50 84.4 L 22.05 67.2 L 22.05 32.8 L 50 15.6 Z"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.5"
            transform="matrix(1, 0, 0, 1, 0, -2.220446049250313e-16)"
          />

          {/* Letter "B" */}
          <path
            d="M 5.955 0.000 L 5.955 4.933 L 14.974 4.933 Q 17.831 4.933 19.347 6.086 Q 20.863 7.240 20.863 9.437 L 20.863 9.481 Q 20.863 10.942 20.165 11.942 Q 19.468 12.942 18.094 13.447 Q 16.721 13.953 14.689 13.953 L 5.955 13.953 L 5.955 18.457 L 13.909 18.457 Q 16.710 18.457 18.177 19.583 Q 19.644 20.709 19.644 22.764 L 19.644 22.808 Q 19.644 24.697 18.347 25.735 Q 17.051 26.774 14.722 26.774 L 5.955 26.774 L 5.955 31.707 L 16.436 31.707 Q 19.435 31.707 21.616 30.734 Q 23.796 29.762 24.983 27.977 Q 26.169 26.191 26.169 23.752 L 26.169 23.708 Q 26.169 21.962 25.367 20.479 Q 24.565 18.995 23.176 18.018 Q 21.786 17.040 20.039 16.798 L 20.039 16.666 Q 22.247 16.512 23.967 15.491 Q 25.686 14.469 26.664 12.810 Q 27.642 11.151 27.642 9.064 L 27.642 9.020 Q 27.642 6.251 26.307 4.230 Q 24.972 2.208 22.522 1.104 Q 20.072 0.000 16.677 0.000 Z M 2.637 0.000 L 2.637 31.707 L 9.272 31.707 L 9.272 0.000 Z"
            fill="white"
            transform="matrix(0.929371, 0, 0, -1, 35.5, 66.2)"
          />
        </svg>
      </div>

      {/* App Name */}
      {variant === "full" && (
        <div className="flex flex-col">
          <span className={`font-bold leading-none ${sizeClasses.text}`}>
            Bono
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            OBD Diagnostics
          </span>
        </div>
      )}
    </div>
  );
}
