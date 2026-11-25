import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { rsvpMessage } from "./rsvp-message";

const rsvpSchema = z.object({
  name: z.string().trim().min(2).max(80),
  attending: z.boolean(),
  note: z.string().trim().max(500).nullable(),
});

async function notifyTelegram(text: string) {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const telegramKey = process.env["TELEGRAM_API_KEY"];
  const chatId = process.env["TELEGRAM_CHAT_ID"];
  if (!lovableKey || !telegramKey || !chatId) {
    console.error("Telegram notification skipped: missing configuration");
    return;
  }
  const res = await fetch("https://connector-gateway.lovable.dev/telegram/sendMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": telegramKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!res.ok) console.error(`Telegram sendMessage failed [${res.status}]: ${await res.text()}`);
}

export const submitRsvp = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => rsvpSchema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"]!;
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
    // Guest counts are no longer collected; zero marks them as unspecified.
    const row = { ...data, guests: 0, note: data.note || null };
    const { error } = await supabase.from("rsvps").insert(row);
    if (error) {
      console.error("RSVP insert failed:", error.message);
      return { ok: false as const };
    }
    try {
      await notifyTelegram(rsvpMessage(row));
    } catch (e) {
      console.error("Telegram notification error:", e);
    }
    return { ok: true as const };
  });
