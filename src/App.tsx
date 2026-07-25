import BinaryRain from "./components/BinaryRain";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import ScrollReveal from "./components/ScrollReveal";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#00ff99]/30 selection:text-[#00ff99] relative">
      <CustomCursor />
      <BinaryRain />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden z-10">
        {/* Background Gradient Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00ff99]/05 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00ff99]/03 rounded-full blur-[120px] pointer-events-none" />
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-24 relative px-4 flex items-center z-10">
        <div className="container mx-auto relative z-10">
          <AboutSection />
        </div>
        {/* Subtle grid background for the middle section */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-24 bg-black/20 px-4 flex items-center z-10">
        <div className="container mx-auto">
          <ProjectsSection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-24 relative overflow-hidden px-4 flex items-center z-10">
        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[20%] bg-[#00ff99]/05 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto relative z-10">
          <ScrollReveal direction="up">
            <div className="glass-card p-1 items-stretch overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Form side */}
                <div className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#00ff99]/10 bg-black/20">
                  <ContactForm />
                </div>
                {/* Info side */}
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center bg-[#00ff99]/03 backdrop-blur-sm">
                  <ContactInfo />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#00ff99]/10 text-center relative z-10">
        <ScrollReveal>
          <div className="container">
            <p className="text-gray-600 font-mono text-xs tracking-widest">
              DESIGNED & BUILT BY <span className="text-[#00ff99]/80 font-bold">INAM UL HAQ</span>
            </p>
            <p className="text-gray-700 font-mono text-[10px] mt-2 opacity-50 uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} ALL SYSTEMS OPERATIONAL
            </p>
          </div>
        </ScrollReveal>
      </footer>

      <Navbar />
    </div>
  );
}

export default App;
