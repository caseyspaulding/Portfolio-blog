// components/ProjectCard.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


interface Project
{
  title: string;
  description: string;
  technologies: string[];
  image: string; // Added image property
  github?: string;
  liveDemo?: string;
}

interface ProjectCardProps
{
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ( { project } ) =>
{
  return (
    <div>
      { project.liveDemo && (
        <Link
          href={ project.liveDemo }
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
         
        
      
      
      
      <Image
        src={ project.image }
        alt={ project.title }
        width={ 400 }
        height={ 200 }
        className="object-cover w-full h-48"
        priority // Ensures preloading and consistency
      />
          </Link>
       
      ) }
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-3">{ project.title }</h3>
        <p className="text-gray-700 dark:text-white mb-4">{ project.description }</p>
        <div className="flex flex-wrap mb-4">
          { project.technologies.map( ( tech ) => (
            <span
              key={ tech }
              className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
            >
              { tech }
            </span>
          ) ) }
        </div>
        <div className="flex space-x-4">
          { project.github && (
            <Link
              href={ project.github }
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 dark:text-white"
            >
              GitHub Repository
            </Link>
          ) }
          { project.liveDemo && (
            <Link
              href={ project.liveDemo }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-300 dark:hover:text-blue-200 hover:text-blue-100"
            >
              Live Demo
            </Link>
          ) }
        </div>
      </div>
   
    </div >
  );
};

export default ProjectCard;
