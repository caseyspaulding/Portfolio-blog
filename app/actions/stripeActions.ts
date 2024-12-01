/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { redirect } from 'next/navigation';
import { fetchUserProfile } from '@/app/actions/fetchUserProfile';
import { eq } from 'drizzle-orm/expressions';
import { organizations } from '@/db/schemas/schema';
import { db } from '@/db';
import { stripe } from '@/utils/stripe';


export async function initiateStripeConnect ( userId: string )
{
    try
    {
        const account = await stripe.accounts.create( {
            type: 'express',
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true }
            }
        } );

        const accountLinks = await stripe.accountLinks.create( {
            account: account.id,
            refresh_url: `${ process.env.NEXT_PUBLIC_BASE_URL }/stripe/reauth`,
            return_url: `${ process.env.NEXT_PUBLIC_BASE_URL }/stripe/return`,
            type: 'account_onboarding'
        } );

        // Update user profile with Stripe Connect information

        return { success: true, url: accountLinks.url };
    } catch ( error )
    {
        console.error( 'Error creating Stripe Connect account:', error );
        return { success: false, error: 'Failed to create Stripe Connect account' };
    }
}

export async function CreateStripeAccountLink ()
{

    try
    {
        const account = await stripe.accounts.create( {
            type: 'express',
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true }
            }
        } );

        const accountLinks = await stripe.accountLinks.create( {
            account: account.id,
            refresh_url: `${ process.env.NEXT_PUBLIC_BASE_URL }/stripe/reauth`,
            return_url: `${ process.env.NEXT_PUBLIC_BASE_URL }/stripe/return`,
            type: 'account_onboarding'
        } );

        // Update user profile with Stripe account ID
        //await updateUserProfile( userId, { stripeConnectedAccountId: account.id } );

        // Redirect to Stripe's onboarding page
        redirect( accountLinks.url );
    } catch ( error )
    {
        console.error( 'Error creating Stripe Connect account:', error );
        throw new Error( 'Failed to create Stripe Connect account' );
    }
}

export async function createStripeAccountLink ( account: string, org: string, origin: string )
{
    try
    {
        // Validate the input parameters
        if ( !account || !org || !origin )
        {
            console.error( 'Missing required parameters:', { account, org, origin } );
            throw new Error( 'Missing required parameters' );
        }

        // Construct the URLs using the `origin`, `org`, and `account` parameters
        const refreshUrl = `${ origin }/dashboard/${ org }/banking/refresh/${ account }`;
        const returnUrl = `${ origin }/dashboard/${ org }/banking/return/${ account }`;

        // Log the constructed URLs for debugging
        console.log( 'Constructed refresh URL:', refreshUrl );
        console.log( 'Constructed return URL:', returnUrl );

        // Attempt to create the Stripe account link
        const accountLink = await stripe.accountLinks.create( {
            account: account,
            refresh_url: refreshUrl,
            return_url: returnUrl,
            type: 'account_onboarding'
        } );

        // Log success and return the account link URL
        console.log( 'Stripe account link created successfully:', accountLink.url );
        return accountLink.url;
    } catch ( error )
    {
        // Log any unexpected errors that occur during processing
        console.error(
            'An error occurred when calling the Stripe API to create an account link:',
            error
        );
        throw error; // Re-throw the error to be handled by the calling component
    }
}

export async function createPaymentSession ( orgId: string )
{
    try
    {
        // Fetch the Stripe account ID for the organization
        const org = await db
            .select()
            .from( organizations )
            .where( eq( organizations.id, orgId ) )
            .limit( 1 );

        const stripeAccountId = org[ 0 ]?.stripeAccountId;

        if ( !stripeAccountId )
        {
            throw new Error( 'Stripe account ID not found' );
        }

        // Create an account session for Stripe Connect embedded components
        const accountSession = await stripe.accountSessions.create( {
            account: stripeAccountId,
            components: {
                payments: {
                    enabled: true,
                },
            },
        } );

        return { client_secret: accountSession.client_secret };
    } catch ( error )
    {
        console.error( 'Error creating account session:', error );
        throw error;
    }
}