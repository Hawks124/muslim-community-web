"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  FiShield,
  FiGlobe,
  FiUsers,
  FiHeart,
  FiBookOpen,
} from "react-icons/fi";

export default function WhyChooseUs() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const reasons = [
    {
      icon: <FiShield className="text-green-400 text-2xl" />,
      title: "Contenu Authentique",
      description:
        "Toutes nos ressources sont vérifiées par des érudits qualifiés pour garantir l'authenticité des enseignements islamiques.",
    },
    {
      icon: <FiGlobe className="text-green-400 text-2xl" />,
      title: "Communauté Mondiale",
      description:
        "Connectez-vous avec plus de 50 000 musulmans à travers le monde, partageant connaissances et expériences.",
    },
    {
      icon: <FiBookOpen className="text-green-400 text-2xl" />,
      title: "Ressources Complètes",
      description:
        "Du Coran aux hadiths, des guides de prière aux forums de discussion, tout ce dont vous avez besoin en un seul endroit.",
    },
    {
      icon: <FiUsers className="text-green-400 text-2xl" />,
      title: "Pour Tous les Niveaux",
      description:
        "Que vous soyez débutant ou avancé dans votre parcours spirituel, notre contenu s'adapte à tous les niveaux de connaissance.",
    },
    {
      icon: <FiHeart className="text-green-400 text-2xl" />,
      title: "Développé avec Amour",
      description:
        "Créé par des musulmans pour des musulmans, avec une attention particulière aux besoins de notre communauté.",
    },
  ];

  return (
    <section ref={ref} className="w-full py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
          style={{
            x: useTransform(scrollYProgress, [0, 1], [100, -100]),
            y: useTransform(scrollYProgress, [0, 1], [-50, -150]),
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
          style={{
            x: useTransform(scrollYProgress, [0, 1], [-100, 100]),
            y: useTransform(scrollYProgress, [0, 1], [50, 150]),
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div className="text-center mb-24" style={{ y, opacity }}>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Pourquoi Choisir Muslim Community?
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Découvrez ce qui rend notre plateforme unique et comment elle peut
            enrichir votre parcours spirituel quotidien.
          </motion.p>
        </motion.div>

        {/* Main content - New card design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Card background with gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Card content */}
              <div className="relative bg-black/40 backdrop-blur-md rounded-xl p-8 h-full border border-white/5 group-hover:border-green-500/20 transition-all duration-300 flex flex-col">
                {/* Top section with icon and title */}
                <div className="flex items-start mb-6">
                  <div className="mr-4 p-3 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg">
                    {reason.icon}
                  </div>
                  <h3 className="text-white text-xl font-medium pt-2">
                    {reason.title}
                  </h3>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent mb-6"></div>

                {/* Description */}
                <p className="text-gray-400 flex-grow">{reason.description}</p>

                {/* Animated arrow on hover */}
                <motion.div
                  className="mt-6 flex justify-end"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="text-green-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial with new design */}
        <motion.div
          className="mt-24 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black/30 to-blue-900/20 rounded-xl"></div>

          {/* Content */}
          <div className="relative backdrop-blur-sm border border-white/10 rounded-xl p-8">
            {/* Quote mark */}
            <div className="absolute top-6 left-8 text-green-500/20 text-7xl font-serif">
              ❝
            </div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar group */}
                <div className="flex flex-wrap justify-center gap-1 md:w-1/4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-12 h-12 rounded-lg border-2 border-black bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center overflow-hidden relative"
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                        rotate: i % 2 === 0 ? 5 : -5,
                      }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: 0 }}
                    >
                      <Image
                        src={`/avatars/user${(i % 3) + 1}.jpg`}
                        alt={`User ${i + 1}`}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial content */}
                <div className="md:w-3/4 text-left">
                  <h3 className="text-white text-xl font-medium mb-3">
                    Rejoint par des milliers de musulmans
                  </h3>
                  <p className="text-gray-300 italic">
                    "Muslim Community a transformé ma pratique quotidienne de
                    l'Islam. Les ressources sont authentiques, la communauté est
                    bienveillante, et l'application est intuitive. Je la
                    recommande à tous mes frères et sœurs."
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="text-green-400 font-medium">
                      RAZAFINIRINA TR.
                    </div>
                    <div className="mx-2 w-1 h-1 rounded-full bg-green-400"></div>
                    <div className="text-gray-400 text-sm">
                      Utilisateur depuis 2 ans
                    </div>
                  </div>

                  {/* Rating stars */}
                  <div className="mt-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-amber-400"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </motion.svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
