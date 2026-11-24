import { describe, expect, it } from "vitest";
import { rsvpMessage } from "./rsvp-message";

describe("Telegram reply message", () => {
  it("shows the guest name and how many people are coming", () => {
    expect(rsvpMessage({ name: "Dilshod", attending: true, guests: 3, note: null })).toBe(
      "💌 Yangi javob\n👤 Dilshod\n✅ Keladi — 3 kishi",
    );
  });

  it("marks guests who cannot come and includes their wishes", () => {
    expect(rsvpMessage({ name: "Nodira", attending: false, guests: 0, note: "Baxtli bo'linglar!" })).toBe(
      "💌 Yangi javob\n👤 Nodira\n❌ Kela olmaydi\n📝 Baxtli bo'linglar!",
    );
  });
});
