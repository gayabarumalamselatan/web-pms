"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { galleryEvents } from "@/lib/gallery-data";
import { Camera } from "lucide-react";
import Image from "next/image";

export function Gallery() {
  const [showAll, setShowAll] = useState(false);
  const displayedImages = showAll ? galleryEvents : galleryEvents.slice(0, 6);

  const image = galleryEvents.map((event) => event.photos);
  console.log(displayedImages);
  return (
    <section
      id="gallery"
      className="py-24 px-4 bg-[#FAFBFD] relative overflow-hidden border-b-8 border-black"
    >
      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <ScrollAnimation className="mb-20">
          <h2 className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter uppercase mb-6">
            GALLERY <span className="text-secondary italic">MOMENTS</span>
          </h2>
          <div className="w-full h-4 bg-black" />
        </ScrollAnimation>

        {/* Brutalist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {displayedImages.map((item, index) => (
            <ScrollAnimation
              key={item.id}
              delay={(index % 4) * 0.1}
              direction="up"
              amount={40}
              className={`${item.span || ""} group relative h-80 md:h-auto min-h-[22rem] overflow-hidden`}
            >
              <Link
                href={`/gallery/${item.slug}`}
                className="block w-full h-full"
              >
                <div className="relative w-full h-full border-4 border-black bg-white brutal-shadow-hover transition-all duration-300 overflow-hidden">
                  {/* Image Placeholder with Solid Color & Contrast */}
                  <Image
                    src={item.photos[0]?.url || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* <div
                    className={`absolute inset-0 ${item.color} flex items-center justify-center transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1`}
                  >
                    <div className="text-center p-6 mix-blend-difference opacity-20 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-7xl block mb-3  group-hover:animate-bounce" />
                    </div>
                  </div> */}

                  {/* Overlapping Brutalist Label Top Right */}
                  <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 font-black uppercase text-[10px] rotate-3 z-30 group-hover:rotate-0 transition-transform">
                    {item.id.toString().padStart(3, "0")}
                  </div>

                  {/* BOTTOM LEFT INFO CARD */}
                  <div className="absolute bottom-4 left-4 z-20 max-w-[80%]">
                    <div className="bg-white border-2 border-black p-3 brutal-shadow-sm group-hover:bg-yellow-300 transition-colors duration-300">
                      <h3 className="font-outfit font-black text-xl text-black uppercase tracking-tighter leading-none mb-1">
                        {item.title}
                      </h3>
                      <p className="font-bold text-[10px] uppercase text-gray-500 tracking-widest leading-none">
                        {item.date}
                      </p>
                    </div>
                  </div>

                  {/* View Overlay on Hover */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>

        {/* Show More Button - Brutalist style */}
        {!showAll && (
          <ScrollAnimation
            direction="none"
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setShowAll(true)}
              className="brutal-btn text-black px-12 py-5 text-2xl uppercase"
            >
              Tampilkan Lebih Banyak
            </button>
          </ScrollAnimation>
        )}
      </div>
    </section>
  );
}
