'use server';
import { stripe } from '@/utils/stripe';
import { db } from '@/db';
import { organizations } from '@/db/schemas/schema';
import { eq } from 'drizzle-orm';
import { fetchUserProfile } from '@/app/actions/fetchUserProfile'; // Your user profile fetch action

export async function fetchStripeAccountDetails ()
{
  try
  {
    // Fetch the authenticated user's profile
    const userProfile = await fetchUserProfile();

    if ( !userProfile || !userProfile.orgName )
    {
      console.warn( 'Server Action: User not authenticated or orgName missing.' );
      throw new Error( 'Unauthorized' );
    }

    const { orgName } = userProfile;

    // Fetch the organization by orgName from the database
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

    // Fetch Stripe account details using the stripeAccountId
    const accountDetails = await stripe.accounts.retrieve( stripeAccountId );

    console.log( 'Server Action: Fetched Stripe account details:', accountDetails );

    return accountDetails;
  } catch ( error: any )
  {
    console.error( 'Server Action: Error fetching Stripe account details:', error.message );
    throw new Error( 'Failed to fetch Stripe account details.' );
  }
}
