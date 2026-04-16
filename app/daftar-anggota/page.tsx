"use client";

import { MemberCard } from "@/components/member-card";
import Link from "next/link";
import { ChevronLeft, Users } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const members = [
  {
    name: "Rizki Pratama",
    position: "Ketua Umum",
    image: "/images/member-1.png",
  },
  {
    name: "Siti Nurhaliza",
    position: "Wakil Ketua",
    image: "/images/member-2.png",
  },
  {
    name: "Ahmad Gunawan",
    position: "Sekretaris",
    image: "/images/member-3.png",
  },
  { name: "Dina Kusuma", position: "Bendahara", image: "/images/member-4.png" },
  {
    name: "Budi Santoso",
    position: "Divisi Acara",
    image: "/images/member-5.png",
  },
  {
    name: "Livia Wijaya",
    position: "Divisi Sosial",
    image: "/images/member-6.png",
  },
  {
    name: "Fajar Ramadan",
    position: "Divisi Olahraga",
    image: "/images/member-1.png",
  },
  {
    name: "Mega Putri",
    position: "Divisi Kreatif",
    image: "/images/member-2.png",
  },
  {
    name: "Rian Hermawan",
    position: "Divisi IT",
    image: "/images/member-3.png",
  },
  { name: "Citra Dewi", position: "Divisi PR", image: "/images/member-4.png" },
  {
    name: "Yuki Tanaka",
    position: "Anggota Aktif",
    image: "/images/member-5.png",
  },
  {
    name: "Aldi Mardana",
    position: "Anggota Aktif",
    image: "/images/member-6.png",
  },
];

export default function DaftarAnggotaPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFD] pt-24 pb-20 px-4">
      {/* Brutalist Sticky Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-black border-t-4 border-t-secondary h-20 flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-secondary transition-colors font-black uppercase text-sm tracking-widest group"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            BACK HOME
          </Link>
          <div className="flex items-center gap-4 bg-white border-4 border-black px-4 py-1 rotate-[-1deg] brutal-shadow-sm">
            <Users size={24} className="text-black" />
            <h1 className="text-xl font-black text-black uppercase tracking-tighter">
              OUR ELITE TEAM
            </h1>
          </div>
          <div className="hidden md:block w-32" />
        </div>
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Title Section */}
        <ScrollAnimation className="text-center mb-24 mt-12">
          <h2 className="text-6xl md:text-9xl font-black text-black leading-none tracking-tighter uppercase mb-6">
            ELITE <span className="text-primary italic">SQUAD</span>
          </h2>
          <div className="inline-block bg-secondary border-4 border-black px-8 py-2 brutal-shadow rotate-2">
            <p className="text-black font-black text-2xl uppercase italic">
              THE PEOPLE BEHIND PMS
            </p>
          </div>
        </ScrollAnimation>

        {/* members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <MemberCard
              key={index}
              name={member.name}
              position={member.position}
              image={member.image}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA Panel */}
        {/* <ScrollAnimation
          direction="up"
          className="mt-32 brutal-card bg-primary text-white p-12 text-center relative overflow-hidden"
        >
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 translate-x-16 -translate-y-16 rotate-45" />

          <h3 className="text-4xl md:text-6xl text-black uppercase tracking-tighter mb-8 leading-none">
            WANT TO <span className="text-yellow-400 italic">BECOME</span>{" "}
            <br /> ONE OF US?
          </h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/"
              className="brutal-btn bg-white text-black hover:bg-gray-100"
            >
              CONTACT US NOW!
            </Link>
            <Link
              href="/"
              className="brutal-btn bg-black text-white border-white hover:border-black"
            >
              SEE REQUIREMENTS
            </Link>
          </div>
        </ScrollAnimation> */}
      </div>
    </main>
  );
}
