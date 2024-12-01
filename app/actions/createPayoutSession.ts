'use server';

import { stripe } from '@/utils/stripe';
import { db } from '@/db';
import { organizations } from '@/db/schemas/schema';
import { eq } from 'drizzle-orm';
import { fetchUserProfile } from '@/app/actions/fetchUserProfile'; // Assuming this exists for user authentication

export async function createPayoutSession ( org: string ): Promise<string>
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

    // Fetch the Stripe account ID from the database based on the orgName
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

    // Create the payout session
    const payoutSession = await stripe.accountSessions.create( {
      account: stripeAccountId,
      components: {
        payouts: {
          enabled: true,
        },
      },
    } );

    console.log( 'Server Action: Stripe payout session created:', payoutSession );

    // Return the client secret for the Stripe payout session
    return payoutSession.client_secret;
  } catch ( error: any )
  {
    console.error( 'Server Action: Error creating payout session:', error.message );
    throw new Error( 'Failed to create Stripe payout session.' );
  }
}
