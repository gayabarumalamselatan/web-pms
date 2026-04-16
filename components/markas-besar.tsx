"use client";

import { Pin } from "lucide-react";
import { ScrollAnimation } from "./ui/scroll-animation";

export function MarkasBesar() {
  return (
    <section
      id="markas"
      className="py-24 px-4 bg-white relative overflow-hidden border-b-8 border-black"
    >
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation className="mb-20">
          <h2 className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter uppercase text-center">
            MARKAS <span className="text-primary italic">BESAR</span>
          </h2>
          <div className="w-40 h-4 bg-secondary mx-auto mt-4" />
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          {/* Address Info - Brutalist Left Panel */}
          <div className="lg:col-span-2 p-10 md:p-16 flex flex-col justify-center bg-white border-b-8 lg:border-b-0 lg:border-r-8 border-black">
            <ScrollAnimation direction="left" delay={0.2}>
              <div className="inline-block bg-primary text-white p-4 border-4 border-black brutal-shadow-sm mb-8 rotate-[-2deg] bg-yellow-400">
                <Pin className="font-extrabold text-black" />
              </div>
              <h3 className="text-4xl font-black text-black uppercase tracking-tighter mb-8 leading-none">
                DATANG & <br /> GABUNG!
              </h3>
              <div className="space-y-4">
                <p className="text-2xl font-black text-primary uppercase">
                  PMS HEADQUARTERS
                </p>
                <p className="text-xl font-bold text-gray-800 leading-tight">
                  Jalan Mahasiswa No. 123
                  <br />
                  Gedung A, Lantai 2, Ruang 204
                  <br />
                  Kota Pendidikan, 55281
                </p>
              </div>

              <div className="mt-12 pt-12 border-t-4 border-black">
                <p className="inline-block bg-black text-white px-4 py-1 font-black uppercase text-sm mb-6">
                  OPENING HOURS
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-secondary border-2 border-black" />
                  <p className="text-xl font-black text-black uppercase italic">
                    Mon - Fri: 09:00 - 17:00
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Map - Brutalist Right Panel */}
          <div className="lg:col-span-3 h-[500px] lg:h-auto relative bg-gray-200">
            <ScrollAnimation direction="none" delay={0.4} className="h-full">
              <iframe
                title="Markas Besar PMS"
                className="w-full h-full filter grayscale contrast-125"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126646.20963231481!2d110.32737608671876!3d-7.7955797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57870390886b%3A0x6d901f46f461e11e!2sYogyakarta%2C%20Kota%20Yogyakarta%2C%20Daerah%20Istimewa%20Yogyakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                loading="lazy"
              />
              {/* Brutalist Frame on Map */}
              <div className="absolute inset-0 border-8 border-black pointer-events-none" />

              {/* Floating Map Label */}
              <div className="absolute bottom-8 right-8 bg-yellow-400 border-4 border-black px-6 py-2 brutal-shadow rotate-[-3deg]">
                <p className="text-black font-black uppercase text-sm tracking-widest">
                  Target Acquired
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
