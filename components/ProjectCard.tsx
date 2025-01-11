// components/ProjectCard.tsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

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

interface ProjectCardProps
{
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ( { project } ) =>
{
  const [ isDialogOpen, setIsDialogOpen ] = useState( false );
  const [ currentImageIndex, setCurrentImageIndex ] = useState( 0 );

  const handleNextImage = () =>
  {
    setCurrentImageIndex( ( prev ) =>
      prev === project.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () =>
  {
    setCurrentImageIndex( ( prev ) =>
      prev === 0 ? project.screenshots.length - 1 : prev - 1
    );
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-3xl font-bold mb-6">{ project.title }</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div
          onClick={ () => setIsDialogOpen( true ) }
          className="cursor-pointer relative group"
        >
          <Image
            src={ project.image }
            alt={ project.title }
            width={ 800 }
            height={ 500 }
            className="object-cover w-full h-[400px] rounded-lg hover:opacity-90 transition-opacity"
            priority
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
            <span className="text-white text-lg font-medium">View Screenshots</span>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 whitespace-pre-line">
              { project.description }
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              { project.technologies.map( ( tech ) => (
                <span
                  key={ tech }
                  className="bg-blue-100 text-blue-800 text-base font-medium px-4 py-1.5 rounded-full"
                >
                  { tech }
                </span>
              ) ) }
            </div>
          </div>
          <div className="flex gap-6">
            { project.github && (
              <Link
                href={ project.github }
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 dark:text-white text-lg font-medium"
              >
                GitHub Repository →
              </Link>
            ) }
            { project.liveDemo && (
              <Link
                href={ project.liveDemo }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-300 hover:text-blue-800 text-lg font-medium"
              >
                Live Demo →
              </Link>
            ) }
          </div>
        </div>

    
      </div>
      <Dialog open={ isDialogOpen } onOpenChange={ setIsDialogOpen }>
        <DialogContent className="max-w-4xl">
          <DialogTitle className="text-xl font-semibold mb-4">
            { project.title } Screenshots
          </DialogTitle>
          <div className="relative">
            <Image
              src={ project.screenshots[ currentImageIndex ] }
              alt={ `${ project.title } screenshot ${ currentImageIndex + 1 }` }
              width={ 800 }
              height={ 600 }
              className="object-contain w-full rounded-lg"
            />

            { project.screenshots.length > 1 && (
              <>
                <button
                  onClick={ handlePrevImage }
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  ←
                </button>
                <button
                  onClick={ handleNextImage }
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  →
                </button>
                <div className="text-center mt-2">
                  { currentImageIndex + 1 } / { project.screenshots.length }
                </div>
              </>
            ) }
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectCard;