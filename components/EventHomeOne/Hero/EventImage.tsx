import React from 'react';

interface EventImageProps
{
  imageUrl: string;
  alt?: string;
  overlayColor?: string;
  children?: React.ReactNode;
  minHeight?: string;
}

export default function EventImage ( {
  imageUrl,
  alt = "Event image",
  overlayColor = "bg-indigo-700",
  children,
  minHeight = "min-h-[12rem] sm:min-h-[26rem] lg:min-h-[28rem]",
}: EventImageProps )
{
  return (
    <div className="mx-auto max-w-7xl ">
      <div className={ `relative w-full ${ minHeight } overflow-hidden shadow-xl rounded-lg sm:rounded-xl` }>
        <img
          alt={ alt }
          src={ imageUrl }
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className={ `absolute inset-0 ${ overlayColor } mix-blend-multiply` } />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center  ">
            { children }
          </div>
        </div>
      </div>
    </div>
  );
}