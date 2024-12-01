import { type EmailOtpType } from '@supabase/supabase-js';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET ( request: NextRequest )
{
  const { searchParams } = new URL( request.url );
  const token_hash = searchParams.get( 'token_hash' );
  const type = searchParams.get( 'type' ) as EmailOtpType | null;
  const next = searchParams.get( 'next' ) ?? '/';
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;

  console.log( 'Request received with URL:', request.url );
  console.log( 'Token Hash:', token_hash );
  console.log( 'Type:', type );
  console.log( 'Next redirect path:', next );

  if ( token_hash && type )
  {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp( {
      type,
      token_hash,
    } );

    if ( error )
    {
      console.error( 'Error during OTP verification:', error.message );
    } else
    {
      console.log( 'OTP verification successful. Redirecting to:', redirectTo.pathname );
      return NextResponse.redirect( redirectTo );
    }
  } else
  {
    console.warn( 'Missing or invalid token_hash or type.' );
  }

  // Return the user to an error page with some instructions
  console.log( 'Redirecting to error page:', '/auth/auth-code-error' );
  redirectTo.pathname = '/auth/auth-code-error';
  return NextResponse.redirect( redirectTo );
}
