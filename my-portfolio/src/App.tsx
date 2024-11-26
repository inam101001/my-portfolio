import BinaryRain from "./components/BinaryRain";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-['Cascadia_Code']">
      <BinaryRain />

      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <AboutSection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="bg-[#111] rounded-lg p-8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
              <div className="lg:col-span-1">
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Navbar />
    </div>
  );
}

export default App;
