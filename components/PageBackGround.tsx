'use client';

import { useTheme } from 'next-themes';

export default function PageBackground ( { children }: { children: React.ReactNode } )
{
  const { theme } = useTheme();

  return (
    <div className="relative">
      {/* Background Gradient */ }
      <div
        className={ `absolute inset-0 ${ theme === 'dark'
            ? 'bg-gradient-to-br from-black via-gray-950 to-blue-950'
            : 'bg-gradient-to-br from-white via-gray-100 to-zinc-100'
          }` }
        aria-hidden="true"
      />

      {/* Decorative Grid Overlay */ }
      <div className="absolute inset-0 h-full w-full">
        <div
          className={ `absolute bottom-0 left-0 right-0 top-0 ${ theme === 'dark'
              ? 'bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_2px)]'
              : 'bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]'
            } bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]` }
        ></div>
      </div>

      {/* Page Content */ }
      <div className="relative">{ children }</div>
    </div>
  );
}
