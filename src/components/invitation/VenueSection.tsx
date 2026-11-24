import { MapPin, Navigation } from "lucide-react";
import palace from "@/assets/palace.webp.asset.json";
import venueFrame from "@/assets/venue-frame.webp.asset.json";
import { Button } from "@/components/ui/button";
import { formatLongDate, mapUrl, wedding, yandexMapUrl } from "@/lib/wedding";

export function VenueSection() {
  return (
    <section className="px-5 pb-20 text-center">
      <p className="reveal eyebrow text-gold">Manzil</p>
      <div
        className="reveal relative mx-auto mt-6 aspect-[2/3] w-full max-w-[420px] bg-contain bg-center bg-no-repeat drop-shadow-xl"
        style={{ backgroundImage: `url(${venueFrame.url})` }}
      >
        <div className="absolute flex flex-col items-center justify-center px-2" style={{ left: "18%", right: "18%", top: "12%", bottom: "12%" }}>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">{wedding.venueName}</h2>
          <p className="mt-4 font-sans text-sm font-light">{wedding.city}</p>
          <p className="font-sans text-sm font-light text-muted-foreground">{wedding.address}</p>
          <p className="mt-5 font-display text-xl italic text-muted-foreground">{formatLongDate()}</p>
          <p className="font-display text-xl italic text-muted-foreground">{wedding.time}</p>
          <img src={palace.url} alt="To'yxona surati" className="mt-5 w-[85%]" />
        </div>
      </div>

      <p className="reveal mt-8 font-display text-xl italic text-muted-foreground">Xaritani qayerda ochasiz?</p>
      <div className="reveal mx-auto mt-4 grid max-w-[420px] grid-cols-2 gap-3">
        <Button asChild variant="invite" size="xl" className="px-4">
          <a href={mapUrl()} target="_blank" rel="noopener noreferrer">
            <MapPin />
            Google
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          size="xl"
          className="rounded-full border-gold bg-paper px-4 font-sans uppercase tracking-[0.22em] text-foreground shadow-soft"
        >
          <a href={yandexMapUrl()} target="_blank" rel="noopener noreferrer">
            <Navigation />
            Yandex
          </a>
        </Button>
      </div>
    </section>
  );
}
