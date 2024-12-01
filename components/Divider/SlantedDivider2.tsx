import React from 'react';

type SlantedDivider2Props = {
  topColor: string;
  bottomColor: string;
  gradient: string;
  height?: string; // Optional height prop to adjust the height of the divider
  slantSide?: 'left' | 'right'; // Slant side prop to control the direction of the larger side
};

export const SlantedDivider2: React.FC<SlantedDivider2Props> = ( {
  
  gradient,
  height = '100px',
  slantSide = 'right', // Default to 'right'
} ) =>
{
  const clipPath =
    slantSide === 'right'
      ? 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)'
      : 'polygon(0 0, 100% 100%, 0% 100%, 100% 0%)';

  return (
    <div
      style={ {
        background: gradient,
        height: height,
        clipPath: clipPath,
      } }
    ></div>
  );
};

export default SlantedDivider2;
