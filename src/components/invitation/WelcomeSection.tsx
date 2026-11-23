import garland from "@/assets/garland.webp.asset.json";
import { ScratchReveal } from "./ScratchReveal";

export function WelcomeSection() {
  return (
    <section id="welcome" className="bg-background px-3 py-6">
      <div className="arch-top relative mx-auto max-w-xl overflow-hidden rounded-b-[2rem] bg-sage px-6 pb-14 pt-6 text-center text-sage-foreground">
        <img src={garland.url} alt="" className="reveal mx-auto -mt-2 w-56" />
        <h2 className="reveal mt-6 font-display text-4xl leading-tight sm:text-5xl">
          Bu kunni siz bilan baham ko'rishdan juda xursandmiz
        </h2>
        <p className="reveal mx-auto mt-6 max-w-sm font-sans font-light leading-relaxed opacity-90">
          Sizning ishtirokingiz biz uchun juda qadrli. Sizni intizorlik bilan kutamiz.
        </p>
        <div className="reveal mt-10">
          <ScratchReveal />
        </div>
      </div>
    </section>
  );
}
