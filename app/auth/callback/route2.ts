import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET ( request: Request )
{
    try
    {
        const requestUrl = new URL( request.url );
        const code = requestUrl.searchParams.get( 'code' );

        if ( !code )
        {
            return NextResponse.redirect( 'https://www.eventjacket.com/auth/sign-in?message=Missing%20authorization%20code' );
        }

        const supabase = await createClient();

        // Attempt to exchange the authorization code for a session
        const { data: session, error: exchangeError } = await supabase.auth.exchangeCodeForSession( code );
        if ( exchangeError )
        {
            console.error( 'Error exchanging code for session:', exchangeError );
            return NextResponse.redirect( 'https://www.eventjacket.com/auth/sign-in?message=Auth%20error' );
        }

        const { user } = session;

        // Check if user profile exists and has an organization
        const { data: profile, error: profileError } = await supabase
            .from( 'user_profiles' )
            .select( 'org_id' )
            .eq( 'user_id', user.id )
            .single();

        if ( profileError )
        {
            console.error( 'Error fetching user profile:', profileError );
            return NextResponse.redirect( 'https://www.eventjacket.com/auth/onboarding' );
        }

        // Check if the user already has an organization
        if ( !profile || !profile.org_id )
        {
            // Redirect to onboarding if no organization exists
            return NextResponse.redirect( 'https://www.eventjacket.com/auth/onboarding' );
        }

        // Fetch the organization name if the profile has an org_id
        const { data: org, error: orgError } = await supabase
            .from( 'organizations' )
            .select( 'name' )
            .eq( 'id', profile.org_id )
            .single();

        if ( orgError || !org )
        {
            console.error( 'Error fetching organization:', orgError );
            return NextResponse.redirect( 'https://www.eventjacket.com/auth/sign-in?message=Could%20not%20fetch%20organization' );
        }

        // Properly encode the organization name for the URL
        const encodedOrgName = encodeURIComponent( org.name );
        return NextResponse.redirect( `https://www.eventjacket.com/dashboard/${ encodedOrgName }` );

    } catch ( error )
    {
        console.error( 'Unexpected error:', error );
        return NextResponse.redirect( 'https://www.eventjacket.com/auth/sign-in?message=Server%20error' );
    }
}
