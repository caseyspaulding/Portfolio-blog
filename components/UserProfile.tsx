import React from 'react';
import { createClient } from '@/utils/supabase/client';
import
{
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import
{
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Json } from '@/database.types';
import { useEffect, useState } from "react";

// Define your UserType
export interface User
{
  id: string; // From auth.users
  email: string; // From auth.users
  orgName: string; // From userProfiles
  organizationId: string; // From userProfiles
  role: string; // From userProfiles or auth.users depending on your logic
  avatar: string; // From userProfiles or a default URL
  contactNumber?: string; // Optional field from userProfiles
  bio?: string; // Optional field from userProfiles
  socialLinks?: Record<string, string>; // Optional field from userProfiles
  isActive: boolean; // From userProfiles
  lastLogin?: Date; // Optional field from userProfiles
  permissions?: Record<string, boolean>; // Optional field from userProfiles
  preferences?: Record<string, Json>; // Optional field from userProfiles
  department?: string; // Optional field from userProfiles
  createdAt: Date; // From userProfiles
  updatedAt: Date; // From userProfiles
}


const UserProfileMenu = () =>
{
  const [ isSticky, setIsSticky ] = useState( false );
  const [ isAuthenticated, setIsAuthenticated ] = useState( false );
  const [ user, setUser ] = useState<User | null>( null );
  const supabase = createClient()
  const fetchUserProfile = async () =>
  {
    try
    {
      const response = await fetch( '/api/fetchUserProfile', { method: 'GET' } );
      if ( response.ok )
      {
        const userProfile = await response.json();
        setUser( userProfile );
        setIsAuthenticated( true );
        return userProfile;
      } else
      {
        setUser( null );
        setIsAuthenticated( false );
        return null;
      }
    } catch ( error )
    {
      console.error( 'Error fetching user profile:', error );
      return null;
    }
  };

  useEffect( () =>
  {
    fetchUserProfile();
    const handleScroll = () => setIsSticky( window.scrollY > 0 );
    window.addEventListener( 'scroll', handleScroll );
    return () => window.removeEventListener( 'scroll', handleScroll );
  }, [] );

  const user2 = supabase.auth.getUser();
  const handleSignOut = async () =>
  {
    await supabase.auth.signOut();
  };

  const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
    { name: 'Sign out', href: '#' },
  ];

  return (
    <div className="items-center justify-center md:flex md:flex-1 lg:w-0">
      { !isAuthenticated ? (
        <Button asChild variant="link">
          <a href="/login" className="">
            Sign in
          </a>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={

                    '/images/avatars/user_avatar_default.png'
                  }
                  alt="Profile image"
                />
                <AvatarFallback>
                  { user?.email?.charAt( 0 )?.toUpperCase() }
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <p className="text-base font-medium ">
                  { 'Organization Name' }
                </p>
                <p className="text-xs text-gray-100">
                  { user?.email }
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-blue-700 ">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">
                  { 'Organization Name' }
                </span>
                <span className="text-xs ">
                  { user?.email }
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            { userNavigation.map( ( item ) =>
              item.name === 'Sign out' ? (
                <DropdownMenuItem
                  key={ item.name }
                  onClick={ handleSignOut }
                  className="cursor-pointer hover:bg-blue-600"
                >
                  { item.name }
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild key={ item.name }>
                  <a
                    href={ item.href }
                    className="w-full text-left hover:bg-blue-600"
                  >
                    { item.name }
                  </a>
                </DropdownMenuItem>
              )
            ) }
          </DropdownMenuContent>
        </DropdownMenu>
      ) }
    </div>
  );
};

export default UserProfileMenu;
