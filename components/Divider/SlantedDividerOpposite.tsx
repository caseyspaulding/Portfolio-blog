import React from 'react';

type SlantedDividerProps = {
  color: string;
  height?: string; // Optional height prop to adjust the height of the divider
};

export const SlantedDividerOpposite: React.FC<SlantedDividerProps> = ( {
  color,
  height = '100px',
} ) =>
{
  return (
    <div
      style={ {
        background: color,
        height: height,
        clipPath: 'polygon(0 0, 100% 100%, 100% 0, 0% 0)',
      } }
    ></div>
  );
};

export default SlantedDividerOpposite;
