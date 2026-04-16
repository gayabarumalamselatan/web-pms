import { HeroSection } from "@/components/hero-section";
import { SambutanKetua } from "@/components/sambutan-ketua";
import { YangKamiLakukan } from "@/components/yang-kami-lakukan";
import { Gallery } from "@/components/gallery";
import { MarkasBesar } from "@/components/markas-besar";
import { TemukanKami } from "@/components/temukan-kami";

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <HeroSection />
      <SambutanKetua />
      <YangKamiLakukan />
      <Gallery />
      <MarkasBesar />
      <TemukanKami />
    </main>
  );
}
