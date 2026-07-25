import React from "react";
import ScrollReveal from "./ScrollReveal";

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-[#00ff99]/08 last:border-0 group">
    <span className="text-gray-500 font-mono text-xs tracking-wider uppercase">{label}</span>
    <span className="text-white text-sm group-hover:text-[#00ff99] transition-colors duration-300">
      {value}
    </span>
  </div>
);

const AboutMeSection: React.FC = () => {
  const info: InfoItemProps[] = [
    { label: "Name", value: "Inam Ul Haq" },
    { label: "Specialization", value: "DevOps & Cloud" },
    { label: "Location", value: "Koblenz, Germany" },
    { label: "Email", value: "inam101001@gmail.com" },
    { label: "Phone", value: "+49 1521 0926 948" },
    { label: "Education", value: "MSc Web & Data Science" },
    { label: "Availability", value: "Open to New Projects ✓" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2 section-heading">About Me</h2>
      <p className="text-gray-500 font-mono text-sm mb-8 mt-3">
        // driving automation and infrastructure excellence
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScrollReveal direction="left">
          <div className="glass-card p-6 space-y-4">
            <p className="text-gray-400 font-mono text-[13px] leading-relaxed">
              I'm a Junior DevOps Engineer with hands-on experience in automating infrastructure and streamlining deployment processes. I specialize in containerization, CI/CD pipeline development, and Infrastructure as Code.
            </p>
            <p className="text-gray-500 font-mono text-[13px] leading-relaxed">
              Skilled in implementing monitoring solutions and optimizing system reliability for high-uptime services. Passionate about automation, continuous improvement, and collaborative DevOps practices.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Automation", "Containers", "IaC", "Cloud Native"].map((tag) => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right">
          <div className="glass-card p-6">
            {info.map((item) => (
              <InfoItem key={item.label} {...item} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default AboutMeSection;
