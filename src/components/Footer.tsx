'use client';

import BackgroundAnimation from './BackgroundAnimation';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';

export default function Footer() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Skills', href: '/skills' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <BackgroundAnimation />
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative bg-transparent text-white py-10 px-6 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Nav Links */}
          <ul className="flex flex-wrap justify-center md:justify-start gap-6 text-sm sm:text-base font-semibold">
            {navLinks.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href as any}
                  className="hover:text-indigo-400 transition-colors duration-200"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social Icons */}
          <div className="flex items-center gap-6 text-white">
            <a
              href="http://www.youtube.com/@CodeVerseSoban"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-indigo-400 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M23.498 6.186a2.997 2.997 0 0 0-2.106-2.12C19.86 3.5 12 3.5 12 3.5s-7.86 0-9.392.566A2.997 2.997 0 0 0 .502 6.186 31.424 31.424 0 0 0 0 12a31.424 31.424 0 0 0 .502 5.814 2.997 2.997 0 0 0 2.106 2.12C4.14 20.5 12 20.5 12 20.5s7.86 0 9.392-.566a2.997 2.997 0 0 0 2.106-2.12A31.424 31.424 0 0 0 24 12a31.424 31.424 0 0 0-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
              </svg>
            </a>
            <a
              href="https://x.com/Sobansaud12345?t=hy8XskYHj_4-c-giiekJww&s=09"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-indigo-400 transition-colors"
            >
              <FaXTwitter size={26} />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-indigo-400 transition-colors"
            >
              <FaLinkedin size={26} />
            </a>
            <a
              href="mailto:sobansaud3@gmail.com"
              aria-label="Email"
              className="hover:text-indigo-400 transition-colors"
            >
              <FaEnvelope size={26} />
            </a>
            <a
              href="https://github.com/Sobansaud"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-indigo-400 transition-colors"
            >
              <FaGithub size={26} />
            </a>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Made with <span className="text-red-500">❤️</span> by{' '}
          <span className="font-bold text-indigo-400">Soban Saud</span> • © {new Date().getFullYear()}
        </div>
      </motion.footer>
    </>
  );
}
