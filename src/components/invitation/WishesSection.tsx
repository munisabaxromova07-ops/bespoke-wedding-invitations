import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Heart, MessageCircle } from "lucide-react";
import { wishesQueryOptions } from "@/lib/wishes";

export function WishesSection() {
  const { data: wishes } = useSuspenseQuery(wishesQueryOptions);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (wishes.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const exitTimer = window.setTimeout(() => setVisible(false), 4200);
    const nextTimer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % wishes.length);
      setVisible(true);
    }, 5000);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(nextTimer);
    };
  }, [activeIndex, wishes.length]);

  const activeWish = wishes.length > 0 ? wishes[activeIndex % wishes.length] : undefined;

  return (
    <section className="px-5 pb-24" aria-labelledby="wishes-title">
      <div className="reveal mx-auto max-w-md text-center">
        <p className="eyebrow text-gold">Ezgu so'zlar</p>
        <h2 id="wishes-title" className="mt-3 font-display text-4xl">
          Mehmonlar tilaklari
        </h2>
        <div className="gold-rule mx-auto mt-5 w-28" />

        {wishes.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-border bg-paper px-6 py-8 shadow-soft">
            <MessageCircle className="mx-auto h-7 w-7 text-gold" />
            <p className="mt-4 font-display text-xl italic text-muted-foreground">
              Hali tilaklar yo'q. Birinchi bo'lib ezgu tilak yozing.
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <div className="relative flex min-h-72 items-center justify-center overflow-hidden px-4 py-8">
              <div className="door-light pointer-events-none absolute inset-0 opacity-50" />
              {activeWish && (
                <article
                  key={activeWish.id}
                  className={`relative ${visible ? "animate-wish-enter" : "animate-wish-exit"}`}
                >
                  <Heart className="mx-auto h-6 w-6 fill-blush text-gold" aria-hidden="true" />
                  <blockquote className="mt-5 whitespace-pre-wrap break-words font-display text-3xl italic leading-snug">
                    “{activeWish.note}”
                  </blockquote>
                  <p className="mt-5 font-sans text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    — {activeWish.name}
                  </p>
                </article>
              )}
            </div>

            {wishes.length > 1 && (
              <div className="flex justify-center gap-2" aria-label="Tilaklar">
                {wishes.map((wish, index) => (
                  <button
                    key={wish.id}
                    type="button"
                    aria-label={`${index + 1}-tilakni ko'rsatish`}
                    aria-current={index === activeIndex % wishes.length}
                    onClick={() => {
                      setActiveIndex(index);
                      setVisible(true);
                    }}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === activeIndex % wishes.length ? "bg-gold" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
