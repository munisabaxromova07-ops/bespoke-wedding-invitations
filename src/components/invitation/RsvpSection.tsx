import { useState, type FormEvent } from "react";
import { Heart } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitRsvp } from "@/lib/rsvp.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function RsvpSection() {
  const [attending, setAttending] = useState(true);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const send = useServerFn(submitRsvp);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const guests = attending ? Number(form.get("guests") ?? 1) : 0;
    const note = String(form.get("note") ?? "").trim();
    if (name.length < 2) {
      setError("Iltimos, ismingizni yozing");
      return;
    }
    setError("");
    setStatus("sending");
    const result = await send({ data: { name, attending, guests, note: note || null } }).catch(() => null);
    if (!result?.ok) {
      setStatus("error");
      setError("Yuborib bo'lmadi. Birozdan keyin qayta urinib ko'ring.");
      return;
    }
    setStatus("done");
  }

  return (
    <section className="px-5 pb-24">
      <div className="reveal arch-top mx-auto max-w-md border border-border bg-paper px-6 pb-10 pt-16 text-center shadow-soft">
        <p className="eyebrow text-gold">Javobingiz</p>
        <h2 className="mt-3 font-display text-4xl">Tashrifingizni tasdiqlang</h2>

        {status === "done" ? (
          <div className="mt-8 flex flex-col items-center gap-3">
            <Heart className="h-8 w-8 fill-blush text-gold" />
            <p className="font-display text-2xl italic">Rahmat! Javobingiz qabul qilindi.</p>
            <p className="font-sans text-sm font-light text-muted-foreground">
              {attending ? "Sizni to'yimizda ko'rishdan xursand bo'lamiz." : "Sizni sog'inib qolamiz."}
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-5 text-left">
            <div>
              <label htmlFor="name" className="eyebrow text-[0.65rem] text-muted-foreground">
                Ismingiz
              </label>
              <Input id="name" name="name" maxLength={80} placeholder="Ism va familiya" className="mt-2 h-12 bg-background" />
            </div>

            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Kelasizmi?">
              {[
                { v: true, label: "Albatta kelaman" },
                { v: false, label: "Kela olmayman" },
              ].map((o) => (
                <button
                  key={o.label}
                  type="button"
                  role="radio"
                  aria-checked={attending === o.v}
                  onClick={() => setAttending(o.v)}
                  className={`h-12 rounded-full border font-sans text-sm transition-colors ${
                    attending === o.v
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-gold"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>

            {attending && (
              <div>
                <label htmlFor="guests" className="eyebrow text-[0.65rem] text-muted-foreground">
                  Necha kishi bo'lasiz?
                </label>
                <select
                  id="guests"
                  name="guests"
                  defaultValue="1"
                  className="mt-2 h-12 w-full rounded-md border border-input bg-background px-3 font-sans text-sm"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} kishi
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="note" className="eyebrow text-[0.65rem] text-muted-foreground">
                Tilaklaringiz (ixtiyoriy)
              </label>
              <Textarea id="note" name="note" maxLength={500} rows={3} placeholder="Yoshlarga tilaklar..." className="mt-2 bg-background" />
            </div>

            {error && <p className="text-center font-sans text-sm text-destructive">{error}</p>}

            <Button type="submit" variant="invite" size="xl" className="w-full" disabled={status === "sending"}>
              {status === "sending" ? "Yuborilmoqda..." : "Yuborish"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
