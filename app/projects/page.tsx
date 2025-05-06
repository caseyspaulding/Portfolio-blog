// app/projects/page.tsx
import PageBackground from '@/components/PageBackGround';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, ExternalLink, Code, Server, Database, ChevronRight } from 'lucide-react';

interface Project
{
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  liveDemo?: string;
  role?: string;
  duration?: string;
  keyFeatures?: string[];
}

const projects: Project[] = [
  {
    title: 'REIstacks - Real Estate Investment CRM',
    description: `A comprehensive CRM system for real estate investors and wholesalers with .NET 9 Web API backend, Azure cloud infrastructure, and a Next.js frontend. Features ML-powered dashboards and batch processing for bulk lead management.`,
    role: 'Full Stack Developer',
    duration: 'Nov 2025 - Present',
    keyFeatures: [
      'Lead management with property analysis',
      'ML-powered investment opportunity scoring',
      'Batch processing for importing property records',
      'Document management with Azure Blob Storage',
      'Financial analysis with predictive modeling'
    ],
    technologies: [
      '.NET 9', 'C#', 'Azure', 'SQL', 'Entity Framework Core',
      'React', 'TypeScript', 'SignalR', 'ML.NET'
    ],
    image: '/images/screenshots/Reistacks-code.png',
    liveDemo: 'https://reistacks.com',
  },
  {
    title: 'Event Ticketing Application',
    description: `A ticketing platform built to handle multiple event organizers, venues, and hundreds of concurrent ticket purchases with QR code validation and secure payment processing.`,
    role: 'Full Stack Developer',
    duration: 'May 2024 - Sept 2024',
    keyFeatures: [
      'QR code ticket generation and validation',
      'Multi-tenant support for event organizers',
      'Real-time dashboard with sales analytics',
      'Secure payment processing with Stripe'
    ],
    technologies: [
      'Next.js', 'PostgreSQL', 'React', 'TypeScript',
      'Prisma', 'Stripe API', 'WebSockets'
    ],
    image: '/images/eventjacket-ss.png',
    github: 'https://github.com/caseyspaulding/EventJacekt-TW',
    liveDemo: 'https://eventjacket.com',
  },
  {
    title: 'Tech Blog Platform',
    description: `A modern full-stack personal blog platform with a focus on technical content, featuring code syntax highlighting, technical diagrams, and a custom content management system.`,
    role: 'Full Stack Developer',
    duration: 'Jan 2023 - Apr 2023',
    keyFeatures: [
      'Custom content management dashboard',
      'Code syntax highlighting for multiple languages',
      'Mermaid diagram support for technical illustrations',
      'Full markdown support with custom extensions'
    ],
    technologies: [
      'Next.js 14', 'PostgreSQL', 'React', 'TypeScript',
      'Drizzle ORM', 'Tailwind CSS'
    ],
    image: '/images/screenshots/casey-blog-diagrams.jpg',
    github: 'https://github.com/caseyspaulding',
    liveDemo: 'https://www.caseyspaulding.com',
  },
];

export default function ProjectsPage ()
{
  return (
    <div>
      <PageBackground>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="container mx-auto">
            {/* Header section */ }
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500">
                Projects
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Showcasing my experience in full-stack development with .NET and modern web technologies.
              </p>
            </div>

            {/* Skills summary */ }
            <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 dark:bg-blue-700 text-white">
                      <Code className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Frontend</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      React, Angular, Blazor
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 dark:bg-blue-700 text-white">
                      <Server className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Backend</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      .NET, C#, API development
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 dark:bg-blue-700 text-white">
                      <Database className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Data</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      SQL Server, Entity Framework, Azure
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects list */ }
            <div className="space-y-12">
              { projects.map( ( project ) => (
                <div key={ project.title } className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="md:flex">
                    {/* Project image */ }
                    <div className="md:flex-shrink-0 md:w-1/3 relative h-60 md:h-auto">
                      <Image
                        src={ project.image }
                        alt={ project.title }
                        className="w-full h-full object-cover"
                        width={ 500 }
                        height={ 300 }
                      />
                    </div>

                    {/* Project content */ }
                    <div className="p-6 md:p-8 md:w-2/3">
                      {/* Header with title and links */ }
                      <div className="flex flex-wrap items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{ project.title }</h2>
                        <div className="flex space-x-3 mt-2 md:mt-0">
                          { project.github && (
                            <Link href={ project.github } target="_blank" rel="noopener noreferrer"
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                              <Github className="h-6 w-6" />
                            </Link>
                          ) }
                          { project.liveDemo && (
                            <Link href={ project.liveDemo } target="_blank" rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                              <ExternalLink className="h-6 w-6" />
                            </Link>
                          ) }
                        </div>
                      </div>

                      {/* Role and duration */ }
                      <div className="mb-4">
                        <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 text-sm font-medium rounded-full mr-2">
                          { project.role }
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          { project.duration }
                        </span>
                      </div>

                      {/* Description */ }
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        { project.description }
                      </p>

                      {/* Key features */ }
                      { project.keyFeatures && (
                        <div className="mb-4">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                            Key Features
                          </h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                            { project.keyFeatures.slice( 0, 6 ).map( ( feature, i ) => (
                              <li key={ i } className="flex items-center text-sm">
                                <ChevronRight className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-300">{ feature }</span>
                              </li>
                            ) ) }
                          </ul>
                        </div>
                      ) }

                      {/* Technologies */ }
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          { project.technologies.map( ( tech ) => (
                            <span
                              key={ tech }
                              className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full"
                            >
                              { tech }
                            </span>
                          ) ) }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) ) }
            </div>

            {/* Call to action */ }
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-8 sm:px-8 sm:py-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between">
                <div className="text-white mb-6 sm:mb-0">
                  <h2 className="text-xl font-bold">Interested in working together?</h2>
                  <p className="mt-1">
                    Let's discuss how I can help with your next project.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </main>
      </PageBackground>
    </div>
  );
}