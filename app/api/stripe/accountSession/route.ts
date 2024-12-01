import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { organizations } from '@/db/schemas/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';

const stripe = new Stripe( process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
} );

export async function POST ( req: Request )
{
  try
  {
    const { orgId } = await req.json();

    if ( !orgId )
    {
      return NextResponse.json( { error: 'Missing orgId' }, { status: 400 } );
    }

    // Fetch the stripeAccountId from the organizations table
    const organization = await db
      .select( { stripeAccountId: organizations.stripeAccountId } )
      .from( organizations )
      .where( eq( organizations.id, orgId ) )
      .limit( 1 ); // Ensure you're fetching only one result

    const stripeAccountId = organization[ 0 ]?.stripeAccountId;
    console.log( 'Stripe account ID:', stripeAccountId ); // Debugging
    if ( !stripeAccountId )
    {
      return NextResponse.json( { error: 'Stripe account not found for this organization' }, { status: 404 } );
    }

    // Create the account session with the stripeAccountId
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

    console.log( 'Stripe account session created:', accountSession );

    return NextResponse.json( {
      client_secret: accountSession.client_secret,
    } );

  } catch ( error: any )
  {
    console.error( 'Error creating account session:', error.message );
    return NextResponse.json( { error: error.message }, { status: 500 } );
  }
}
