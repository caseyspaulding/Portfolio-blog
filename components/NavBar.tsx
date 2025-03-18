'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Menu as HeadlessMenu } from '@headlessui/react';

const NavItem = ( {
  href,
  text,
  dropdown = null,
  onNavigate,
  active = false
}: {
  href: string;
  text: string;
  dropdown?: React.ReactNode;
  onNavigate?: () => void;
  active?: boolean;
} ) =>
{
  if ( dropdown )
  {
    return (
      <li className="relative">
        <HeadlessMenu>
          <HeadlessMenu.Button className={ `flex items-center font-medium transition-colors duration-200 ${ active
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
            }` }>
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
        className={ `font-medium transition-colors duration-200 ${ active
          ? 'text-blue-600 dark:text-blue-400'
          : 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
          }` }
        onClick={ onNavigate }
      >
        { text }
      </Link>
    </li>
  );
};

const FreeToolsDropdown = ( { onNavigate }: { onNavigate?: () => void } ) => (
  <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-50">
    <div className="py-1">
      <HeadlessMenu.Item>
        { ( { active } ) => (
          <Link
            href="/tools/qrcode"
            className={ `${ active
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 text-blue-200 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-300'
              } block px-4 py-3 text-sm transition-colors duration-150` }
            onClick={ onNavigate }
          >
            QR Code Generator
          </Link>
        ) }
      </HeadlessMenu.Item>
      {/* Add more tool links here */ }

    </div>
  </HeadlessMenu.Items>
);

export default function Navbar ()
{
  const [ mounted, setMounted ] = useState( false );
  const { theme, setTheme } = useTheme();
  const [ isMenuOpen, setIsMenuOpen ] = useState( false );
  const [ scrolled, setScrolled ] = useState( false );
  const [ activePath, setActivePath ] = useState( '' );

  useEffect( () =>
  {
    setMounted( true );

    // Set active path based on current URL
    setActivePath( window.location.pathname );

    // Detect scroll for glass effect
    const handleScroll = () =>
    {
      if ( window.scrollY > 10 )
      {
        setScrolled( true );
      } else
      {
        setScrolled( false );
      }
    };

    window.addEventListener( 'scroll', handleScroll );
    return () => window.removeEventListener( 'scroll', handleScroll );
  }, [] );

  const toggleMenu = () =>
  {
    setIsMenuOpen( ( prev ) => !prev );
  };

  const closeMenu = () =>
  {
    setIsMenuOpen( false );
  };

  // Check if a path is active
  const isActive = ( path: string ) =>
  {
    if ( path === '/' )
    {
      return activePath === '/';
    }
    return activePath.startsWith( path );
  };

  return (
    <nav
      className={ `sticky top-0 z-50 transition-all duration-300 ${ scrolled
        ? 'bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 shadow-lg'
        : 'bg-white dark:bg-gray-900'
        }` }
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
              onClick={ closeMenu }
            >
              Casey Spaulding
            </Link>
          </div>

          {/* Desktop menu */ }
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              <NavItem href="/blog" text="Blog" active={ isActive( '/blog' ) } />
              <NavItem href="/projects" text="Projects" active={ isActive( '/projects' ) } />
              <NavItem
                href="#"
                text="Free Tools"
                dropdown={ <FreeToolsDropdown /> }
                active={ isActive( '/tools' ) }
              />
              <NavItem href="/contact" text="Contact" active={ isActive( '/contact' ) } />
              <NavItem href="/about" text="About" active={ isActive( '/about' ) } />
            </ul>

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={ () => setTheme( theme === 'dark' ? 'light' : 'dark' ) }
            >
              { mounted &&
                ( theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-600" />
                ) ) }
            </Button>
          </div>

          {/* Mobile menu button */ }
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              className="mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={ () => setTheme( theme === 'dark' ? 'light' : 'dark' ) }
            >
              { mounted &&
                ( theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-600" />
                ) ) }
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle menu"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={ toggleMenu }
            >
              { isMenuOpen ? (
                <X className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              ) : (
                <Menu className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              ) }
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */ }
      { isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white dark:bg-gray-900 shadow-lg rounded-b-xl border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-4 space-y-3">
            <ul className="flex flex-col space-y-3">
              <NavItem href="/blog" text="Blog" onNavigate={ closeMenu } active={ isActive( '/blog' ) } />
              <NavItem href="/projects" text="Projects" onNavigate={ closeMenu } active={ isActive( '/projects' ) } />
              <NavItem href="/contact" text="Contact" onNavigate={ closeMenu } active={ isActive( '/contact' ) } />
              <NavItem href="/about" text="About" onNavigate={ closeMenu } active={ isActive( '/about' ) } />
              <li>
                <HeadlessMenu as="div" className="relative">
                  <HeadlessMenu.Button className={ `flex items-center font-medium transition-colors duration-200 ${ isActive( '/tools' )
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
                    }` }>
                    Free Tools
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </HeadlessMenu.Button>
                  <div className="mt-2 ml-2 border-l-2 border-blue-200 dark:border-blue-800 pl-4">
                    <div className="py-2 space-y-2">
                      <Link
                        href="/tools/qrcode"
                        className="block text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                        onClick={ closeMenu }
                      >
                        QR Code Generator
                      </Link>

                    </div>
                  </div>
                </HeadlessMenu>
              </li>
            </ul>
          </div>
        </div>
      ) }
    </nav>
  );
}