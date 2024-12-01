'use client';

import React from 'react';
import { Card } from "@nextui-org/card";
import { CardHeader } from "@nextui-org/card";
import { CardBody } from "@nextui-org/card";
import { CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";


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

interface StickySidebarProps
{
  tickets: Ticket[];
  eventSlug: string;
}

const StickySidebar: React.FC<StickySidebarProps> = ( { tickets } ) =>
{
  return (
    <aside className="sticky top-6 p-6 bg-opacity-70 backdrop-filter backdrop-blur-sm rounded-md max-w-[400px]">
      <h2 className="mb-4 text-2xl text-center font-semibold text-gray-800">
        Available Tickets
      </h2>
      { tickets.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          { tickets.map( ( ticket ) => (
            <Card
              shadow="sm"
              isBlurred
              key={ ticket.id }
              className="border-none text-gray-800 bg-background/20 dark:bg-default-100/50"
            >
              <CardHeader className="flex flex-col items-center">
                <h3 className="text-xl text-gray-800 font-medium">{ ticket.name }</h3>
                <p className="text-small text-gray-800">
                  Event Date:{ ' ' }
                  { ticket.eventDate
                    ? new Date( ticket.eventDate ).toLocaleDateString()
                    : 'No date available' }
                </p>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-col items-center">
                <p className="text-gray-800 text-center">{ ticket.description }</p>
                <p className="text-lg text-gray-800 font-semibold">
                  Price: ${ parseFloat( ticket.price ).toFixed( 2 ) }
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
              
              </CardFooter>
            </Card>
          ) ) }
        </div>
      ) : (
        <p className="text-red-500">No tickets available for this event.</p>
      ) }
    </aside>
  );
};

export default StickySidebar;
