'use client';

import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardBody, CardFooter, Divider } from '@nextui-org/react';
import TicketPurchaseClient from '@/app/events/[eventSlug]/TicketPurchaseClient';

const Countdown = dynamic( () => import( '../../Countdown/Countdown' ), {
  ssr: false,
} );

interface Ticket
{
  id: string;
  eventId: string;
  orgId: string;
  name: string;
  description: string | null;
  price: string;
  quantity: number;
  eventDate: string;
  saleStartDate: string;
  saleEndDate: string;
  isEarlyBird: boolean | null;
  maxPerCustomer: number | null;
  isFree: boolean | null;
  category: string;
  promoCodeRequired: boolean | null;
  availableOnline: boolean | null;
  groupDiscountAvailable: boolean | null;
  refundable: boolean | null;
  currency: string;
  salesLimitPerDay: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface MainBannerProps
{
  eventName: string;
  eventSubtitle: string;
  eventDate: string;
  location: string;
  startDate: string;
  tickets: Ticket[];
  eventSlug: string;
  featuredImage: string; // New prop for the event's featured image
}

export const BuyTicketsComp: React.FC<MainBannerProps> = ( { eventName, tickets, eventSlug, featuredImage } ) =>
{
  const firstInputRef = useRef<HTMLInputElement | null>( null );

  // Create state for each ticket's quantity, identified by its ticket ID
  const [ quantities, setQuantities ] = useState<{ [ ticketId: string ]: number }>( {} );

  const handleQuantityChange = ( ticketId: string, newQuantity: number ) =>
  {
    setQuantities( ( prevQuantities ) => ( {
      ...prevQuantities,
      [ ticketId ]: newQuantity,
    } ) );
  };

  useEffect( () =>
  {
    if ( firstInputRef.current )
    {
      firstInputRef.current.focus();
    }
  }, [] );

  return (
    <div className="my-5 pb-10 container mx-auto">
      <h1 className="mb-4 mt-4 text-4xl flex justify-center font-semibold text-grey-900">
        Available Tickets
      </h1>
      <div className="flex justify-center mb-4">
        <Countdown startDate={ tickets[ 0 ]?.eventDate } />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column: Tickets */ }
        <div className="flex-1">
          { tickets.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              { tickets.map( ( ticket ) => (
                <Card
                  shadow="lg"
                  key={ ticket.id }
                  className="border-none p-12 mb-8 text-grey-900 bg-background/20 dark:bg-default-100/50 w-full"
                >
                  <CardHeader className="flex flex-col items-center">
                    <h3 className="text-2xl text-grey-900 font-bold">{ eventName }</h3>
                    <p className="text-small mt-2 text-grey-900">
                      Event Date: { ticket.eventDate ? new Date( ticket.eventDate ).toDateString() : 'No date available' }
                    </p>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col items-center">
                    <p className="text-grey-900 text-xl text-center">{ ticket.description }</p>
                    <p className="text-lg text-grey-900 font-semibold">
                      Price: ${ parseFloat( ticket.price ).toFixed( 2 ) }
                    </p>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <TicketPurchaseClient
                      ticket={ ticket }
                      eventSlug={ eventSlug }
                      quantity={ quantities[ ticket.id ] || 1 }
                      setQuantity={ ( newQuantity: number ) => handleQuantityChange( ticket.id, newQuantity ) }
                    />
                  </CardFooter>
                </Card>
              ) ) }
            </div>
          ) : (
            <p className="text-red-500">No tickets available for this event.</p>
          ) }
        </div>

        {/* Right column: Featured Image */ }
        <div className="flex-1 flex justify-center items-center">
          <img
            src={ featuredImage || '/images/eventjacket-banner.png' }
            alt={ `${ eventName } featured image` }
            className="max-w-full h-auto object-cover rounded-md shadow-md"

          />
        </div>
      </div>
    </div>
  );
};

export default BuyTicketsComp;
