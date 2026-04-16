"use client";

import { useParams } from "next/navigation";
import { galleryEvents } from "@/lib/gallery-data";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";

export default function GalleryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const event = galleryEvents.find((e) => e.slug === slug);

  if (!event) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#FAFBFD] pt-24 pb-20 px-4 font-outfit">
      {/* Brutalist Sticky Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-black border-t-4 border-t-secondary h-20 flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link
            href="/#gallery"
            className="flex items-center gap-2 text-white hover:text-secondary transition-colors font-black uppercase text-sm tracking-widest group"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            BACK TO GALLERY
          </Link>
          <div className="bg-white border-4 border-black px-6 py-1 rotate-[1deg] brutal-shadow-sm">
            <h1 className="text-xl font-black text-black uppercase tracking-tighter">
              {event.title}
            </h1>
          </div>
          <div className="hidden md:block w-32" />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl mt-12">
        {/* Title Section */}
        <ScrollAnimation className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
            <div className="max-w-2xl">
              <h2 className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter uppercase mb-6">
                {event.title.split(" ")[0]} <br />
                <span className="text-primary italic">
                  {event.title.split(" ")[1] || "MOMENT"}
                </span>
              </h2>
              <p className="text-2xl font-bold text-gray-800 uppercase leading-tight">
                {event.description}
              </p>
            </div>
            <div className="bg-black text-white px-8 py-4 brutal-shadow rotate-3 -translate-y-4">
              <p className="font-black text-2xl uppercase tracking-widest">
                {event.date}
              </p>
            </div>
          </div>
          <div className="w-full h-4 bg-black" />
        </ScrollAnimation>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* If there are photos, show them; otherwise show placeholders */}
          {event.photos.length > 0
            ? event.photos.map((photo, index) => (
                <ScrollAnimation
                  key={photo.id}
                  delay={(index % 4) * 0.1}
                  className="group"
                >
                  <div className="brutal-card h-80 relative overflow-hidden p-0 bg-white hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                    <div
                      className={`absolute inset-0 ${photo.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                    >
                      <Image
                        src={photo.url}
                        alt={photo.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute top-4 right-4 bg-black text-white px-2 py-1 text-[8px] font-black uppercase z-20">
                      IMG_00{photo.id}
                    </div>
                  </div>
                </ScrollAnimation>
              ))
            : // Placeholder grid if no photos yet
              Array.from({ length: 8 }).map((_, i) => (
                <ScrollAnimation
                  key={i}
                  delay={(i % 4) * 0.1}
                  className="group"
                >
                  <div className="brutal-card h-80 relative overflow-hidden p-0 bg-white hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                    <div
                      className={`absolute inset-0 ${event.color} opacity-40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                    >
                      <span className="text-6xl grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                        📸
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-black text-white px-2 py-1 text-[8px] font-black uppercase z-20">
                      PLACEHOLDER
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-2 border-2 border-black">
                      <p className="text-[10px] font-black uppercase text-center">
                        Photo {i + 1} Coming Soon
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
        </div>
      </div>
    </main>
  );
}
