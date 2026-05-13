import { useState } from "react";
import {
  Activity,
  AlertCircle,
  Wrench,
  BookOpen,
  Bluetooth,
} from "lucide-react";

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Activity,
      iconColor: "text-red-500",
      title: "Real-Time Vehicle Data",
      description:
        "Monitor live engine data including speed, RPM, temperature, and more in real-time with professional-grade accuracy.",
      image: "📊",
    },
    {
      icon: AlertCircle,
      iconColor: "text-amber-500",
      title: "Instant Diagnostics",
      description:
        "Read and clear error codes instantly. Understand what's wrong with your car and fix it before it becomes expensive.",
      image: "🔍",
    },
    {
      icon: Wrench,
      iconColor: "text-blue-500",
      title: "Advanced Features",
      description:
        "Clear fault codes, reset check engine light, monitor fuel consumption, and access advanced diagnostic tools.",
      image: "⚙️",
    },
    {
      icon: BookOpen,
      iconColor: "text-green-500",
      title: "Maintenance Guides",
      description:
        "Get detailed maintenance schedules, repair guides, and expert tips to keep your vehicle running smoothly.",
      image: "📚",
    },
    {
      icon: Bluetooth,
      iconColor: "text-red-500",
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

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="size-full bg-background flex flex-col max-w-md mx-auto">
      {/* Illustration Area */}
      <div className="flex-1 flex items-center justify-center pt-16 pb-8 px-8">
        <div className="text-9xl">{slide.image}</div>
      </div>

      {/* Content Area */}
      <div className="px-8 pb-12">
        {/* Title */}
        <h1 className="text-center text-2xl font-bold text-foreground mb-4">
          {slide.title}
        </h1>

        {/* Description */}
        <p className="text-center text-muted-foreground text-base leading-relaxed mb-8">
          {slide.description}
        </p>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mb-8">
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

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full px-6 py-4 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity text-base font-medium mb-4"
        >
          {isLastSlide ? "Get Started" : "Next"}
        </button>

        {/* Skip Link */}
        {!isLastSlide && (
          <button
            onClick={handleSkip}
            className="w-full text-center text-foreground text-base font-medium underline hover:text-muted-foreground transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
