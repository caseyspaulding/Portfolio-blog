'use client';

import React from 'react';
import { Button } from '@nextui-org/button';

interface BuyTicketsButtonProps
{
  eventSlug: string;
  priceRange: string;
}

const BuyTicketsButton: React.FC<BuyTicketsButtonProps> = ( { eventSlug, priceRange } ) =>
{
  return (
    <>
      {/* Button for large screens */ }
      <div className="hidden lg:flex mt-1 justify-center ml-10 ">
        {/* Container with border and padding for styling */ }
        <div className="border rounded-lg px-20 py-4 bg-white shadow-md max-w-xs text-center">
          {/* Price range display */ }
          <div className="mb-4 text-xl font-semibold text-gray-700">
            ${ priceRange }
          </div>
          {/* Get Tickets button */ }
          <Button
            as='a'
            href={ `/events/${ eventSlug }/tickets` }
            className="w-full py-3 rounded-3xl bg-gradient-to-tr from-blue-700 to-blue-500 px-4 text-lg font-medium text-white shadow-sm "
          >
            Get Tickets
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
            </svg>

          </Button>
        </div>
      </div>
    </>
  );
};

export default BuyTicketsButton;
