import { MemberCard } from "@/components/member-card";
import Link from "next/link";
import { ChevronLeft, Users } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { getMembers } from "@/app/actions/members";
import { Key } from "react";

export default async function DaftarAnggotaPage() {
  const members = await getMembers();

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
          {members.map(
            (
              member: {
                id: Key | null | undefined;
                name: string;
                julukan: any;
                position: string;
                imagePath: any;
              },
              index: number,
            ) => (
              <MemberCard
                key={member.id}
                name={member.name}
                julukan={member.julukan || ""}
                position={member.position}
                image={member.imagePath || "/images/member-1.png"}
                index={index}
              />
            ),
          )}
        </div>
      </div>
    </main>
  );
}
