"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiSearch, FiShield } from "react-icons/fi";
import privacyData from "@/data/privacy_policy.json";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSections, setFilteredSections] = useState(
    privacyData.sections
  );

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSections(privacyData.sections);
    } else {
      const filtered = privacyData.sections.filter(
        (section) =>
          section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          section.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSections(filtered);
    }
  }, [searchTerm]);

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  // Function to safely render HTML content
  const renderHTML = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <>
      <AnimatedBackground />
      <Navbar />

      <main className="flex min-h-screen flex-col items-center pt-24 pb-16 px-4 relative">
        <div className="w-full max-w-4xl z-10">
          {/* Header with privacy shield icon */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center">
                <FiShield className="text-green-400 text-3xl" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Dernière mise à jour : {privacyData.lastUpdated} (Version{" "}
              {privacyData.version})
            </p>
          </motion.div>

          {/* Introduction message */}
          <motion.div
            className="mb-8 bg-green-900/20 border border-green-800/30 rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-gray-300 text-center">
              Chez IRA, nous prenons votre vie privée au sérieux. Cette
              politique explique comment nous collectons, utilisons et
              protégeons vos données personnelles.
            </p>
          </motion.div>

          {/* Search bar with icon */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher dans la politique de confidentialité..."
                className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setSearchTerm("")}
                >
                  ✕
                </button>
              )}
            </div>
          </motion.div>

          {/* Accordion sections */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {filteredSections.map((section, index) => (
              <motion.div
                key={index}
                className="border border-white/10 rounded-lg overflow-hidden bg-black/30 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <button
                  className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => toggleSection(index)}
                >
                  <h3 className="text-lg font-medium text-white">
                    {section.title}
                  </h3>
                  {expandedSection === index ? (
                    <FiChevronUp className="text-gray-400" />
                  ) : (
                    <FiChevronDown className="text-gray-400" />
                  )}
                </button>
                {expandedSection === index && (
                  <motion.div
                    className="px-6 pb-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p
                      className="text-gray-300 whitespace-pre-line"
                      dangerouslySetInnerHTML={renderHTML(
                        section.content.replace(
                          /\*\*(.*?)\*\*/g,
                          "<strong>$1</strong>"
                        )
                      )}
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* No results message */}
          {filteredSections.length === 0 && (
            <motion.div
              className="text-center py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-400">
                Aucun résultat trouvé pour "{searchTerm}". Veuillez essayer un
                autre terme de recherche.
              </p>
            </motion.div>
          )}

          {/* Contact information */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-gray-400">
              Des questions sur notre politique de confidentialité ?{" "}
              <a
                href="mailto:support@ira-app.com"
                className="text-green-400 hover:underline"
              >
                Contactez-nous
              </a>
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
