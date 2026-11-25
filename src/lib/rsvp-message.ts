export type RsvpInput = { name: string; attending: boolean; note: string | null };

// Plain-text Telegram notification for one guest reply.
export function rsvpMessage(r: RsvpInput): string {
  const lines = [
    "💌 Yangi javob",
    `👤 ${r.name}`,
    r.attending ? "✅ Keladi" : "❌ Kela olmaydi",
  ];
  if (r.note) lines.push(`📝 ${r.note}`);
  return lines.join("\n");
}
