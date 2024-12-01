'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@nextui-org/react';

interface CancelPageProps
{
  params: Promise<{
    eventSlug: string;
  }>;
}

export default async function CancelPage ( { params }: CancelPageProps )
{
  const { eventSlug } = await params; // Await params to extract `eventSlug`
  const router = useRouter();

  useEffect( () =>
  {
    // You can add any tracking or logging here
    console.log( `User canceled checkout for event: ${ eventSlug }` );
  }, [ eventSlug ] );

  const handleGoBackToEvent = () =>
  {
    // Navigate back to the event page
    router.push( `/events/${ eventSlug }` );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-red-600">Checkout Canceled</h1>
      <p className="mt-4 text-lg text-center">
        You have canceled your checkout for the event: <strong>{ eventSlug.replace( /-/g, ' ' ) }</strong>.
      </p>
      <p className="mt-2 text-center">
        If you wish to continue with the ticket purchase, you can go back to the event page and try again.
      </p>
      <Button
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-500"
        onClick={ handleGoBackToEvent }
      >
        Back to Event Page
      </Button>
    </div>
  );
}
