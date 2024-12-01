'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

type VideoPlayerProps = {
  videoUrl: string; // URL of the video in the Supabase bucket
  thumbnailUrl: string; // URL of the thumbnail image
};

export default function VideoPlayer ( { videoUrl, thumbnailUrl }: VideoPlayerProps )
{
  const [ isVideoLoaded, setIsVideoLoaded ] = useState( false );
  const [ videoPreloaded, setVideoPreloaded ] = useState( false );

  const handleClick = () =>
  {
    setIsVideoLoaded( true );
  };

  // Preload the video in the background
  useEffect( () =>
  {
    if ( !isVideoLoaded )
    {
      const video = document.createElement( 'video' );
      video.src = videoUrl;
      video.preload = 'auto';
      video.oncanplaythrough = () => setVideoPreloaded( true );
    }
  }, [ isVideoLoaded, videoUrl ] );

  return (
    <div className="relative w-full rounded-2xl" style={ { aspectRatio: '16/9' } }>
      { !isVideoLoaded ? (
        <button
          type="button"
          onClick={ handleClick }
          className="relative block w-full h-full overflow-hidden rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Image
            src={ thumbnailUrl }
            alt="Video thumbnail"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
          <span aria-hidden="true" className="absolute inset-0 flex h-full w-full items-center justify-center">
            <svg viewBox="0 0 84 84" className="h-20 w-20">
              <circle r={ 42 } cx={ 42 } cy={ 42 } fill="blue" opacity="0.9" />
              <path
                d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z"
                fill="white"
              />
            </svg>
          </span>
        </button>
      ) : (
        <video
          className="absolute top-0 left-0 w-full h-full rounded-2xl"
          src={ videoUrl }
          controls
          autoPlay
          playsInline
          muted
          preload="auto"
        >
          Your browser does not support the video tag.
        </video>
      ) }
    </div>
  );
}
