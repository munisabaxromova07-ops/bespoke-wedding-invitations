export type RsvpInput = { name: string; attending: boolean; guests: number; note: string | null };

// Plain-text Telegram notification for one guest reply.
export function rsvpMessage(r: RsvpInput): string {
  const lines = [
    "💌 Yangi javob",
    `👤 ${r.name}`,
    r.attending ? `✅ Keladi — ${r.guests} kishi` : "❌ Kela olmaydi",
  ];
  if (r.note) lines.push(`📝 ${r.note}`);
  return lines.join("\n");
}
