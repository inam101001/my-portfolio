import React from "react";

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-gray-400">{label}</span>
    <span className="text-white">{value}</span>
  </div>
);

const AboutMeSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold mb-6 ">About me</h2>
      <p className="text-gray-400 mb-8">
        Full Stack Developer passionate about creating innovative web solutions
        and learning new technologies.
      </p>

      <div className="bg-black/50 backdrop-blur-sm border border-[#00ff99]/20 p-6 rounded-lg space-y-4">
        <InfoItem label="Name" value="Inam Ul Haq" />
        <InfoItem label="Experience" value="2+ Years" />
        <InfoItem label="Phone" value="(+92) 348 620 5084" />
        <InfoItem label="Email" value="inam101001@gmail.com" />
        <InfoItem label="Languages" value="English, Urdu" />
        <InfoItem label="Freelance" value="Available" />
      </div>
    </div>
  );
};

export default AboutMeSection;
