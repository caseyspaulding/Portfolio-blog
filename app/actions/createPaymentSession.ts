'use server';

import { stripe } from '@/utils/stripe';
import { db } from '@/db';
import { organizations } from '@/db/schemas/schema';
import { eq } from 'drizzle-orm';
import { fetchUserProfile } from '@/app/actions/fetchUserProfile'; // Assuming you have a user profile action

export async function createPaymentSession ( org: string ): Promise<string>
{
  try
  {
    // Fetch authenticated user's profile
    const userProfile = await fetchUserProfile();

    if ( !userProfile || !userProfile.orgName )
    {
      console.warn( 'Server Action: User not authenticated or orgName missing.' );
      throw new Error( 'Unauthorized' );
    }

    const { orgName } = userProfile;

    // Fetch the Stripe account ID for the organization
    const organization = await db
      .select( { stripeAccountId: organizations.stripeAccountId } )
      .from( organizations )
      .where( eq( organizations.name, orgName ) )
      .limit( 1 );

    const stripeAccountId = organization[ 0 ]?.stripeAccountId;

    if ( !stripeAccountId )
    {
      console.error( `Server Action: Stripe account not found for organization: ${ orgName }` );
      throw new Error( 'Stripe account not found for this organization' );
    }

    // Create the payment session with payment details enabled
    const paymentSession = await stripe.accountSessions.create( {
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

    console.log( 'Server Action: Stripe payment session created:', paymentSession );

    // Return the client secret for the Stripe payment session
    return paymentSession.client_secret;
  } catch ( error: any )
  {
    console.error( 'Server Action: Error creating Stripe payment session:', error.message );
    throw new Error( 'Failed to create Stripe payment session.' );
  }
}
