"use client";

import { useEffect, useState } from "react";
import PlatformSelector from "@/components/PlatformSelector";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function PlatformPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <AnimatedBackground />

      <main className="min-h-screen">
        {/* We pass isOpen as true and a dummy onClose function since we're on the dedicated page */}
        <PlatformSelector
          isOpen={isLoaded}
          onClose={() => window.history.back()}
        />
      </main>
    </>
  );
}
