"use client";

import { ScrollAnimation } from "./ui/scroll-animation";
import { MemberCard } from "./member-card";

export function MembersSection({ members }: { members: any[] }) {
  if (members.length === 0) return null;

  return (
    <section id="members" className="py-24 px-4 bg-slate-50 border-b-8 border-black">
      <div className="container mx-auto max-w-7xl">
        <ScrollAnimation className="mb-20">
          <h2 className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter uppercase text-center md:text-left">
            DAFTAR <span className="text-primary italic">ANGGOTA</span>
          </h2>
          <div className="w-full h-4 bg-black mt-8" />
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <MemberCard
              key={member.id}
              index={index}
              name={member.name}
              julukan={member.julukan}
              position={member.position}
              image={member.imagePath || "/images/babi3.png"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
