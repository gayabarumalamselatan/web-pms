"use client";

import { ScrollAnimation } from "./ui/scroll-animation";

const activities = [
  {
    image: "/images/activity-workshop.png",
    title: "Workshop & Seminar",
    description:
      "Mengadakan berbagai workshop edukatif untuk meningkatkan skill dan pengetahuan anggota.",
    color: "bg-blue-400",
  },
  {
    image: "/images/activity-sports.png",
    title: "Olahraga & Aktivitas",
    description:
      "Mengorganisir turnamen olahraga, hiking, dan berbagai aktivitas fisik seru.",
    color: "bg-secondary",
  },
  {
    image: "/images/activity-event.png",
    title: "Event Sosial",
    description:
      "Gathering, game night, movie marathon, dan acara kebersamaan yang penuh tawa.",
    color: "bg-yellow-400",
  },
  {
    image: "/images/activity-social.png",
    title: "Aksi Sosial",
    description:
      "Program CSR, donor darah, dan kegiatan untuk membantu komunitas sekitar.",
    color: "bg-primary-light",
  },
  {
    image: "/images/activity-talent.png",
    title: "Talent Show",
    description:
      "Platform untuk menampilkan bakat, seni, musik, dan potensi kreatif anggota.",
    color: "bg-orange-400",
  },
  {
    image: "/images/activity-travel.png",
    title: "Travel & Eksplorasi",
    description:
      "Studi banding, wisata, dan petualangan ke berbagai tempat menarik bersama-sama.",
    color: "bg-sky",
  },
];

export function YangKamiLakukan() {
  return (
    <section
      id="aktivitas"
      className="py-24 px-4 bg-white relative overflow-hidden"
    >
      <div className="relative z-10 container mx-auto max-w-7xl">
        <ScrollAnimation className="mb-20">
          <h2 className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter uppercase text-center md:text-left">
            YANG <span className="text-primary italic">KAMI</span> <br />{" "}
            LAKUKAN
          </h2>
          <div className="w-full h-4 bg-black mt-8" />
        </ScrollAnimation>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <ScrollAnimation
              key={index}
              delay={(index % 3) * 0.1}
              amount={30}
              className="group"
            >
              <div className="brutal-card h-full flex flex-col hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                {/* Image Background Wrapper */}
                <div
                  className={`relative w-full h-56 border-b-4 border-black overflow-hidden ${activity.color}`}
                >
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover mix-blend-multiply opacity-80 transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Brutalist Label */}
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-black uppercase text-xs">
                    Phase {index + 1}
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-8 flex-grow">
                  <h3 className="text-3xl font-black text-black uppercase mb-4 tracking-tighter">
                    {activity.title}
                  </h3>
                  <p className="text-gray-800 font-bold leading-relaxed">
                    {activity.description}
                  </p>
                </div>

                {/* Brutalist Button within card */}
                <div className="px-8 pb-10">
                  <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${activity.color} w-3/4 group-hover:w-full transition-all duration-700`}
                    />
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>

      {/* Background Kinetic Text or Decorative large shape */}
      <div className="absolute -bottom-20 -right-20 pointer-events-none opacity-5">
        <p className="text-[20rem] font-black leading-none text-black select-none">
          PMS
        </p>
      </div>
    </section>
  );
}
