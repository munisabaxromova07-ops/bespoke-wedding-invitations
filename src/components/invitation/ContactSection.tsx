import { Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { phoneHref, telegramHref, wedding } from "@/lib/wedding";

export function ContactSection() {
  return (
    <section className="px-5 pb-20 text-center">
      <div className="reveal mx-auto max-w-md rounded-[2rem] border border-border bg-paper px-6 py-10 shadow-soft">
        <p className="eyebrow text-gold">Savollaringiz bormi?</p>
        <h2 className="mt-3 font-display text-3xl leading-snug">Savollaringiz bo'lsa, shu raqamga yozing</h2>
        <a href={phoneHref()} className="mt-5 block font-display text-3xl font-medium tracking-wide text-gold">
          {wedding.phone}
        </a>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button asChild variant="invite" size="xl" className="px-4">
            <a href={phoneHref()}>
              <Phone />
              Qo'ng'iroq
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="xl"
            className="rounded-full border-gold bg-background px-4 font-sans uppercase tracking-[0.22em] text-foreground shadow-soft"
          >
            <a href={telegramHref()} target="_blank" rel="noopener noreferrer">
              <Send />
              Telegram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
