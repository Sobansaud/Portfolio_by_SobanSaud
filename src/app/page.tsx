'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutPage from './about/page';
import Footer from '@/components/Footer';
import ClickArrowEffect from '@/components/ClickArrowEffect';
import Skills from "@/app/skills/page"
import Project from "@/app/projects/page";
import Contact from '@/app/contact/page';
import BackgroundAnimation from '@/components/BackgroundAnimation';
export default function HomePage() {
  return (
    <>
      <ClickArrowEffect />
      <BackgroundAnimation />
      <Navbar />
      <main style={{minHeight:'100vh'}}>
      <Hero />
      <AboutPage/>
      <Skills/>
      <Project/>
      <Contact/>
      {/* Future Sections */}
      {/* <About /> */}
      {/* <Skills /> */}
      {/* <Projects /> */}
      {/* <Services /> */}
      {/* <Contact /> */}
      </main>

    </>
  );
}
