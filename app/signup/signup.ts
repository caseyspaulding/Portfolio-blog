//'use server';

//import { createClient } from '@/utils/supabase/server';
//import { headers } from 'next/headers';

//export const signUp = async ( formData: FormData ) =>
//{
//  const origin = headers().get( 'origin' ) || 'http://localhost:3000';
//  const email = formData.get( 'email' ) as string;
//  const password = formData.get( 'password' ) as string;
//  const supabase = createClient();

//  // Define the redirect URL for email confirmation
//  const redirectTo = `${ origin }/confirm`;

//  const googleToken = formData.get( 'googleToken' ) as string;

//  if ( googleToken )
//  {
//    try
//    {
//      console.log( 'Attempting Google sign-in with token:', googleToken ); // Log the token for debugging
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

//      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
//      if ( sessionError || !sessionData?.session )
//      {
//        console.error( 'Session not created after Google sign-in:', sessionError );
//        return { success: false, message: 'Session not created after Google sign-in' };
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
//        emailRedirectTo: redirectTo,  // Set the redirect URL for email confirmation
//      },
//    } );

//    if ( userError || !userResponse?.user )
//    {
//      console.error( 'User creation error:', userError );
//      return { success: false, message: 'Could not create user' };
//    }

//    // Return user data to check confirmation status
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