import { Music, VolumeX } from "lucide-react";

type Props = { playing: boolean; onToggle: () => void };

export function MusicButton({ playing, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? "Musiqani o'chirish" : "Musiqani yoqish"}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-paper text-primary shadow-soft transition-transform hover:scale-105"
    >
      {playing ? (
        <span className="flex h-5 items-end gap-[3px]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-primary animate-glow-pulse"
              style={{ height: `${[60, 100, 75, 45][i]}%`, animationDelay: `${i * 0.25}s`, animationDuration: "1s" }}
            />
          ))}
        </span>
      ) : (
        <span className="relative">
          <Music className="h-5 w-5" />
          <VolumeX className="absolute -right-3 -top-2 h-3.5 w-3.5 opacity-70" />
        </span>
      )}
    </button>
  );
}
