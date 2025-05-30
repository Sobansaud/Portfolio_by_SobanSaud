'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Bikes Ecommerce Store',
    image: '/file3.PNG',
    description: 'Fully responsive and complete Next.js ecommerce website for bikes.',
    link: 'https://bikes-ecommerce-store-sm.vercel.app/',
  },
  {
    title: 'Marketplace Ecommerce',
    image: '/file4.PNG',
    description: 'Second ecommerce project built with Next.js, fully functional marketplace.',
    link: 'https://marketplace-by-soban-ecommerce.vercel.app/',
  },
  {
    title: 'Agentia AI',
    image: '/file1.PNG',
    description: 'AI-based React project currently under development for agency features.',
    link: 'https://agentia-by-sobansaud.vercel.app/',
  },
  {
    title: 'Static Dynamic Resume',
    image: '/file2.PNG',
    description: 'HTML and CSS resume builder where users can create resumes easily.',
    link: 'https://static-dynamic-esume.vercel.app/',
  },
  {
    title: 'Unit Converter',
    image: '/file5.PNG',
    description: 'Python + Streamlit app to convert between various unit types instantly.',
    link: 'https://unit-convertor-by-soban.streamlit.app/',
  },
  {
    title: 'SM Blogger',
    image: '/file7.PNG',
    description: 'Fully dynamic blog system built with Next.js and integrated features.',
    link: 'https://sm-blogger-n7w7.vercel.app/',
  },
  {
    title: 'Smart Resume Analyzer',
    image: '/file6.PNG',
    description: 'Streamlit-based resume analyzer with authentication and Stripe payments.',
    link: 'https://smartresumeanalyzerpro-soban.streamlit.app/',
  },
];

export default function ProjectGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      {/* Section Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-center mb-12 drop-shadow-lg leading-tight">
        🚀 My Projects
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/5 border border-white/20 rounded-xl shadow-xl overflow-hidden backdrop-blur-md w-full max-w-sm"
          >
            <div className="relative w-full h-48 sm:h-56 md:h-64">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover rounded-t-xl"
                priority={idx < 3} // prioritize loading first 3 images
              />
            </div>
            <div className="p-4 flex flex-col justify-between h-[230px] sm:h-[250px] md:h-[280px]">
              <h2 className="text-lg sm:text-xl font-bold text-white text-center mb-2">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 text-center mb-4 line-clamp-3">
                {project.description}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto block text-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium text-sm sm:text-base"
              >
                🔗 Live Demo
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
