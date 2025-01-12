'use client';

import React, { useState } from 'react';
import { Github, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';

interface ProjectProps
{
  project: {
    title: string;
    description: string;
    technologies: string[];
    image: string;
    screenshots: string[];
    github?: string;
    liveDemo?: string;
  };
}

const ProjectCard = ( { project }: ProjectProps ) =>
{
  const [ currentImageIndex, setCurrentImageIndex ] = useState( 0 );
  const images = [ project.image, ...project.screenshots ];

  const nextImage = () =>
  {
    setCurrentImageIndex( ( prev ) => ( prev + 1 ) % images.length );
  };

  const prevImage = () =>
  {
    setCurrentImageIndex( ( prev ) => ( prev - 1 + images.length ) % images.length );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Image Carousel */ }
      <div className="relative lg:w-1/2">
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <img
            src={ images[ currentImageIndex ] }
            alt={ `${ project.title } screenshot ${ currentImageIndex + 1 }` }
            className="object-cover w-full h-full"
          />

          {/* Navigation Arrows */ }
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={ prevImage }
              className="p-2 rounded-full bg-black/50 text-black hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={ nextImage }
              className="p-2 rounded-full bg-black/50 text-black hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Image Counter */ }
          <div className="absolute bottom-4 right-4 bg-green/50 text-black px-3 py-1 rounded-full text-sm">
            { currentImageIndex + 1 } / { images.length }
          </div>
        </div>
      </div>

      {/* Content */ }
      <div className="lg:w-1/2 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-4">{ project.title }</h2>
          <p className="text-gray-900 dark:text-gray-50 whitespace-pre-line mb-6">
            { project.description }
          </p>

          {/* Technologies */ }
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              { project.technologies.map( ( tech ) => (
                <span
                  key={ tech }
                  className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm"
                >
                  { tech }
                </span>
              ) ) }
            </div>
          </div>
        </div>

        {/* Links */ }
        <div className="flex flex-wrap gap-4 mt-4">
          { project.github && (
            <a
              href={ project.github }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Github className="w-5 h-5" />
              View Code
            </a>
          ) }
          { project.liveDemo && (
            <a
              href={ project.liveDemo }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-700 rounded-lg transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Live Demo
            </a>
          ) }
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;