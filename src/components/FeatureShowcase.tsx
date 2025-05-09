"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FiBook,
  FiCalendar,
  FiClock,
  FiCompass,
  FiHeart,
  FiMessageCircle,
  FiUsers,
  FiBookOpen,
  FiGlobe,
  FiStar,
  FiShoppingBag,
  FiHelpCircle,
  FiAward,
  FiTarget,
  FiLifeBuoy,
  FiDollarSign,
  FiHeadphones,
  FiSmile,
  FiThumbsUp,
  FiTruck,
  FiGift,
  FiLayers,
  FiPackage,
  FiServer,
  FiTv,
  FiUserPlus,
  FiVideo,
  FiZap,
  FiPieChart,
  FiMap,
  FiPhone,
  FiMail,
  FiExternalLink,
  FiFlag,
  FiHash,
  FiMenu,
  FiMonitor,
  FiShare2,
  FiSlack,
  FiSliders,
  FiSmartphone,
  FiSpeaker,
  FiSquare,
  FiSun,
  FiTablet,
  FiTag,
  FiTerminal,
  FiTool,
  FiTrash,
  FiTrello,
  FiTrendingDown,
  FiTrendingUp,
  FiTriangle,
  FiTwitch,
  FiTwitter,
  FiUmbrella,
  FiUnlock,
  FiUpload,
  FiUserCheck,
  FiUserMinus,
  FiUserX,
  FiVoicemail,
  FiVolume,
  FiVolume1,
  FiVolume2,
  FiVolumeX,
  FiWifi,
  FiWind,
  FiX,
  FiXCircle,
  FiXOctagon,
  FiXSquare,
  FiYoutube,
  FiZoomIn,
  FiZoomOut,
  FiNavigation,
  FiHexagon,
  FiOctagon,
  FiPenTool,
  FiPercent,
  FiPhoneCall,
  FiPhoneForwarded,
  FiPhoneIncoming,
  FiPhoneMissed,
  FiPhoneOff,
  FiPhoneOutgoing,
  FiPocket,
  FiPower,
  FiRefreshCw,
  FiRepeat,
  FiRewind,
  FiRotateCcw,
  FiRotateCw,
  FiSave,
  FiScissors,
  FiSend,
  FiSettings,
  FiShield,
  FiShieldOff,
  FiShoppingCart,
  FiSidebar,
  FiSkipBack,
  FiSkipForward,
  FiSlash,
  FiUser,
  FiInfo,
  FiHome,
  FiCoffee,
  FiActivity,
  FiAlertCircle,
  FiFileText,
  FiCode,
  FiLink,
  FiLink2,
  FiLinkedin,
  FiList,
  FiLoader,
  FiLock,
  FiLogIn,
  FiLogOut,
  FiMapPin,
  FiMaximize,
  FiMaximize2,
  FiMessageSquare,
  FiMic,
  FiMicOff,
  FiMinimize,
  FiMinimize2,
  FiMinus,
  FiMinusCircle,
  FiMinusSquare,
  FiMoon,
  FiMoreHorizontal,
  FiMoreVertical,
  FiMousePointer,
  FiMove,
  FiMusic,
  FiNavigation2,
  FiPaperclip,
  FiPause,
  FiPauseCircle,
  FiPlay,
  FiPlayCircle,
  FiPlus,
  FiPlusCircle,
  FiPlusSquare,
  FiRadio,
  FiRefreshCcw,
  FiRss,
  FiShuffle,
  FiStopCircle,
  FiSunrise,
  FiSunset,
  FiThermometer,
  FiThumbsDown,
  FiToggleLeft,
  FiToggleRight,
  FiTrash2,
  FiType,
  FiUnderline,
  FiVideoOff,
  FiWatch,
  FiWifiOff,
  FiZapOff,
} from "react-icons/fi";
import { IoShareSocialOutline, IoWaterOutline } from "react-icons/io5";
import { GiMouse } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";
import {
  MdFamilyRestroom,
  MdRestaurantMenu,
  MdHealthAndSafety,
  MdEvent,
  MdOutlineVolunteerActivism,
  MdCampaign,
  MdStore,
  MdAdsClick,
  MdOutlineHandshake,
  MdOutlineRule,
  MdOutlineGavel,
  MdOutlinePrivacyTip,
  MdOutlineQuestionAnswer,
  MdOutlineCode,
} from "react-icons/md";

// Feature card component with parallax effect
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  color,
  index,
}: {
  icon: any;
  title: string;
  description: string;
  color: string;
  index: number;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Different parallax speeds based on card position
  const row = Math.floor(index / 3);
  const column = index % 3;

  // Create staggered reveal effect
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50 + row * 10, 0, -20]);

  // Subtle rotation based on column
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [column === 1 ? 0 : column === 0 ? 2 : -2, 0]
  );

  return (
    <motion.div
      ref={ref}
      className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-black/40 transition-all"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-100px" }}
      style={{ y, rotate }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
        borderColor: "rgba(255, 255, 255, 0.2)",
      }}
    >
      <div
        className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}
      >
        <Icon className="text-white text-xl" />
      </div>
      <h3 className="text-white text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

export default function FeatureShowcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effects for the section title
  const titleY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Features from menu_screen.dart and social media features
  const features = [
    // Spiritual Journey Section
    {
      icon: FiBook,
      title: "Coran",
      description:
        "Lisez le Saint Coran avec des traductions en plusieurs langues",
      color: "bg-green-600",
    },
    {
      icon: FiBookOpen,
      title: "Hadith",
      description:
        "Accédez aux collections de hadiths authentiques avec explications",
      color: "bg-blue-600",
    },
    {
      icon: FiClock,
      title: "Heures de Prière",
      description:
        "Heures de prière précises basées sur votre localisation avec notifications",
      color: "bg-pink-600",
    },
    {
      icon: FiCompass,
      title: "Chercheur de Qibla",
      description:
        "Trouvez la direction de la Kaaba depuis n'importe où dans le monde",
      color: "bg-indigo-600",
    },
    {
      icon: GiMouse,
      title: "Guide de Prière",
      description:
        "Apprenez à effectuer correctement les prières avec des guides visuels",
      color: "bg-orange-600",
    },
    {
      icon: IoWaterOutline,
      title: "Guide des Ablutions",
      description:
        "Guide étape par étape pour effectuer correctement les ablutions",
      color: "bg-cyan-600",
    },
    {
      icon: FiGlobe,
      title: "Apprentissage de l'Arabe",
      description:
        "Leçons interactives pour apprendre l'alphabet et le vocabulaire arabe",
      color: "bg-blue-600",
    },
    {
      icon: FiStar,
      title: "Collection de Duas",
      description:
        "Collection complète de duas authentiques pour diverses occasions",
      color: "bg-amber-600",
    },

    // Learn and Grow Section
    {
      icon: FiAward,
      title: "Apprentissage Islamique",
      description:
        "Accédez à des cours islamiques complets enseignés par des érudits qualifiés",
      color: "bg-orange-600",
    },
    {
      icon: FiTarget,
      title: "Quiz",
      description:
        "Testez vos connaissances islamiques avec des quiz interactifs",
      color: "bg-cyan-600",
    },
    {
      icon: HiSparkles,
      title: "Assistant Coranique",
      description:
        "Obtenez des explications et des réponses à vos questions sur le Coran",
      color: "bg-blue-500",
    },
    {
      icon: FiStar,
      title: "Bienfaits des Sourates",
      description:
        "Découvrez les bienfaits spirituels et les vertus de chaque sourate du Coran",
      color: "bg-red-600",
    },

    // Community Section
    {
      icon: FiCalendar,
      title: "Calendrier Islamique",
      description:
        "Calendrier hégirien avec dates et événements islamiques importants",
      color: "bg-purple-600",
    },
    {
      icon: MdEvent,
      title: "Événements",
      description:
        "Restez informé des événements islamiques locaux et internationaux",
      color: "bg-orange-600",
    },
    {
      icon: MdOutlineVolunteerActivism,
      title: "Dons",
      description:
        "Soutenez des œuvres caritatives et des causes islamiques dans le monde",
      color: "bg-green-600",
    },
    {
      icon: FiMessageCircle,
      title: "Forums de Discussion",
      description:
        "Participez à des discussions enrichissantes avec la communauté musulmane mondiale",
      color: "bg-blue-gray-600",
    },

    // Family & Lifestyle Section
    {
      icon: MdFamilyRestroom,
      title: "Conseils Familiaux",
      description:
        "Conseils et guidance pour construire et maintenir une famille musulmane forte",
      color: "bg-teal-600",
    },
    {
      icon: MdRestaurantMenu,
      title: "Nourriture Halal",
      description:
        "Trouvez des restaurants halal, des recettes et des conseils alimentaires",
      color: "bg-amber-600",
    },
    {
      icon: MdHealthAndSafety,
      title: "Santé et Bien-être",
      description:
        "Conseils de santé et de bien-être selon les principes islamiques",
      color: "bg-blue-600",
    },
    {
      icon: FiShoppingBag,
      title: "Marché Islamique",
      description:
        "Découvrez et achetez des produits halal et des articles islamiques",
      color: "bg-purple-600",
    },

    // Support & Advertisements Section
    {
      icon: MdCampaign,
      title: "Annoncez avec Nous",
      description:
        "Opportunités publicitaires pour atteindre la communauté musulmane",
      color: "bg-orange-600",
    },
    {
      icon: MdStore,
      title: "Entreprises Musulmanes",
      description:
        "Répertoire d'entreprises musulmanes pour soutenir l'économie de la communauté",
      color: "bg-indigo-600",
    },
    {
      icon: MdAdsClick,
      title: "Soutien via Publicités",
      description:
        "Soutenez notre application en regardant des publicités ciblées",
      color: "bg-green-600",
    },
    {
      icon: MdOutlineHandshake,
      title: "Partenariats",
      description:
        "Opportunités de partenariat pour les organisations et entreprises islamiques",
      color: "bg-purple-600",
    },

    // Additional Features
    {
      icon: FiUsers,
      title: "Communauté",
      description:
        "Connectez-vous avec des musulmans dans votre région et dans le monde entier",
      color: "bg-teal-600",
    },
    {
      icon: IoShareSocialOutline,
      title: "Partage Social",
      description:
        "Partagez du contenu inspirant avec vos amis et votre famille",
      color: "bg-red-600",
    },
    {
      icon: FiHelpCircle,
      title: "Sally AI Assistant",
      description:
        "Obtenez des réponses instantanées à vos questions islamiques avec notre assistant IA",
      color: "bg-indigo-600",
    },
    {
      icon: FiSettings,
      title: "Paramètres",
      description:
        "Personnalisez l'application selon vos préférences et besoins",
      color: "bg-gray-600",
    },
    {
      icon: FiHelpCircle,
      title: "Aide et Support",
      description:
        "Obtenez de l'aide et du support pour utiliser l'application",
      color: "bg-blue-600",
    },
    {
      icon: MdOutlineQuestionAnswer,
      title: "FAQ",
      description: "Trouvez des réponses aux questions fréquemment posées",
      color: "bg-teal-600",
    },
    {
      icon: FiGlobe,
      title: "Navigateur Intégré",
      description:
        "Naviguez sur le web sans quitter l'application pour accéder à des ressources islamiques en ligne",
      color: "bg-blue-600",
    },
    {
      icon: FiMessageSquare,
      title: "Messagerie Privée",
      description:
        "Échangez des messages privés avec d'autres membres de la communauté",
      color: "bg-indigo-600",
    },
    {
      icon: FiZap,
      title: "Sally Chatbot",
      description:
        "Discutez avec Sally, notre chatbot IA spécialisé dans les connaissances générales et islamiques",
      color: "bg-purple-600",
    },
    {
      icon: FiSmile,
      title: "Soutien Émotionnel",
      description:
        "Ressources et conseils pour le bien-être émotionnel selon les principes islamiques",
      color: "bg-orange-600",
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-7xl mx-auto py-16 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="text-center mb-12"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Tout ce dont vous avez besoin dans une seule application
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Découvrez l'ensemble complet de fonctionnalités conçues pour enrichir
          votre parcours spirituel et vous connecter avec la communauté
          musulmane mondiale.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            color={feature.color}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}
