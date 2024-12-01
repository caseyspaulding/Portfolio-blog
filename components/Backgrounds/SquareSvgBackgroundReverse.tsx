import React from 'react';

const SvgBackgroundReversed = () =>
{
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_left,white,transparent)]" // Changed gradient to start from top-left
    >
      <defs>
        <pattern
          x="0%" // Changed to start from the left
          y={ 0 } // Set to 0 to start from the top
          id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
          width={ 200 }
          height={ 200 }
          patternUnits="userSpaceOnUse"
        >
          <path d="M100 0V200M200 200H0" fill="none" /> {/* Flipped the path orientation */ }
        </pattern>
      </defs>
      <svg x="0%" y={ 0 } className="overflow-visible fill-gray-50">
        <path
          d="M100.5 0h-201v201h201Z M-699.5 0h-201v201h201Z M-499.5 -400h-201v201h201Z M300.5 -600h-201v201h201Z" // Reversed the coordinates to flip the background
          strokeWidth={ 0 }
        />
      </svg>
      <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={ 0 } />
    </svg>
  );
};

export default SvgBackgroundReversed;
