'use client';

import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Image from 'next/image';

export default function Hero() {
  // Animation variants for the paragraph fade-in/fade-out loop
  const paragraphVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0.5 },
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 sm:px-10 md:px-16 lg:px-24 overflow-hidden bg-transparent text-center pt-24">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-indigo-600 opacity-40 rounded-full -top-20 -left-20 sm:-top-24 sm:-left-24 blur-3xl animate-pulse"></div>
        <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-pink-600 opacity-40 rounded-full -bottom-20 -right-20 sm:-bottom-24 sm:-right-24 blur-3xl animate-ping"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center gap-6 max-w-4xl w-full"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-white/10 backdrop-blur-xl border-4 border-indigo-500 rounded-3xl shadow-2xl overflow-hidden relative group transition-all duration-300"
        >
          <Image
            src="/2.jpg"
            alt="Muhammad Soban Saud"
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
        </motion.div>

        {/* Name & Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white px-4">
          👋 Hi, I'm{' '}
          <motion.span
            animate={{
              color: [
                '#f472b6', // pink-400 lighter
                '#818cf8', // indigo-400 lighter
                '#fde68a', // yellow-300 lighter
                '#6ee7b7', // emerald-300 lighter
                '#93c5fd', // blue-300 lighter
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            className="font-extrabold"
          >
            Muhammad Soban Saud
          </motion.span>
        </h1>

        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-200 h-10 px-4 max-w-xl mx-auto">
          <Typewriter
            words={[
              'Full Stack Developer 💻',
              'Frontend Engineer 🌐',
              'Backend Developer ⚙️',
              'Graphic Designer 🎨',
              'AI Agentic Developer 🤖',
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>

        <motion.p
          className="text-gray-300 font-bold text-sm sm:text-base md:text-lg max-w-3xl px-4 sm:px-6"
          variants={paragraphVariants}
          initial="visible"
          animate="hidden"
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 3 }}
        >
          Building innovative digital solutions that drive business growth and deliver exceptional user experiences.
        </motion.p>

        <a
          href="/projects"
          className="mt-6 inline-block px-6 py-3 text-indigo-900 bg-yellow-400 hover:bg-yellow-300 rounded-full font-semibold transition-all duration-300 shadow-lg"
        >
          🚀 Explore My Projects
        </a>
      </motion.div>
    </section>
  );
}
