'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client'; // Adjust the import based on your setup

interface Event
{
  id: string;
  name: string;
  slug: string;
}

const EventsList: React.FC = () =>
{
  const [ events, setEvents ] = useState<Event[]>( [] );

  useEffect( () =>
  {
    const fetchEvents = async () =>
    {
      try
      {
        const supabase = createClient(); // Replace with your Supabase client
        const { data, error } = await supabase
          .from( 'events' ) // Ensure this matches your table name in the database
          .select( 'id, name, slug' );

        if ( error )
        {
          console.error( 'Error fetching events:', error );
        } else
        {
          setEvents( data || [] );
        }
      } catch ( error )
      {
        console.error( 'Unexpected error fetching events:', error );
      }
    };

    fetchEvents();
  }, [] );

  if ( events.length === 0 )
  {
    return <p>No events found.</p>;
  }

  return (
    <div className="events-list">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      <ul className="space-y-2">
        { events.map( ( event ) => (
          <li key={ event.id }>
            <Link href={ `/events/${ event.slug }` }>
              <a className="text-blue-600 hover:underline">{ event.name }</a>
            </Link>
          </li>
        ) ) }
      </ul>
    </div>
  );
};

export default EventsList;
