import React from 'react';

type SlantedDivider3Props = {
  topColor: string;
  bottomColor: string;
  gradient: string;
  height?: string; // Optional height prop to adjust the height of the divider
  slantSide?: 'left' | 'right'; // Slant side prop to control the direction of the larger side
  zIndex?: number; // Optional zIndex to control stacking order
};

export const SlantedDivider3: React.FC<SlantedDivider3Props> = ( {

  gradient,
  height = '100px',
  slantSide = 'right',
  zIndex = 1, // Default zIndex
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
        position: 'absolute', // Position absolute to enable stacking
        width: '100%',
        zIndex: zIndex, // Control the stacking order with zIndex
        top: 0, // Adjust as needed to position correctly
      } }
    ></div>
  );
};

export default SlantedDivider3;
