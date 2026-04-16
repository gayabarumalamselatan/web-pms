"use client";

import Image from "next/image";
import { ScrollAnimation } from "./ui/scroll-animation";

export function SambutanKetua() {
  return (
    <section
      id="sambutan"
      className="py-32 px-4 bg-primary relative overflow-hidden border-y-8 border-black"
    >
      {/* Background Kinetic Text */}
      <div className="absolute top-10 left-0 whitespace-nowrap opacity-10 select-none pointer-events-none">
        <p className="text-[12rem] font-black text-white uppercase tracking-tighter">
          MESSAGE FROM THE PRESIDENT • MESSAGE FROM THE PRESIDENT •
        </p>
      </div>

      <div className="relative z-10 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Chairman Photo - Brutalist style */}
          <ScrollAnimation
            direction="left"
            amount={100}
            className="flex justify-center flex-shrink-0"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-secondary border-4 border-black -rotate-3 z-0" />
              <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] border-8 border-black bg-white overflow-hidden brutal-shadow-hover transition-all duration-300 z-10">
                <Image
                  src="/images/babi3.png"
                  alt="Ketua PMS"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 border-4 border-black pointer-events-none" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-yellow-400 border-4 border-black px-8 py-4 z-20 rotate-6 brutal-shadow">
                <p className="font-black text-2xl uppercase italic">
                  "EL BOKAP"
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* Chairman Message */}
          <ScrollAnimation
            direction="right"
            amount={100}
            className="space-y-8 bg-white border-8 border-black p-10 md:p-16 brutal-shadow relative"
          >
            {/* Quote Icon */}
            <div className="absolute -top-12 -left-8 bg-black text-white p-6 rotate-[-15deg] brutal-shadow">
              <span className="text-6xl font-black">"</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter">
                Edbert chandra
              </h3>
              <p className="text-primary font-black text-xl uppercase italic">
                Ketua PMS Abadi
              </p>
              <div className="w-24 h-2 bg-gray-400" />
            </div>

            <div className="space-y-6 text-gray-900 font-bold text-lg md:text-xl leading-snug">
              <p>
                Salam, teman-teman! PMS bukan sekadar organisasi. Ini adalah
                pergerakan. Sebuah wadah di mana ambisi bertemu dengan kegilaan
                kreatif.
              </p>
              <p>
                Kami tidak membangun hierarki; kami membangun komunitas. Tempat
                di mana setiap suara didengar dan setiap bakat dihargai secara
                brutal.
              </p>
              <p>
                Mari bergabung dan rasakan bagaimana rasanya menjadi bagian dari
                sesuatu yang benar-benar besar.
              </p>
            </div>

            {/* Brutalist Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="border-4 border-black p-4 bg-blue-50">
                <p className="text-4xl font-black text-black">500+</p>
                <p className="text-sm font-black uppercase text-primary">
                  Active Members
                </p>
              </div>
              <div className="border-4 border-black p-4 bg-orange-50">
                <p className="text-4xl font-black text-black">50+</p>
                <p className="text-sm font-black uppercase text-primary">
                  Annual Events
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
