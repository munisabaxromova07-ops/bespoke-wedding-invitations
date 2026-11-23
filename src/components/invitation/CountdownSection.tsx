import { useEffect, useState } from "react";
import { getCountdown, weddingDate, type Countdown } from "@/lib/wedding";

const LABELS: [keyof Omit<Countdown, "done">, string][] = [
  ["days", "kun"],
  ["hours", "soat"],
  ["minutes", "daqiqa"],
  ["seconds", "soniya"],
];

export function CountdownSection() {
  const [left, setLeft] = useState<Countdown | null>(null);

  useEffect(() => {
    const target = weddingDate();
    const tick = () => setLeft(getCountdown(target, new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="px-6 py-20 text-center">
      <p className="reveal eyebrow text-gold">Kutamiz</p>
      <h2 className="reveal mt-3 font-display text-4xl">
        {left?.done ? "Bugun bizning kunimiz!" : "To'yimizgacha qoldi"}
      </h2>
      <div className="reveal mx-auto mt-10 grid max-w-md grid-cols-4 gap-3">
        {LABELS.map(([key, label]) => (
          <div key={key} className="rounded-t-full border border-border bg-paper px-1 pb-4 pt-6 shadow-soft">
            <div className="font-display text-4xl font-medium tabular-nums text-foreground">
              {left ? String(left[key]).padStart(2, "0") : "--"}
            </div>
            <div className="mt-1 eyebrow text-[0.6rem] text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
