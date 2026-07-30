import { lazy, Suspense } from "react";
import { ArchiveHeader } from "./components/archive/ArchiveHeader";
import { ContactArchive } from "./components/archive/ContactArchive";
import { ExperienceArchive } from "./components/archive/ExperienceArchive";
import { MagneticHero } from "./components/archive/MagneticHero";
import { OperationsMarquee } from "./components/archive/OperationsMarquee";
import { ProjectArchive } from "./components/archive/ProjectArchive";
import { ScrollStatement } from "./components/archive/ScrollStatement";
import { SystemLedger } from "./components/archive/SystemLedger";
import { ArtifactBoundary } from "./components/artifacts/ArtifactBoundary";

const ProcessArchive = lazy(() =>
  import("./components/archive/ProcessArchive").then((module) => ({
    default: module.ProcessArchive,
  })),
);

function App() {
  return (
    <div className="archive-site">
      <ArchiveHeader />
      <main id="top">
        <MagneticHero />
        <OperationsMarquee />
        <SystemLedger />
        <ProjectArchive />
        <ScrollStatement />
        <ArtifactBoundary
          fallback={<section className="process-loading" aria-hidden="true" />}
        >
          <Suspense
            fallback={<section className="process-loading" aria-hidden="true" />}
          >
            <ProcessArchive />
          </Suspense>
        </ArtifactBoundary>
        <ExperienceArchive />
        <ContactArchive />
      </main>
    </div>
  );
}

export default App;
