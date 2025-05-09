"use client";

import AnimatedBackground from "@/components/AnimatedBackground";
import Hero from "@/components/Hero";
import FloatingLogoWithCards from "@/components/FloatingLogoWithCards";
import FeatureShowcase from "@/components/FeatureShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import GettingStarted from "@/components/GettingStarted";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />

      <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
        {/* Hero section with floating logo - Added pt-20 for better spacing from navbar */}
        <section className="w-full flex flex-col md:flex-row items-center justify-center p-6 pt-20 min-h-screen">
          <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 z-10">
            {/* Hero section */}
            <div className="w-full md:w-1/2">
              <Hero />
            </div>
            {/* Floating logo with draggable language cards */}
            <div className="w-full md:w-1/2 h-[500px] flex items-center justify-center">
              <FloatingLogoWithCards />
            </div>
          </div>
        </section>

        {/* Why Choose Us section */}
        <section className="w-full z-10" id="why-choose-us">
          <WhyChooseUs />
        </section>

        {/* Feature showcase section */}
        <section className="w-full z-10" id="features">
          <FeatureShowcase />
        </section>

        {/* Getting Started section */}
        <section className="w-full z-10" id="get-started">
          <GettingStarted />
        </section>
      </main>

      <Footer />
    </>
  );
}
