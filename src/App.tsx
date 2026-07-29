import { lazy, Suspense } from "react";
import { ScrollBeamHero } from "./components/ScrollBeamHero";
import { ArtifactBoundary } from "./components/artifacts/ArtifactBoundary";

const DevOpsInfinitySection = lazy(() =>
  import(
    "./components/artifacts/devops-infinity/DevOpsInfinitySection"
  ).then((module) => ({ default: module.DevOpsInfinitySection })),
);

function App() {
  return (
    <main>
      <ScrollBeamHero />
      <ArtifactBoundary
        fallback={<section className="devops-infinity-loading" aria-hidden="true" />}
      >
        <Suspense
          fallback={<section className="devops-infinity-loading" aria-hidden="true" />}
        >
          <DevOpsInfinitySection />
        </Suspense>
      </ArtifactBoundary>
    </main>
  );
}

export default App;
