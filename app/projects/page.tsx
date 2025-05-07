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

    title: 'DocJacket - Transaction Coordination Platform',
    description: `An AI-enhanced transaction management system for real estate transaction coordinators that streamlines document handling, automates deadline tracking, and ensures compliance. Replaces spreadsheets with an intelligent cloud-based solution.`,
    role: 'Full Stack Developer',
    duration: 'May 2025 - Present',
    keyFeatures: [
      'Smart document intake with AI data extraction',
      'Automated timeline and deadline management',
      'Compliance monitoring with document verification',
      'Status update automation and client portal',
      'Commission calculation and tracking'
    ],
    technologies: [
      '.NET 8', 'C#', 'Azure AI', 'SQL', 'Entity Framework Core',
      'Next.js', 'TypeScript', 'SignalR', 'ML.NET', 'Azure App Services', "Azure Blob Storage", "Azure Functions"
    ],
    image: '/images/docjacket-screenshot.png',
    liveDemo: 'https://docjacket.com',
    github: 'https://github.com/caseyspaulding/docjacket',
  },
  {
    title: 'REIstacks - Real Estate Investment CRM',
    description: `A comprehensive CRM system for real estate investors and wholesalers with .NET 9 Web API backend, Azure cloud infrastructure, and a Next.js frontend. Features ML-powered dashboards and batch processing for bulk lead management.`,
    role: 'Full Stack Developer',
    duration: 'Nov 2024 - Apr 2025',
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 pb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500">
                Projects
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">

              </p>
            </div>

            {/* Skills summary - Now with blue background */ }
            <div className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-white text-blue-600">
                      <Code className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Frontend</h3>
                    <p className="mt-1 text-blue-100">
                      React, Angular, Blazor
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-white text-blue-600">
                      <Server className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Backend</h3>
                    <p className="mt-1 text-blue-100">
                      .NET, C#, API development
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-white text-blue-600">
                      <Database className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Data</h3>
                    <p className="mt-1 text-blue-100">
                      SQL Server, Entity Framework, Azure SQL
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-white text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a8 8 0 0 1 8 8v4a8 8 0 0 1-16 0v-4a8 8 0 0 1 8-8z" />
                        <path d="M9.5 2A12.5 12.5 0 0 0 12 22a12.5 12.5 0 0 0 2.5-20" />
                        <path d="M12 18v4" />
                        <path d="M8 18c0-4 8-4 8 0" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">AI</h3>
                    <p className="mt-1 text-blue-100">
                      Azure AI Foundry, ML.NET, Semantic Kernel
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Redesigned Projects list with images on top */ }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              { projects.map( ( project ) => (
                <div key={ project.title } className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
                  {/* Project image on top */ }
                  <div className="relative h-64 w-full">
                    <Image
                      src={ project.image }
                      alt={ project.title }
                      className="w-full h-full object-cover object-center"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>

                  {/* Project content */ }
                  <div className="p-6 flex-grow">
                    {/* Header with title */ }
                    <div className="mb-3">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{ project.title }</h2>

                      {/* Role and duration */ }
                      <div className="mb-3">
                        <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 text-sm font-medium rounded-full mr-2">
                          { project.role }
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          { project.duration }
                        </span>
                      </div>
                    </div>

                    {/* Description */ }
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      { project.description }
                    </p>

                    {/* Technologies */ }
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        { project.technologies.slice( 0, 6 ).map( ( tech ) => (
                          <span
                            key={ tech }
                            className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full"
                          >
                            { tech }
                          </span>
                        ) ) }
                        { project.technologies.length > 6 && (
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full">
                            +{ project.technologies.length - 6 } more
                          </span>
                        ) }
                      </div>
                    </div>
                  </div>

                  {/* Action footer */ }
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    { project.liveDemo && (
                      <Link href={ project.liveDemo }
                        className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                        target="_blank" rel="noopener noreferrer">
                        View Now
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    ) }

                    <div className="flex space-x-4">
                      { project.github && (
                        <Link href={ project.github } target="_blank" rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          <Github className="h-5 w-5" />
                        </Link>
                      ) }
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