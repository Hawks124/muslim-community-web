"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { FiTrendingUp, FiStar, FiDownload, FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTrending, setShowTrending] = useState(true);
  const [downloads, setDownloads] = useState(50000);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate increasing downloads
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloads((prev) => prev + Math.floor(Math.random() * 10));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Format downloads with commas
  const formattedDownloads = downloads.toLocaleString("fr-FR");

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-black/70 backdrop-blur-lg shadow-md py-3"
            : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/entreprise.png"
              alt="Logo"
              width={100}
              height={100}
              className="mr-3"
            />
          </Link>

          {/* Trending Badge - Only visible on desktop */}
          {showTrending && (
            <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
              <motion.div
                className="backdrop-blur-md bg-black/40 border border-white/10 rounded-full px-4 py-1.5 shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Trending indicator */}
                <div className="flex items-center gap-2">
                  <div className="bg-green-500/20 p-1 rounded-full">
                    <motion.div
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <FiTrendingUp className="text-green-400 text-xs" />
                    </motion.div>
                  </div>
                  <span className="text-white/90 font-medium text-xs">
                    Tendance
                  </span>
                </div>

                {/* Subtle divider */}
                <div className="h-3 w-px bg-white/10"></div>

                {/* Download count */}
                <div className="flex items-center gap-1">
                  <FiDownload className="text-blue-400 text-xs" />
                  <span className="text-white/90 font-medium text-xs">
                    {formattedDownloads}
                  </span>
                </div>

                {/* Subtle divider */}
                <div className="h-3 w-px bg-white/10"></div>

                {/* Star rating */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className="text-amber-400 fill-amber-400 text-[10px]"
                    />
                  ))}
                </div>

                {/* Close button */}
                <button
                  className="text-white/50 hover:text-white/90 transition-colors"
                  onClick={() => setShowTrending(false)}
                >
                  <FiX className="w-3 h-3" />
                </button>
              </motion.div>
            </div>
          )}

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 md:gap-3">
            <NavLink href="/privacy-policy">Confidentialité</NavLink>
            <NavLink href="/terms">Conditions</NavLink>

            {/* CTA Button - changes based on current page */}
            {pathname === "/about" ? (
              <motion.a
                href="https://play.google.com/store/apps/details?id=com.muslimcommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Télécharger <FaArrowRight />
              </motion.a>
            ) : (
              <motion.button
                onClick={() => (window.location.href = "/about")}
                className="ml-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                À Propos <FaArrowRight />
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-30 pt-24 px-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center">
              {/* Trending Badge for Mobile */}
              {showTrending && (
                <motion.div
                  className="backdrop-blur-md bg-black/40 border border-white/10 rounded-lg px-4 py-3 shadow-xl flex items-center gap-3 w-full mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-green-500/20 p-1.5 rounded-full">
                      <FiTrendingUp className="text-green-400 text-sm" />
                    </div>
                    <span className="text-white/90 font-medium text-sm">
                      Tendance
                    </span>
                  </div>

                  <div className="h-4 w-px bg-white/10"></div>

                  <div className="flex items-center gap-2">
                    <FiDownload className="text-blue-400 text-sm" />
                    <span className="text-white/90 font-medium text-sm">
                      {formattedDownloads}
                    </span>
                  </div>

                  <div className="ml-auto flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar
                        key={star}
                        className="text-amber-400 fill-amber-400 text-xs"
                      />
                    ))}
                  </div>

                  <button
                    className="text-white/50 hover:text-white/90 transition-colors"
                    onClick={() => setShowTrending(false)}
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Mobile Navigation Links */}
              <div className="flex flex-col items-center w-full">
                <MobileNavLink
                  href="/privacy-policy"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Confidentialité
                </MobileNavLink>
                <MobileNavLink
                  href="/terms"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Conditions
                </MobileNavLink>
                <MobileNavLink
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  À Propos
                </MobileNavLink>

                {/* CTA Button */}
                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.muslimcommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md text-base font-medium transition-colors flex items-center justify-center gap-2 w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Télécharger l'Application <FaArrowRight />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Desktop Navigation link component
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm transition-colors ${
        isActive ? "text-white font-medium" : "text-white/70 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

// Mobile Navigation link component
function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`py-4 text-lg border-b border-white/10 transition-colors w-full text-center ${
        isActive ? "text-white font-medium" : "text-white/70 hover:text-white"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
