// /app/dashboard/[orgName]/profile/page.tsx


import { fetchUserProfile } from '@/app/actions/fetchUserProfile'; // Fetch user profile action

import { redirect } from 'next/navigation';
import UserProfileHeader from '../components/UserProfileHeader';

export  default async function ProfilePage (  )
{
  
  

  

  const userProfile = await fetchUserProfile();

  if ( !userProfile )
  {
    // If user profile is not found, you might want to redirect or show an error
    redirect( '/login' );
    return null; // You might want to return null or a loading state here
  }

  
  return (
    <div>
      <UserProfileHeader
        name={ userProfile.email }
        avatar={ userProfile.avatar }
        backgroundImage={ '/images/profileBG3.png' }
        email={ userProfile.email }
        
      />
      
    </div>
  );
}
