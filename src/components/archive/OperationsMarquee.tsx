import { operationSignals } from "../../data/portfolio";

export function OperationsMarquee() {
  const repeatedSignals = [...operationSignals, ...operationSignals];

  return (
    <div className="operations-marquee" aria-label="Delivery workflow">
      <span className="sr-only">{operationSignals.join(", ")}</span>
      <div className="operations-track" aria-hidden="true">
        {repeatedSignals.map((signal, index) => (
          <span key={`${signal}-${index}`}>
            <i />
            {signal}
          </span>
        ))}
      </div>
    </div>
  );
}
