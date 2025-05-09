"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { FiUsers, FiGlobe, FiHeart, FiBookOpen } from "react-icons/fi";

export default function AboutPage() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />

      <main className="pt-24 pb-16 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          {/* Hero section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <Image
                src="/logo.svg"
                alt="Logo Muslim Community"
                width={120}
                height={120}
                className="rounded-xl"
              />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              À Propos de Muslim Community
            </h1>
            <p className="text-xl text-green-400 font-light">
              Connecter les Musulmans du Monde Entier
            </p>
          </motion.div>

          {/* Mission section */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Notre Mission
            </h2>
            <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8">
              <p className="text-gray-300 leading-relaxed mb-4">
                Muslim Community se consacre à fournir une plateforme complète
                qui aide les musulmans du monde entier à se connecter, à
                apprendre et à grandir dans leur foi. Notre objectif principal
                est de monopoliser et de sécuriser le dīn (الدين) en rendant les
                connaissances islamiques accessibles à tous, indépendamment de
                leur emplacement ou de leur origine.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Notre application combine les enseignements islamiques
                traditionnels avec la technologie moderne pour créer une
                expérience fluide qui accompagne les musulmans dans leur
                parcours spirituel quotidien. Des horaires de prière à l'étude
                du Coran, des forums communautaires aux ressources éducatives,
                nous visons à être votre compagnon de confiance dans la foi tout
                au long de votre cycle de vie.
              </p>
            </div>
          </motion.section>

          {/* Core values */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Nos Valeurs Fondamentales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValueCard
                icon={<FiBookOpen className="text-green-400" size={24} />}
                title="Connaissances Authentiques"
                description="Nous garantissons que tout le contenu est basé sur des sources islamiques authentiques et vérifié par des érudits qualifiés."
              />
              <ValueCard
                icon={<FiUsers className="text-green-400" size={24} />}
                title="Communauté Inclusive"
                description="Nous accueillons les musulmans de tous horizons, favorisant un environnement respectueux et solidaire."
              />
              <ValueCard
                icon={<FiGlobe className="text-green-400" size={24} />}
                title="Accessibilité Mondiale"
                description="Nous nous efforçons de rendre les ressources islamiques accessibles aux musulmans du monde entier en plusieurs langues."
              />
              <ValueCard
                icon={<FiHeart className="text-green-400" size={24} />}
                title="Amélioration Continue"
                description="Nous améliorons constamment notre application en fonction des retours de la communauté et des avancées technologiques."
              />
            </div>
          </motion.section>

          {/* Features section */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Nos Fonctionnalités Complètes
            </h2>
            <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8">
              <p className="text-gray-300 leading-relaxed mb-6">
                Muslim Community offre une gamme complète de fonctionnalités
                conçues pour accompagner chaque aspect de la vie d'un musulman :
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Spiritual Journey Features */}
                <FeatureItem
                  title="Coran"
                  description="Lisez le Saint Coran avec des traductions en plusieurs langues"
                />
                <FeatureItem
                  title="Hadith"
                  description="Accédez aux collections de hadiths authentiques avec explications"
                />
                <FeatureItem
                  title="Heures de Prière"
                  description="Heures de prière précises basées sur votre localisation avec notifications"
                />
                <FeatureItem
                  title="Chercheur de Qibla"
                  description="Trouvez la direction de la Kaaba depuis n'importe où dans le monde"
                />
                <FeatureItem
                  title="Guide de Prière"
                  description="Apprenez à effectuer correctement les prières avec des guides visuels"
                />
                <FeatureItem
                  title="Guide des Ablutions"
                  description="Guide étape par étape pour effectuer correctement les ablutions"
                />
                <FeatureItem
                  title="Apprentissage de l'Arabe"
                  description="Leçons interactives pour apprendre l'alphabet et le vocabulaire arabe"
                />
                <FeatureItem
                  title="Collection de Duas"
                  description="Collection complète de duas authentiques pour diverses occasions"
                />

                {/* Learn and Grow Features */}
                <FeatureItem
                  title="Apprentissage Islamique"
                  description="Accédez à des cours islamiques complets enseignés par des érudits qualifiés"
                />
                <FeatureItem
                  title="Quiz"
                  description="Testez vos connaissances islamiques avec des quiz interactifs"
                />
                <FeatureItem
                  title="Assistant Coranique"
                  description="Obtenez des explications et des réponses à vos questions sur le Coran"
                />
                <FeatureItem
                  title="Bienfaits des Sourates"
                  description="Découvrez les bienfaits spirituels et les vertus de chaque sourate du Coran"
                />

                {/* Community Features */}
                <FeatureItem
                  title="Calendrier Islamique"
                  description="Calendrier hégirien avec dates et événements islamiques importants"
                />
                <FeatureItem
                  title="Événements"
                  description="Restez informé des événements islamiques locaux et internationaux"
                />
                <FeatureItem
                  title="Dons"
                  description="Soutenez des œuvres caritatives et des causes islamiques dans le monde"
                />
                <FeatureItem
                  title="Forums de Discussion"
                  description="Participez à des discussions enrichissantes avec la communauté musulmane mondiale"
                />

                {/* Family & Lifestyle Features */}
                <FeatureItem
                  title="Conseils Familiaux"
                  description="Conseils et guidance pour construire et maintenir une famille musulmane forte"
                />
                <FeatureItem
                  title="Nourriture Halal"
                  description="Trouvez des restaurants halal, des recettes et des conseils alimentaires"
                />
                <FeatureItem
                  title="Santé et Bien-être"
                  description="Conseils de santé et de bien-être selon les principes islamiques"
                />
                <FeatureItem
                  title="Marché Islamique"
                  description="Découvrez et achetez des produits halal et des articles islamiques"
                />

                {/* Communication Features */}
                <FeatureItem
                  title="Messagerie Privée"
                  description="Échangez des messages privés avec d'autres membres de la communauté"
                />
                <FeatureItem
                  title="Partage Social"
                  description="Partagez du contenu inspirant avec vos amis et votre famille"
                />
                <FeatureItem
                  title="Navigateur Intégré"
                  description="Naviguez sur le web sans quitter l'application pour accéder à des ressources islamiques en ligne"
                />
                <FeatureItem
                  title="Soutien Émotionnel"
                  description="Ressources et conseils pour le bien-être émotionnel selon les principes islamiques"
                />

                {/* AI and Advanced Features */}
                <FeatureItem
                  title="Sally AI Assistant"
                  description="Obtenez des réponses instantanées à vos questions islamiques avec notre assistant IA"
                />
                <FeatureItem
                  title="Sally Chatbot"
                  description="Discutez avec Sally, notre chatbot IA spécialisé dans les connaissances islamiques"
                />
                <FeatureItem
                  title="Personnalisation"
                  description="Adaptez l'application à vos préférences et besoins spécifiques"
                />
                <FeatureItem
                  title="Multi-langue"
                  description="Profitez de l'application dans plusieurs langues, dont l'arabe, l'anglais, le français et le malgache"
                />
              </div>
            </div>
          </motion.section>

          {/* Our story */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Nos fondements
            </h2>
            <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8">
              <p className="text-gray-300 leading-relaxed mb-4">
                Muslim Community est une application conçue pour répondre aux
                besoins quotidiens de la communauté musulmane. Notre mission est
                de faciliter l'accès aux ressources islamiques essentielles et
                de créer une plateforme unifiée pour les musulmans du monde
                entier.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Notre plateforme offre une gamme complète d'outils et de
                fonctionnalités adaptés aux besoins spirituels et pratiques des
                musulmans. Nous nous engageons à fournir des services fiables et
                accessibles qui enrichissent la vie spirituelle de nos
                utilisateurs.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Muslim Community sert une communauté internationale croissante,
                proposant des fonctionnalités essentielles telles que les
                rappels de prière, les outils d'étude du Coran, les forums
                communautaires et les ressources éducatives... Notre objectif
                est de continuer à innover et à améliorer nos services pour la
                communauté musulmane mondiale.
              </p>
            </div>
          </motion.section>

          {/* Team section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Propulsé Par
            </h2>
            <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-6 md:mb-0">
                <Image
                  src="/ri.png"
                  alt="RiRi Enterprise"
                  width={60}
                  height={60}
                  className="mr-4"
                />
                <div>
                  <h3 className="text-white text-xl font-bold">
                    RiRi Enterprise
                  </h3>
                  <p className="text-gray-400">
                    Développement de solutions innovantes
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-black/50 p-3 rounded-full mr-4">
                  <Image
                    src="/sally.png"
                    alt="Sally AI"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">Sally AI</h3>
                  <p className="text-gray-400">
                    Assistant islamique intelligent
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </>
  );
}

// Value card component
function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 flex">
      <div className="mr-4 mt-1">{icon}</div>
      <div>
        <h3 className="text-white text-lg font-medium mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}

// Feature item component
function FeatureItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start mb-3">
      <div className="bg-green-500/20 p-1 rounded-full mr-3 mt-0.5">
        <svg
          className="w-3 h-3 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <div>
        <h4 className="text-white text-sm font-medium">{title}</h4>
        <p className="text-gray-400 text-xs">{description}</p>
      </div>
    </div>
  );
}
