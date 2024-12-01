// serverActions/fetchClientSecret.ts
'use server';

import Stripe from 'stripe';
import { eq } from 'drizzle-orm';
import { organizations } from '@/db/schemas/schema'; // Import your organization schema
import { db } from '@/db';

const stripe = new Stripe( process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
} );

export async function fetchClientSecret ( orgId: string )
{
  try
  {
    // Fetch the Stripe account ID for the organization
    const org = await db.select()
      .from( organizations )
      .where( eq( organizations.id, orgId ) ) // Use Drizzle's eq function
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
          features: {
            refund_management: true,
            dispute_management: true,
            capture_payments: true,
          },
        },
      },
    } );

    // Return the client secret for use in the client
    return accountSession.client_secret;
  } catch ( error )
  {
    console.error( 'Error fetching client secret:', error );
    throw new Error( 'Failed to fetch client secret' );
  }
}
