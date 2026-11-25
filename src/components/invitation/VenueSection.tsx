import palace from "@/assets/palace.webp.asset.json";
import venueFrame from "@/assets/venue-frame.webp.asset.json";
import { formatLongDate, wedding } from "@/lib/wedding";

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
    </section>
  );
}
