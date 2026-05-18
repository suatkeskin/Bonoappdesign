import { useState } from "react";
import {
  Bluetooth,
  Car,
  AlertTriangle,
  Activity,
  Gauge,
  ScanSearch,
  CheckCircle2,
  History,
  Settings,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";

export function DashboardScreen() {
  const [isConnected, setIsConnected] = useState(false);

  const quickAccessButtons = [
    { icon: Activity, label: "Motor", color: "text-primary" },
    { icon: Settings, label: "Şanzıman", color: "text-primary" },
    { icon: Wrench, label: "Bakım", color: "text-primary" },
    { icon: Gauge, label: "Sensörler", color: "text-primary" },
    { icon: AlertTriangle, label: "Uyarılar", color: "text-warning-orange" },
  ];

  const featureCards = [
    {
      icon: ScanSearch,
      title: "Arıza Taraması",
      description:
        "Aracınızın motor ve şanzıman sistemlerindeki arıza kodlarını tespit edin",
      action: "Taramayı Başlat",
      bgColor: "bg-red-50",
      borderColor: "border-red-100",
      iconBg: "bg-red-100",
      iconColor: "text-primary",
      titleColor: "text-gray-900",
      textColor: "text-gray-600",
      actionColor: "text-primary",
    },
    {
      icon: Activity,
      title: "Canlı Veri İzleme",
      description:
        "Motor devri, sıcaklık, yakıt tüketimi gibi verileri gerçek zamanlı takip edin",
      action: "Verileri Görüntüle",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      titleColor: "text-gray-900",
      textColor: "text-gray-600",
      actionColor: "text-blue-600",
    },
    {
      icon: History,
      title: "Kilometre Kontrolü",
      description:
        "Kilometre sahtekarlığını tespit edin. Kontrol üniteleri arasındaki verileri karşılaştırın",
      action: "Kontrol Et",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      titleColor: "text-gray-900",
      textColor: "text-gray-600",
      actionColor: "text-purple-600",
    },
  ];

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="h-full overflow-y-auto pb-20 bg-gradient-to-b from-white to-gray-50">
      <div className="p-6 pt-8">
        {/* OBD2 Device Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-8"
        >
          <div className="w-full max-w-sm mx-auto">
            {/* OBD2 Device Card */}
            <motion.div
              animate={
                isConnected
                  ? {
                      boxShadow:
                        "0 20px 60px rgba(220, 38, 38, 0.15), 0 0 40px rgba(220, 38, 38, 0.1)",
                    }
                  : {
                      boxShadow:
                        "0 20px 60px rgba(0, 0, 0, 0.08), 0 0 20px rgba(0, 0, 0, 0.04)",
                    }
              }
              transition={{ duration: 0.5 }}
              className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl p-8 overflow-hidden"
            >
              {/* Background Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
              </div>

              {/* OBD2 Device Illustration */}
              <div className="relative z-10">
                <div className="w-56 h-56 mx-auto relative">
                  {/* Main Device Body */}
                  <motion.div
                    style={{
                      transform: "perspective(800px) rotateX(8deg)",
                      transformStyle: "preserve-3d",
                    }}
                    className="absolute inset-0"
                  >
                    {/* Device Shell */}
                    <div className="relative w-full h-full">
                      {/* Front Face */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-3xl shadow-2xl">
                        {/* Top Surface Highlight */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-3xl" />

                        {/* Brand Logo Area */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-600/40 to-gray-800/40 backdrop-blur-sm flex items-center justify-center border border-white/10">
                          <Car className="w-10 h-10 text-gray-400" />
                        </div>

                        {/* Center LED Indicator */}
                        <div className="absolute top-32 left-1/2 -translate-x-1/2">
                          <motion.div
                            animate={
                              isConnected
                                ? {
                                    boxShadow: [
                                      "0 0 10px rgba(34, 197, 94, 0.5)",
                                      "0 0 20px rgba(34, 197, 94, 0.8)",
                                      "0 0 10px rgba(34, 197, 94, 0.5)",
                                    ],
                                  }
                                : {}
                            }
                            transition={{
                              repeat: Infinity,
                              duration: 2,
                            }}
                            className={`w-3 h-3 rounded-full ${
                              isConnected ? "bg-success-green" : "bg-gray-600"
                            }`}
                          />
                        </div>

                        {/* OBD2 Connector Port */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                          {/* Port Housing */}
                          <div className="w-36 h-16 bg-gradient-to-b from-gray-900 to-black rounded-xl shadow-inner relative overflow-hidden">
                            {/* Inner Shadow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent rounded-xl" />

                            {/* Pin Connector Grid */}
                            <div className="absolute inset-0 flex items-center justify-center gap-1 px-3">
                              <div className="grid grid-cols-8 gap-1">
                                {[...Array(16)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="w-2 h-7 bg-gradient-to-b from-yellow-600/80 to-yellow-700/60 rounded-sm"
                                    style={{
                                      transform: `translateZ(${i % 2 === 0 ? "2px" : "0px"})`,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Port Rim */}
                            <div className="absolute inset-0 rounded-xl border-2 border-gray-700/50" />
                          </div>
                        </div>

                        {/* Side Edges */}
                        <div className="absolute -right-1 top-4 bottom-4 w-2 bg-gradient-to-r from-gray-900 to-black rounded-r" />
                        <div className="absolute -left-1 top-4 bottom-4 w-2 bg-gradient-to-l from-gray-900 to-black rounded-l" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Connection Status Badge */}
                  {isConnected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute -top-2 -right-2 bg-success-green text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1"
                    >
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      Bağlı
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Access Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between mb-6 px-2"
        >
          {quickAccessButtons.map((button, index) => (
            <motion.button
              key={button.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center shadow-sm">
                <button.icon className={`w-6 h-6 ${button.color}`} />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Connect Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConnect}
          className={`w-full py-4 rounded-2xl font-semibold text-white text-lg flex items-center justify-center gap-3 transition-all mb-6 shadow-lg ${
            isConnected
              ? "bg-success-green hover:bg-success-green/90"
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          <Car className="w-6 h-6" />
          {isConnected ? "Bağlı" : "Bağlan"}
        </motion.button>

        {/* Feature Cards */}
        <div className="space-y-4">
          {featureCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              className={`${card.bgColor} border ${card.borderColor} rounded-2xl p-6 cursor-pointer hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`${card.titleColor} font-bold text-lg mb-2`}>
                    {card.title}
                  </h3>
                  <p className={`${card.textColor} text-sm leading-relaxed`}>
                    {card.description}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ x: 5 }}
                className={`${card.actionColor} font-semibold text-sm`}
              >
                {card.action} →
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Connection Status Message */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200"
          >
            <div className="flex items-center gap-3">
              <Bluetooth className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-gray-700">
                OBD2 cihazınızı aracınıza takın ve Bluetooth'u açarak bağlanın
              </p>
            </div>
          </motion.div>
        )}

        {/* Connected Status */}
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success-green" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Cihaz Bağlandı
                </p>
                <p className="text-xs text-gray-600">
                  ELM327 OBD2 Adaptör • Sinyal Güçlü
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
