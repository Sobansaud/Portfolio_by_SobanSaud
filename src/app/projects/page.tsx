import React from 'react';
import ProjectGrid from '@/components/ProjectsGrid';
const Project = () => {
  return (
    <main className="min-h-screen text-white p-8">
      {/* <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        🚀 My Technical Skills
      </h1> */}
      <ProjectGrid />
    </main>
  );
};

export default Project;
