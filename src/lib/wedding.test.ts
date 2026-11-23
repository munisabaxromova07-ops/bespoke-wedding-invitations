import { describe, expect, it } from "vitest";
import { formatDotDate, formatLongDate, getCountdown, mapUrl, weddingDate, weekdayName, wedding } from "./wedding";

describe("wedding date helpers", () => {
  it("builds the wedding moment in Tashkent time", () => {
    expect(weddingDate({ ...wedding, day: 16, month: 12, year: 2026, time: "18:00" }).toISOString()).toBe(
      "2026-12-16T13:00:00.000Z",
    );
  });

  it("formats dates in Uzbek", () => {
    const w = { ...wedding, day: 5, month: 9, year: 2026 };
    expect(formatLongDate(w)).toBe("5 Sentabr 2026");
    expect(formatDotDate(w)).toBe("05.09.2026");
  });

  it("names the weekday", () => {
    expect(weekdayName({ ...wedding, day: 16, month: 12, year: 2026 })).toBe("Chorshanba");
  });

  it("counts down days, hours, minutes and seconds", () => {
    const target = new Date("2026-12-16T13:00:00Z");
    const now = new Date("2026-12-14T10:58:30Z");
    expect(getCountdown(target, now)).toEqual({ days: 2, hours: 2, minutes: 1, seconds: 30, done: false });
  });

  it("stops at zero once the wedding has started", () => {
    const target = new Date("2026-12-16T13:00:00Z");
    expect(getCountdown(target, new Date("2026-12-16T13:00:01Z")).done).toBe(true);
  });

  it("opens the venue pin in Google Maps", () => {
    const w = { ...wedding, lat: 40.270898, lng: 69.019998 };
    expect(mapUrl(w)).toBe("https://www.google.com/maps?q=40.270898,69.019998");
  });
});
