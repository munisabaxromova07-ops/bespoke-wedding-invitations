import { describe, expect, it } from "vitest";
import { rsvpMessage } from "./rsvp-message";

describe("Telegram reply message", () => {
  it("shows the guest name without asking for a guest count", () => {
    expect(rsvpMessage({ name: "Dilshod", attending: true, note: null })).toBe(
      "💌 Yangi javob\n👤 Dilshod\n✅ Keladi",
    );
  });

  it("marks guests who cannot come and includes their wishes", () => {
    expect(rsvpMessage({ name: "Nodira", attending: false, note: "Baxtli bo'linglar!" })).toBe(
      "💌 Yangi javob\n👤 Nodira\n❌ Kela olmaydi\n📝 Baxtli bo'linglar!",
    );
  });
});
