"use client";

import Image from "next/image";
import { ScrollAnimation } from "./ui/scroll-animation";
import { link } from "fs";
import { useSmoothScroll } from "@/lib/smooth-scroll";
import { InstagramIcon } from "lucide-react";

const socialMedia = [
  {
    name: "Instagram",
    icon: <InstagramIcon />,
    handle: "@persatuanmahasiswasakit",
    link: "https://www.instagram.com/persatuanmahasiswasakit?igsh=bnE4b2VwNmJuMGg5",
    color: "bg-pink-400",
  },
  {
    name: "WhatsApp",
    icon: "💬",
    handle: "Contact Us",
    link: "#",
    color: "bg-green-400",
  },
];

const NavigationPanels = [
  {
    title: "Navigation",
    list: [
      {
        title: "Home",
        link: "/",
        scrollTarget: "/",
      },
      {
        title: "Sambutan Ketua",
        link: "#sambutan",
        scrollTarget: "#sambutan",
      },
      {
        title: "Yang Kami Lakukan",
        link: "#aktivitas",
        scrollTarget: "#aktivitas",
      },
      {
        title: "Galeri",
        link: "#gallery",
        scrollTarget: "#gallery",
      },
      {
        title: "Markas Besar",
        link: "#markas",
        scrollTarget: "#markas",
      },
      {
        title: "Temukan Kami",
        link: "#kontak-kami",
        scrollTarget: "#kontak-kami",
      },
    ],
  },
  {
    title: "Contact",
    list: [
      {
        title: "Email: info@pms2025.com",
        link: "/",
      },
      {
        title: "Phone: +62 812 3456 7890",
        link: "/",
      },
      {
        title: "Open: 10:00 - 18:00",
        link: "/",
      },
    ],
  },
];

export function TemukanKami() {
  const { scrollTo } = useSmoothScroll();

  const handleLinkClick = (e: any, item: any) => {
    if (item.scrollTarget) {
      // Jika ada scrollTarget, lakukan smooth scroll
      scrollTo(e, item.scrollTarget, { offset: 0, duration: 2 });
    } else if (item.link === "/") {
      // Untuk home, scroll ke top
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Jika link biasa, biarkan default behavior
  };
  return (
    <section id="kontak-kami" className="relative overflow-hidden bg-white">
      {/* Main Section */}
      <div className="py-24 px-4 relative">
        <div className="relative z-10 container mx-auto max-w-7xl">
          {/* Header */}
          <ScrollAnimation className="text-center mb-20">
            <h2 className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter uppercase mb-4">
              TEMUKAN <span className="text-primary italic">KAMI</span>
            </h2>
            <div className="bg-black text-white inline-block px-8 py-3 transform rotate-1 brutal-shadow">
              <p className="text-2xl font-black uppercase">
                JOIN THE 500+ COMMUNITY
              </p>
            </div>
          </ScrollAnimation>

          {/* Social Media Grid - Brutalist cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {socialMedia.map((social, index) => (
              <ScrollAnimation
                key={index}
                delay={index * 0.05}
                className="group"
              >
                <a href={social.link} className="block" target="_blank">
                  <div
                    className={`brutal-card h-48 ${social.color} hover:translate-x-[-8px] hover:translate-y-[-8px] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col justify-between group`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-5xl group-hover:scale-125 transition-transform duration-300">
                        {social.icon}
                      </div>
                      <div className="text-black px-3 py-1 text-xs font-black uppercase transform group-hover:rotate-12 transition-transform">
                        LIVE NOW
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl text-black uppercase tracking-tighter leading-none mb-1">
                        {social.name}
                      </h3>
                      <p className="font-bold opacity-80 uppercase text-xs tracking-widest leading-none">
                        {social.handle}
                      </p>
                    </div>
                  </div>
                </a>
              </ScrollAnimation>
            ))}
          </div>

          {/* Newsletter - Brutalist Dark Panel */}
          {/* <ScrollAnimation
            direction="up"
            className="brutal-card bg-black text-white p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12"
          >
            <div className="md:w-3/5 space-y-4">
              <h3 className="text-4xl md:text-6xl text-black uppercase tracking-tighter leading-tight">
                DAPATKAN <span className="text-yellow-400 italic">UPDATE</span>{" "}
                TERBARU
              </h3>
              <p className="text-gray-400 font-bold text-lg uppercase tracking-wide">
                DAFTARKAN EMAIL KAMU UNTUK KONTEN EKSKLUSIF & INFO EVENT!
              </p>
            </div>
            <div className="md:w-2/5 w-full space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="EMAIL@DOMAIN.COM"
                  className="w-full bg-white border-4 border-gray-800 p-5 text-black font-black placeholder:text-gray-400 focus:outline-none transition-all"
                />
                <div className="absolute top-1 right-1 h-[calc(100%-8px)]">
                  <button className="h-full bg-secondary border-l-4 border-black px-6 font-black uppercase text-white hover:bg-secondary-dark transition-colors">
                    GO!
                  </button>
                </div>
              </div>
            </div>
          </ScrollAnimation> */}
        </div>
      </div>

      {/* Footer - High Contrast Brutalist */}
      <footer className="bg-white border-t-8 border-black pt-20 pb-12 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 border-4 border-black bg-white p-2 brutal-shadow-sm rotate-[-3deg]">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={60}
                    height={60}
                  />
                </div>
                <span className="text-5xl font-black text-black tracking-tighter">
                  PMS
                </span>
              </div>
              <p className="text-gray-800 font-bold leading-snug uppercase text-sm">
                Persatuan Mahasiswa Sakit 2025. <br />
                Membangun komunitas yang positif, inklusif, dan gila kreatif.
              </p>
            </div>

            {/* Navigation Panels */}
            {NavigationPanels.map((panel, i) => (
              <div key={i} className="space-y-6">
                <h4 className="text-xl font-black bg-black text-white inline-block px-4 py-1 uppercase italic tracking-widest">
                  {panel.title}
                </h4>
                <ul className="space-y-4">
                  {panel.list.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.link}
                        onClick={(e) => handleLinkClick(e, link)}
                        className="font-black uppercase text-sm hover:text-primary transition-colors border-b-2 border-transparent hover:border-black pb-1"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="pt-12 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-black uppercase text-xs tracking-[0.2em] text-gray-500">
              © 2026 PERSATUAN MAHASISWA SAKIT. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-8">
              {["Privacy", "Terms", "Sitemap"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-black uppercase text-xs tracking-widest hover:text-black hover:underline transition-all"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
