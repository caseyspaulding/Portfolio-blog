'use client';

import React, { useState } from 'react';
import { Github, ExternalLink, ChevronRight, ChevronLeft, X, Maximize } from 'lucide-react';

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
  const [ isFullScreen, setIsFullScreen ] = useState( false );

  const images = [ project.image, ...project.screenshots ];

  const nextImage = ( e?: React.MouseEvent ) =>
  {
    // Prevent click from also toggling modal if we’re in full screen
    if ( e ) e.stopPropagation();
    setCurrentImageIndex( ( prev ) => ( prev + 1 ) % images.length );
  };

  const prevImage = ( e?: React.MouseEvent ) =>
  {
    if ( e ) e.stopPropagation();
    setCurrentImageIndex( ( prev ) => ( prev - 1 + images.length ) % images.length );
  };

  const openFullScreen = ( e: React.MouseEvent ) =>
  {
    // Prevent "click through" if you need it
    e.stopPropagation();
    setIsFullScreen( true );
  };

  const closeFullScreen = ( e?: React.MouseEvent ) =>
  {
    // Close only if wrapper or X button is clicked
    if ( !e || e.target === e.currentTarget )
    {
      setIsFullScreen( false );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Image Carousel */ }
      <div className="relative lg:w-1/2">
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <img
            src={ images[ currentImageIndex ] }
            alt={ `${ project.title } screenshot ${ currentImageIndex + 1 }` }
            className="object-cover"
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
          <div className="absolute bottom-4 right-4 bg-blue/50 text-black px-3 py-1 rounded-full text-sm">
            { currentImageIndex + 1 } / { images.length }
          </div>
        </div>

        {/* Full Screen Button */ }
        <div className="mt-4 text-center">
          <button
            onClick={ openFullScreen }
            className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 transition-colors"
          >
            <Maximize className="w-5 h-5" />
            Full Screen
          </button>
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
                  className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-sm"
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
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-gray-700 rounded-lg transition-colors"
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
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Live Demo
            </a>
          ) }
        </div>
      </div>

      {/* Fullscreen Overlay */ }
      { isFullScreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={ closeFullScreen }
        >
          <div className="relative flex flex-col items-center">
            {/* Close Button */ }
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
              onClick={ () => setIsFullScreen( false ) }
              aria-label="Close full screen"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Fullscreen Image */ }
            <img
              src={ images[ currentImageIndex ] }
              alt="Fullscreen"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            {/* Navigation Arrows (in fullscreen) */ }
            <button
              onClick={ prevImage }
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black text-white hover:bg-gray-700 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={ nextImage }
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black text-white hover:bg-gray-700 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Counter in fullscreen */ }
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
              { currentImageIndex + 1 } / { images.length }
            </div>
          </div>
        </div>
      ) }
    </div>
  );
};

export default ProjectCard;
