type SlantedDividerProps = {
  gradient: string;
  height?: string;
  slantDirection?: 'left' | 'right';
};

const SlantedDivider: React.FC<SlantedDividerProps> = ( {
  gradient,
  height = '150px',
  slantDirection = 'right',
} ) =>
{
  const clipPath =
    slantDirection === 'right'
      ? 'polygon(0 0, 100% 0, 100% 100%, 0 10%)'
      : 'polygon(0 0, 100% 0, 100% 50%, 0 100%)';

  return (
    <div
      style={ {
        background: gradient,
        height: height,
        clipPath: clipPath,
        width: '100%',
      } }
    ></div>
  );
};

export default SlantedDivider;