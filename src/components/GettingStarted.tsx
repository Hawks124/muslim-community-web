"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  FiDownload,
  FiArrowRight,
  FiMessageCircle,
  FiClock,
  FiCheckCircle,
  FiZap,
} from "react-icons/fi";
import SallyAIChat from "./SallyAIChat";

export default function GettingStarted() {
  const ref = useRef(null);
  const [showSallyChat, setShowSallyChat] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Steps to get started
  const steps = [
    {
      icon: <FiDownload className="text-green-400" />,
      title: "Téléchargez l'application",
      description: "En cliquant sur le bouton télécharger",
    },
    {
      icon: <FiCheckCircle className="text-green-400" />,
      title: "Créez votre compte",
      description: "Inscrivez-vous en quelques secondes",
    },
    {
      icon: <FiClock className="text-green-400" />,
      title: "Configurez vos préférences",
      description: "Personnalisez votre expérience",
    },
    {
      icon: <FiMessageCircle className="text-green-400" />,
      title: "Rejoignez la communauté",
      description: "Connectez-vous avec d'autres musulmans",
    },
  ];

  return (
    <section ref={ref} className="w-full py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
          style={{
            x: useTransform(scrollYProgress, [0, 1], [-100, 100]),
            y: useTransform(scrollYProgress, [0, 1], [-50, -150]),
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
          style={{
            x: useTransform(scrollYProgress, [0, 1], [100, -100]),
            y: useTransform(scrollYProgress, [0, 1], [50, 150]),
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header - Increased bottom margin for better spacing */}
        <motion.div className="text-center mb-20" style={{ y, opacity }}>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Commencez Dès Aujourd'hui
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Rejoignez notre communauté en quelques étapes simples et découvrez
            tout ce que Muslim Community a à offrir.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left side: Steps to get started */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-5"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  borderColor: "rgba(74, 222, 128, 0.2)",
                }}
              >
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-white text-lg font-medium mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
                <div className="ml-auto flex items-center justify-center w-8 h-8 rounded-full bg-green-900/20 text-green-400 font-bold">
                  {index + 1}
                </div>
              </motion.div>
            ))}

            {/* CTA Button */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <a
                href="#download"
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
              >
                Commencer Maintenant <FiArrowRight className="ml-2" />
              </a>
            </motion.div>
          </div>

          {/* Right side: Sally AI Teaser */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 overflow-hidden">
              <div className="relative z-10">
                {/* Sally AI Header */}
                <div className="flex items-center mb-6">
                  <Image
                    src="/sally.png"
                    alt="Sally AI"
                    width={50}
                    height={50}
                    className="mr-4"
                  />
                  <div>
                    <h3 className="text-white text-xl font-bold">Sally AI</h3>
                    <p className="text-green-400 text-sm">
                      Votre assistante personnelle polyvalente
                    </p>
                  </div>
                </div>

                {/* Sally AI Features */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <FiCheckCircle className="text-green-400 mr-3" />
                    <p className="text-gray-300">
                      Réponses instantanées à toutes vos questions
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FiCheckCircle className="text-green-400 mr-3" />
                    <p className="text-gray-300">
                      Connaissances islamiques et générales étendues
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FiCheckCircle className="text-green-400 mr-3" />
                    <p className="text-gray-300">
                      Disponible 24/7 pour vous assister dans tous vos besoins
                    </p>
                  </div>
                </div>

                {/* Sally AI Button */}
                <motion.div
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-medium transition-all group"
                  // whileHover={{ scale: 1.02 }}
                  // whileTap={{ scale: 0.98 }}
                  // onClick={() => {
                  //   setShowSallyChat(true);
                  // }}
                >
                  <FiZap className="text-yellow-300 group-hover:animate-pulse" />
                  <span>Essayer Sally AI sur IRA app</span>
                  <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </motion.div>

                {/* Coming soon badge */}
                <div className="absolute top-4 right-4 bg-yellow-500/90 text-black text-xs font-bold px-2 py-1 rounded-full">
                  Sally app bientôt disponible
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sally AI Chat Component */}
      {showSallyChat && <SallyAIChat />}
    </section>
  );
}
