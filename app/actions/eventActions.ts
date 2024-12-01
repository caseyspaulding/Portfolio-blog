'use server';

import { db } from '@/db';
import { events, organizations, } from '@/db/schemas/schema';
import { createClient } from '@/utils/supabase/server';


import { eq } from 'drizzle-orm/expressions';





// Get an event by its slug for updating purposes
export async function getEventBySlug ( eventSlug: string )
{
    const eventQuery = db
        .select( {
            id: events.id,
            orgId: events.orgId,
            name: events.name,
            featuredImage: events.featuredImage,
            slug: events.slug,
            description: events.description,
            notes: events.notes,
            startDate: events.startDate,
            endDate: events.endDate,
            eventStartTime: events.eventStartTime,
            eventEndTime: events.eventEndTime,
            venue: events.venue,
            venueDescription: events.venueDescription,
            venueImage: events.venueImage,
            address: events.address,
            city: events.city,
            state: events.state,
            country: events.country,
            zipCode: events.zipCode,
            latitude: events.latitude,
            longitude: events.longitude,
            scheduleDetails: events.scheduleDetails,
            bannerImage: events.bannerImage,
            galleryImages: events.galleryImages,
            videoLinks: events.videoLinks,
            organizerContact: events.organizerContact,
            maxAttendees: events.maxAttendees,
            status: events.status,
            refundPolicy: events.refundPolicy,
            timezone: events.timezone,
            tags: events.tags,
            highlights: events.highlights,
            faqs: events.faqs,
            ageRestriction: events.ageRestriction,
            parkingOptions: events.parkingOptions,
            createdAt: events.createdAt,
            updatedAt: events.updatedAt,
        } )
        .from( events )
        .where( eq( events.slug, eventSlug ) );

    const [ event ] = await eventQuery;

    if ( !event )
    {
        throw new Error( 'Event not found' );
    }
}
// Fetch agendaItems separately if needed


// Utility function to get user and organization ID
export const getUserAndOrgId = async () =>
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

    const { data: profile, error: profileError } = await ( await supabase )
        .from( 'user_profiles' )
        .select( 'org_id' )
        .eq( 'user_id', user.id )
        .single();

    if ( profileError || !profile )
    {
        throw new Error( 'No organization found' );
    }

    return { user, orgId: profile.org_id };
};

