//// app/actions/authActions.ts
//'use server';

//import { UserRole } from '@/contexts/UserContext';
//import { db } from '@/db';
//import { ticketBuyerProfiles, userProfiles } from '@/db/schema';
//import { getSupabaseClient } from '@/utils/supabase/server';  // Update import
//import { eq } from 'drizzle-orm';
//import { headers } from 'next/headers';
//import { redirect } from 'next/navigation';

//export const fetchUserRole = async ( userId: string ): Promise<UserRole | null> =>
//{
//  const supabase = getSupabaseClient();  // Use singleton client

//  const { data: profile, error: profileError } = await supabase
//    .from( 'user_profiles' )
//    .select( 'role' )
//    .eq( 'user_id', userId )
//    .maybeSingle();

//  if ( profileError )
//  {
//    console.error( 'Error fetching user profile:', profileError );
//    return null;
//  }

//  return profile?.role as UserRole;
//};

//// Example of using this function during a sign-in flow

//export const signIn = async ( formData: FormData ) =>
//{
//  const email = formData.get( 'email' ) as string;
//  const password = formData.get( 'password' ) as string;
//  const supabase = getSupabaseClient();  // Use singleton client

//  const { data: session, error } = await supabase.auth.signInWithPassword( {
//    email,
//    password
//  } );

//  if ( error )
//  {
//    return redirect( '/login?message=Could not authenticate user' );
//  }

//  const { user } = session;

//  // Check if the user is authenticated
//  if ( !user )
//  {
//    console.error( 'No user found after authentication.' );
//    return redirect( '/login?message=Could not find authenticated user' );
//  }

//  // Fetch user's role and organization name
//  const { data: profile, error: profileError } = await supabase
//    .from( 'user_profiles' )
//    .select( 'organization_name, role' ) // Fetch role along with organization_name
//    .eq( 'user_id', user.id )
//    .maybeSingle(); // This will return null if no rows are found

//  if ( profileError )
//  {
//    console.error( 'Error fetching user profile:', profileError );
//    return redirect( '/login?message=Could not fetch user profile' );
//  }

//  // Check if user has a role and decide the redirection path
//  if ( !profile )
//  {
//    return redirect( '/login?message=User profile not found' );
//  }

//  const { organization_name, role } = profile;

//  // Redirect based on user role
//  switch ( role as UserRole )
//  {
//    case UserRole.OrgAdmin:
//    case UserRole.OrgMember:
//    case UserRole.OrgDeptHead:
//    case UserRole.EventCoordinator:
//      if ( !organization_name )
//      {
//        return redirect( '/choose-account-type' );
//      } else
//      {
//        return redirect( `/dashboard/${ encodeURIComponent( organization_name ) }` );
//      }
//    case UserRole.TicketBuyer:
//    case UserRole.Performer:
//    case UserRole.Volunteer:
//    case UserRole.User:
//      return redirect( '/events' );
//    default:
//      return redirect( '/login?message=Invalid user role' );
//  }
//};

//export const verifyAndRedirect = async ( tokenOrFormData: string | { formData: FormData } ) =>
//{
//  const supabase = getSupabaseClient();  // Use singleton client
//  let user;

//  if ( typeof tokenOrFormData === 'string' )
//  {
//    // Token from Google Sign-In
//    const { data: session, error } = await supabase.auth.signInWithIdToken( {
//      provider: 'google',
//      token: tokenOrFormData,
//    } );

//    if ( error || !session )
//    {
//      console.error( 'Error during Google sign-in:', error );
//      return { success: false, message: 'Google sign-in failed' };
//    }

//    user = session.user;
//  } else
//  {
//    // Handle Email/Password Sign-In
//    const { formData } = tokenOrFormData;
//    const email = formData.get( 'email' ) as string;
//    const password = formData.get( 'password' ) as string;

//    const { data: session, error } = await supabase.auth.signInWithPassword( {
//      email,
//      password,
//    } );

//    if ( error || !session )
//    {
//      console.error( 'Error during Email/Password sign-in:', error );
//      return { success: false, message: 'Email/Password sign-in failed' };
//    }

//    user = session.user;
//  }

//  if ( !user )
//  {
//    console.error( 'User authentication failed: No user object returned' );
//    return { success: false, message: 'User authentication failed' };
//  }

//  // Fetch user's role and organization name
//  const { data: profile, error: profileError } = await supabase
//    .from( 'user_profiles' )
//    .select( 'organization_name, role' )
//    .eq( 'user_id', user.id )
//    .maybeSingle();

//  if ( profileError )
//  {
//    console.error( 'Error fetching user profile:', profileError );
//    return { success: false, message: 'Error fetching user profile' };
//  }

//  if ( !profile )
//  {
//    return { success: true, redirectTo: '/events' }; // Redirect to events if no org
//  }

//  const { organization_name, role } = profile;

//  // Determine redirect path based on role
//  switch ( role as UserRole )
//  {
//    case UserRole.OrgAdmin:
//    case UserRole.OrgMember:
//    case UserRole.OrgDeptHead:
//    case UserRole.EventCoordinator:
//      if ( !organization_name )
//      {
//        return { success: true, redirectTo: '/choose-account-type' };
//      } else
//      {
//        return { success: true, redirectTo: `/dashboard/${ encodeURIComponent( organization_name ) }` };
//      }
//    case UserRole.TicketBuyer:
//    case UserRole.Performer:
//    case UserRole.Volunteer:
//    case UserRole.User:
//      return { success: true, redirectTo: '/events' };
//    default:
//      return { success: false, message: 'Invalid user role' };
//  }
//};

//export const signUp = async ( formData: FormData ) =>
//{
//  const origin = headers().get( 'origin' ) || 'http://localhost:3000';
//  const email = formData.get( 'email' ) as string;
//  const password = formData.get( 'password' ) as string;
//  const supabase = getSupabaseClient(); // Use singleton client

//  // Update the redirect URL to the choose-account-type page
//  const redirectTo = `${ origin }/auth/choose-account-type`;

//  const googleToken = formData.get( 'googleToken' ) as string;

//  if ( googleToken )
//  {
//    // Handle Google Sign-In
//    try
//    {
//      // eslint-disable-next-line @typescript-eslint/no-unused-vars
//      const { data, error } = await supabase.auth.signInWithIdToken( {
//        provider: 'google',
//        token: googleToken,
//      } );

//      if ( error )
//      {
//        console.error( 'Google sign-in error:', error );
//        return { success: false, message: 'Google sign-in failed' };
//      }

//      const { data: sessionData } = await supabase.auth.getSession();
//      if ( !sessionData?.session )
//      {
//        return { success: false, message: 'Session not created after Google sign-in' };
//      }

//      // After a successful Google sign-in, create a user profile
//      const userId = sessionData.session.user.id;
//      const profileCreationResult = await createUserProfileIfNotExists( userId, UserRole.User );
//      if ( !profileCreationResult.success )
//      {
//        return { success: false, message: profileCreationResult.message };
//      }

//      return { success: true, redirectTo: '/choose-account-type' };
//    } catch ( error )
//    {
//      console.error( 'Error during Google sign-in:', error );
//      return { success: false, message: 'Could not complete Google sign-in' };
//    }
//  }

//  if ( !email || !password )
//  {
//    return { success: false, message: 'Email and password are required' };
//  }

//  try
//  {
//    const { data: userResponse, error: userError } = await supabase.auth.signUp( {
//      email,
//      password,
//      options: {
//        emailRedirectTo: redirectTo, // Set the redirect URL for email confirmation
//      },
//    } );

//    if ( userError || !userResponse?.user )
//    {
//      console.error( 'User creation error:', userError );
//      return { success: false, message: 'Could not create user' };
//    }

//    // Create a user profile after successful email/password signup
//    const userId = userResponse.user.id;
//    const profileCreationResult = await createUserProfileIfNotExists( userId, UserRole.User );
//    if ( !profileCreationResult.success )
//    {
//      return { success: false, message: profileCreationResult.message };
//    }

//    // Redirect user to choose their account type after signing up
//    return {
//      success: true,
//      user: userResponse.user,
//      redirectTo: '/choose-account-type',
//    };
//  } catch ( error )
//  {
//    console.error( 'Error during signup:', error );
//    return { success: false, message: 'Could not complete sign up' };
//  }
//};

//export const createUserProfileIfNotExists = async ( userId: string, initialRole: UserRole ) =>
//{
//  try
//  {
//    // Check if the profile already exists
//    const existingUserProfile = await db
//      .select()
//      .from( userProfiles )
//      .where( eq( userProfiles.userId, userId ) )
//      .limit( 1 );

//    if ( existingUserProfile.length === 0 )
//    {
//      console.log( "User profile not found in `userProfiles`. Creating a new profile..." );

//      // Define the values you want to insert, making sure to include all required fields
//      const profileValues = {
//        userId,
//        orgId: 'default-org-id', // Replace with actual orgId or fetch from context if available
//        organizationName: 'Default Organization', // Replace with actual organization name
//        role: initialRole || 'user', // Use initialRole or default to 'user'
//        profileImageUrl: null, // Optional, can be set to null or a default URL
//        contactNumber: null, // Optional, can be set to null or a default value
//        bio: null, // Optional, can be set to null or a default value
//        socialLinks: null, // Optional, can be set to null or a default value
//        isActive: true, // Default is true, can be set explicitly
//        lastLogin: null, // Optional, can be set to null initially
//        permissions: null, // Optional, can be set to null or a default value
//        preferences: null, // Optional, can be set to null or a default value
//        department: null, // Optional, can be set to null or a default value
//      };

//      // Create a new profile for the user
//      const profileCreationResult = await db
//        .insert( userProfiles )
//        .values( profileValues );

//      if ( !profileCreationResult || profileCreationResult.length === 0 )
//      {
//        console.error( "Error creating new user profile." );
//        return { success: false, message: "Could not create user profile" };
//      }

//      console.log( "New user profile created successfully." );
//      return { success: true };
//    } else
//    {
//      console.log( "User profile already exists." );
//      return { success: true };
//    }
//  } catch ( error )
//  {
//    console.error( "Error creating or checking user profile:", error );
//    return { success: false, message: "Error checking or creating user profile" };
//  }
//};



//export const fetchUserData = async () =>
//{
//  const supabase = getSupabaseClient();  // Use singleton client

//  // Get the authenticated user
//  const {
//    data: { user },
//    error: authError,
//  } = await supabase.auth.getUser();

//  if ( authError || !user )
//  {
//    console.error( "Authentication error:", authError );
//    return null; // Return null or an appropriate error message
//  }

//  const userId = user.id;

//  try
//  {
//    // Fetch user profile data
//    const { data: profile, error: profileError } = await supabase
//      .from( 'user_profiles' )
//      .select( 'id, email, organization_name, org_id, role, profile_image_url' )
//      .eq( 'user_id', userId )
//      .single();

//    if ( profileError )
//    {
//      console.error( "Error fetching user profile:", profileError );
//      return null; // Return null or handle error accordingly
//    }

//    return {
//      id: profile.id,
//      email: profile.email,
//      orgName: profile.organization_name,
//      organizationId: profile.org_id,
//      role: profile.role,
//      avatar: profile.profile_image_url,
//    };
//  } catch ( error )
//  {
//    console.error( "Error during user data fetching:", error );
//    return null; // Return null or handle error accordingly
//  }
//};


//export const registerOrgAdmin = async () =>
//{
//  const supabase = getSupabaseClient();  // Use singleton client

//  // Get the authenticated user
//  const {
//    data: { user },
//    error: authError,
//  } = await supabase.auth.getUser();

//  if ( authError || !user )
//  {
//    console.error( "Authentication error:", authError );
//    return { success: false, message: "User not authenticated" };
//  }

//  const userId = user.id;

//  try
//  {
//    // Update the user's role in the user_profiles table to OrgAdmin
//    await db
//      .update( userProfiles )
//      .set( { role: 'OrgAdmin' } )
//      .where( eq( userProfiles.userId, userId ) );

//    console.log( "Organization admin registered successfully." );
//    return { success: true, userId };
//  } catch ( error )
//  {
//    console.error( "Error during registration:", error );
//    return { success: false, message: "Could not complete registration" };
//  }
//};



//export const registerTicketBuyer = async () =>
//{
//  const supabase = getSupabaseClient();  // Use singleton client

//  // Get the authenticated user
//  const {
//    data: { user },
//    error: authError,
//  } = await supabase.auth.getUser();

//  if ( authError || !user )
//  {
//    console.error( "Authentication error:", authError );
//    return { success: false, message: "User not authenticated" };
//  }

//  const userId = user.id;

//  try
//  {
//    // Check if the ticket buyer profile already exists
//    const existingProfile = await db
//      .select()
//      .from( ticketBuyerProfiles )
//      .where( eq( ticketBuyerProfiles.userId, userId ) )
//      .then( ( result ) => result[ 0 ] );

//    if ( existingProfile )
//    {
//      return { success: true, userId }; // Profile already exists
//    }

//    // Create a new ticket buyer profile
//    await db.insert( ticketBuyerProfiles ).values( {
//      userId,
//      // other fields can be added later by the user in their dashboard
//    } );

//    // Update the user's role in the user_profiles table
//    await db
//      .update( userProfiles )
//      .set( { role: 'TicketBuyer' } )
//      .where( eq( userProfiles.userId, userId ) );

//    console.log( "Ticket buyer registered successfully." );
//    return { success: true, userId };
//  } catch ( error )
//  {
//    console.error( "Error during registration:", error );
//    return { success: false, message: "Could not complete registration" };
//  }
//};
//export const updateUserRole = async ( role: UserRole ) =>
//{
//  const supabase = getSupabaseClient(); // Use singleton client
//  const { data: { user }, error: authError } = await supabase.auth.getUser();

//  if ( authError || !user )
//  {
//    console.error( "Authentication error:", authError );
//    return { success: false, message: "User not authenticated" };
//  }

//  const userId = user.id;
//  console.log( "User ID for role update:", userId );

//  try
//  {
//    // Ensure this logic is purely server-side without client imports
//    const existingUserProfile = await db
//      .select()
//      .from( userProfiles )
//      .where( eq( userProfiles.userId, userId ) )
//      .limit( 1 );

//    if ( existingUserProfile.length === 0 )
//    {
//      console.log( "User profile not found in `userProfiles`. Creating a new profile..." );

//      // Provide all required fields for new user profile
//      const profileValues = {
//        userId,
//        orgId: 'default-org-id', // Provide correct orgId or default
//        organizationName: 'Default Organization', // Provide correct organization name or default
//        role, // Initial role setting
//        profileImageUrl: null,
//        contactNumber: null,
//        bio: null,
//        socialLinks: null,
//        isActive: true,
//        lastLogin: null,
//        permissions: null,
//        preferences: null,
//        department: null,
//        createdAt: new Date(),
//        updatedAt: new Date(),
//      };

//      const profileCreationResult = await db
//        .insert( userProfiles )
//        .values( profileValues );

//      if ( !profileCreationResult || profileCreationResult.length === 0 )
//      {
//        console.error( "Error creating new user profile." );
//        return { success: false, message: "Could not create user profile" };
//      }

//      console.log( "New user profile created successfully." );
//    }

    
//    // Now update the user role
//    const roleUpdateResult = await db
//      .update( userProfiles )
//      .set( { role } )
//      .where( eq( userProfiles.userId, userId ) );

//    console.log( "Role update result:", roleUpdateResult );

//    if ( !roleUpdateResult || roleUpdateResult.length === 0 )
//    {
//      console.error( "Error updating role: No rows were updated." );
//      return { success: false, message: "Could not update user role" };
//    }

//    if ( role === UserRole.TicketBuyer )
//    {
//      console.log( "Role is TicketBuyer, checking for existing ticket buyer profile..." );

//      const existingProfile = await db
//        .select()
//        .from( ticketBuyerProfiles )
//        .where( eq( ticketBuyerProfiles.userId, userId ) );

//      console.log( "Existing ticket buyer profile:", existingProfile );

//      if ( existingProfile.length === 0 )
//      {
//        console.log( "No existing profile found, creating a new one..." );

//        const profileCreationResult = await db
//          .insert( ticketBuyerProfiles )
//          .values( { userId } );

//        console.log( "Profile creation result:", profileCreationResult );

//        if ( !profileCreationResult || profileCreationResult.length === 0 )
//        {
//          console.error( "Error creating ticket buyer profile." );
//          return { success: false, message: "Could not create ticket buyer profile" };
//        }
//      }
//    }

//    return { success: true, userId };
//  } catch ( error )
//  {
//    console.error( "Error during role update:", error );
//    return { success: false, message: "Could not update user role" };
//  }
//};