'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaRobot } from 'react-icons/fa';

export default function AboutSection() {
  return (
    <section className="relative px-6 py-20 min-h-screen flex flex-col items-center justify-center text-center bg-transparent">
      {/* Background Glow Circles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-indigo-500 opacity-20 rounded-full -top-24 -left-24 blur-3xl animate-pulse"></div>
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-pink-500 opacity-20 rounded-full -bottom-24 -right-24 blur-3xl animate-ping"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl flex flex-col gap-10"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-indigo-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          🌟 About Me
        </motion.h1>

        <motion.div
          className="relative z-10 mx-auto mb-8 rounded-2xl overflow-hidden group w-64 sm:w-80 h-64 sm:h-80 transform transition duration-500 hover:scale-105 hover:rotate-1"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Glowing Border Layer */}
          <div className="absolute inset-0 rounded-2xl border-4 border-transparent group-hover:border-indigo-500 animate-glow z-0"></div>

          {/* Image */}
          <img
            src="/professional.png"
            alt="Muhammad Soban Saud"
            className="w-full h-full object-cover object-center rounded-2xl shadow-xl relative z-10"
          />
        </motion.div>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-300 font-medium leading-relaxed max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
        >
          I'm <span className="text-pink-400 font-bold">Muhammad Soban Saud</span> — a passionate,
          self-driven 18-year-old <span className="text-blue-400 font-semibold">Full-Stack Developer</span> and creative tech enthusiast. I craft stunning,
          responsive websites, intelligent software solutions, and fully functional web applications
          from scratch — blending <span className="text-green-400 font-semibold">pixel-perfect frontend design</span> with
          <span className="text-purple-400 font-semibold"> robust backend architecture</span>.
          <br />
          <br />
          Whether it's building AI-powered tools, modern SaaS platforms, admin dashboards, PDF & CV generators,
          or entire startup-grade apps — I turn ideas into interactive reality with smooth UI/UX and clean code.
          I'm skilled in integrating complex APIs, payment gateways like <span className="text-yellow-300 font-semibold">Stripe</span>,
          and working with modern tools like <span className="text-yellow-400 font-semibold">Framer Motion, Tailwind, FastAPI, and Next.js</span>.
          <br />
          <br />
          Currently, I’m deep-diving into <span className="text-yellow-400 font-semibold">Agentic AI</span>, LLMs,
          and OpenAI SDKs to create smart autonomous tools that think, act, and assist in real time.
          My mission? Build tech that looks good, works smart, and solves real-world problems beautifully.
        </motion.p>

        {/* Animated Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 relative z-10">
          {/* Education Card */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="bg-gray-200 bg-opacity-40 backdrop-blur-md rounded-xl shadow-xl p-6 border-2 border-indigo-600"
          >
            <FaGraduationCap className="text-4xl text-indigo-400 mb-4 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-indigo-300 mb-2">📘 Education</h3>

            <ul className="text-gray-300 text-sm text-left space-y-1">
              <li>
                <span className="text-indigo-200 font-semibold">🎓 Matriculation – 2023</span>
              </li>
              <li>
                <span className="text-indigo-200 font-semibold">🎨 Graphic Design Course – 2024</span>
              </li>
              <li>
                <span className="text-indigo-200 font-semibold">🧪 2nd Year (Pre-Medical) – 2025</span>
              </li>
            </ul>
          </motion.div>

          {/* Journey Card */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="bg-gray-200 bg-opacity-40 backdrop-blur-md rounded-xl shadow-xl p-6 border-2 border-pink-600"
          >
            <FaCode className="text-4xl text-pink-400 mb-4 mx-auto animate-spin-slow" />

            <ul className="text-gray-300 text-sm text-left space-y-1">
              <li>
                <span className="text-pink-200 font-semibold">🏛️ 2023–24: Frontend Developer @ Governor House</span>
              </li>
              <li>
                <span className="text-pink-200 font-semibold">🛠️ 2024–25: Backend Projects & API Integrations</span>
              </li>
              <li>
                <span className="text-pink-200 font-semibold">🤖 2025–Now: Agentic AI | LLM SDKs | Smart Agents</span>
              </li>
            </ul>
          </motion.div>

          {/* Current Focus Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-200 bg-opacity-40 backdrop-blur-md rounded-xl shadow-xl p-6 border-2 border-yellow-500"
          >
            <FaRobot className="text-4xl text-yellow-400 mb-4 mx-auto animate-pulse" />
            <h3 className="text-xl font-bold text-yellow-300 mb-2">🧠 Current Focus</h3>

            <p className="text-gray-300 text-sm">
              <span className="text-yellow-200 font-semibold">Building intelligent agents</span> with{' '}
              <span className="text-yellow-100 font-semibold">OpenAI</span>, improving real-time UIs, integrating APIs, and automating digital workflows.
            </p>
          </motion.div>
        </div>

        {/* Tech Roles Overview */}
        <div className="w-full mt-10 mb-8 text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-300">
            💻 Frontend • 🔧 Backend • 🤖 AI Developer
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Building modern UIs, robust APIs, and intelligent tools — all with performance & polish.
          </p>
        </div>

        {/* Animated Timeline Journey (3 vertical cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Matriculation */}
          <div className="relative pl-6 border-l-2 border-indigo-600">
            <div className="absolute -left-3 w-6 h-6 bg-indigo-500 rounded-full animate-ping"></div>
            <h4 className="text-indigo-300 font-bold">2023: Matriculation</h4>
            <p className="text-indigo-100 text-sm font-medium mt-1">
              Started my academic journey and passion for creativity & technology.
            </p>
          </div>

          {/* Full stack developer */}
          <div className="relative pl-6 border-l-2 border-pink-500">
            <div className="absolute -left-3 w-6 h-6 bg-pink-500 rounded-full animate-pulse"></div>
            <h4 className="text-pink-300 font-bold">2024: Full Stack Developer</h4>
            <p className="text-pink-100 text-sm font-medium mt-1">
              Developed and deployed real-world full-stack applications using{' '}
              <span className="text-pink-300 font-semibold">Next.js</span>,{' '}
              <span className="text-pink-300 font-semibold">FastAPI</span>, and{' '}
              <span className="text-pink-300 font-semibold">Stripe</span>. Implemented responsive UI/UX,
              authentication, and payment systems with focus on performance and scalability.
            </p>
          </div>

          {/* Agentic AI */}
          <div className="relative pl-6 border-l-2 border-yellow-400">
            <div className="absolute -left-3 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
            <h4 className="text-yellow-300 font-bold">2025: Agentic AI</h4>
            <p className="text-yellow-100 text-sm font-medium mt-1">
              Building autonomous AI tools using <span className="text-yellow-300 font-semibold">LLMs</span>,{' '}
              <span className="text-yellow-300 font-semibold">OpenAI SDKs</span>, and real-time backend APIs.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
