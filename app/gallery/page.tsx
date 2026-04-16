'use client'

import { ScrollAnimation } from '@/components/ui/scroll-animation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { galleryEvents } from '@/lib/gallery-data'

export default function FullGalleryPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFD] pt-24 pb-20 px-4 font-outfit">
      {/* Brutalist Sticky Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-black border-t-4 border-t-primary h-20 flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link
            href="/#gallery"
            className="flex items-center gap-2 text-white hover:text-primary transition-colors font-black uppercase text-sm tracking-widest group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            BACK TO HOME
          </Link>
          <div className="bg-white border-4 border-black px-6 py-1 rotate-[1deg] brutal-shadow-sm">
            <h1 className="text-xl font-black text-black uppercase tracking-tighter">ALL MOMENTS</h1>
          </div>
          <div className="hidden md:block w-32" />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl">
        <ScrollAnimation className="text-center mb-24 mt-12">
          <h2 className="text-6xl md:text-9xl font-black text-black leading-none tracking-tighter uppercase mb-6">
            FULL <span className="text-secondary italic">ARCHIVE</span>
          </h2>
          <div className="w-full h-4 bg-black" />
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryEvents.map((event, index) => (
            <ScrollAnimation
              key={event.id}
              delay={(index % 4) * 0.1}
              className="group"
            >
              <Link href={`/gallery/${event.slug}`} className="block">
                <div className="brutal-card h-80 relative overflow-hidden p-0 bg-white hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                  <div className={`absolute inset-0 ${event.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                    <div className="text-center mix-blend-difference opacity-20 group-hover:opacity-100 transition-opacity">
                      <span className="text-6xl group-hover:animate-bounce">📸</span>
                    </div>
                  </div>
                  
                  {/* Info Label Bottom Left */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="bg-white border-2 border-black p-3 brutal-shadow-sm group-hover:bg-yellow-300 transition-colors duration-300">
                      <p className="font-black uppercase text-lg leading-none mb-1 text-black">
                        {event.title}
                      </p>
                      <p className="font-bold text-[10px] uppercase text-gray-500 tracking-widest leading-none">
                        {event.date}
                      </p>
                    </div>
                  </div>

                  {/* Overlapping Tag */}
                  <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-[10px] font-black uppercase z-30">
                    {event.id.toString().padStart(3, '0')}
                  </div>
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </main>
  )
}
