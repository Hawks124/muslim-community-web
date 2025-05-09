"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import termsData from "@/data/terms_of_service.json";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSections, setFilteredSections] = useState(termsData.sections);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSections(termsData.sections);
    } else {
      const filtered = termsData.sections.filter(
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
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Conditions d'Utilisation
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Dernière mise à jour : {termsData.lastUpdated} (Version{" "}
              {termsData.version})
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher dans les conditions..."
                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
            transition={{ duration: 0.5, delay: 0.2 }}
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
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-gray-400">
              Des questions sur nos conditions d'utilisation ?{" "}
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
