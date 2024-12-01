import React from 'react';

interface SectionWithDividerProps
{
  children: React.ReactNode;
  backgroundColor: string;
  nextSectionColor: string;
  height?: string;
}

const SectionWithDivider = ( { children, backgroundColor, nextSectionColor, height = '100px' } : SectionWithDividerProps ) =>
{
  return (
    <div>
      {/* Section content */ }
      <section style={ { backgroundColor: backgroundColor, padding: '50px', textAlign: 'center' } }>
        { children }
      </section>

      {/* Divider */ }
      <svg
        className="divider"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={ { display: 'block', width: '100%', height } }
      >
        <polygon fill={ backgroundColor } points="0,100 100,0 100,100" />
      </svg>

      {/* The next section's color */ }
      <div style={ { backgroundColor: nextSectionColor, height: height } }></div>
    </div>
  );
};

export default SectionWithDivider;
