import { useSuspenseQuery } from "@tanstack/react-query";
import { Heart, MessageCircle } from "lucide-react";
import { wishesQueryOptions } from "@/lib/wishes";

export function WishesSection() {
  const { data: wishes } = useSuspenseQuery(wishesQueryOptions);

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
          <div className="mt-8 space-y-4 text-left" aria-live="polite">
            {wishes.map((wish) => (
              <article key={wish.id} className="rounded-2xl border border-border bg-paper p-5 shadow-soft">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl">{wish.name}</h3>
                  <Heart className="h-4 w-4 shrink-0 fill-blush text-gold" aria-hidden="true" />
                </div>
                <p className="mt-3 whitespace-pre-wrap break-words font-sans text-sm font-light leading-relaxed text-muted-foreground">
                  {wish.note}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
