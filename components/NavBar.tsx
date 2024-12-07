'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Menu as HeadlessMenu } from '@headlessui/react';

const NavItem = ( { href, text, dropdown = null }: { href: string; text: string; dropdown?: React.ReactNode } ) =>
{
  if ( dropdown )
  {
    return (
      <li className="relative">
        <HeadlessMenu>
          <HeadlessMenu.Button className="flex items-center text-black hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400">
            { text }
            <ChevronDown className="ml-1 h-4 w-4" />
          </HeadlessMenu.Button>
          { dropdown }
        </HeadlessMenu>
      </li>
    );
  }
  return (
    <li>
      <Link
        href={ href }
        className="text-black hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400"
      >
        { text }
      </Link>
    </li>
  );
};

const FreeToolsDropdown = () => (
  <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    <div className="py-1">
      <HeadlessMenu.Item>
        { ( { active } ) => (
          <Link
            href="/tools/qrcode"
            className={ `${ active ? 'bg-green-100 dark:bg-green-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
              } block px-4 py-2 text-sm` }
          >
            QR Code Generator
          </Link>
        ) }
      </HeadlessMenu.Item>
      <HeadlessMenu.Item>
        { ( { active } ) => (
          <Link
            href="/tools/tool2"
            className={ `${ active ? 'bg-green-100 dark:bg-green-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
              } block px-4 py-2 text-sm` }
          >
            Tool 2
          </Link>
        ) }
      </HeadlessMenu.Item>
      <HeadlessMenu.Item>
        { ( { active } ) => (
          <Link
            href="/tools/tool3"
            className={ `${ active ? 'bg-green-100 dark:bg-green-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
              } block px-4 py-2 text-sm` }
          >
            Tool 3
          </Link>
        ) }
      </HeadlessMenu.Item>
    </div>
  </HeadlessMenu.Items>
);

export default function Navbar ()
{
  const [ mounted, setMounted ] = useState( false );
  const { theme, setTheme } = useTheme();
  const [ isMenuOpen, setIsMenuOpen ] = useState( false );

  useEffect( () => setMounted( true ), [] );

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
              <NavItem href="/blog" text="Blog" />
              <NavItem href="/projects" text="Projects" />
              <NavItem href="#" text="Free Tools" dropdown={ <FreeToolsDropdown /> } />
              <NavItem href="/contact" text="Contact" />
              <NavItem href="/about" text="About" />
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
              <li>
                <HeadlessMenu>
                  <HeadlessMenu.Button className="flex items-center text-black hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400">
                    Free Tools
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </HeadlessMenu.Button>
                  <FreeToolsDropdown />
                </HeadlessMenu>
              </li>
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

