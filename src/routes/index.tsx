import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import music from "@/assets/wedding-music.mp3.asset.json";
import { OpeningDoors } from "@/components/invitation/OpeningDoors";
import { MusicButton } from "@/components/invitation/MusicButton";
import { HeroSection } from "@/components/invitation/HeroSection";
import { WelcomeSection } from "@/components/invitation/WelcomeSection";
import { CountdownSection } from "@/components/invitation/CountdownSection";
import { VenueSection } from "@/components/invitation/VenueSection";
import { RsvpSection } from "@/components/invitation/RsvpSection";
import { ContactSection } from "@/components/invitation/ContactSection";
import { FooterSection } from "@/components/invitation/FooterSection";
import { useReveal } from "@/hooks/use-reveal";
import { formatLongDate, wedding } from "@/lib/wedding";

const title = `${wedding.groom} & ${wedding.bride} — To'y taklifnomasi`;
const description = `${formatLongDate()}, ${wedding.venueName}. Sizni to'yimizga taklif qilamiz.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const [doorsGone, setDoorsGone] = useState(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const revealRef = useReveal<HTMLDivElement>();

  const play = () => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.55;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) play();
    else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <main ref={revealRef} className="min-h-screen overflow-x-hidden bg-background">
      <audio ref={audioRef} src={music.url} loop preload="auto" />
      {!doorsGone && (
        <OpeningDoors
          onOpen={() => {
            setStarted(true);
            play();
          }}
          onOpened={() => setDoorsGone(true)}
        />
      )}
      <HeroSection show={started} />
      <WelcomeSection />
      <CountdownSection />
      <VenueSection />
      <RsvpSection />
      <ContactSection />
      <FooterSection />
      {doorsGone && <MusicButton playing={playing} onToggle={toggle} />}
    </main>
  );
}
