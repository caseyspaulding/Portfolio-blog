// app/projects/page.tsx

import ProjectCard from '@/components/ProjectCard';

import React from 'react';

interface Project
{
  title: string;
  description: string;
  technologies: string[];
  image: string; // Added image property
  github?: string;
  liveDemo?: string;
}
const projects: Project[] = [
  {
    title: 'Event Ticketing Application',
    description:
      'A scalable ticketing application built with NextJs and Postgres, featuring QR code ticket generation, ticket scanner with multi-tenent support.',
    technologies: [ 'NextJs', 'Postgres', 'React', 'TypeScript' ],
    image: '/images/projects/Eventjacket2.png',
    github: 'https://github.com/caseyspaulding/EventJacekt-TW',
    liveDemo: 'https://eventjacket.com',
  },
  // Add more projects...
];

export default function ProjectsPage ()
{
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        { projects.map( ( project ) => (
          <ProjectCard key={ project.title } project={ project } />
        ) ) }
      </div>
    </div>
  );
}
