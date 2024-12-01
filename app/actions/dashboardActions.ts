import Stripe from 'stripe';
import { db } from '@/db';
import { organizations } from '@/db/schemas/schema';
import { eq } from 'drizzle-orm/expressions';

const stripe = new Stripe( process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
} );


export async function fetchTicketSalesForOrg ( orgId: string )
{
  try
  {
    // 1. Fetch the organization's Stripe account ID from your database
    const orgData = await db
      .select( { stripeAccountId: organizations.stripeAccountId } )
      .from( organizations )
      .where( eq( organizations.id, orgId ) )
      .limit( 1 );

    const stripeAccountId = orgData[ 0 ]?.stripeAccountId;

    if ( !stripeAccountId )
    {
      throw new Error( 'Stripe account ID not found for this organization' );
    }

    // 2. Use Stripe API to fetch transactions for the organization's connected account
    const paymentIntents = await stripe.paymentIntents.list(
      { limit: 100 }, // Adjust the limit or add filters as needed
      { stripeAccount: stripeAccountId }
    );

    // Alternatively, use `BalanceTransactions` if you need more detailed financial information
    // const balanceTransactions = await stripe.balanceTransactions.list(
    //   { limit: 100 },
    //   { stripeAccount: stripeAccountId }
    // );

    // 3. Format the fetched data for your dashboard
    const ticketSales = paymentIntents.data.map( ( intent ) => ( {
      id: intent.id,
      amount: intent.amount_received,
      currency: intent.currency,
      status: intent.status,
      created: intent.created,
    } ) );

    return ticketSales;

  } catch ( error )
  {
    console.error( 'Error fetching ticket sales data:', error );
    return null;
  }
}
