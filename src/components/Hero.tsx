"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FiDownload, FiLayers, FiUser } from "react-icons/fi";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Avatar image paths to reuse
  const avatarImages = [
    "/avatars/user1.jpg",
    "/avatars/user2.jpg",
    "/avatars/user3.jpg",
    "/avatars/user1.jpg",
    "/avatars/user2.jpg",
    "/avatars/user3.jpg",
    "/avatars/user1.jpg",
  ];

  return (
    <motion.div
      ref={ref}
      className="z-10 max-w-4xl w-full md:text-left relative min-h-[80vh] flex flex-col justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ opacity }}
    >
      {/* Parallax floating elements */}
      <motion.div
        className="absolute -z-10 w-64 h-64 rounded-full bg-green-500/10 blur-3xl"
        style={{
          x: useTransform(scrollYProgress, [0, 1], [-50, -150]),
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
        }}
      />

      <motion.div
        className="absolute -z-10 right-0 top-1/4 w-40 h-40 rounded-full bg-red-500/5 blur-2xl"
        style={{
          x: useTransform(scrollYProgress, [0, 1], [0, 100]),
          y: useTransform(scrollYProgress, [0, 1], [0, -150]),
        }}
      />

      {/* Elegant, minimal heading with subtle animation */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-3 text-white tracking-tight"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
      >
        Islam Réuni et Actif
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl font-light mb-6 text-green-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
      >
        Connecter. Apprendre. Grandir ensemble.
      </motion.p>

      {/* Clean, concise description with improved typography */}
      <motion.p
        className="text-base md:text-lg text-gray-300 mb-10 max-w-xl leading-relaxed font-light"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -20]) }}
      >
        Rejoignez notre communauté mondiale pour vous connecter avec d'autres
        musulmans, accéder à des ressources islamiques sélectionnées et
        renforcer votre foi grâce au partage des connaissances et au soutien
        mutuel.
      </motion.p>

      {/* Clean, intuitive CTA section - Improved for responsiveness */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -10]) }}
      >
        {/* Primary CTA */}
        <motion.button
          className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors flex items-center justify-center group"
          whileHover={{ y: -2 }}
          whileTap={{ y: 1 }}
        >
          <FiDownload className="mr-2 group-hover:animate-bounce" />
          <span>Télécharger l'App</span>
        </motion.button>

        {/* Secondary CTA with subtle badge - Fixed for small screens */}
        <div className="relative w-full sm:w-auto">
          <motion.div
            className="absolute -top-2 -right-2 z-10 bg-red-500 text-xs font-medium px-1.5 py-0.5 rounded text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            Recommandé
          </motion.div>
          <motion.button
            className="w-full px-6 py-3 bg-transparent border border-green-500/50 text-white hover:bg-green-900/20 rounded-md font-medium transition-colors flex items-center justify-center"
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
          >
            <FiLayers className="mr-2" />
            <span className="hidden sm:inline">Choisir la Plateforme</span>
            <span className="sm:hidden">Plateforme</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Subtle trust indicator with user avatars */}
      <motion.div
        className="mt-8 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -5]) }}
      >
        <div className="flex -space-x-2 mr-3">
          {/* User avatars with different styles - Now 7 avatars */}
          {avatarImages.map((src, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-600 border border-black ring-2 ring-black flex items-center justify-center overflow-hidden"
            >
              <Image
                src={src}
                alt={`User ${index + 1}`}
                width={24}
                height={24}
                className="object-cover"
                onError={(e) => {
                  // Fallback to icon if image fails to load
                  e.currentTarget.style.display = "none";
                  if (e.currentTarget.parentElement) {
                    e.currentTarget.parentElement.innerHTML =
                      '<svg stroke="currentColor" fill="white" stroke-width="0" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>';
                  }
                }}
              />
            </div>
          ))}
        </div>
        <span className="text-xs text-gray-400">
          Rejoint par plus de 50 000 musulmans dans le monde
        </span>
      </motion.div>
    </motion.div>
  );
}
