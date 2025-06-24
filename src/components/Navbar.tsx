'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed w-full top-0 left-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''
        } animated-gradient bg-opacity-90 backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex md:justify-between justify-start items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 select-none" onClick={handleCloseMenu}>
          <div className="w-16 h-16 relative border-2 border-white rounded-full shadow-sm">
            <Image src="/logo1.png" alt="Logo" fill className="object-contain rounded-full" />
          </div>
          <span className="text-indigo-600 font-extrabold text-xl tracking-tight hover:text-indigo-800 transition-colors">
            SOBANSAUD
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-6">
          <button
            aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-indigo-600 transition-colors text-2xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-10 text-gray-800 font-semibold tracking-wide text-lg">
          {navLinks.map(({ name, href }) => {
            const isActive = pathname === href;
            return (
              <motion.li
                key={name}
                whileHover={{ y: -3, scale: 1.1, color: '#4F46E5' }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`cursor-pointer ${isActive ? 'text-indigo-600 underline underline-offset-4' : ''
                  }`}
              >
                <Link href={href} className="hover:text-indigo-600 transition-colors duration-200">
                  {name}
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex items-center gap-6 text-gray-700">
          <a
            href="https://x.com/Sobansaud12345?t=hy8XskYHj_4-c-giiekJww&s=09"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 transition-transform duration-200 hover:text-indigo-600"
            aria-label="Twitter"
          >
            <FaXTwitter size={26} />
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 transition-transform duration-200 hover:text-indigo-600"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={26} />
          </a>
          <a
            href="mailto:sobansaud3@gmail.com"
            className="hover:scale-110 transition-transform duration-200 hover:text-indigo-600"
            aria-label="Email"
          >
            <FaEnvelope size={26} />
          </a>
          <a
            href="https://github.com/Sobansaud"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 transition-transform duration-200 hover:text-indigo-600"
            aria-label="GitHub"
          >
            <FaGithub size={26} />
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="md:hidden bg-white shadow-inner overflow-y-auto max-h-[calc(100vh-80px)] px-6 py-6 space-y-5 text-center font-semibold text-lg"
          >
            {navLinks.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  onClick={handleCloseMenu}
                  className={`block hover:text-indigo-600 transition-colors ${pathname === href ? 'text-indigo-600 underline underline-offset-4' : ''
                    }`}
                >
                  {name}
                </Link>
              </li>
            ))}

            <li className="flex justify-center gap-8 text-gray-700 pt-3 border-t border-gray-200">
              <a
                href="https://x.com/Sobansaud12345?t=hy8XskYHj_4-c-giiekJww&s=09"
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-600 hover:scale-110 transition-transform"
                aria-label="Twitter"
              >
                <FaXTwitter size={26} />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba"
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-600 hover:scale-110 transition-transform"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={26} />
              </a>
              <a
                href="mailto:sobansaud3@gmail.com"
                className="hover:text-indigo-600 hover:scale-110 transition-transform"
                aria-label="Email"
              >
                <FaEnvelope size={26} />
              </a>
              <a
                href="https://github.com/Sobansaud"
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-600 hover:scale-110 transition-transform"
                aria-label="GitHub"
              >
                <FaGithub size={26} />
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
