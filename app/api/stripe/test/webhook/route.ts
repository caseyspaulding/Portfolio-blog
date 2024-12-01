import { db } from '@/db';
import { orgEventTickets } from '@/db/schemas/schema';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { fetchTicketAndEventDetails, sendTicketEmailWithDetails } from '@/app/actions/updateOrg'; // Import helpers
import type { OrgTicketType } from '@/types/dbTypes';
import { eq } from 'drizzle-orm/expressions';

const stripe = new Stripe( process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
} );

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST!;

// New configuration method
export const dynamic = 'force-dynamic';

export async function POST ( request: NextRequest )
{
  const sig = request.headers.get( 'Stripe-Signature' );

  if ( !sig )
  {
    console.error( 'No Stripe signature found' );
    return NextResponse.json( { error: 'No Stripe signature found' }, { status: 400 } );
  }

  try
  {
    const rawBody = await request.clone().text();

    // Construct the event with the raw body and signature
    const event = stripe.webhooks.constructEvent( rawBody, sig, endpointSecret );

    switch ( event.type )
    {
      // Handle checkout.session.completed
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        // Retrieve tickets based on the Stripe session ID
        const tickets = await db
          .select()
          .from( orgEventTickets )
          .where( eq( orgEventTickets.stripeSessionId, session.id ) )
          .execute();

        if ( tickets.length === 0 )
        {
          throw new Error( 'No tickets found for this session' );
        }

        // Update ticket statuses to 'sold'
        await db.update( orgEventTickets )
          .set( { status: 'sold' } )
          .where( eq( orgEventTickets.stripeSessionId, session.id ) )
          .execute();

        // Send ticket emails after payment is completed
        const buyer = {
          firstName: session.customer_details?.name,
          email: session.customer_email,
        };

        for ( const ticket of tickets )
        {
          const ticketTypeData = await fetchTicketAndEventDetails( ticket.ticketTypeId );

          // Send the ticket email with QR code and details
          await sendTicketEmailWithDetails( buyer, ticket as unknown as OrgTicketType, ticketTypeData );
        }

        console.log( `Tickets confirmed and email sent to ${ buyer.email }` );
        break;
      }

      // Handle additional Stripe events
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log( `PaymentIntent for ${ paymentIntent.amount } was successful!` );
        break;
      }

      case 'payment_intent.created': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log( `PaymentIntent created for ${ paymentIntent.amount }` );
        break;
      }

      case 'charge.succeeded': {
        const charge = event.data.object as Stripe.Charge;
        console.log( `Charge succeeded for ${ charge.amount }` );
        break;
      }

      case 'transfer.created': {
        const transfer = event.data.object as Stripe.Transfer;
        console.log( `Transfer created for ${ transfer.amount }` );
        break;
      }

      case 'application_fee.created': {
        const applicationFee = event.data.object as Stripe.ApplicationFee;
        console.log( `Application fee created for ${ applicationFee.amount }` );
        break;
      }

      case 'charge.updated': {
        const charge = event.data.object as Stripe.Charge;
        console.log( `Charge updated for ${ charge.amount }` );
        break;
      }

      default:
        console.log( `Unhandled event type ${ event.type }` );
    }

    return NextResponse.json( { received: true } );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch ( err: any )
  {
    console.error( '⚠️ Webhook Error:', err.message );
    return NextResponse.json( { error: `Webhook Error: ${ err.message }` }, { status: 400 } );
  }
}
