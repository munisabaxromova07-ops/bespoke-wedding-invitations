import garland from "@/assets/garland.webp.asset.json";
import { wedding } from "@/lib/wedding";

export function FooterSection() {
  return (
    <footer className="bg-sage px-6 pb-16 pt-12 text-center text-sage-foreground">
      <img src={garland.url} alt="" className="mx-auto w-44" />
      <p className="mt-6 font-display text-2xl italic">Sizni intizorlik bilan kutamiz</p>
      <p className="mt-3 font-display text-4xl">
        {wedding.groom} <span className="text-gold">&amp;</span> {wedding.bride}
      </p>
    </footer>
  );
}
