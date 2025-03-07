// app/projects/page.tsx
import PageBackground from '@/components/PageBackGround';
import ProjectCard from '@/components/ProjectCard';
import React from 'react';

interface Project
{
  title: string;
  description: string;
  technologies: string[];
  image: string;
  screenshots: string[];
  github?: string;
  liveDemo?: string;
}

const projects: Project[] = [
  {
    title: 'REIstacks - Real Estate Investment Platform',
    description: `A comprehensive CRM system designed for real estate investors and wholesalers.
    
Features:
- Lead management with detailed property analysis
- Email automation and campaign management
- Kanban board for deal pipeline visualization
- Calendar scheduling and task management
- Multi-tenant organization support
- Document management with cloud storage
- Financial analysis and deal tracking
- Team collaboration tools
- Mobile-responsive interface`,
    technologies: [ 'Next.js 14', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'AWS', 'Supabase', 'Shadcn UI' ],
    image: '/images/screenshots/Cash-CRM-Dash.png', // Update with actual image path
    screenshots: [
      "/images/screenshots/Cash-CRM-dash2.png",
      "/images/screenshots/Cash-CRM-contact-1.png",
      "/images/screenshots/Cash-CRM-upload-leads.png",
      "/images/screenshots/Cash-CRM-upload-leads2.png",
      "/images/screenshots/Cash-CRM-upload-leads3.png",
      "/images/screenshots/Cash-CRM-contact-history.png",
    ], // Update with actual screenshot paths

    liveDemo: 'https://reistacks.com',
  },
  {
    title: 'Event Ticketing Application',
    description: `A scalable ticketing application built with NextJs and Postgres.

Features:
- QR code ticket generation
- Ticket scanner
- Multi-tenant support
- Real-time ticket validation
- Mobile responsive design
- Secure payment processing`,
    technologies: [ 'NextJs', 'Postgres', 'React', 'TypeScript' ],
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
    description: `A modern full-stack personal blog platform built with Next.js 14.
      
    Features:
      - Custom content management dashboard
      - Next.js 14 with TypeScript for type safety
      - Custom Jodit WYSIWYG editor
      - Code syntax highlighting
      - Mermaid diagram support
      - PostgreSQL with Drizzle ORM`,
    technologies: [ 'NextJs', 'Postgres', 'React', 'TypeScript' ],
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
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-12 text-center">Featured Projects</h1>
            <div className="space-y-16">
              { projects.map( ( project ) => (
                <div key={ project.title } className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                  <ProjectCard project={ project } />
                </div>
              ) ) }
            </div>
          </div>
        </main>
      </PageBackground>
    </div>
  );
}