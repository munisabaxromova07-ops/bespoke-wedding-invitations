// All invitation details live here so they can be changed in one place.
export const wedding = {
  groom: "Asrorjon",
  bride: "Kamola",
  day: 28,
  month: 12,
  year: 2026,
  time: "16:00",
  // Tashkent time (UTC+5)
  utcOffset: "+05:00",
  venueName: "Sherbek ota to'yxonasi",
  city: "Sirdaryo viloyati, Boyovut tumani",
  address: "Farhodobod",
  // Map pin of the venue
  lat: 40.270898,
  lng: 69.019998,
};

export type Wedding = typeof wedding;

const MONTHS = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabr",
];

const WEEKDAYS = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];

const pad = (n: number) => String(n).padStart(2, "0");

export function weddingDate(w: Wedding = wedding): Date {
  return new Date(`${w.year}-${pad(w.month)}-${pad(w.day)}T${w.time}:00${w.utcOffset}`);
}

export function formatLongDate(w: Wedding = wedding): string {
  return `${w.day} ${MONTHS[w.month - 1] ?? ""} ${w.year}`;
}

export function formatDotDate(w: Wedding = wedding): string {
  return `${pad(w.day)}.${pad(w.month)}.${w.year}`;
}

export function weekdayName(w: Wedding = wedding): string {
  const d = new Date(Date.UTC(w.year, w.month - 1, w.day));
  return WEEKDAYS[d.getUTCDay()] ?? "";
}

export function mapUrl(w: Wedding = wedding): string {
  return `https://www.google.com/maps?q=${w.lat},${w.lng}`;
}

export function yandexMapUrl(w: Wedding = wedding): string {
  // Yandex expects longitude first
  return `https://yandex.uz/maps/?pt=${w.lng},${w.lat}&z=16&l=map`;
}

export function mapEmbedUrl(w: Wedding = wedding): string {
  return `https://maps.google.com/maps?q=${w.lat},${w.lng}&z=15&output=embed`;
}

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

export function getCountdown(target: Date, now: Date): Countdown {
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: false,
  };
}
