import { db } from '@/db';
import { organizations } from '@/db/schemas/schema';
import { stripe } from '@/utils/stripe';
import { eq } from 'drizzle-orm';


export async function fetchPayoutsClientSecret ( orgId: string )
{
  try
  {
    // Fetch the Stripe account ID for the organization
    const org = await db
      .select()
      .from( organizations )
      .where( eq( organizations.id, orgId ) ) // Use eq function for comparison
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
        payouts: {
          enabled: true,
        },
      },
    } );

    return accountSession.client_secret;
  } catch ( error )
  {
    console.error( 'Error creating account session:', error );
    throw error;
  }
}
