'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavItem = ( { href, text }: { href: string; text: string } ) => (
  <li>
    <Link
      href={ href }
      className="text-black hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400"
    >
      { text }
    </Link>
  </li>
);

export default function Navbar ()
{
  const [ mounted, setMounted ] = useState( false );
  const { theme, setTheme } = useTheme();
  const [ isMenuOpen, setIsMenuOpen ] = useState( false );

  useEffect( () => setMounted( true ), [] );

  // Toggle mobile menu
  const toggleMenu = () =>
  {
    setIsMenuOpen( ( prev ) => !prev );
  };

  return (
    <nav className="sticky top-0 bg-white dark:bg-black dark:shadow-green-400 shadow-lg z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              Casey Spaulding
            </Link>
          </div>

          {/* Desktop menu */ }
          <div className="hidden md:flex items-center space-x-4">
            <ul className="flex space-x-4">
              <NavItem href="/about" text="About" />
              <NavItem href="/projects" text="Projects" />
              <NavItem href="/blog" text="Blog" />
              <NavItem href="/contact" text="Contact" />
            </ul>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              className="ml-4"
              onClick={ () => setTheme( theme === 'dark' ? 'light' : 'dark' ) }
            >
              { mounted &&
                ( theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                ) ) }
            </Button>
          </div>

          {/* Mobile menu button */ }
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle menu"
              onClick={ toggleMenu }
            >
              { isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              ) }
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */ }
      { isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <ul className="flex flex-col space-y-2">
              <NavItem href="/about" text="About" />
              <NavItem href="/projects" text="Projects" />
              <NavItem href="/blog" text="Blog" />
              <NavItem href="/contact" text="Contact" />
            </ul>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Toggle theme"
              className="mt-4"
              onClick={ () => setTheme( theme === 'dark' ? 'light' : 'dark' ) }
            >
              { mounted &&
                ( theme === 'dark' ? (
                  <Sun className="h-5 w-5 mr-2" />
                ) : (
                  <Moon className="h-5 w-5 mr-2" />
                ) ) }
              { theme === 'dark' ? 'Light Mode' : 'Dark Mode' }
            </Button>
          </div>
        </div>
      ) }
    </nav>
  );
}
