// app/projects/page.tsx
import PageBackground from '@/components/PageBackGround';
import ProjectCard from '@/components/ProjectCard';
import React from 'react';
import Link from 'next/link';
import { Github, ExternalLink, Code, Server, Database, Users, Calendar, FileText, Mail, PanelRight, ChevronRight } from 'lucide-react';

interface Project
{
  title: string;
  description: string;
  technologies: string[];
  keyFeatures?: string[];
  techDetails?: string[];
  image: string;
  screenshots: string[];
  github?: string;
  liveDemo?: string;
  role?: string;
  duration?: string;
  achievements?: string[];
  challenges?: string[];
}

const projects: Project[] = [
  {
    title: 'REIstacks - Real Estate Investment Platform',
    description: `A comprehensive CRM system I designed and built for real estate investors and wholesalers. This enterprise-grade application leverages a .NET 9 Web API backend with Azure cloud infrastructure and a modern Next.js frontend. The system incorporates advanced batch processing for bulk lead management and ML-powered dashboards for predictive analytics.`,
    role: 'Lead Developer & System Architect',
    duration: 'Nov 2025 - Present',
    keyFeatures: [
      'Lead management with detailed property analysis',
      'ML-powered dashboards for investment opportunity scoring',
      'Batch processing system for importing thousands of property records',
      'Email automation and campaign management',
      'Kanban board for deal pipeline visualization',
      'Calendar scheduling and task management',
      'Multi-tenant organization support',
      'Document management with Azure Blob Storage',
      'Financial analysis with predictive modeling',
      'Team collaboration tools',
      'AI-powered lead scoring and property valuation'
    ],
    techDetails: [
      'Architected and implemented a .NET 9 Web API backend hosted on Azure App Service',
      'Designed a normalized Azure SQL database managed with SQL Server Management Studio (SSMS)',
      'Developed efficient stored procedures and optimized query performance using SSMS',
      'Created a high-performance batch processing system for importing and validating large datasets',
      'Built a responsive Next.js frontend with TypeScript and Shadcn UI components',
      'Integrated Azure Blob Storage for secure document management and retrieval',
      'Designed ML-powered interactive dashboards with real-time data visualization',
      'Developed a machine learning service with FastAPI for property valuation predictions',
      'Implemented CI/CD pipeline with Azure DevOps for automated testing and deployment',
      'Created a comprehensive API testing suite with xUnit and integration tests',
      'Utilized Entity Framework Core for robust data access patterns'
    ],
    achievements: [
      'Reduced deal processing time by 40% for clients',
      'Successfully scaled batch processing to handle 50,000+ property records per import',
      'Maintained 99.9% uptime with Azures enterprise - grade infrastructure',
      'Improved property valuation accuracy by 25% using ML-based predictions',
      'Decreased system response time by 35% through optimized API endpoints and database tuning',
      'Reduced data entry time by 70% with automated batch processing system',
      'Increased conversion rates by 30% with ML-powered lead scoring'
    ],
    challenges: [
      'Designed and optimized complex batch processing jobs to handle large-scale data imports',
      'Implemented efficient SQL queries and stored procedures for real-time dashboard analytics',
      'Created an asynchronous processing architecture for handling long-running operations',
      'Optimized complex SQL queries across multiple tables for advanced filtering and reporting',
      'Implemented a secure real-time notification system using SignalR',
      'Developed a secure multi-tenant architecture with proper data isolation',
      'Created efficient data synchronization between SQL database and ML service',
      'Implemented comprehensive logging and telemetry with Application Insights',
      'Optimized ML model performance for dashboard visualizations'
    ],
    technologies: [
      '.NET 9',
      'C#',
      'Azure App Service',
      'Azure SQL',
      'SQL Server Management Studio (SSMS)',
      'Entity Framework Core',
      'Azure Blob Storage',
      'Azure Functions',
      'Next.js',
      'TypeScript',
      'FastAPI',
      'Python',
      'SignalR',
      'Tailwind CSS',
      'Shadcn UI',
      'Recharts',
      'ML.NET',
      'Azure Data Factory'
    ],
    image: '/images/screenshots/Cash-CRM-Dash.png',
    screenshots: [
      "/images/screenshots/Cash-CRM-dash2.png",
      "/images/screenshots/Cash-CRM-contact-1.png",
      "/images/screenshots/Cash-CRM-upload-leads.png",
      "/images/screenshots/Cash-CRM-upload-leads2.png",
      "/images/screenshots/Cash-CRM-upload-leads3.png",
      "/images/screenshots/Cash-CRM-contact-history.png",
    ],
    liveDemo: 'https://reistacks.com',
  },
  {
    title: 'Event Ticketing Application',
    description: `A scalable ticketing platform built to handle multiple event organizers, venues, and hundreds of concurrent ticket purchases. I architected this system to ensure data integrity, security, and real-time functionality.`,
    role: 'Full Stack Developer',
    duration: 'May 2023 - Sept 2023',
    keyFeatures: [
      'QR code ticket generation and validation',
      'Secure ticket scanner with real-time validation',
      'Multi-tenant support for event organizers',
      'Real-time dashboard with sales analytics',
      'Mobile responsive design',
      'Secure payment processing with Stripe integration'
    ],
    techDetails: [
      'Built server components in Next.js for optimized rendering',
      'Implemented secure authentication with role-based permissions',
      'Designed normalized PostgreSQL database with complex relationships',
      'Created real-time ticket validation system with WebSockets',
      'Developed mobile-friendly interface with responsive design patterns'
    ],
    achievements: [
      'Successfully processed over 5,000 tickets for multiple events',
      'Achieved 99.8% scanning accuracy with custom QR validation algorithm',
      'Reduced ticket fraud by implementing secure validation checks'
    ],
    challenges: [
      'Developed concurrent ticket purchasing system to prevent double-booking',
      'Implemented complex database queries for real-time reporting',
      'Created secure, tamper-proof ticket generation system'
    ],
    technologies: [ 'Next.js', 'PostgreSQL', 'React', 'TypeScript', 'Prisma', 'Stripe API', 'WebSockets' ],
    image: '/images/eventjacket-ss.png',
    screenshots: [
      "/images/screenshots/ej-dash.jpg",
      "/images/screenshots/ej-checkout.jpg",
      "/images/screenshots/scan-tickets.jpg",
      "/images/screenshots/ej-payouts.jpg",
    ],
    github: 'https://github.com/caseyspaulding/EventJacekt-TW',
    liveDemo: 'https://eventjacket.com',
  },
  {
    title: 'Tech Blog Platform',
    description: `A modern full-stack personal blog platform with a focus on technical content. I built this system to showcase technical diagrams, code samples, and in-depth articles with a custom content management system.`,
    role: 'Developer & Designer',
    duration: 'Jan 2023 - Apr 2023',
    keyFeatures: [
      'Custom content management dashboard',
      'WYSIWYG editor with code integration',
      'Code syntax highlighting for multiple languages',
      'Mermaid diagram support for technical illustrations',
      'SEO optimization for technical content',
      'Full markdown support with custom extensions'
    ],
    techDetails: [
      'Leveraged Next.js 14 App Router for optimized page loading',
      'Built custom editor extensions for technical content',
      'Implemented PostgreSQL database with Drizzle ORM for type safety',
      'Created responsive design system for all devices',
      'Developed custom image optimization pipeline'
    ],
    achievements: [
      'Improved page load speed by 60% with optimized rendering strategy',
      'Created reusable component library for rapid development',
      'Implemented SEO best practices resulting in higher search visibility'
    ],
    challenges: [
      'Developed custom syntax highlighting system for multiple languages',
      'Created efficient image loading strategy to minimize bandwidth',
      'Built complex schema for technical content relationships'
    ],
    technologies: [ 'Next.js 14', 'PostgreSQL', 'React', 'TypeScript', 'Drizzle ORM', 'Tailwind CSS' ],
    image: '/images/screenshots/casey-blog-diagrams.jpg',
    screenshots: [
      "/images/screenshots/add-post-form.jpg",
      "/images/screenshots/blog-dashboard.jpg",
      "/images/screenshots/casey-blog-diagrams.jpg"
    ],
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
                Professional Portfolio
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                A showcase of my experience developing robust, scalable applications with modern technologies.

              </p>
            </div>

            {/* Skills summary */ }
            <div className="mb-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Technical Expertise</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 dark:bg-blue-700 text-white">
                      <Code className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Frontend Development</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      React, TypeScript, Next.js, Angular, Tailwind CSS, 508 Accessibility
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 dark:bg-blue-700 text-white">
                      <Server className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Backend Systems</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      .NET, C#, API development, Serverless Functions, JWT Authentication
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 dark:bg-blue-700 text-white">
                      <Database className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Data & Infrastructure</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      SQL Server, Entity Framework, SSIS, SSMS, AWS, Azure Cloud, Database Optimization
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects list */ }
            <div className="space-y-16">
              { projects.map( ( project, index ) => (
                <div key={ project.title } className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6 sm:p-8">
                    <ProjectCard project={ project } />

                    {/* Additional project details for job application */ }
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left column */ }
                        <div>
                          <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                              <Users className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                              My Role & Duration
                            </h3>
                            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                              <p className="font-medium text-gray-900 dark:text-white">
                                { project.role || "Lead Developer" }
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 mt-1">
                                { project.duration || "2023 - Present" }
                              </p>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                              <Server className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                              Technical Implementation
                            </h3>
                            <ul className="space-y-2">
                              { project.techDetails?.map( ( detail, i ) => (
                                <li key={ i } className="flex items-start">
                                  <ChevronRight className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700 dark:text-gray-300">{ detail }</span>
                                </li>
                              ) ) ||
                                project.technologies.map( ( tech, i ) => (
                                  <li key={ i } className="flex items-start">
                                    <ChevronRight className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">Implemented { tech } for robust functionality</span>
                                  </li>
                                ) ) }
                            </ul>
                          </div>
                        </div>

                        {/* Right column */ }
                        <div>
                          <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                              <PanelRight className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                              Key Challenges Solved
                            </h3>
                            <ul className="space-y-2">
                              { project.challenges?.map( ( challenge, i ) => (
                                <li key={ i } className="flex items-start">
                                  <ChevronRight className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700 dark:text-gray-300">{ challenge }</span>
                                </li>
                              ) ) ||
                                [ "Designed scalable architecture to handle growing user base",
                                  "Implemented complex database relationships and queries",
                                  "Optimized performance for real-time data processing" ].map( ( challenge, i ) => (
                                    <li key={ i } className="flex items-start">
                                      <ChevronRight className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-700 dark:text-gray-300">{ challenge }</span>
                                    </li>
                                  ) ) }
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                              Achievements & Results
                            </h3>
                            <ul className="space-y-2">
                              { project.achievements?.map( ( achievement, i ) => (
                                <li key={ i } className="flex items-start">
                                  <ChevronRight className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700 dark:text-gray-300">{ achievement }</span>
                                </li>
                              ) ) ||
                                [ "Successfully deployed to production with 99.9% uptime",
                                  "Optimized application performance for improved user experience",
                                  "Received positive user feedback on interface and functionality" ].map( ( achievement, i ) => (
                                    <li key={ i } className="flex items-start">
                                      <ChevronRight className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-700 dark:text-gray-300">{ achievement }</span>
                                    </li>
                                  ) ) }
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) ) }
            </div>

            {/* Call to action */ }
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-10 sm:px-10 sm:py-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between">
                <div className="text-white mb-6 sm:mb-0">
                  <h2 className="text-2xl font-bold">Interested in working together?</h2>
                  <p className="mt-2 max-w-xl">
                    I'd love to discuss how my experience can benefit your team and projects.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <Mail className="h-5 w-5 mr-2" />
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