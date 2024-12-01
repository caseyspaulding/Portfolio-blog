import React from 'react';

type SlantedDividerSolidProps = {
  color: string;
  height?: string;
  flip?: boolean; // To flip the slant direction horizontally
  invert?: boolean; // To invert the angle completely
  zIndex?: number; // To control the stacking order
};

const SlantedDividerSolid: React.FC<SlantedDividerSolidProps> = ( {
  color,
  height = '100px',
  flip = false,
  invert = false,
  zIndex = 0, // Default z-index
} ) =>
{
  return (
    <div
      style={ {
        backgroundColor: color,
        border: 'none',
        height: height,
        clipPath: flip
          ? invert
            ? 'polygon(0 0, 100% 100%, 100% 0, 0 0)' // Top-left to bottom-right (inverted and flipped)
            : 'polygon(100% 0, 0 100%, 100% 100%, 0 0)' // Top-right to bottom-left (flipped)
          : invert
            ? 'polygon(100% 100%, 0 0, 100% 0, 0 100%)' // Bottom-left to top-right (inverted)
            : 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)', // Bottom-right to top-left (default)
        position: 'relative',
        zIndex: zIndex,
      } }
    ></div>
  );
};

export default SlantedDividerSolid;
