import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
export const dynamic = 'force-dynamic';

export async function GET ( request: Request )
{
  try
  {
    const requestUrl = new URL( request.url );
    const code = requestUrl.searchParams.get( 'code' );

    if ( !code )
    {
      return NextResponse.redirect( 'https://www.eventjacket.com/auth/error?message=Missing%20authorization%20code' );
    }

    const supabase = await createClient();

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession( code );

    if ( exchangeError )
    {
      console.error( 'Error exchanging code for session:', exchangeError );
      return NextResponse.redirect( 'https://www.eventjacket.com/auth/error?message=Auth%20error' );
    }

    return NextResponse.redirect( 'https://www.eventjacket.com/auth/onboarding' );

  } catch ( error )
  {
    console.error( 'Unexpected error:', error );
    return NextResponse.redirect( 'https://www.eventjacket.com/auth/error?message=Server%20error' );
  }
}
