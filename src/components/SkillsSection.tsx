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

const SkillItem = ({ icon, name }: { icon: JSX.Element; name: string }) => (
  <motion.div
    whileHover={{ scale: 1.15 }}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center w-28 h-28 bg-white/10 backdrop-blur-sm rounded-xl border border-purple-400/30 hover:border-purple-400 shadow-md hover:shadow-purple-500/30 transition-all duration-300 ease-in-out"
  >
    <div className="text-4xl md:text-5xl mb-2 text-purple-300 drop-shadow">{icon}</div>
    <p className="text-xs md:text-sm font-medium text-white text-center">{name}</p>
  </motion.div>
);

const SkillsColumn = ({
  title,
  skills,
}: {
  title: string;
  skills: { icon: JSX.Element; name: string }[];
}) => (
  <div className="w-full md:w-1/2 px-2 md:px-4 mb-8 md:mb-0">
    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 underline decoration-purple-500 underline-offset-4">
      {title}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {skills.map((skill) => (
        <SkillItem key={skill.name} icon={skill.icon} name={skill.name} />
      ))}
    </div>
  </div>
);

const SkillsSection = () => {
  return (
    <section className="relative py-24 px-6 md:px-20 min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Animated Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f0f2e] via-[#1d1142] to-[#2f1e59] animate-background" />

      {/* Animated SVG Waves */}
      <svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 w-full h-[28vh] opacity-40 animate-[waveAnimation_12s_linear_infinite]"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#8d72f6"
          fillOpacity="0.5"
          d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,213.3C1120,224,1280,192,1360,181.3L1440,192L1440,320L0,320Z"
        />
      </svg>

      <svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 w-full h-[24vh] opacity-20 animate-[waveAnimationReverse_18s_linear_infinite]"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#d2c3f3"
          fillOpacity="0.3"
          d="M0,224L80,197.3C160,171,320,117,480,101.3C640,85,800,107,960,138.7C1120,171,1280,213,1360,234.7L1440,256L1440,320L0,320Z"
        />
      </svg>

      {/* Section Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-16 z-10 tracking-tight leading-tight">
        <span className="text-purple-400">🚀 My Technical Skills</span>
      </h1>

      {/* Skills Grid */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-16 z-10 w-full max-w-6xl px-2 md:px-0">
        <SkillsColumn title="🖥️ Frontend Development" skills={skillsData.frontend} />
        <SkillsColumn title="🧠 Backend & Frameworks" skills={skillsData.backend} />
      </div>

      {/* Tools Section */}
      <div className="w-full mt-16 md:mt-20 px-2 md:px-4 max-w-4xl z-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center underline decoration-purple-500 underline-offset-4">
          🛠️ Tools & Platforms
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-items-center">
          {skillsData.tools.map((tool) => (
            <SkillItem key={tool.name} icon={tool.icon} name={tool.name} />
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes waveAnimation {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes waveAnimationReverse {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        @keyframes background {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-background {
          background-size: 400% 400%;
          animation: background 20s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
