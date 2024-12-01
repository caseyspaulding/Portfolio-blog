import React from 'react';

interface HeadingSimpleProps
{
  heading: string;
  description: string;
}

export default function HeadingSimple ( { heading, description }: HeadingSimpleProps )
{
  return (
    <div className="border-b border-gray-200 pb-5 mb-4">
      <h3 className="text-2xl font-semibold leading-6 text-gray-900">{ heading }</h3>
      <p className="mt-2 max-w-4xl text-sm text-gray-500">{ description }</p>
    </div>
  );
}
