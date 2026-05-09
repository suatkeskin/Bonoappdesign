import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Activity,
  AlertCircle,
  Wrench,
  BookOpen,
  Bluetooth,
  Check,
} from "lucide-react";
import { Logo } from "../components/Logo";

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Activity,
      iconColor: "text-red-500",
      iconBg: "bg-red-500/20",
      title: "Real-Time Vehicle Data",
      description:
        "Monitor live engine data including speed, RPM, temperature, and more in real-time with professional-grade accuracy.",
      image: "📊",
    },
    {
      icon: AlertCircle,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-500/20",
      title: "Instant Diagnostics",
      description:
        "Read and clear error codes instantly. Understand what's wrong with your car and fix it before it becomes expensive.",
      image: "🔍",
    },
    {
      icon: Wrench,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/20",
      title: "Advanced Features",
      description:
        "Clear fault codes, reset check engine light, monitor fuel consumption, and access advanced diagnostic tools.",
      image: "⚙️",
    },
    {
      icon: BookOpen,
      iconColor: "text-green-500",
      iconBg: "bg-green-500/20",
      title: "Maintenance Guides",
      description:
        "Get detailed maintenance schedules, repair guides, and expert tips to keep your vehicle running smoothly.",
      image: "📚",
    },
    {
      icon: Bluetooth,
      iconColor: "text-primary",
      iconBg: "bg-primary/20",
      title: "Easy OBD2 Connection",
      description:
        "Simply plug in your OBD2 adapter, connect via Bluetooth, and start diagnosing. Works with all cars made after 1996.",
      image: "🔌",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="size-full bg-gradient-to-b from-background to-secondary flex flex-col max-w-md mx-auto">
      {/* Header with Logo and Skip */}
      <div className="flex justify-between items-center p-4">
        <Logo variant="icon" size="sm" />
        {!isLastSlide && (
          <button
            onClick={handleSkip}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Skip
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
        {/* Icon */}
        <div
          className={`w-32 h-32 rounded-full ${slide.iconBg} flex items-center justify-center mb-8 shadow-lg`}
          style={{
            boxShadow: `0 0 60px ${slide.iconBg.includes("red") ? "rgba(239, 68, 68, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
          }}
        >
          <Icon className={`w-16 h-16 ${slide.iconColor}`} />
        </div>

        {/* Emoji */}
        <div className="text-8xl mb-6">{slide.image}</div>

        {/* Title */}
        <h1 className="text-center mb-4 text-2xl">{slide.title}</h1>

        {/* Description */}
        <p className="text-center text-muted-foreground text-base leading-relaxed max-w-sm">
          {slide.description}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="p-8 space-y-6">
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-primary w-8"
                  : "bg-muted w-2"
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {currentSlide > 0 && (
            <button
              onClick={handlePrev}
              className="flex-1 px-6 py-4 rounded-xl bg-secondary hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 px-6 py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
          >
            {isLastSlide ? (
              <>
                <Check className="w-5 h-5" />
                <span>Get Started</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
