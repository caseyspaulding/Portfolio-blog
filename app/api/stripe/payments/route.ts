// '/app/api/payments/route.ts' or '/pages/api/payments.ts'

import { stripe } from '@/utils/stripe'; // Ensure you have your stripe client initialized
import { db } from '@/db';
import { organizations } from '@/db/schemas/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST ( request: Request )
{
  try
  {
    // Extract org from the query parameters
    const { org } = await request.json();

    // Fetch the Stripe account ID for the organization from your DB
    const organization = await db
      .select( { stripeAccountId: organizations.stripeAccountId } )
      .from( organizations )
      .where( eq( organizations.name, org ) )
      .limit( 1 );

    const stripeAccountId = organization[ 0 ]?.stripeAccountId;

    if ( !stripeAccountId )
    {
      return NextResponse.json( { error: 'Stripe account not found' }, { status: 404 } );
    }

    // Fetch payment intents from Stripe for the connected account
    const paymentIntents = await stripe.paymentIntents.list(
      {
        limit: 10, // Limit the number of returned payments
      },
      {
        stripeAccount: stripeAccountId, // Use the connected account ID
      }
    );

    // Return the payment intents data
    return NextResponse.json( paymentIntents.data );
  } catch ( error: any )
  {
    console.error( 'Error fetching payments:', error.message );
    return NextResponse.json( { error: 'Failed to fetch payments' }, { status: 500 } );
  }
}
