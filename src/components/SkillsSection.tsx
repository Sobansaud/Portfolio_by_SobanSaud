'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaPython, FaGit, FaGithub,
} from 'react-icons/fa';
import {
  SiTailwindcss, SiNextdotjs, SiTypescript, SiFastapi, SiDjango,
  SiVercel, SiPostman, SiStreamlit
} from 'react-icons/si';

const skillsData = {
  frontend: [
    { icon: <FaHtml5 />, name: 'HTML5' },
    { icon: <FaCss3Alt />, name: 'CSS3' },
    { icon: <FaJs />, name: 'JavaScript' },
    { icon: <SiTypescript />, name: 'TypeScript' },
    { icon: <SiNextdotjs />, name: 'Next.js' },
    { icon: <FaReact />, name: 'React' },
    { icon: <FaBootstrap />, name: 'Bootstrap' },
    { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
  ],
  backend: [
    { icon: <FaPython />, name: 'Python' },
    { icon: <SiFastapi />, name: 'FastAPI' },
    { icon: <SiDjango />, name: 'Django' },
  ],
  tools: [
    { icon: <FaGit />, name: 'Git' },
    { icon: <FaGithub />, name: 'GitHub' },
    { icon: <SiVercel />, name: 'Vercel' },
    { icon: <SiPostman />, name: 'Postman' },
    { icon: <SiStreamlit />, name: 'Streamlit' },
  ],
};

const SkillItem = ({ icon, name }: { icon: React.ReactNode; name: string }) => (
  <motion.div
    whileHover={{ scale: 1.08 }}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    role="listitem"
    tabIndex={0}
    className="surface rounded-xl p-4 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 flex flex-col items-center justify-center hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-transform duration-200"
  >
    <div className="text-3xl sm:text-4xl md:text-5xl mb-2 text-indigo-300 drop-shadow">{icon}</div>
    <p className="text-xs sm:text-sm md:text-base font-semibold text-white text-center truncate w-full">{name}</p>
  </motion.div>
);

const SkillsColumn = ({
  title,
  skills,
}: {
  title: string;
  skills: { icon: React.ReactNode; name: string }[];
}) => (
  <div className="w-full md:w-1/2 px-2 md:px-4 mb-8 md:mb-0">
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
      {title}
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
      {skills.map((skill) => (
        <SkillItem key={skill.name} icon={skill.icon} name={skill.name} />
      ))}
    </div>
  </div>
);

const SkillsSection = () => {
  return (
    <section
      role="region"
      aria-labelledby="skills-title"
      className="relative py-20 px-6 md:px-20 min-h-[80vh] flex flex-col items-center justify-center overflow-hidden"
    >

      {/* Section Title */}
      <h1 id="skills-title" className="text-4xl md:text-5xl font-extrabold text-center text-white mb-6 z-10 tracking-tight leading-tight">
        <span className="text-indigo-200">🚀 My Technical Skills</span>
      </h1>

      <p className="text-center text-sm md:text-base text-white/80 max-w-2xl mb-10">
        Tools and technologies I use frequently — organized by area. Click or tab through items to focus.
      </p>

      {/* Skills Grid */}
      <div className="flex flex-col lg:flex-row gap-10 z-10 w-full max-w-6xl px-2 md:px-0">
        <SkillsColumn title="🖥️ Frontend Development" skills={skillsData.frontend} />
        <SkillsColumn title="🧠 Backend & Frameworks" skills={skillsData.backend} />
      </div>

      {/* Tools Section */}
      <div className="w-full mt-12 md:mt-16 px-2 md:px-4 max-w-5xl z-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">
          🛠️ Tools & Platforms
        </h2>
        <div role="list" className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-items-center">
          {skillsData.tools.map((tool) => (
            <SkillItem key={tool.name} icon={tool.icon} name={tool.name} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default SkillsSection;
