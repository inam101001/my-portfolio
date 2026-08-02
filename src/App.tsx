import { Analytics } from "@vercel/analytics/react";
import { ContactSection } from "./components/ContactSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SiteNav } from "./components/SiteNav";
import { SystemsSection } from "./components/SystemsSection";

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteNav />
      <main id="main-content">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <SystemsSection />
        <ContactSection />
      </main>
      <Analytics />
    </>
  );
}

export default App;
