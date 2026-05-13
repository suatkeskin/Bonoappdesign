import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Video,
  Clock,
  Users,
  Bell,
  Shield,
  Zap,
  Heart,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface OnboardingScreenProps {
  onComplete: () => void;
}

type OnboardingStep =
  | "welcome"
  | "features"
  | "benefits"
  | "tutorial"
  | "permissions"
  | "personalize"
  | "ready";

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const steps: OnboardingStep[] = [
    "welcome",
    "features",
    "benefits",
    "tutorial",
    "permissions",
    "personalize",
    "ready",
  ];

  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const skipToEnd = () => {
    onComplete();
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    nextStep();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevStep();
  };

  return (
    <div className="h-full bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 dark:bg-gray-700">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Skip Button */}
      {currentStep !== "ready" && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={skipToEnd}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 px-4 py-2"
          >
            Atla
          </button>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            {currentStep === "welcome" && <WelcomeScreen />}
            {currentStep === "features" && <FeaturesScreen />}
            {currentStep === "benefits" && <BenefitsScreen />}
            {currentStep === "tutorial" && <TutorialScreen />}
            {currentStep === "permissions" && (
              <PermissionsScreen
                notificationsEnabled={notificationsEnabled}
                setNotificationsEnabled={setNotificationsEnabled}
              />
            )}
            {currentStep === "personalize" && (
              <PersonalizeScreen
                selectedInterests={selectedInterests}
                toggleInterest={toggleInterest}
              />
            )}
            {currentStep === "ready" && <ReadyScreen />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all ${
                index === currentStepIndex
                  ? "w-8 bg-purple-500"
                  : "w-2 bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>

        <button
          onClick={currentStep === "ready" ? onComplete : handleNext}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium flex items-center gap-2 hover:shadow-lg transition-shadow"
        >
          {currentStep === "ready" ? "Başla" : "Devam"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function WelcomeScreen() {
  return (
    <div className="text-center space-y-6 max-w-md">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
      >
        <Sparkles className="w-12 h-12 text-white" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Hoş Geldiniz!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
          Hayatınızı kaydedin, anılarınızı yaşatın
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Anılarınızı güvenle saklayın
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Arkadaşlarınızla paylaşın
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Özel anları yeniden keşfedin
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function FeaturesScreen() {
  const features = [
    {
      icon: Video,
      title: "Video Kayıt",
      description: "Anlarınızı HD kalitede kaydedin",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Zaman Çizelgesi",
      description: "Kronolojik olarak gezinin",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Canlı Yayın",
      description: "Arkadaşlarınızla anlık paylaşın",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Bell,
      title: "Akıllı Hatırlatmalar",
      description: "Önemli anları kaçırmayın",
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="text-center space-y-8 max-w-md w-full">
      <div>
        <h2 className="text-3xl font-bold">Özellikler</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Her şey parmaklarınızın ucunda
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3`}
            >
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BenefitsScreen() {
  const benefits = [
    {
      icon: Shield,
      title: "Gizlilik Odaklı",
      description: "Verileriniz şifrelenmiş ve güvende",
    },
    {
      icon: Zap,
      title: "Hızlı ve Akıcı",
      description: "Kesintisiz bir deneyim için optimize edildi",
    },
    {
      icon: Heart,
      title: "Kolay Kullanım",
      description: "Sezgisel arayüz, herkes için tasarlandı",
    },
    {
      icon: TrendingUp,
      title: "Sürekli Gelişim",
      description: "Düzenli güncellemeler ve yeni özellikler",
    },
  ];

  return (
    <div className="text-center space-y-8 max-w-md w-full">
      <div>
        <h2 className="text-3xl font-bold">Neden Bizi Seçmelisiniz?</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Deneyiminizi özel kılan şeyler
        </p>
      </div>
      <div className="space-y-4">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md text-left"
          >
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30">
              <benefit.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{benefit.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {benefit.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TutorialScreen() {
  const steps = [
    {
      number: "1",
      title: "Kayıt Yapın",
      description: "Anlarınızı yakalamak için kayıt butonuna basın",
    },
    {
      number: "2",
      title: "Düzenleyin",
      description: "Filtreler ve efektlerle videoları özelleştirin",
    },
    {
      number: "3",
      title: "Paylaşın",
      description: "Arkadaşlarınızla veya dünyayla paylaşın",
    },
  ];

  return (
    <div className="text-center space-y-8 max-w-md w-full">
      <div>
        <h2 className="text-3xl font-bold">Nasıl Çalışır?</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          3 basit adımda başlayın
        </p>
      </div>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md text-left">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {step.number}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="w-0.5 h-6 bg-gradient-to-b from-purple-300 to-blue-300 dark:from-purple-700 dark:to-blue-700 mx-auto my-2" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PermissionsScreen({
  notificationsEnabled,
  setNotificationsEnabled,
}: {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
}) {
  return (
    <div className="text-center space-y-8 max-w-md w-full">
      <div>
        <h2 className="text-3xl font-bold">İzinler</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          En iyi deneyim için gerekli izinler
        </p>
      </div>
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg text-left"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Bell className="w-6 h-6 text-purple-500" />
                <h3 className="font-semibold">Bildirimler</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Yeni içerikler ve hatırlatmalar için bildirim alın
              </p>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-12 h-7 rounded-full transition-colors ${
                notificationsEnabled
                  ? "bg-purple-500"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full shadow"
                animate={{ x: notificationsEnabled ? 28 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg text-left"
        >
          <div className="flex items-start gap-3">
            <Video className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Kamera ve Mikrofon</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Video kaydetmek için gerekli
              </p>
              <button className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition-colors">
                İzin Ver
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-left"
        >
          <p className="text-xs text-gray-600 dark:text-gray-400">
            💡 Bu izinleri daha sonra ayarlardan değiştirebilirsiniz
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function PersonalizeScreen({
  selectedInterests,
  toggleInterest,
}: {
  selectedInterests: string[];
  toggleInterest: (interest: string) => void;
}) {
  const interests = [
    { id: "daily", label: "Günlük Yaşam", emoji: "☀️" },
    { id: "travel", label: "Seyahat", emoji: "✈️" },
    { id: "food", label: "Yemek", emoji: "🍕" },
    { id: "sports", label: "Spor", emoji: "⚽" },
    { id: "music", label: "Müzik", emoji: "🎵" },
    { id: "art", label: "Sanat", emoji: "🎨" },
    { id: "tech", label: "Teknoloji", emoji: "💻" },
    { id: "nature", label: "Doğa", emoji: "🌿" },
  ];

  return (
    <div className="text-center space-y-8 max-w-md w-full">
      <div>
        <h2 className="text-3xl font-bold">İlgi Alanlarınız</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Size özel içerikler sunmamıza yardımcı olun
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {interests.map((interest, index) => (
          <motion.button
            key={interest.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => toggleInterest(interest.id)}
            className={`p-4 rounded-xl transition-all ${
              selectedInterests.includes(interest.id)
                ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg scale-105"
                : "bg-white dark:bg-gray-800 hover:shadow-md"
            }`}
          >
            <div className="text-3xl mb-2">{interest.emoji}</div>
            <div className="text-sm font-medium">{interest.label}</div>
          </motion.button>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-500">
        {selectedInterests.length > 0
          ? `${selectedInterests.length} ilgi alanı seçildi`
          : "En az bir ilgi alanı seçin"}
      </p>
    </div>
  );
}

function ReadyScreen() {
  return (
    <div className="text-center space-y-8 max-w-md">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mx-auto"
      >
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 blur-2xl"
          />
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-white" />
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-4xl font-bold">Hazırsınız! 🎉</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
          Harika anılar oluşturmaya başlayın
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-3 text-left"
      >
        <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span className="text-sm">Profil ayarları tamamlandı</span>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span className="text-sm">İlgi alanları kaydedildi</span>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span className="text-sm">Bildirimler yapılandırıldı</span>
        </div>
      </motion.div>
    </div>
  );
}
