import React from 'react';

type SlantedDividerProps = {
  topColor?: string;
  bottomColor?: string;
  gradient?: string;
  height?: string; // Optional height prop to adjust the height of the divider
  flip?: boolean; // Optional prop to flip the slant direction
  zIndex?: number; // Optional zIndex prop to manage stacking order
  overlap?: string; // Optional overlap value to create the overlap effect
  invert?: boolean; // Optional prop to invert the angle completely
};

export const SlantedDivider: React.FC<SlantedDividerProps> = ( {

  gradient,
  height = '100px',
  flip = false,
  zIndex = 1,
  overlap = '-50px',
  invert = false,
} ) =>
{
  const clipPath = flip
    ? invert
      ? 'polygon(0 0, 100% 100%, 100% 0, 0 0)'
      : 'polygon(100% 0, 0 100%, 100% 100%, 100% 0)'
    : invert
      ? 'polygon(100% 100%, 0 0, 0 100%, 100% 100%)'
      : 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)';

  return (
    <div
      style={ {
        background: gradient,
        height: height,
        clipPath: clipPath,
        zIndex: zIndex,
        position: 'relative',
        marginTop: overlap,
      } }
    ></div>
  );
};

export default SlantedDivider;
