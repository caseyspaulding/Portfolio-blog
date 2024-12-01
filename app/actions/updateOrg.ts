'use server';

import { db } from '@/db';
import { events, organizations, orgCustomers, orgTicketTypes } from '@/db/schemas/schema';
import { sendTicketEmail } from '@/helpers/generateQRCodeURL';
import type { OrgTicketType } from '@/types/dbTypes';
import { eq } from 'drizzle-orm/expressions';
import { revalidatePath } from 'next/cache';
import { getOrgIdFromTicketType } from './ticketActions';



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
// Update Stripe data for an organization
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateOrganizationStripeData = async ( decodedOrgName: string, accountDetails: any ) =>
{
    try
    {
        // Find the organization by its name
        const [ existingOrg ] = await db
            .select()
            .from( organizations )
            .where( eq( organizations.name, decodedOrgName ) );

        if ( !existingOrg )
        {
            throw new Error( `Organization with name ${ decodedOrgName } not found.` );
        }

        // Update the stripe_account_id
        await db
            .update( organizations )
            .set( { stripeAccountId: accountDetails.stripeConnectAccountId } )
            .where( eq( organizations.id, existingOrg.id ) );

        // Update the stripe_connect_linked
        await db
            .update( organizations )
            .set( { stripeConnectLinked: accountDetails.stripeConnectLinked } )
            .where( eq( organizations.id, existingOrg.id ) );

        // Update the stripe_account_created
        await db
            .update( organizations )
            .set( { stripeAccountCreated: accountDetails.stripeAccountCreated } )
            .where( eq( organizations.id, existingOrg.id ) );

        // Update the updated_at field
        await db
            .update( organizations )
            .set( { updatedAt: new Date() } )
            .where( eq( organizations.id, existingOrg.id ) );

        // Revalidate the organization path to refresh the page
        revalidatePath( `/dashboard/${ existingOrg.id }` );

        return { success: true, message: 'Organization Stripe data updated successfully' };
    } catch ( error )
    {
        console.error( 'Error updating organization Stripe data:', error );
        return { success: false, message: 'Error updating organization Stripe data' };
    }
};


// Function to fetch or create a customer based on buyer's email
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getOrgCreateCustomer ( buyer: any, ticketId: string ): Promise<Customer>
{
    const orgId = await getOrgIdFromTicketType( ticketId );

    if ( !orgId )
    {
        throw new Error( 'Organization ID not found.' );
    }

    // Check if the customer already exists
    const customers: Customer[] = await db
        .select()
        .from( orgCustomers )
        .where( eq( orgCustomers.email, buyer.email ) )
        .execute();

    let customer = customers[ 0 ]; // Assuming there's at most one customer with a given email

    if ( !customer )
    {
        // Insert new customer if not found
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

        // Fetch the customer again after insertion
        const insertedCustomers: Customer[] = await db
            .select()
            .from( orgCustomers )
            .where( eq( orgCustomers.email, buyer.email ) )
            .execute();

        customer = insertedCustomers[ 0 ];
    }
    console.log( `Customer ${ customer.email, buyer } created` );
    return customer;
}

// Function to fetch ticket type and event details
export async function fetchTicketAndEventDetails ( ticketId: string )
{
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
        .where( eq( orgTicketTypes.id, ticketId ) )
        .execute();

    if ( !ticketTypeData )
    {
        throw new Error( 'Event or ticket type not found.' );
    }

    return ticketTypeData;
}

// Function to send the ticket email
export async function sendTicketEmailWithDetails (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buyer: any,
    ticket: OrgTicketType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ticketTypeData: any
)
{
    await sendTicketEmail(
        buyer,
        ticket,
        ticketTypeData.eventName,
        ticketTypeData.description || 'No description available',
        {
            eventDate: ticketTypeData.eventDate,
            eventVenue: ticketTypeData.eventVenue || '',
            eventVenueDescription: ticketTypeData.eventVenueDescription || '',
            eventFAQs: JSON.stringify( ticketTypeData.eventFAQs ) || '[]',
        }
    );
    console.log( `Ticket email sent to ${ buyer.email, buyer.firstName }` );
}
