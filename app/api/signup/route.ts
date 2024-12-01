import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';

export async function POST ( request: Request )
{
  const formData = await request.formData();

  // Get origin header
  const originHeader = await headers();
  const origin = originHeader.get( 'origin' ) || 'http://localhost:3000';

  const email = formData.get( 'email' ) as string;
  const password = formData.get( 'password' ) as string;
  const googleToken = formData.get( 'googleToken' ) as string;
  const supabase = await createClient();
  const redirectTo = `${ origin }/confirm`;

  try
  {
    if ( googleToken )
    {
      // Google Sign-In Logic
      const { data, error } = await supabase.auth.signInWithIdToken( {
        provider: 'google',
        token: googleToken,
      } );
      if ( error ) throw error;

      return NextResponse.json( {
        success: true,
        redirectTo: '/choose-account-type',
      } );
    } else if ( email && password )
    {
      // Email/Password Sign-Up Logic
      const { data: userResponse, error: userError } = await supabase.auth.signUp( {
        email,
        password,
        options: { emailRedirectTo: redirectTo },
      } );
      if ( userError ) throw userError;

      return NextResponse.json( {
        success: true,
        redirectTo: '/signup-success',
        user: userResponse.user,
      } );
    } else
    {
      // Invalid request
      return NextResponse.json( {
        success: false,
        message: 'Email and password are required for sign-up.',
      } );
    }
  } catch ( error )
  {
    console.error( 'Error during signup:', error );
    return NextResponse.json( {
      success: false,
      message: `Signup error: ${ ( error as Error ).message }`,
    } );
  }
}
