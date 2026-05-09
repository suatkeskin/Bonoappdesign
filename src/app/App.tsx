import { useState, useEffect } from "react";
import { BottomNav } from "./components/BottomNav";
import { TimelineScreen } from "./screens/TimelineScreen";
import { RecordScreen } from "./screens/RecordScreen";
import { LiveScreen } from "./screens/LiveScreen";
import { HistoryScreen } from "./screens/HistoryScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { OTPScreen } from "./screens/OTPScreen";

export default function App() {
  const [activeTab, setActiveTab] = useState("timeline");
  const [showOnboarding, setShowOnboarding] = useState(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    return !hasSeenOnboarding;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    return loggedIn === "true";
  });
  const [showOTP, setShowOTP] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShowOnboarding(false);
  };

  const handleOTPSent = (email: string) => {
    if (email) {
      setUserEmail(email);
      setShowOTP(true);
    } else {
      // Social login - skip OTP
      handleLogin();
    }
  };

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setShowOTP(false);
  };

  const handleBackToLogin = () => {
    setShowOTP(false);
    setUserEmail("");
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "timeline":
        return <TimelineScreen />;
      case "record":
        return <RecordScreen />;
      case "live":
        return <LiveScreen />;
      case "history":
        return <HistoryScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <TimelineScreen />;
    }
  };

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  if (!isLoggedIn) {
    if (showOTP) {
      return (
        <OTPScreen
          email={userEmail}
          onVerify={handleLogin}
          onBack={handleBackToLogin}
        />
      );
    }
    return <LoginScreen onOTPSent={handleOTPSent} />;
  }

  return (
    <div className="size-full bg-background text-foreground max-w-md mx-auto relative">
      <div className="h-full overflow-hidden">
        {renderScreen()}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}