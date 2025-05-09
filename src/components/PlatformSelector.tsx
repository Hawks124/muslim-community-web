"use client";

import { useState, useEffect } from "react";
import {
  FiX,
  FiDownload,
  FiInfo,
  FiSmartphone,
  FiCpu,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import {
  FaAndroid,
  FaApple,
  FaWindows,
  FaLinux,
  FaChrome,
} from "react-icons/fa";

interface PlatformSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlatformSelector({
  isOpen,
  onClose,
}: PlatformSelectorProps) {
  const [deviceInfo, setDeviceInfo] = useState<{
    os: string;
    osVersion: string;
    architecture: string;
    isAndroid: boolean;
    isIOS: boolean;
    isDesktop: boolean;
    browser: string;
    deviceModel: string;
    confidence: "high" | "medium" | "low";
  }>({
    os: "Unknown",
    osVersion: "Unknown",
    architecture: "Unknown",
    isAndroid: false,
    isIOS: false,
    isDesktop: true,
    browser: "Unknown",
    deviceModel: "Unknown",
    confidence: "low",
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnalyzing(true);
      setTimeout(() => {
        detectDevice();
        setIsAnalyzing(false);
      }, 1500); // Simulate analysis for better UX
    }
  }, [isOpen]);

  const detectDevice = () => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const userAgent = navigator.userAgent.toLowerCase();
    let os = "Unknown";
    let osVersion = "Unknown";
    let architecture = "Unknown";
    let isAndroid = false;
    let isIOS = false;
    let isDesktop = true;
    let browser = "Unknown";
    let deviceModel = "Unknown";
    let confidence: "high" | "medium" | "low" = "low";

    // Detect browser
    if (userAgent.includes("chrome")) {
      browser = "Chrome";
    } else if (userAgent.includes("firefox")) {
      browser = "Firefox";
    } else if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
      browser = "Safari";
    } else if (userAgent.includes("edge") || userAgent.includes("edg")) {
      browser = "Edge";
    } else if (userAgent.includes("opera") || userAgent.includes("opr")) {
      browser = "Opera";
    }

    // Detect OS and architecture
    if (userAgent.includes("android")) {
      os = "Android";
      isAndroid = true;
      isDesktop = false;

      // Extract Android version
      const versionMatch = userAgent.match(/android\s([0-9\.]*)/);
      if (versionMatch && versionMatch[1]) {
        osVersion = versionMatch[1];
      }

      // Try to extract device model
      const modelMatch = userAgent.match(/;\s([^;]*)\sbuild\//i);
      if (modelMatch && modelMatch[1]) {
        deviceModel = modelMatch[1].trim();
      }

      // Try to detect Android architecture with more sophisticated approach
      if (userAgent.includes("arm64")) {
        architecture = "arm64-v8a";
        confidence = "high";
      } else if (userAgent.includes("armeabi")) {
        architecture = "armeabi-v7a";
        confidence = "high";
      } else if (userAgent.includes("x86_64")) {
        architecture = "x86_64";
        confidence = "high";
      } else if (userAgent.includes("x86")) {
        architecture = "x86";
        confidence = "high";
      } else {
        // Make an educated guess based on device age and Android version
        const version = parseFloat(osVersion);
        if (version >= 8.0) {
          architecture = "arm64-v8a";
          confidence = "medium";
        } else if (version >= 5.0) {
          architecture = "armeabi-v7a";
          confidence = "medium";
        } else {
          architecture = "armeabi-v7a";
          confidence = "low";
        }
      }
    } else if (
      userAgent.includes("iphone") ||
      userAgent.includes("ipad") ||
      userAgent.includes("ipod")
    ) {
      os = "iOS";
      isIOS = true;
      isDesktop = false;

      // Extract iOS version
      const versionMatch = userAgent.match(/os\s(\d+_\d+)/);
      if (versionMatch && versionMatch[1]) {
        osVersion = versionMatch[1].replace("_", ".");
      }

      // Determine device model (simplified)
      if (userAgent.includes("iphone")) {
        deviceModel = "iPhone";
      } else if (userAgent.includes("ipad")) {
        deviceModel = "iPad";
      } else if (userAgent.includes("ipod")) {
        deviceModel = "iPod";
      }

      // iOS architecture is less relevant for app distribution but we can make educated guesses
      architecture = "ARM";
      confidence = "high";
    } else if (userAgent.includes("windows")) {
      os = "Windows";

      // Extract Windows version
      if (userAgent.includes("windows nt 10")) {
        osVersion = "10/11";
      } else if (userAgent.includes("windows nt 6.3")) {
        osVersion = "8.1";
      } else if (userAgent.includes("windows nt 6.2")) {
        osVersion = "8";
      } else if (userAgent.includes("windows nt 6.1")) {
        osVersion = "7";
      }

      // Detect architecture for Windows
      if (userAgent.includes("win64") || userAgent.includes("wow64")) {
        architecture = "x86_64";
        confidence = "high";
      } else {
        architecture = "x86";
        confidence = "medium";
      }
    } else if (
      userAgent.includes("macintosh") ||
      userAgent.includes("mac os")
    ) {
      os = "macOS";

      // Extract macOS version (simplified)
      const versionMatch = userAgent.match(/mac os x (\d+[._]\d+)/);
      if (versionMatch && versionMatch[1]) {
        osVersion = versionMatch[1].replace("_", ".");
      }

      // Detect architecture for macOS
      if (userAgent.includes("intel")) {
        architecture = "x86_64";
        confidence = "high";
      } else if (userAgent.includes("arm") || userAgent.includes("apple")) {
        architecture = "ARM64";
        confidence = "high";
      } else {
        // Recent Macs are likely ARM64 (Apple Silicon)
        const versionNum = parseFloat(osVersion.replace("_", "."));
        if (versionNum >= 11) {
          architecture = "ARM64 or x86_64";
          confidence = "medium";
        } else {
          architecture = "x86_64";
          confidence = "medium";
        }
      }
    } else if (userAgent.includes("linux")) {
      os = "Linux";

      // Detect architecture for Linux
      if (userAgent.includes("x86_64") || userAgent.includes("amd64")) {
        architecture = "x86_64";
        confidence = "high";
      } else if (userAgent.includes("i686") || userAgent.includes("i386")) {
        architecture = "x86";
        confidence = "high";
      } else if (userAgent.includes("arm64") || userAgent.includes("aarch64")) {
        architecture = "ARM64";
        confidence = "high";
      } else if (userAgent.includes("armv7") || userAgent.includes("arm")) {
        architecture = "ARM";
        confidence = "high";
      } else {
        architecture = "x86_64";
        confidence = "medium";
      }
    }

    setDeviceInfo({
      os,
      osVersion,
      architecture,
      isAndroid,
      isIOS,
      isDesktop,
      browser,
      deviceModel,
      confidence,
    });
  };

  const getConfidenceLabel = (confidence: "high" | "medium" | "low") => {
    switch (confidence) {
      case "high":
        return (
          <span className="flex items-center text-green-400 text-xs">
            <FiCheckCircle className="mr-1" /> Détection fiable
          </span>
        );
      case "medium":
        return (
          <span className="flex items-center text-yellow-400 text-xs">
            <FiInfo className="mr-1" /> Détection probable
          </span>
        );
      case "low":
        return (
          <span className="flex items-center text-orange-400 text-xs">
            <FiAlertCircle className="mr-1" /> Estimation
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          Télécharger l'Application
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mb-6"></div>
              <h3 className="text-white text-xl font-medium mb-2">
                Analyse de votre appareil...
              </h3>
              <p className="text-gray-400 text-center">
                Nous détectons les caractéristiques de votre appareil pour vous
                proposer la meilleure version de l'application.
              </p>
            </div>
          ) : (
            <>
              {/* Device Info Section */}
              <div className="mb-10 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <FiSmartphone className="text-green-400 mr-3 text-xl" />
                  <h3 className="text-white text-xl font-medium">
                    Votre Appareil
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">
                        Système d'exploitation:
                      </div>
                      <div className="text-white font-medium flex items-center">
                        {deviceInfo.os === "Android" && (
                          <FaAndroid className="mr-2 text-green-400" />
                        )}
                        {deviceInfo.os === "iOS" && (
                          <FaApple className="mr-2 text-white" />
                        )}
                        {deviceInfo.os === "Windows" && (
                          <FaWindows className="mr-2 text-blue-400" />
                        )}
                        {deviceInfo.os === "macOS" && (
                          <FaApple className="mr-2 text-white" />
                        )}
                        {deviceInfo.os === "Linux" && (
                          <FaLinux className="mr-2 text-orange-400" />
                        )}
                        {deviceInfo.os} {deviceInfo.osVersion}
                      </div>
                    </div>

                    {deviceInfo.deviceModel !== "Unknown" && (
                      <div>
                        <div className="text-gray-400 text-sm mb-1">
                          Modèle:
                        </div>
                        <div className="text-white font-medium">
                          {deviceInfo.deviceModel}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="text-gray-400 text-sm mb-1">
                        Navigateur:
                      </div>
                      <div className="text-white font-medium flex items-center">
                        {deviceInfo.browser === "Chrome" && (
                          <FaChrome className="mr-2 text-blue-400" />
                        )}
                        {deviceInfo.browser}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">
                        Architecture:
                      </div>
                      <div className="text-white font-medium flex items-center">
                        <FiCpu className="mr-2 text-purple-400" />
                        {deviceInfo.architecture}
                      </div>
                      <div className="mt-1">
                        {getConfidenceLabel(deviceInfo.confidence)}
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-400 text-sm mb-1">
                        Type d'appareil:
                      </div>
                      <div className="text-white font-medium">
                        {deviceInfo.isAndroid && "Smartphone/Tablette Android"}
                        {deviceInfo.isIOS && "iPhone/iPad"}
                        {deviceInfo.isDesktop && "Ordinateur"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Options */}
              <h3 className="text-white text-xl font-medium mb-6">
                Téléchargements Disponibles
              </h3>

              {/* For now, we'll show a message that APKs are being generated */}
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-6 text-blue-300 mb-8">
                <div className="flex items-start">
                  <FiInfo className="text-blue-400 mt-1 mr-3 flex-shrink-0 text-xl" />
                  <div>
                    <h4 className="text-white font-medium mb-2">Information</h4>
                    <p className="mb-2">
                      Les APKs spécifiques à chaque architecture sont en cours
                      de génération. Veuillez utiliser la version universelle
                      pour le moment.
                    </p>
                    <p className="text-xs opacity-80">
                      Les versions spécifiques à chaque architecture seront plus
                      petites et optimisées pour votre appareil.
                    </p>
                  </div>
                </div>
              </div>

              {/* Android Section */}
              {deviceInfo.isAndroid && (
                <div className="mb-8 bg-green-900/10 backdrop-blur-md rounded-xl p-6 border border-green-500/20">
                  <div className="flex items-center mb-4">
                    <FaAndroid className="text-green-400 mr-3 text-xl" />
                    <h3 className="text-white text-xl font-medium">Android</h3>
                  </div>

                  <p className="text-gray-300 mb-6">
                    Nous avons détecté que vous utilisez un appareil Android
                    avec l'architecture{" "}
                    <span className="text-white font-medium">
                      {deviceInfo.architecture}
                    </span>
                    . Choisissez l'option qui vous convient le mieux.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2 flex items-center">
                        <span className="bg-green-500/20 p-1 rounded-full mr-2">
                          <FiDownload className="text-green-400" />
                        </span>
                        Version Universelle
                      </h4>
                      <p className="text-gray-400 text-sm mb-4">
                        Compatible avec tous les appareils Android. Taille plus
                        importante.
                      </p>
                      <button
                        className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors flex items-center justify-center"
                        onClick={() => {
                          window.open(
                            "https://example.com/download/muslim-community-app.apk",
                            "_blank"
                          );
                          onClose();
                        }}
                      >
                        <FiDownload className="mr-2" />
                        <span>Télécharger (45 MB)</span>
                      </button>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 opacity-60">
                      <h4 className="text-white font-medium mb-2 flex items-center">
                        <span className="bg-purple-500/20 p-1 rounded-full mr-2">
                          <FiCpu className="text-purple-400" />
                        </span>
                        Version {deviceInfo.architecture}
                      </h4>
                      <p className="text-gray-400 text-sm mb-4">
                        Optimisée pour votre appareil. Taille réduite et
                        meilleures performances.
                      </p>
                      <button
                        className="w-full px-4 py-3 bg-gray-600 text-white rounded-md font-medium flex items-center justify-center cursor-not-allowed"
                        disabled
                      >
                        <FiDownload className="mr-2" />
                        <span>Bientôt disponible</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2 flex items-center">
                      <span className="bg-blue-500/20 p-1 rounded-full mr-2">
                        <FaChrome className="text-blue-400" />
                      </span>
                      Google Play Store
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Téléchargez depuis le Play Store pour des mises à jour
                      automatiques et une installation simplifiée.
                    </p>
                    <button
                      className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors flex items-center justify-center"
                      onClick={() => {
                        window.open(
                          "https://play.google.com/store/apps/details?id=com.muslimcommunity",
                          "_blank"
                        );
                        onClose();
                      }}
                    >
                      <FaChrome className="mr-2" />
                      <span>Ouvrir le Play Store</span>
                    </button>
                  </div>
                </div>
              )}

              {/* iOS Section */}
              {deviceInfo.isIOS && (
                <div className="mb-8 bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-gray-500/20">
                  <div className="flex items-center mb-4">
                    <FaApple className="text-white mr-3 text-xl" />
                    <h3 className="text-white text-xl font-medium">iOS</h3>
                  </div>

                  <p className="text-gray-300 mb-6">
                    Nous avons détecté que vous utilisez un appareil iOS. Notre
                    application sera bientôt disponible sur l'App Store.
                  </p>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2 flex items-center">
                      <span className="bg-blue-500/20 p-1 rounded-full mr-2">
                        <FaApple className="text-white" />
                      </span>
                      App Store
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Notre application iOS est en cours de développement et
                      sera bientôt disponible sur l'App Store.
                    </p>
                    <button
                      className="w-full px-4 py-3 bg-gray-600 text-white rounded-md font-medium flex items-center justify-center cursor-not-allowed"
                      disabled
                    >
                      <FiDownload className="mr-2" />
                      <span>Bientôt disponible</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Desktop Section */}
              {deviceInfo.isDesktop && (
                <div className="mb-8 bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-gray-500/20">
                  <div className="flex items-center mb-4">
                    <FiCpu className="text-white mr-3 text-xl" />
                    <h3 className="text-white text-xl font-medium">
                      Ordinateur ({deviceInfo.os})
                    </h3>
                  </div>

                  <p className="text-gray-300 mb-6">
                    Vous utilisez un ordinateur. Notre application est optimisée
                    pour les appareils mobiles, mais vous pouvez télécharger la
                    version Android et l'utiliser avec un émulateur.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2 flex items-center">
                        <span className="bg-green-500/20 p-1 rounded-full mr-2">
                          <FaAndroid className="text-green-400" />
                        </span>
                        Version Android
                      </h4>
                      <p className="text-gray-400 text-sm mb-4">
                        Téléchargez la version Android pour l'utiliser avec un
                        émulateur comme BlueStacks ou Android Studio.
                      </p>
                      <button
                        className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors flex items-center justify-center"
                        onClick={() => {
                          window.open(
                            "https://example.com/download/muslim-community-app.apk",
                            "_blank"
                          );
                          onClose();
                        }}
                      >
                        <FiDownload className="mr-2" />
                        <span>Télécharger APK (45 MB)</span>
                      </button>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 opacity-60">
                      <h4 className="text-white font-medium mb-2 flex items-center">
                        <span className="bg-blue-500/20 p-1 rounded-full mr-2">
                          <FiCpu className="text-blue-400" />
                        </span>
                        Version Desktop
                      </h4>
                      <p className="text-gray-400 text-sm mb-4">
                        Une version native pour {deviceInfo.os} est en cours de
                        développement.
                      </p>
                      <button
                        className="w-full px-4 py-3 bg-gray-600 text-white rounded-md font-medium flex items-center justify-center cursor-not-allowed"
                        disabled
                      >
                        <FiDownload className="mr-2" />
                        <span>Bientôt disponible</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Device Inspector Section */}
              <div className="mb-8 bg-purple-900/10 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-center mb-4">
                  <FiInfo className="text-purple-400 mr-3 text-xl" />
                  <h3 className="text-white text-xl font-medium">
                    Inspecteur d'Appareil
                  </h3>
                </div>

                <p className="text-gray-300 mb-6">
                  Vous souhaitez connaître plus de détails sur votre appareil ?
                  Téléchargez notre application Inspecteur d'Appareil pour
                  obtenir des informations complètes sur votre smartphone.
                </p>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <span className="bg-purple-500/20 p-1 rounded-full mr-2">
                      <FiSmartphone className="text-purple-400" />
                    </span>
                    Inspecteur d'Appareil
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Application légère qui analyse votre appareil et affiche des
                    informations détaillées sur le matériel et le logiciel.
                  </p>
                  <button
                    className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors flex items-center justify-center"
                    onClick={() => {
                      window.open(
                        "https://example.com/download/device-inspector.apk",
                        "_blank"
                      );
                    }}
                  >
                    <FiDownload className="mr-2" />
                    <span>Télécharger (2 MB)</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 z-10 bg-black/80 backdrop-blur-lg border-t border-white/10 px-6 py-4 flex justify-between items-center">
        <span className="text-sm text-gray-400">
          Pour une meilleure expérience, nous recommandons d'utiliser
          l'application sur un appareil mobile.
        </span>
        <button
          className="ml-2 text-green-400 hover:text-green-300 transition-colors px-4 py-2 border border-green-500/30 rounded-md"
          onClick={onClose}
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
