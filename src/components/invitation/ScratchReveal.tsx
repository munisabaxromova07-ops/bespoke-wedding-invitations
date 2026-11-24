import { useCallback, useEffect, useRef, useState } from "react";
import couple from "@/assets/couple.webp.asset.json";
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
  const mistRef = useRef<HTMLSpanElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
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
    const mist = mistRef.current ? getComputedStyle(mistRef.current).backgroundColor : "rgb(252,249,242)";
    const img = new Image();
    img.onload = () => {
      const scale = Math.max(rect.width / img.width, rect.height / img.height) * 1.6;
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.globalCompositeOperation = "source-over";
      ctx.filter = "blur(3px)";
      ctx.drawImage(img, (rect.width - w) / 2, (rect.height - h) / 2, w, h);
      ctx.filter = "none";
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = mist;
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.globalAlpha = 1;
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.font = `italic 500 ${Math.round(rect.width / 8)}px "Cormorant Garamond", serif`;
      ctx.fillText("Ko'rish uchun", rect.width / 2, rect.height / 2 - 6);
      ctx.fillText("suring", rect.width / 2, rect.height / 2 + rect.width / 8);
    };
    img.src = doors.url;
  }, []);

  // Soft-edged brush so the mist melts away instead of being cut out.
  const brush = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
    const g = ctx.createRadialGradient(x, y, r * 0.25, x, y, r);
    g.addColorStop(0, "rgba(0,0,0,1)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const scratch = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const r = rect.width / 5;
      ctx.globalCompositeOperation = "destination-out";

      // Fill the gap between pointer events for a smooth stroke.
      const from = last.current ?? { x, y };
      const dist = Math.hypot(x - from.x, y - from.y);
      const steps = Math.max(1, Math.ceil(dist / (r / 4)));
      for (let i = 1; i <= steps; i++) {
        const px = from.x + ((x - from.x) * i) / steps;
        const py = from.y + ((y - from.y) * i) / steps;
        brush(ctx, px, py, r);
        const c = Math.floor((px / rect.width) * COLS);
        const rr = Math.floor((py / rect.height) * ROWS);
        for (let dx = -1; dx <= 1; dx++)
          for (let dy = -1; dy <= 1; dy++) {
            const cc = c + dx;
            const ry = rr + dy;
            if (cc >= 0 && cc < COLS && ry >= 0 && ry < ROWS) cells.current.add(ry * COLS + cc);
          }
      }
      last.current = { x, y };
      if (cells.current.size > COLS * ROWS * 0.4) setCleared(true);
    },
    [brush],
  );

  return (
    <div className="select-none [-webkit-tap-highlight-color:transparent]" onDragStart={(e) => e.preventDefault()}>
      <div className="relative mx-auto aspect-[2/3] w-full max-w-[340px]">
        <div className="absolute overflow-hidden rounded-[50%] bg-paper" style={INNER}>
          <img draggable={false}
            src={couple.url}
            alt={`${wedding.groom} va ${wedding.bride}`}
            className={`h-full w-full object-cover transition-transform duration-[2500ms] ease-out ${cleared ? "scale-100" : "scale-110"}`}
            style={{ objectPosition: "50% 25%" }}
          />
        </div>

        <canvas
          ref={canvasRef}
          className={`absolute touch-none rounded-[50%] text-foreground transition-opacity duration-[1400ms] ease-out ${cleared ? "pointer-events-none opacity-0" : "opacity-100"}`}
          style={{ left: INNER.left, top: INNER.top, width: "56.5%", height: "64.6%" }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.currentTarget.setPointerCapture(e.pointerId);
            drawing.current = true;
            last.current = null;
            scratch(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => drawing.current && scratch(e.clientX, e.clientY)}
          onPointerUp={() => (drawing.current = false)}
          onPointerCancel={() => (drawing.current = false)}
        />
        <span ref={mistRef} className="hidden bg-paper" />

        <img draggable={false} src={ovalFrame.url} alt="" className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-xl" />
      </div>

      <div
        className={`mx-auto mt-4 flex max-w-xs flex-col items-center transition-all duration-1000 ease-out ${cleared ? "translate-y-0 opacity-100" : "translate-y-3 opacity-60"}`}
      >
        <span className="eyebrow text-[0.6rem] opacity-80">Sanani saqlang</span>
        <span className="mt-2 font-display text-6xl font-medium leading-none text-gold">{wedding.day}</span>
        <span className="mt-1 font-display text-2xl italic">{formatLongDate().split(" ").slice(1).join(" ")}</span>
        <span className="gold-rule my-3 w-16" />
        <span className="font-sans text-sm tracking-[0.2em]">
          {weekdayName()} · soat {wedding.time}
        </span>
      </div>
    </div>
  );
}
