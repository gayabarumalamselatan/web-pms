"use client";
import { useSmoothScroll } from "@/lib/smooth-scroll";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function HeroSection() {
  const containerRef = useRef(null);

  const { scrollTo } = useSmoothScroll();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Telescope-like Parallax Effects
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[120vh] w-full overflow-hidden bg-[#FAFBFD] font-outfit"
    >
      {/* Background Grid - Brutalist flair */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(black 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[80vw] h-[80vw] border-[10px] border-primary/5 rounded-full" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 pt-24 flex flex-col items-center text-center">
        {/* Logo Section */}
        <motion.div
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="mb-12 relative"
        >
          <div className="relative w-48 h-48 md:w-48 md:h-48 border-8 border-black bg-white rounded-3xl p-4 brutal-shadow transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <Image
              src="/images/logo.png"
              alt="PMS Logo"
              fill
              className="object-contain p-4"
              priority
            />
          </div>
          {/* Brutalist Badge */}
          <div className="absolute -top-6 -right-12 bg-secondary border-4 border-black px-6 py-2 brutal-shadow rotate-12">
            <p className="font-black text-black text-xl uppercase tracking-tighter">
              Official 2026
            </p>
          </div>
        </motion.div>

        {/* Title Section */}
        <motion.div style={{ y: textY }} className="max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-black text-black leading-none tracking-tighter mb-4">
            PMS <span className="text-primary italic">2026</span>
          </h1>
          <div className="inline-block bg-black text-white px-8 py-4 -rotate-1 mb-8">
            <p className="text-2xl md:text-3xl font-black uppercase">
              Persatuan Mahasiswa Sakit
            </p>
          </div>

          <p className="text-xl md:text-2xl text-gray-800 font-bold max-w-2xl mx-auto mb-12 leading-snug">
            Komunitas mahasiswa yang penuh semangat, energi, dan kegembiraan!
            <span className="bg-yellow-300 px-2 ml-1">
              Bukan komunitas biasa.
            </span>
          </p>

          {/* Brutalist CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="#sambutan"
              onClick={(e) =>
                scrollTo(e, "#sambutan", { offset: 0, duration: 2 })
              }
              className="brutal-btn bg-primary text-black hover:bg-primary-dark"
            >
              JELAJAHI SEKARANG
            </Link>
            <Link
              href="/daftar-anggota"
              className="brutal-btn bg-white text-black hover:bg-gray-50"
            >
              LIHAT TIM KAMI
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements - Brutalist style */}
      <div className="hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-10 w-32 h-32 border-4 border-black bg-accent flex items-center justify-center z-20 brutal-shadow"
        >
          <img src={"/images/babi1.png"} alt="Ebet" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-1/4 right-10 w-40 h-40 border-4 border-black bg-secondary flex items-center justify-center z-20 brutal-shadow rounded-full"
        >
          <img src={"/images/babi2.png"} alt="Ebet" />
        </motion.div>
      </div>

      {/* Scroll Down Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="font-black uppercase tracking-widest text-sm mb-2">
          Scroll Down
        </p>
        <div className="w-1 h-12 bg-black mx-auto animate-bounce" />
      </div>
    </section>
  );
}
