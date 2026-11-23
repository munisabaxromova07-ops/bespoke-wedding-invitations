import { ChevronDown } from "lucide-react";
import heroFrame from "@/assets/hero-frame.webp.asset.json";
import { formatDotDate, wedding } from "@/lib/wedding";

export function HeroSection({ show }: { show: boolean }) {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-cover bg-center px-[16%] text-center"
      style={{ backgroundImage: `url(${heroFrame.url})` }}
    >
      {show && (
        <div className="flex flex-col items-center">
          <p className="animate-fade-up font-display text-lg italic text-muted-foreground" style={{ animationDelay: "0.2s" }}>
            Assalomu alaykum, aziz mehmon
          </p>
          <h1 className="mt-6 font-display font-medium italic leading-[0.95] text-foreground">
            <span className="block animate-fade-up text-6xl sm:text-7xl" style={{ animationDelay: "0.5s" }}>
              {wedding.groom}
            </span>
            <span className="my-2 block animate-fade-up font-display text-3xl not-italic text-gold" style={{ animationDelay: "0.8s" }}>
              &amp;
            </span>
            <span className="block animate-fade-up text-6xl sm:text-7xl" style={{ animationDelay: "1.1s" }}>
              {wedding.bride}
            </span>
          </h1>
          <p className="mt-8 animate-fade-up font-display text-xl italic text-muted-foreground" style={{ animationDelay: "1.4s" }}>
            sizni to'ylariga taklif qiladi
          </p>
          <p className="mt-4 animate-fade-up font-sans text-lg tracking-[0.4em] text-gold" style={{ animationDelay: "1.7s" }}>
            {formatDotDate()}
          </p>
        </div>
      )}

      <a
        href="#welcome"
        className="absolute bottom-[7vh] flex flex-col items-center gap-1 text-muted-foreground"
        aria-label="Pastga"
      >
        <span className="eyebrow">Pastga suring</span>
        <ChevronDown className="h-4 w-4 animate-float-down" />
      </a>
    </section>
  );
}
