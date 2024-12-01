import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';
import { db } from '@/db';
import { orgCustomers, orgTicketTypes, events, orgEventTickets } from '@/db/schemas/schema';
import { getOrgIdFromTicketType, getStripeAccountIdFromOrgId } from '@/app/actions/ticketActions';

import { eq } from 'drizzle-orm';


type Customer = {
    id: string;
    orgId: string;
    firstName: string | null;  // Allow firstName to be nullable
    lastName: string | null;   // Allow lastName to be nullable
    email: string;
    phone: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    zipCode: string | null;
    profileImageUrl: string | null;
    status: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: any;
    notes: string | null;
    favoriteEventId: string | null;
    favoritePerformerId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};

export async function POST ( req: NextRequest )
{
    try
    {
        const body = await req.json();
        const { ticket, eventSlug, buyer, quantity } = body;

        console.log( 'Received ticket data:', ticket );
        console.log( 'Received buyer data:', buyer );

        // Step 1: Get the organization ID by ticket type
        const orgId = await getOrgIdFromTicketType( ticket.id );

        if ( !orgId )
        {
            throw new Error( 'Organization ID not found.' );
        }

        // Fetch ticket type and event details
        const [ ticketTypeData ] = await db
            .select( {
                eventName: events.name,
                eventDescription: events.description,
                eventFAQs: events.faqs,
                eventVenue: events.venue,
                eventVenueDescription: events.venueDescription,
                eventStartDate: events.startDate,
                eventEndDate: events.endDate,
                eventStartTime: events.eventStartTime,
                eventEndTime: events.eventEndTime,
                eventAddress: events.address,
                eventCity: events.city,
                eventState: events.state,
                eventCountry: events.country,
                eventZipCode: events.zipCode,
                eventGalleryImages: events.galleryImages,
                eventOrganizerContact: events.organizerContact,
                description: orgTicketTypes.description,
                quantity: orgTicketTypes.quantity,
                eventDate: orgTicketTypes.eventDate,
                saleStartDate: orgTicketTypes.saleStartDate,
                saleEndDate: orgTicketTypes.saleEndDate,
            } )
            .from( orgTicketTypes )
            .innerJoin( events, eq( orgTicketTypes.eventId, events.id ) )
            .where( eq( orgTicketTypes.id, ticket.id ) )
            .execute();

        if ( !ticketTypeData )
        {
            throw new Error( 'Event or ticket type not found.' );
        }

        console.log( 'Fetched ticket type and event data:', ticketTypeData );

        // Check if customer already exists
        const customers: Customer[] = await db
            .select()
            .from( orgCustomers )
            .where( eq( orgCustomers.email, buyer.email ) )
            .execute();

        let customer = customers[ 0 ];

        if ( !customer )
        {
            // Insert new customer if they do not exist
            await db.insert( orgCustomers ).values( {
                orgId: orgId,
                firstName: buyer.firstName || null,
                lastName: buyer.lastName || null,
                email: buyer.email,
                phone: buyer.phone || null,
                address: buyer.address || null,
                city: buyer.city || null,
                state: buyer.state || null,
                country: buyer.country || null,
                zipCode: buyer.zipCode || null,
                profileImageUrl: buyer.profileImageUrl || null,
                status: 'active',
                metadata: buyer.metadata || null,
                notes: buyer.notes || null,
                favoriteEventId: null,
                favoritePerformerId: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            } );

            // Fetch the customer again after insertion to get the new ID
            const insertedCustomers: Customer[] = await db
                .select()
                .from( orgCustomers )
                .where( eq( orgCustomers.email, buyer.email ) )
                .execute();

            customer = insertedCustomers[ 0 ];
        }

        const customerId = customer.id;
        const orgStripeAccountId = await getStripeAccountIdFromOrgId( orgId );

        if ( !orgStripeAccountId )
        {
            return NextResponse.json(
                { error: 'Stripe account is not set up for this organization.' },
                { status: 400 }
            );
        }

        const unitAmount = Math.round( ticket.price * 100 );

        // Step 4: Create the Stripe Checkout session
        const session = await stripe.checkout.sessions.create( {
            payment_method_types: [ 'card' ],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: ticket.name,
                            description: `Ticket for ${ ticketTypeData.eventName }`, // Use event name
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: quantity, // Use the total quantity here for Stripe session
                },
            ],
            payment_intent_data: {
                application_fee_amount: 25,
                transfer_data: {
                    destination: orgStripeAccountId,
                },
            },
            customer_email: buyer.email, // Automatically send receipt to buyer's email
            mode: 'payment',
            // Pass firstName and lastName directly from buyer object
            success_url: `https://eventjacket.com/events/${ eventSlug }/success`,
            cancel_url: `https://eventjacket.com/events/${ eventSlug }/cancel`,
        } );

        console.log( 'Session created:', session.id );

        // Step 5: Insert ticket data into database for each ticket purchased
        for ( let i = 0; i < quantity; i++ )
        {
            await db.insert( orgEventTickets ).values( {
                eventId: ticket.eventId,                // Matches schema
                orgId: orgId,                           // Matches schema
                customerId: customerId,                 // Matches schema
                ticketTypeId: ticket.id,                // Matches schema
                name: ticket.name,                      // Matches schema
                price: ticket.price,                    // Matches schema
                currency: 'USD',                        // Matches schema
                status: 'checkout-started',                         // Matches schema (default 'available', but here 'sold')
                validFrom: ticket.validFrom,            // Matches schema 
                validUntil: ticket.validUntil,          // Matches schema 
                purchaseDate: new Date(),               // Matches schema
                stripeSessionId: session.id,            // Matches schema
                createdAt: new Date(),                  // Matches schema
                updatedAt: new Date(),                  // Matches schema
                // You can also include other fields based on your ticket data and logic, like:
                isVIP: ticket.isVIP || false,           // Assuming `isVIP` is part of the ticket logic, or set to false
                seatNumber: ticket.seatNumber || null,  // If available, otherwise null
                // More fields from your schema can be added as needed
            } );
        }

        return NextResponse.json( session );
    } catch ( error )
    {
        console.error( 'Error creating Stripe Checkout session:', error );
        return NextResponse.json( { error: 'Failed to create session' }, { status: 500 } );
    }
}
