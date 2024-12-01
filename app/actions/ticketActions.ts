'use server';

import { db } from '@/db';
import { orgTicketTypes, organizations } from '@/db/schemas/schema';

import { createClient } from '@/utils/supabase/server';

import { and, eq } from 'drizzle-orm/expressions';
import { revalidatePath } from 'next/cache';


// Create a new ticket type
export async function createTicketType ( formData: FormData )
{
    const { orgId } = await getUserAndOrgId();

    const eventId = formData.get( 'eventId' ) as string;
    const name = formData.get( 'name' ) as string;
    const description = ( formData.get( 'description' ) as string ) || null; // Handle optional field
    const price = formData.get( 'price' ) as string; // Keep it as a string
    const quantity = parseInt( formData.get( 'quantity' ) as string, 10 );
    const saleStartDate = new Date( formData.get( 'saleStartDate' ) as string );
    const saleEndDate = new Date( formData.get( 'saleEndDate' ) as string );
    const eventDate = new Date( formData.get( 'eventDate' ) as string );
    const isEarlyBird = formData.get( 'isEarlyBird' ) === 'true';
    const maxPerCustomer = formData.get( 'maxPerCustomer' )
        ? parseInt( formData.get( 'maxPerCustomer' ) as string, 10 )
        : null; // Handle optional field

    const newTicketType = {
        eventId: eventId,
        orgId: orgId,
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        saleStartDate: saleStartDate.toISOString().split( 'T' )[ 0 ], // Convert to 'YYYY-MM-DD'
        saleEndDate: saleEndDate.toISOString().split( 'T' )[ 0 ], // Convert to 'YYYY-MM-DD'
        eventDate: eventDate.toISOString().split( 'T' )[ 0 ], // Convert to 'YYYY-MM-DD'
        isEarlyBird: isEarlyBird,
        maxPerCustomer: maxPerCustomer,
        createdAt: new Date(), // You can keep this as a Date object if it will be converted later
        updatedAt: new Date() // You can keep this as a Date object if it will be converted later
    };

    try
    {
        await db.insert( orgTicketTypes ).values( newTicketType );
        revalidatePath( `/dashboard/${ orgId }/events/${ eventId }/create-tickets` );
        return { success: true, message: 'Ticket type created successfully' };
    } catch ( error )
    {
        console.error( 'Error inserting ticket type:', error );
        return { success: false, message: 'Error inserting ticket type into database' };
    }
}

// Update an existing ticket type
export async function updateTicketType ( ticketTypeId: string, formData: FormData )
{
    const { orgId } = await getUserAndOrgId();

    const name = formData.get( 'name' ) as string;
    const description = formData.get( 'description' ) as string;
    const price = parseFloat( formData.get( 'price' ) as string );
    const quantity = parseInt( formData.get( 'quantity' ) as string, 10 );
    const saleStartDate = new Date( formData.get( 'saleStartDate' ) as string );
    const saleEndDate = new Date( formData.get( 'saleEndDate' ) as string );
    const eventDate = new Date( formData.get( 'eventDate' ) as string );
    const isEarlyBird = formData.get( 'isEarlyBird' ) === 'true';
    const maxPerCustomer = parseInt( formData.get( 'maxPerCustomer' ) as string, 10 );

    const updatedTicketType = {
        name,
        description,
        price: price.toString(),
        quantity,
        saleStartDate: saleStartDate.toISOString().split( 'T' )[ 0 ], // Convert to 'YYYY-MM-DD'
        saleEndDate: saleEndDate.toISOString().split( 'T' )[ 0 ], // Convert to 'YYYY-MM-DD'
        eventDate: eventDate.toISOString().split( 'T' )[ 0 ],
        isEarlyBird,
        maxPerCustomer,
        updatedAt: new Date()
    };

    try
    {
        await db
            .update( orgTicketTypes )
            .set( updatedTicketType )
            .where( and( eq( orgTicketTypes.id, ticketTypeId ), eq( orgTicketTypes.orgId, orgId ) ) );
        revalidatePath( `/dashboard/${ orgId }/events/${ ticketTypeId }/manage-tickets` );
        return { success: true, message: 'Ticket type updated successfully' };
    } catch ( error )
    {
        console.error( 'Error updating ticket type:', error );
        return { success: false, message: 'Error updating ticket type' };
    }
}

// Delete a ticket type
export async function deleteTicketType ( ticketTypeId: string )
{
    const { orgId } = await getUserAndOrgId();

    try
    {
        await db
            .delete( orgTicketTypes )
            .where( and( eq( orgTicketTypes.id, ticketTypeId ), eq( orgTicketTypes.orgId, orgId ) ) );
        revalidatePath( `/dashboard/${ orgId }/manage-events` );
        return { success: true, message: 'Ticket type deleted successfully' };
    } catch ( error )
    {
        console.error( 'Error deleting ticket type:', error );
        return { success: false, message: 'Error deleting ticket type' };
    }
}

// Fetch ticket types for the current event
export async function fetchTicketTypesForEvent ( eventId: string )
{
    const { orgId } = await getUserAndOrgId();

    try
    {
        const ticketTypesData = await db
            .select()
            .from( orgTicketTypes )
            .where( and( eq( orgTicketTypes.eventId, eventId ), eq( orgTicketTypes.orgId, orgId ) ) );
        return ticketTypesData;
    } catch ( error )
    {
        console.error( 'Error fetching ticket types:', error );
        return [];
    }
}

// Utility function to get user and organization ID
export async function getUserAndOrgId ()
{
    const supabase = await createClient();
    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if ( userError || !user )
    {
        throw new Error( 'Not authenticated' );
    }

    const { data: profile, error: profileError } = await supabase
        .from( 'user_profiles' )
        .select( 'org_id' )
        .eq( 'user_id', user.id )
        .single();

    if ( profileError || !profile )
    {
        throw new Error( 'No organization found' );
    }

    return { user, orgId: profile.org_id };
}

/**
 * Retrieves all ticket types associated with a specific event.
 *
 * @param {string} eventId - The ID of the event for which to retrieve ticket types.
 * @returns {Promise<Array>} A promise that resolves to an array of ticket types associated with the event.
 * If no ticket types are found, the array will be empty.
 *
 * Example usage:
 * const ticketTypes = await getTicketTypesByEvent(event.id);
 *
 * if (ticketTypes.length === 0) {
 *   console.log('No ticket types found for this event.');
 * } else {
 *   console.log('Ticket types:', ticketTypes);
 * }
 */
export async function getTicketTypesByEvent ( eventId: string )
{
    const ticketTypesResult = await db
        .select( {
            id: orgTicketTypes.id,
            eventId: orgTicketTypes.eventId,
            name: orgTicketTypes.name,
            price: orgTicketTypes.price
            // Add other fields you need from the `ticketTypes` table
        } )
        .from( orgTicketTypes )
        .where( eq( orgTicketTypes.eventId, eventId ) );

    return ticketTypesResult;
}

/**
 * Retrieves a ticket type by its ID.
 *
 * @param {string} ticketTypeId - The ID of the ticket type to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the ticket type data.
 * If the ticket type is not found, an error is thrown.
 */

export async function getTicketTypeById ( ticketTypeId: string )
{
    // Select the fields from the ticketTypes table where the ID matches

    const [ ticketType ] = await db
        .select( {
            id: orgTicketTypes.id, // The ID of the ticket type
            eventId: orgTicketTypes.eventId, // The ID of the associated event
            name: orgTicketTypes.name, // The name of the ticket type
            price: orgTicketTypes.price // The price of the ticket type
            // Add other fields as necessary
        } )
        .from( orgTicketTypes ) // Specify the table to select from
        .where( eq( orgTicketTypes.id, ticketTypeId ) ); // Filter by the provided ticketTypeId

    // If no ticket type is found, throw an error
    if ( !ticketType )
    {
        throw new Error( 'Ticket type not found' );
    }

    // Return the ticket type data
    return ticketType;
}
export async function getOrgIdFromTicketType ( ticketTypeId: string )
{
    const result = await db
        .select( { orgId: orgTicketTypes.orgId } )
        .from( orgTicketTypes )
        .where( eq( orgTicketTypes.id, ticketTypeId ) )
        .execute();

    if ( result.length === 0 )
    {
        throw new Error( 'No organization found for the given ticket type' );
    }

    return result[ 0 ].orgId;
}

export async function getStripeAccountIdFromOrgId ( orgId: string )
{
    const result = await db
        .select( { stripeAccountId: organizations.stripeAccountId } )
        .from( organizations )
        .where( eq( organizations.id, orgId ) )
        .execute();

    if ( result.length === 0 )
    {
        throw new Error( 'No Stripe account ID found for the given organization' );
    }

    return result[ 0 ].stripeAccountId;
}
