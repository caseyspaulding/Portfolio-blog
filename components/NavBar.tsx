'use client'
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Transition } from '@headlessui/react'
import { useUser } from '@/contexts/UserContext'
import { User } from "@supabase/supabase-js";
import React from "react";
import UserProfileMenu from "./UserProfile";


const NavItem = ( { href, text }: { href: string; text: string } ) => (
  <li>
    <Link href={ href } className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">
      { text }
    </Link>
  </li>
)

export default function Navbar ()
{
  const [ mounted, setMounted ] = useState( false )
  const { theme, setTheme } = useTheme()
  const [ isMenuOpen, setIsMenuOpen ] = useState( false )

  useEffect( () => setMounted( true ), [] )
  // Toggle mobile menu
  const toggleMenu = () =>
  {
    setIsMenuOpen( ( prev ) => !prev );
  };


  const userNavigation = [

    { name: 'Sign out', href: '#' },
  ];



  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
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
              { mounted && ( theme === 'dark' ? (
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
            {/* User Profile or Sign in/Sign up */ }
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              { !isAuthenticated ? (
                <>
                  <a href="/login" className="whitespace-nowrap text-medium font-medium text-gray-100 hover:text-gray-200">
                    Sign in
                  </a>

                </>
              ) : (
                <Menu as="div" className="ml-3 relative bg-blue-700/90 backdrop-blur-lg">
                  <div>
                    <Menu.Button className="max-w-xs bg-blue-700 flex items-center text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500">
                      <span className="sr-only">Open user menu</span>
                      <div className="flex items-center space-x-4">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={ user2?.user?.avatar || '/images/avatars/user_avatar_default.png' }
                          alt="Profile image"
                          height={ 32 }
                          width={ 32 }
                        />
                        {/* Container to stack the orgName and email vertically */ }
                        <div className="flex flex-col items-start">
                          <p className="text-base font-medium text-gray-100">{ user?.orgName }</p>
                          <p className="text-xs text-gray-100">{ user2.user?.name || user?.email }</p>
                        </div>
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={ React.Fragment }
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-blue-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      { userNavigation.map( ( item ) => (
                        <Menu.Items key={ item.name }>
                          { ( { active } ) =>
                            item.name === 'Sign out' ? (
                              <form onSubmit={ handleSignOut } method="post" className="w-full">
                                <button
                                  type="submit"
                                  className={ `${ active ? 'bg-blue-600' : ''
                                    } w-full text-left px-4 py-2 text-sm text-gray-100` }
                                >
                                  { item.name }
                                </button>
                              </form>
                            ) : (
                              <a
                                href={ item.href }
                                className={ `${ active ? 'bg-blue-600' : ''
                                  } block w-full px-4 py-2 text-sm text-gray-100` }
                              >
                                { item.name }
                              </a>
                            )
                          }
                        </Menu.Items>
                      ) ) }
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) }
            </div>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Toggle theme"
              className="mt-4"
              onClick={ () => setTheme( theme === 'dark' ? 'light' : 'dark' ) }
            >
              { mounted && ( theme === 'dark' ? (
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
  )
}

