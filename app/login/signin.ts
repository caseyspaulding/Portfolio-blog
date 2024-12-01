// app/actions/authActions.ts
'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const signIn = async ( formData: FormData ) =>
{
    const email = formData.get( 'email' ) as string;
    const password = formData.get( 'password' ) as string;
    const supabase = await createClient();

    const { data: session, error } = await supabase.auth.signInWithPassword( {
        email,
        password
    } );

    if ( error )
    {
        return redirect( '/login?message=Could not authenticate user' );
    }

    const { user } = session;

    // Check if the user is authenticated
    if ( !user )
    {
        console.error( 'No user found after authentication.' );
        return redirect( '/login?message=Could not find authenticated user' );
    }

    const { data: profile, error: profileError } = await supabase
        .from( 'user_profiles' )
        .select( 'organization_name' )
        .eq( 'user_id', user.id )
        .maybeSingle(); // This will return null if no rows are found

    if ( profileError )
    {
        console.error( 'Error fetching user profile:', profileError );
        return redirect( '/login?message=Could not fetch user profile' );
    }

    // Redirect based on whether the user has an organization attached
    if ( !profile || !profile.organization_name )
    {
        // If no organization, redirect to the events page
        return redirect( '/events' );
    } else
    {
        // If organization exists, redirect to the dynamic dashboard route
        return redirect( `/dashboard/${ encodeURIComponent( profile.organization_name ) }` );
    }
};

export const verifyAndRedirect = async ( tokenOrFormData: string | { formData: FormData } ) =>
{
    const supabase = await createClient();
    let user;

    if ( typeof tokenOrFormData === 'string' )
    {
        // Token from Google Sign-In
        const { data: session, error } = await supabase.auth.signInWithIdToken( { provider: 'google', token: tokenOrFormData } );

        if ( error || !session )
        {
            return { success: false, message: 'Google sign-in failed' };
        }

        user = session.user;
    } else
    {
        // Handle Email/Password Sign-In
        const { formData } = tokenOrFormData;
        const email = formData.get( 'email' ) as string;
        const password = formData.get( 'password' ) as string;

        const { data: session, error } = await supabase.auth.signInWithPassword( { email, password } );

        if ( error || !session )
        {
            return { success: false, message: 'Email/Password sign-in failed' };
        }

        user = session.user;
    }

    if ( !user )
    {
        return { success: false, message: 'User authentication failed' };
    }

    // Check if user has an associated organization
    const { data: profile, error: profileError } = await supabase
        .from( 'user_profiles' )
        .select( 'organization_name' )
        .eq( 'user_id', user.id )
        .maybeSingle();

    if ( profileError )
    {
        return { success: false, message: 'Error fetching user profile' };
    }

    if ( !profile )
    {
        return { success: true, redirectTo: '/events' }; // Redirect to events if no org
    }

    // Redirect to the dynamic dashboard route
    return { success: true, redirectTo: `/dashboard/${ encodeURIComponent( profile.organization_name ) }` };
};