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
import { FaAndroid, FaChrome } from "react-icons/fa";

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
    browser: string;
    deviceModel: string;
    confidence: "high" | "medium" | "low";
    source: string;
  }>({
    os: "Unknown",
    osVersion: "Unknown",
    architecture: "Unknown",
    isAndroid: false,
    browser: "Unknown",
    deviceModel: "Unknown",
    confidence: "high",
    source: "web",
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnalyzing(true);
      setTimeout(() => {
        detectDevice();
        setIsAnalyzing(false);
      }, 1000); // Reduced analysis time for better UX
    }
  }, [isOpen]);

  useEffect(() => {
    // Check for URL parameters when component mounts
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const arch = params.get("arch");
      const model = params.get("model");
      const source = params.get("source");

      if (arch) {
        // If architecture is provided in URL, use it
        setDeviceInfo({
          os: "Android",
          osVersion: "Unknown",
          architecture: arch,
          isAndroid: true,
          browser: "Unknown",
          deviceModel: model || "Unknown",
          confidence: "high",
          source: source || "detector",
        });
        setIsAnalyzing(false);
      }
    }
  }, []);

  const detectDevice = () => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const userAgent = navigator.userAgent.toLowerCase();
    let os = "Unknown";
    let osVersion = "Unknown";
    let architecture = "Unknown";
    let isAndroid = false;
    let browser = "Unknown";
    let deviceModel = "Unknown";
    let confidence: "high" | "medium" | "low" = "low";
    let source = "web";

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
    } else {
      // For non-Android devices, suggest downloading the detector app
      os = "Non-Android";
      architecture = "unknown";
      confidence = "low";
    }

    setDeviceInfo({
      os,
      osVersion,
      architecture,
      isAndroid,
      browser,
      deviceModel,
      confidence,
      source,
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

  const handleDownload = (url: string) => {
    setDownloadStarted(true);
    window.open(url, "_blank");

    // Reset download state after a delay
    setTimeout(() => {
      setDownloadStarted(false);
    }, 3000);
  };

  const getDownloadUrl = (architecture: string) => {
    // Map architecture to download URLs
    const downloadUrls: Record<string, string> = {
      "arm64-v8a": "https://example.com/download/ira-arm64-v8a.apk",
      "armeabi-v7a": "https://example.com/download/ira-armeabi-v7a.apk",
      x86_64: "https://example.com/download/ira-x86_64.apk",
      x86: "https://example.com/download/ira-x86.apk",
      universal: "https://example.com/download/ira-universal.apk",
    };

    return downloadUrls[architecture] || downloadUrls["universal"];
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          Télécharger l'Application
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10"
        >
          <FiX className="text-white text-xl" />
        </button>
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
                  {deviceInfo.source === "detector" && (
                    <span className="ml-2 px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                      Détecté par l'app
                    </span>
                  )}
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

                    {deviceInfo.browser !== "Unknown" && (
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
                    )}
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
                        {!deviceInfo.isAndroid && "Non-Android"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Options */}
              <h3 className="text-white text-xl font-medium mb-6">
                Téléchargements Disponibles
              </h3>

              {!deviceInfo.isAndroid && (
                <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-6 text-blue-300 mb-8">
                  <div className="flex items-start">
                    <FiInfo className="text-blue-400 mt-1 mr-3 flex-shrink-0 text-xl" />
                    <div>
                      <h4 className="text-white font-medium mb-2">
                        Appareil non-Android détecté
                      </h4>
                      <p className="mb-2">
                        Pour une détection précise de l'architecture, veuillez
                        télécharger notre application de détection sur votre
                        appareil Android.
                      </p>
                      <a
                        href="/detector-app.apk"
                        download
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors mt-2"
                      >
                        <FiDownload className="mr-2" />
                        <span>Télécharger l'app de détection</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

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
                        className={`w-full px-4 py-3 ${
                          downloadStarted
                            ? "bg-green-700"
                            : "bg-green-600 hover:bg-green-700"
                        } text-white rounded-md font-medium transition-colors flex items-center justify-center`}
                        onClick={() =>
                          handleDownload(
                            "https://example.com/download/ira-universal.apk"
                          )
                        }
                      >
                        {downloadStarted ? (
                          <>
                            <FiCheckCircle className="mr-2" />
                            <span>Téléchargement lancé</span>
                          </>
                        ) : (
                          <>
                            <FiDownload className="mr-2" />
                            <span>Télécharger (45 MB)</span>
                          </>
                        )}
                      </button>
                    </div>

                    {deviceInfo.architecture !== "unknown" && (
                      <div className="bg-white/5 rounded-lg p-4">
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
                          className={`w-full px-4 py-3 ${
                            downloadStarted
                              ? "bg-purple-700"
                              : "bg-purple-600 hover:bg-purple-700"
                          } text-white rounded-md font-medium transition-colors flex items-center justify-center`}
                          onClick={() =>
                            handleDownload(
                              getDownloadUrl(deviceInfo.architecture)
                            )
                          }
                        >
                          {downloadStarted ? (
                            <>
                              <FiCheckCircle className="mr-2" />
                              <span>Téléchargement lancé</span>
                            </>
                          ) : (
                            <>
                              <FiDownload className="mr-2" />
                              <span>
                                Télécharger (
                                {deviceInfo.architecture === "arm64-v8a"
                                  ? "25"
                                  : "30"}{" "}
                                MB)
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
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
                          "https://play.google.com/store/apps/details?id=com.riri.muslim_community",
                          "_blank"
                        );
                      }}
                    >
                      <FaChrome className="mr-2" />
                      <span>Ouvrir le Play Store</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Architecture Detector App Section */}
              <div className="mb-8 bg-purple-900/10 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-center mb-4">
                  <FiCpu className="text-purple-400 mr-3 text-xl" />
                  <h3 className="text-white text-xl font-medium">
                    Détecteur d'Architecture
                  </h3>
                </div>

                <p className="text-gray-300 mb-6">
                  {deviceInfo.source === "detector"
                    ? "Merci d'avoir utilisé notre application de détection d'architecture pour une installation optimale !"
                    : "Pour une détection plus précise de l'architecture de votre appareil Android, téléchargez notre application de détection."}
                </p>

                {deviceInfo.source !== "detector" && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2 flex items-center">
                      <span className="bg-purple-500/20 p-1 rounded-full mr-2">
                        <FiSmartphone className="text-purple-400" />
                      </span>
                      Détecteur d'Architecture IRA
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Application légère qui analyse votre appareil et vous
                      redirige vers la version optimale de l'application IRA.
                    </p>
                    <button
                      className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors flex items-center justify-center"
                      onClick={() => handleDownload("/detector-app.apk")}
                    >
                      <FiDownload className="mr-2" />
                      <span>Télécharger (2 MB)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* FAQ Section */}
              <div className="mb-8 bg-blue-900/10 backdrop-blur-md rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-center mb-4">
                  <FiInfo className="text-blue-400 mr-3 text-xl" />
                  <h3 className="text-white text-xl font-medium">
                    Questions fréquentes
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">
                      Quelle version dois-je télécharger ?
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Si vous utilisez notre détecteur d'architecture,
                      choisissez la version spécifique recommandée. Sinon, la
                      version universelle fonctionne sur tous les appareils
                      Android.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">
                      Comment installer l'APK ?
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Après le téléchargement, ouvrez le fichier APK et suivez
                      les instructions. Vous devrez peut-être autoriser
                      l'installation d'applications provenant de sources
                      inconnues dans les paramètres de votre appareil.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">
                      Pourquoi l'architecture est-elle importante ?
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Chaque appareil Android utilise une architecture de
                      processeur spécifique. En téléchargeant la version
                      correspondant à votre architecture, vous obtenez une
                      application plus petite et plus performante.
                    </p>
                  </div>
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
          l'application sur un appareil Android.
        </span>
        <button
          className="ml-2 text-green-400 hover:text-green-300 transition-colors px-4 py-2 border border-green-500/30 rounded-md"
          onClick={onClose}
        >
          Accueil
        </button>
      </div>
    </div>
  );
}
