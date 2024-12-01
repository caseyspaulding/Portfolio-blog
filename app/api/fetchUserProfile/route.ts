import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { db } from '@/db';
import { userProfiles, organizations } from '@/db/schemas/schema';
import { eq } from 'drizzle-orm/expressions';

// Define TypeScript types for the expected response structure
interface ErrorResponse
{
  error: string;
}

interface SuccessResponse
{
  id: string;
  email: string;
  name: string; // New field for user's name
  orgName: string;
  organizationId: string;
  role: string;
  avatar: string;
  // Add other fields as per your UserType
}



// API Route handler function
export async function GET (): Promise<NextResponse<ErrorResponse | SuccessResponse>>
{
  try
  {
    const supabase = await createClient();

    // Fetch the authenticated user from Supabase auth
    const {
      data: { user: supabaseUser },
      error: authError
    } = await supabase.auth.getUser();

    if ( authError || !supabaseUser )
    {
      console.error( 'Auth error:', authError?.message );
      return NextResponse.json( { error: 'User not authenticated' }, { status: 401 } );
    }

    // Fetch user's profile from your custom userProfiles table
    const userProfileData = await db
      .select( {
        orgId: userProfiles.orgId,
        orgName: organizations.name,
        role: userProfiles.role,
      } )
      .from( userProfiles )
      .innerJoin( organizations, eq( userProfiles.orgId, organizations.id ) )
      .where( eq( userProfiles.userId, supabaseUser.id ) )
      .limit( 1 );

    if ( !userProfileData.length )
    {
      console.error( 'User profile not found for user:', supabaseUser.id );
      return NextResponse.json( { error: 'User profile not found' }, { status: 404 } );
    }

    const userProfile = userProfileData[ 0 ];

    // Construct combined user profile data
    const combinedUserData: SuccessResponse = {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata?.full_name, // Fetching the user's name
      orgName: userProfile.orgName,
      organizationId: userProfile.orgId,
      role: supabaseUser.user_metadata?.role || userProfile.role || 'user',
      avatar: supabaseUser.user_metadata?.avatar_url || '/images/avatars/user_avatar_default.png',
      // Add other fields if necessary
    };

    return NextResponse.json( combinedUserData, { status: 200 } );
  } catch ( error )
  {
    console.error( 'Error fetching user profile:', error );
    return NextResponse.json( { error: 'Failed to fetch user profile' }, { status: 500 } );
  }
}
