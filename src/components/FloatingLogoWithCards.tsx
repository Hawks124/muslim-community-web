"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import Image from "next/image";

// Language card component
function DraggableCard({
  language,
  flagSrc,
  initialX,
  initialY,
  scrollYProgress,
  parallaxFactor = 1,
}: {
  language: string;
  flagSrc: string;
  initialX: number;
  initialY: number;
  scrollYProgress: MotionValue<number>;
  parallaxFactor?: number;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  // Always call useTransform, regardless of mounted state
  const rotate = useTransform(x, [-200, 200], [-10, 10]);

  // Parallax effect - create a separate motion value for the parallax
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 100 * parallaxFactor]
  );

  // Combine the base position with the parallax effect
  const combinedY = useTransform(() => {
    return y.get() + yParallax.get();
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div
      drag={isMounted}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      style={{
        x,
        y: combinedY,
        rotate,
        opacity: isMounted ? 1 : 0, // Use opacity to hide before mounted
      }}
      className="absolute cursor-grab active:cursor-grabbing z-20 backdrop-blur-md p-3 rounded-lg border border-white/20 shadow-xl w-40 h-14 flex flex-row items-center justify-start gap-2"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      whileHover={{
        scale: 1.05,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        boxShadow:
          "0 10px 15px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glass effect background */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md -z-10" />

      {/* Flag image with subtle shadow */}
      <div className="relative w-7 h-7 rounded-full overflow-hidden shadow-sm flex-shrink-0 border border-white/20">
        <Image
          src={flagSrc}
          alt={`${language} flag`}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Language label */}
      <span className="text-white font-medium text-sm">{language}</span>
    </motion.div>
  );
}

export default function FloatingLogoWithCards() {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effect for the logo
  const yScroll = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Base motion value for the floating animation
  const baseY = useMotionValue(0);

  // Combine the base animation with the scroll effect
  const combinedY = useTransform(() => {
    return baseY.get() - yScroll.get();
  });

  // Update the base value for the floating animation
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isMounted) {
      let time = 0;
      interval = setInterval(() => {
        time += 0.01;
        // Simple sine wave for smooth floating
        baseY.set(Math.sin(time) * 15);
      }, 16);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMounted, baseY]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a simple placeholder during SSR
    return (
      <div className="w-full h-full flex items-center justify-center"></div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* Large floating animated logo with parallax */}
      <motion.div
        className="relative z-10"
        style={{
          y: combinedY,
          scale,
          opacity,
        }}
      >
        <Image
          src="/logo.svg"
          alt="Muslim Community Logo"
          width={300}
          height={300}
          className="w-[300px] h-[300px]"
        />
      </motion.div>

      {/* Floating draggable language cards positioned AROUND the logo */}
      <DraggableCard
        language="English"
        flagSrc="/flags/usa.png"
        initialX={-150}
        initialY={-100}
        scrollYProgress={scrollYProgress}
        parallaxFactor={0.5}
      />
      <DraggableCard
        language="Français"
        flagSrc="/flags/france.png"
        initialX={150}
        initialY={-100}
        scrollYProgress={scrollYProgress}
        parallaxFactor={0.7}
      />
      <DraggableCard
        language="العربية"
        flagSrc="/flags/arabic.png"
        initialX={-150}
        initialY={100}
        scrollYProgress={scrollYProgress}
        parallaxFactor={0.9}
      />
      <DraggableCard
        language="Malagasy"
        flagSrc="/flags/madagascar.png"
        initialX={150}
        initialY={100}
        scrollYProgress={scrollYProgress}
        parallaxFactor={1.1}
      />
    </div>
  );
}
