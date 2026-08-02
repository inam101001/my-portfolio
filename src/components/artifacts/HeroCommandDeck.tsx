import { useState, type CSSProperties } from "react";

type DeckStage = {
  label: string;
  tone: string;
};

const deckStages: DeckStage[] = [
  { label: "Build", tone: "var(--ink-soft)" },
  { label: "Scan", tone: "var(--ink-soft)" },
  { label: "Push", tone: "var(--blue)" },
  { label: "Deploy", tone: "var(--green)" },
  { label: "Observe", tone: "var(--acid)" },
];

export function HeroCommandDeck() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="hero-deck">
      <div className="hero-deck-stage">
        <div
          className={isPaused ? "hero-deck-rig is-paused" : "hero-deck-rig"}
          aria-hidden="true"
        >
          <div className="hero-deck-plane" />
          {deckStages.map((stage, index) => (
            <div
              key={stage.label}
              className="hero-deck-col"
              data-label={stage.label}
              style={{ "--i": index, "--tone": stage.tone } as CSSProperties}
            />
          ))}
          <div className="hero-deck-signal" />
        </div>
      </div>
      <div className="hero-deck-controls">
        <button
          type="button"
          className="hero-deck-toggle"
          aria-pressed={isPaused}
          onClick={() => setIsPaused((paused) => !paused)}
        >
          {isPaused ? "Play" : "Pause"}
        </button>
        <span className="hero-deck-caption">
          This site&apos;s own pipeline, rendered live
        </span>
      </div>
    </div>
  );
}
