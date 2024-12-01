'use client';

import type { ReactNode } from 'react';
import StackedLayout from './StackedLayout';
interface LayoutProps
{
  children: ReactNode;
}
export default function LayoutTWStacked ( { children }: LayoutProps )
{
  return (
    <div >
      <StackedLayout>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          { children }
        </div>
      </StackedLayout>
     
    </div>
  );
}