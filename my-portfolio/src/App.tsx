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
    <div className="min-h-screen bg-black text-white font-['Cascadia_Code']">
      <CustomCursor />
      <BinaryRain />

      {/* Hero Section */}
      <ScrollReveal>
        <section
          id="home"
          className="min-h-screen flex items-center justify-center"
        >
          <Hero />
        </section>
      </ScrollReveal>

      {/* About Section */}
      <ScrollReveal>
        <section id="about" className="min-h-screen py-20">
          <div className="container">
            <AboutSection />
          </div>
        </section>
      </ScrollReveal>

      {/* Projects Section */}
      <ScrollReveal>
        <section id="projects" className="min-h-screen py-20">
          <div className="container">
            <ProjectsSection />
          </div>
        </section>
      </ScrollReveal>

      {/* Contact Section */}
      <ScrollReveal>
        <section id="contact" className="min-h-screen py-4">
          <div className="container">
            <div className="bg-black/50 backdrop-blur-sm border border-[#00ff99]/20 rounded-lg p-8 shadow-xl max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <ContactForm />
                </div>
                <div className="lg:col-span-1 flex justify-center items-center h-full">
                  <ContactInfo />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <Navbar />
    </div>
  );
}

export default App;
