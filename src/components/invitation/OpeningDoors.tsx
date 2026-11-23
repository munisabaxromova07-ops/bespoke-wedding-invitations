import { useEffect, useState } from "react";
import doors from "@/assets/doors.webp.asset.json";
import medallion from "@/assets/medallion.webp.asset.json";

type Props = { onOpen: () => void; onOpened: () => void };

export function OpeningDoors({ onOpen, onOpened }: Props) {
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const open = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
    window.setTimeout(onOpened, 1700);
  };

  const half = "absolute inset-y-0 w-1/2 bg-no-repeat shadow-glow";

  return (
    <div
      className={`fixed inset-0 z-50 cursor-pointer transition-opacity duration-700 ${opening ? "pointer-events-none" : ""}`}
      onClick={open}
      role="button"
      aria-label="Taklifnomani ochish"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open()}
    >
      <div
        className={`${half} left-0 ${opening ? "animate-door-left" : ""}`}
        style={{ backgroundImage: `url(${doors.url})`, backgroundSize: "200% 100%", backgroundPosition: "left center" }}
      >
        <div className="absolute inset-y-0 right-0 w-[2px] bg-gold" />
      </div>
      <div
        className={`${half} right-0 ${opening ? "animate-door-right" : ""}`}
        style={{ backgroundImage: `url(${doors.url})`, backgroundSize: "200% 100%", backgroundPosition: "right center" }}
      >
        <div className="absolute inset-y-0 left-0 w-[2px] bg-gold" />
      </div>

      <div
        className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${opening ? "opacity-0" : "opacity-100"}`}
      >
        <img src={medallion.url} alt="" className="w-32 drop-shadow-lg sm:w-40" />
        <div className="absolute bottom-[9vh] rounded-full border border-paper/70 bg-paper/50 px-8 py-3 backdrop-blur-sm">
          <span className="eyebrow animate-glow-pulse text-foreground/80">Ochish uchun bosing</span>
        </div>
      </div>
    </div>
  );
}
