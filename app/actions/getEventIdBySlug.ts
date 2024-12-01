'use server';

import { createClient } from '@/utils/supabase/server';

export async function getEventIdBySlug ( eventSlug: string ): Promise<string | null>
{
   
    const supabase = await createClient();

    try
    {
        const { data: event, error } = await supabase
            .from( 'events' )
            .select( 'id' )
            .eq( 'slug', eventSlug )
            .single();

        if ( error )
        {
            console.error( 'Error fetching event:', error.message ); // More detailed error log
            return null;
        }

        if ( !event )
        {
            console.warn( 'No event found with the provided slug:', eventSlug ); // Additional warning for clarity
            return null;
        }

        return event.id;
    } catch ( err )
    {
        console.error( 'Unexpected error fetching event:', err );
        return null;
    }
}
