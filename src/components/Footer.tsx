"use client";

import Image from "next/image";
import Link from "next/link";
import { FiGlobe } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black/30 backdrop-blur-sm border-t border-white/10 py-8 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Simple two-column layout */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left column: Logo and app info */}
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Application Communautaire Musulmane"
              width={40}
              height={40}
              className="mr-3"
            />
            <div>
              <h3 className="text-white text-lg font-medium">IRA</h3>
              <p className="text-gray-400 text-sm">
                Connectez-vous avec des musulmans du monde entier
              </p>
            </div>
          </div>

          {/* Right column: Essential links */}
          <div className="flex flex-wrap gap-6 justify-center">
            <Link
              href="/privacy-policy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Politique de Confidentialité
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Conditions d'Utilisation
            </Link>
            <Link
              href="/about"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              À Propos
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-6"></div>

        {/* Bottom footer with copyright and location */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright and enterprise info */}
          <div className="flex items-center">
            <Image
              src="/ri.png"
              alt="RiRi Enterprise"
              width={20}
              height={20}
              className="mr-2"
            />
            <span className="text-gray-400 text-sm">
              © {currentYear} RiRi. Tous droits réservés.
            </span>
          </div>

          {/* Location info */}
          <div className="flex items-center">
            <Image
              src="/flags/madagascar.png"
              alt="Madagascar"
              width={15}
              height={15}
              className="mr-3"
            />
            <span className="text-gray-500 text-xs">
              Masdjid Al-Amoud Ambalamanga Mahajanga, Madagascar
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
