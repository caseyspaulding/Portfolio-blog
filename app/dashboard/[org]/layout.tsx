import { fetchUserProfile } from '../../actions/fetchUserProfile';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardLayoutClient from './DashboardLayoutClient'; // Import the client component wrapper
import Head from 'next/head';
import Script from 'next/script';
import type React from 'react';

export default async function DashboardLayout ( { children }: React.PropsWithChildren<unknown> )
{
    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const supabase = await createClient();
    const {
        data: { session }
    } = await supabase.auth.getSession();

    // If no session, redirect to login page
    if ( !session )
    {
        console.warn( 'No active session found, redirecting to login.' );
        redirect( '/login' );
        return null; // Safeguard in case redirect fails
    }

    // Fetch user profile
    let user = null;
    try
    {
        user = await fetchUserProfile();
    } catch ( error )
    {
        console.error( 'Error fetching user profile:', error );
        redirect( '/login' ); // Redirect in case of error fetching user
        return null;
    }

    // If user does not have an organization, show error message
    if ( !user?.orgName )
    {
        console.error( 'Organization not found for user:', user );
        return (
            <div>
                <h1>Error: Organization not found</h1>
                <p>
                    It looks like your account is not associated with an organization. Please contact support or try logging in again.
                </p>
            </div>
        );
    }

    // Render the layout with the fetched user data
    return (
        <>
            <Head>
                <title>{ user.orgName } Dashboard</title>
                <Script src="https://connect.stripe.com/connect-js" defer  />
            </Head>
            <DashboardLayoutClient user={ user } stripePublishableKey={ stripePublishableKey || '' }>
                { children }
            </DashboardLayoutClient>
        </>
    );
}
