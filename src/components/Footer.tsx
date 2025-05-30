'use client';

import BackgroundAnimation from './BackgroundAnimation';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
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
        className="relative bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white py-10 px-6 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Nav Links */}
          <ul className="flex flex-wrap justify-center md:justify-start gap-6 text-sm sm:text-base font-semibold">
            {navLinks.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
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
