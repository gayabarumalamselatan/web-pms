import { HeroSection } from "@/components/hero-section";
import { SambutanKetua } from "@/components/sambutan-ketua";
import { YangKamiLakukan } from "@/components/yang-kami-lakukan";
import { Gallery } from "@/components/gallery";
import { MarkasBesar } from "@/components/markas-besar";
import { TemukanKami } from "@/components/temukan-kami";
import { MembersSection } from "@/components/members-section";
import { getLandingPageData } from "@/lib/services/cms";

export default async function Home() {
  const data = await getLandingPageData();

  return (
    <main className="w-full overflow-hidden">
      <HeroSection />
      <SambutanKetua greeting={data.greeting} />
      <YangKamiLakukan activities={data.activities} />
      {/* <MembersSection members={data.members} /> */}
      <Gallery albums={data.gallery} />
      <MarkasBesar />
      <TemukanKami socials={data.socials} />
    </main>
  );
}
