import { useState, useRef } from "react";
import { Download, ArrowLeft } from "lucide-react";
import { Logo } from "../components/Logo";

interface LogoExportScreenProps {
  onBack?: () => void;
}

export function LogoExportScreen({ onBack }: LogoExportScreenProps = {}) {
  const [size, setSize] = useState(1024);
  const [logoTheme, setLogoTheme] = useState<"light" | "dark">("light");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadSVG = () => {
    const svg = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="17.5 10 65.056 80" width="65.056px" height="80px">
  <defs>
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0" stop-color="#dc2626"/>
      <stop offset="0.5" stop-color="#ef4444"/>
      <stop offset="1" stop-color="#f87171"/>
    </linearGradient>
  </defs>
  <path d="M 50 10 L 82.5 30 L 82.5 70 L 50 90 L 17.5 70 L 17.5 30 L 50 10 Z" fill="url(#logoGradient)" transform="matrix(1, 0, 0, 1, 0, -2.220446049250313e-16)"/>
  <path d="M 50 15.6 L 77.95 32.8 L 77.95 67.2 L 50 84.4 L 22.05 67.2 L 22.05 32.8 L 50 15.6 Z" fill="none" stroke="white" stroke-width="1" opacity="0.5" transform="matrix(1, 0, 0, 1, 0, -2.220446049250313e-16)"/>
  <path d="M 5.955 0.000 L 5.955 4.933 L 14.974 4.933 Q 17.831 4.933 19.347 6.086 Q 20.863 7.240 20.863 9.437 L 20.863 9.481 Q 20.863 10.942 20.165 11.942 Q 19.468 12.942 18.094 13.447 Q 16.721 13.953 14.689 13.953 L 5.955 13.953 L 5.955 18.457 L 13.909 18.457 Q 16.710 18.457 18.177 19.583 Q 19.644 20.709 19.644 22.764 L 19.644 22.808 Q 19.644 24.697 18.347 25.735 Q 17.051 26.774 14.722 26.774 L 5.955 26.774 L 5.955 31.707 L 16.436 31.707 Q 19.435 31.707 21.616 30.734 Q 23.796 29.762 24.983 27.977 Q 26.169 26.191 26.169 23.752 L 26.169 23.708 Q 26.169 21.962 25.367 20.479 Q 24.565 18.995 23.176 18.018 Q 21.786 17.040 20.039 16.798 L 20.039 16.666 Q 22.247 16.512 23.967 15.491 Q 25.686 14.469 26.664 12.810 Q 27.642 11.151 27.642 9.064 L 27.642 9.020 Q 27.642 6.251 26.307 4.230 Q 24.972 2.208 22.522 1.104 Q 20.072 0.000 16.677 0.000 Z M 2.637 0.000 L 2.637 31.707 L 9.272 31.707 L 9.272 0.000 Z" fill="white" transform="matrix(0.929371, 0, 0, -1, 35.5, 66.2)"/>
</svg>`;

    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `bono_logo.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadLogo = (theme: "light" | "dark", backgroundColor?: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    // Fill background if specified
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, size, size);
    }

    // Create SVG based on theme
    const gradientId = theme === "light" ? "logoGradientLight" : "logoGradientDark";
    const gradientColors = theme === "light"
      ? { start: "#dc2626", mid: "#ef4444", end: "#f87171" }
      : { start: "#991b1b", mid: "#dc2626", end: "#ef4444" };

    const svg = `
      <svg viewBox="17.5 10 65.056 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0" stop-color="${gradientColors.start}" />
            <stop offset="0.5" stop-color="${gradientColors.mid}" />
            <stop offset="1" stop-color="${gradientColors.end}" />
          </linearGradient>
        </defs>
        <path
          d="M 50 10 L 82.5 30 L 82.5 70 L 50 90 L 17.5 70 L 17.5 30 L 50 10 Z"
          fill="url(#${gradientId})"
          transform="matrix(1, 0, 0, 1, 0, -2.220446049250313e-16)"
        />
        <path
          d="M 50 15.6 L 77.95 32.8 L 77.95 67.2 L 50 84.4 L 22.05 67.2 L 22.05 32.8 L 50 15.6 Z"
          fill="none"
          stroke="white"
          stroke-width="1"
          opacity="0.5"
          transform="matrix(1, 0, 0, 1, 0, -2.220446049250313e-16)"
        />
        <path
          d="M 5.955 0.000 L 5.955 4.933 L 14.974 4.933 Q 17.831 4.933 19.347 6.086 Q 20.863 7.240 20.863 9.437 L 20.863 9.481 Q 20.863 10.942 20.165 11.942 Q 19.468 12.942 18.094 13.447 Q 16.721 13.953 14.689 13.953 L 5.955 13.953 L 5.955 18.457 L 13.909 18.457 Q 16.710 18.457 18.177 19.583 Q 19.644 20.709 19.644 22.764 L 19.644 22.808 Q 19.644 24.697 18.347 25.735 Q 17.051 26.774 14.722 26.774 L 5.955 26.774 L 5.955 31.707 L 16.436 31.707 Q 19.435 31.707 21.616 30.734 Q 23.796 29.762 24.983 27.977 Q 26.169 26.191 26.169 23.752 L 26.169 23.708 Q 26.169 21.962 25.367 20.479 Q 24.565 18.995 23.176 18.018 Q 21.786 17.040 20.039 16.798 L 20.039 16.666 Q 22.247 16.512 23.967 15.491 Q 25.686 14.469 26.664 12.810 Q 27.642 11.151 27.642 9.064 L 27.642 9.020 Q 27.642 6.251 26.307 4.230 Q 24.972 2.208 22.522 1.104 Q 20.072 0.000 16.677 0.000 Z M 2.637 0.000 L 2.637 31.707 L 9.272 31.707 L 9.272 0.000 Z"
          fill="white"
          transform="matrix(0.929371, 0, 0, -1, 35.5, 66.2)"
        />
      </svg>
    `;

    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      // For app icons, add padding (80% of canvas size for the logo)
      const padding = backgroundColor ? size * 0.1 : 0; // 10% padding on each side
      const availableSize = size - (padding * 2);

      // SVG viewBox: 17.5 10 65.056 80 (width: 65.056, height: 80)
      const svgAspectRatio = 65.056 / 80; // 0.8132

      // Calculate dimensions to fit in available space while maintaining aspect ratio
      let logoWidth, logoHeight;
      if (svgAspectRatio < 1) {
        // Taller than wide - height is limiting factor
        logoHeight = availableSize;
        logoWidth = availableSize * svgAspectRatio;
      } else {
        // Wider than tall - width is limiting factor
        logoWidth = availableSize;
        logoHeight = availableSize / svgAspectRatio;
      }

      // Center the logo
      const x = (size - logoWidth) / 2;
      const y = (size - logoHeight) / 2;

      ctx.drawImage(img, x, y, logoWidth, logoHeight);
      URL.revokeObjectURL(url);

      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement("a");
          const bgSuffix = backgroundColor ? "_white_bg" : "";
          link.download = `bono_logo_${theme}_${size}x${size}${bgSuffix}.png`;
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
        }
      });
    };
    img.src = url;
  };

  return (
    <div className="size-full bg-gradient-to-b from-background to-secondary flex flex-col max-w-md mx-auto overflow-y-auto">
      <div className="flex-1 flex flex-col p-6 pb-24">
        <button
          onClick={onBack || (() => window.history.back())}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h1 className="text-2xl mb-2">Export Logo</h1>
        <p className="text-muted-foreground mb-8">
          Download Bono logo in light or dark mode
        </p>

        {/* Preview - Light & Dark Versions */}
        <div className="space-y-4 mb-8">
          {/* Light Version */}
          <div
            onClick={() => setLogoTheme("light")}
            className={`bg-white rounded-2xl p-8 flex flex-col items-center justify-center border-2 cursor-pointer transition-all ${
              logoTheme === "light" ? "border-primary shadow-lg shadow-primary/20" : "border-gray-200"
            }`}
          >
            <Logo theme="light" size="lg" />
            <p className="text-xs text-gray-600 mt-4 font-medium">Light Mode</p>
          </div>

          {/* Dark Version */}
          <div
            onClick={() => setLogoTheme("dark")}
            className={`bg-gray-900 rounded-2xl p-8 flex flex-col items-center justify-center border-2 cursor-pointer transition-all ${
              logoTheme === "dark" ? "border-primary shadow-lg shadow-primary/20" : "border-gray-700"
            }`}
          >
            <Logo theme="dark" size="lg" />
            <p className="text-xs text-gray-400 mt-4 font-medium">Dark Mode</p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm mb-2">Export Size</label>
            <select
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="512">512 x 512</option>
              <option value="1024">1024 x 1024</option>
              <option value="2048">2048 x 2048</option>
              <option value="4096">4096 x 4096</option>
            </select>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="space-y-3 mb-8">
          <h3 className="mb-3">PNG Downloads</h3>
          <button
            onClick={() => downloadLogo("light", "#ffffff")}
            className="w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span>App Icon (White BG)</span>
          </button>

          <button
            onClick={() => downloadLogo("light", "#101828")}
            className="w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span>App Icon (Dark BG)</span>
          </button>

          <button
            onClick={() => downloadLogo(logoTheme)}
            className="w-full px-6 py-4 rounded-xl bg-card border border-border text-foreground hover:bg-accent transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span>{logoTheme === "light" ? "Light" : "Dark"} (Transparent)</span>
          </button>

          <button
            onClick={() => {
              downloadLogo("light");
              setTimeout(() => downloadLogo("dark"), 500);
            }}
            className="w-full px-6 py-4 rounded-xl bg-card border border-border text-foreground hover:bg-accent transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span>Both PNG Versions</span>
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="mb-3">SVG Download</h3>
          <button
            onClick={downloadSVG}
            className="w-full px-6 py-4 rounded-xl bg-card border border-border text-foreground hover:bg-accent transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span>Download Logo SVG</span>
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          PNG: 1024x1024 • SVG: Transparent Vector
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
