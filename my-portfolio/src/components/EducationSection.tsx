import React from "react";

interface EducationItemProps {
  period: string;
  degree: string;
  institution: string;
}

const EducationItem: React.FC<EducationItemProps> = ({
  period,
  degree,
  institution,
}) => (
  <div className="bg-black/50 backdrop-blur-sm border border-[#00ff99]/20 p-6 rounded-lg">
    <div className="text-[#00ff99] mb-2">{period}</div>
    <h3 className="text-xl font-bold mb-2">{degree}</h3>
    <p className="text-gray-400">{institution}</p>
  </div>
);

const EducationSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold mb-6">My education</h2>
      <p className="text-gray-400 mb-8">
        Continuous learner with a strong foundation in computer science and
        modern web technologies.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EducationItem
          period="2020 - 2021"
          degree="Full Stack Web Development Bootcamp"
          institution="Online Course Platform"
        />
        <EducationItem
          period="2019"
          degree="Front-end Track"
          institution="Codecademy"
        />
        <EducationItem
          period="2020 - 2021"
          degree="Programming Course"
          institution="Online Course"
        />
        <EducationItem
          period="2019"
          degree="Certified Web Developer"
          institution="Tech Institute"
        />
      </div>
    </div>
  );
};

export default EducationSection;
