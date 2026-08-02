import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { primaryTools } from "../data/portfolio";
import { HeroCommandDeck } from "./artifacts/HeroCommandDeck";
import { ScrambleText } from "./ScrambleText";

const heroStages = ["Flat", "Lift", "Read", "Release"];
const heroHeadline = ["I build the", "systems between", "commit and", "production."];

function formatBerlinTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function formatBerlinOffset(date: Date): string {
  const timeZoneName = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    timeZoneName: "shortOffset",
  })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;
  const hours = Number(timeZoneName?.match(/GMT([+-]\d+)/)?.[1] ?? 1);
  const sign = hours >= 0 ? "+" : "-";
  return `UTC ${sign}${String(Math.abs(hours)).padStart(2, "0")}:00`;
}

export function HeroSection() {
  const [clock, setClock] = useState(() => formatBerlinTime(new Date()));
  const [utcOffset, setUtcOffset] = useState(() => formatBerlinOffset(new Date()));

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setClock(formatBerlinTime(now));
      setUtcOffset(formatBerlinOffset(now));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <section id="home" className="hero-world">
        <div className="hero-stage">
          <div className="hero-clock" aria-hidden="true">
            <span>{utcOffset}</span>
            <span>·</span>
            <span>{clock}</span>
          </div>
          <div className="hero-copy-new">
            <p className="hero-role">
              <span aria-hidden="true" /> DevOps &amp; Cloud Engineer
            </p>
            <ScrambleText lines={heroHeadline} />
            <p className="hero-summary">
              Backend engineering, automated delivery,
              <br />
              cloud infrastructure, and observability,
              <br />
              designed as one connected system.
            </p>
            <div className="hero-actions">
              <a className="button" href="#work">
                View selected work
              </a>
            </div>
            <div className="hero-facts">
              <span>
                <MapPin aria-hidden="true" /> Koblenz, Germany
              </span>
            </div>
          </div>

          <div className="hero-relief">
            <HeroCommandDeck />
          </div>

          <ol className="motion-rail motion-rail--minimal" aria-label="Artifact stages">
            {heroStages.map((stage, index) => (
              <li key={stage} data-active={index === 0}>
                <span className="sr-only">{stage}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="profile" className="handoffs">
        <div className="handoffs-intro">
          <h2>Engineering the handoffs.</h2>
          <p>
            I work across application code, CI/CD, infrastructure as code,
            containers, cloud delivery, and monitoring. The goal is simple:
            make releases repeatable and production easier to understand.
          </p>
        </div>
        <div className="handoff-grid">
          <article>
            <img
              className="handoff-mark"
              src="/backend-api-flow.svg"
              alt=""
              aria-hidden="true"
            />
            <h3>Backend systems</h3>
            <p>
              Designing and shipping reliable services, APIs, and data
              pipelines that scale with clarity.
            </p>
          </article>
          <article>
            <img
              className="handoff-mark"
              src="/delivery-automation-flow.svg"
              alt=""
              aria-hidden="true"
            />
            <h3>Delivery automation</h3>
            <p>
              CI/CD pipelines, quality gates, and progressive delivery for
              fast, safe releases.
            </p>
          </article>
          <article>
            <img
              className="handoff-mark"
              src="/cloud-infrastructure.svg"
              alt=""
              aria-hidden="true"
            />
            <h3>Cloud infrastructure</h3>
            <p>
              Terraform, containers, and Kubernetes, infrastructure that is
              versioned and repeatable.
            </p>
          </article>
          <article>
            <img
              className="handoff-mark"
              src="/observability-chart.svg"
              alt=""
              aria-hidden="true"
            />
            <h3>Observability</h3>
            <p>
              Logs, metrics, and traces that connect signals to actionable
              insight.
            </p>
          </article>
        </div>
        <div className="tool-marquee">
          <p className="sr-only">Core tools: {primaryTools.join(", ")}</p>
          <div aria-hidden="true">
            {primaryTools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
