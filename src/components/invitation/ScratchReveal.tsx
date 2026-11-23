import { useCallback, useEffect, useRef, useState } from "react";
import doors from "@/assets/doors.webp.asset.json";
import ovalFrame from "@/assets/oval-frame.webp.asset.json";
import { formatLongDate, wedding, weekdayName } from "@/lib/wedding";

const COLS = 12;
const ROWS = 18;

// Oval opening of the frame image, as fractions of its size.
const INNER = { left: "22%", right: "21.5%", top: "18.3%", bottom: "17.1%" };

export function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cells = useRef(new Set<number>());
  const drawing = useRef(false);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const textColor = getComputedStyle(canvas).color;
    const img = new Image();
    img.onload = () => {
      const scale = Math.max(rect.width / img.width, rect.height / img.height) * 1.6;
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(img, (rect.width - w) / 2, (rect.height - h) / 2, w, h);
      ctx.fillStyle = "rgba(255,250,240,0.35)";
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.font = `italic 500 ${Math.round(rect.width / 8)}px "Cormorant Garamond", serif`;
      ctx.fillText("Ko'rish uchun", rect.width / 2, rect.height / 2 - 6);
      ctx.fillText("suring", rect.width / 2, rect.height / 2 + rect.width / 8);
    };
    img.src = doors.url;
  }, []);

  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const r = rect.width / 7;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    const c = Math.floor((x / rect.width) * COLS);
    const rr = Math.floor((y / rect.height) * ROWS);
    for (let dx = -1; dx <= 1; dx++)
      for (let dy = -1; dy <= 1; dy++) {
        const cc = c + dx;
        const ry = rr + dy;
        if (cc >= 0 && cc < COLS && ry >= 0 && ry < ROWS) cells.current.add(ry * COLS + cc);
      }
    if (cells.current.size > COLS * ROWS * 0.45) setCleared(true);
  }, []);

  return (
    <div className="relative mx-auto aspect-[2/3] w-full max-w-[340px]">
      <div
        className="absolute flex flex-col items-center justify-center overflow-hidden rounded-[50%] bg-paper text-center text-foreground"
        style={INNER}
      >
        <span className="eyebrow text-[0.6rem] text-muted-foreground">Sanani saqlang</span>
        <span className="mt-2 font-display text-7xl font-medium leading-none text-gold">{wedding.day}</span>
        <span className="mt-1 font-display text-2xl italic">{formatLongDate().split(" ").slice(1).join(" ")}</span>
        <span className="gold-rule my-3 w-16" />
        <span className="font-sans text-sm tracking-[0.2em]">{weekdayName()}</span>
        <span className="font-sans text-sm tracking-[0.2em] text-muted-foreground">soat {wedding.time}</span>
      </div>

      <canvas
        ref={canvasRef}
        className={`absolute touch-none rounded-[50%] text-foreground transition-opacity duration-700 ${cleared ? "pointer-events-none opacity-0" : "opacity-100"}`}
        style={{ left: INNER.left, top: INNER.top, width: "56.5%", height: "64.6%" }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          drawing.current = true;
          scratch(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => drawing.current && scratch(e.clientX, e.clientY)}
        onPointerUp={() => (drawing.current = false)}
        onPointerCancel={() => (drawing.current = false)}
      />

      <img src={ovalFrame.url} alt="" className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-xl" />
    </div>
  );
}
