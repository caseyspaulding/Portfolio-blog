'use client';

import React from 'react';
import { formatDate, formatTime } from '@/utils/dateFormatter';
import { Disclosure } from '@headlessui/react';
import { ArrowUpCircleIcon } from '@heroicons/react/20/solid';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import EventImage from './Hero/EventImage';
import dynamic from 'next/dynamic';


const VenueMap = dynamic( () => import( '@/components/VenueMap' ), {
  ssr: false, // This prevents server-side rendering of the component
} );

interface FAQ
{
  question: string;
  answer: string;
}

interface EventDetailsProps
{
  eventId: string;
  name: string;
  description?: string | null;
  notes?: string | null;
  startDate: string;
  endDate: string;
  eventStartTime?: string | null;
  eventEndTime?: string | null;
  venue?: string | null;
  venueImage?: string | null;  // Add venueImage prop
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zipCode?: string | null;
  scheduleDetails?: string | null;
  bannerImage?: string | null;
  galleryImages?: string[] | null;
  videoLinks?: string[] | null;
  organizerContact?: string | null;
  maxAttendees?: number | null;
  status: string;
  refundPolicy?: string | null;
  timezone: string | null;
  tags?: string[] | null;
  highlights?: string[] | null;
  faqs?: string | FAQ[] | null | undefined;
  ageRestriction?: string | null;
  parkingOptions?: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

const EventDetails: React.FC<EventDetailsProps> = ( {
  notes,
  startDate,
  endDate,
  eventStartTime,
  eventEndTime,
  venue,
  address,
  city,
  state,
  zipCode,
 
  galleryImages,
  organizerContact,
  refundPolicy,
  timezone,
  faqs,
  ageRestriction,
  parkingOptions,
  venueImage, // Add venueImage to props
} ) =>
{
  // Ensure FAQs are parsed correctly and filter out empty questions/answers
  const parsedFaqs: FAQ[] = typeof faqs === 'string' ? JSON.parse( faqs ) : Array.isArray( faqs ) ? faqs : [];

  // Filter FAQs to exclude those with empty questions or answers
  const filteredFaqs = parsedFaqs.filter( faq => faq.question.trim() !== '' && faq.answer.trim() !== '' );

  return (
    <div className="max-w-6xl mt-4 pb-16 mx-auto bg-white">
      {/* Date and Time */ }
      <section className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Date & Time</h2>
        <div className="flex items-center text-gray-700">
          <p>{ formatDate( startDate ) } to { formatDate( endDate ) }</p>
        </div>
        <div className='mt-2'>
          { eventStartTime && eventEndTime && (
            <p> Doors Open: { formatTime( eventStartTime ) } { timezone }</p>
          ) }
        </div>
      </section>

      {/* Location */ }
      <section className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Location</h2>

        {/* Only show venue if it exists */ }
        { venue && <p className="text-gray-700">{ venue }</p> }

    

        {/* Construct the address dynamically to avoid displaying "null" */ }
        <section className="mb-4">
          <div className="inline-flex items-center">
            <span className="font-semibold">Address:</span>
            { ( address || city || state || zipCode ) ? (
              <p className="text-gray-700 ml-2"> {/* Add ml-2 to add spacing between the label and address */ }
                { address && `${ address }, ` }
                { city && `${ city }, ` }
                { state && `${ state }, ` }
                { zipCode && `${ zipCode }` }
              </p>
            ) : (
              <p className="text-gray-700 ml-2">Location not specified</p>  )}
          </div>
        </section>


        {/* Display venue image if available */ }
        <section className="my-4 ">
          { venueImage && (<>
             <h2 className="text-2xl font-bold text-gray-900 mb-2">Venue Image</h2>
            <EventImage
              imageUrl={ venueImage } // Use venueImage prop
              alt={ `${ venue || 'Venue' } image` }
              overlayColor=""
             
            /></>
          ) }
        </section>


        {/* Show the map and handle loading/error states */ }
        <section className="my-4">
          { address ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Venue Map</h2>

              {/* Use the useGeolocation hook to get coordinates */ }
              <VenueMap address={ address } />
            </>
          ) : (
            <p className="text-gray-700">Location not specified.</p>
          ) }
        </section>

      </section>

      {/* Refund Policy */ }
      <section className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Refund Policy</h2>
        <p className="text-gray-700">{ refundPolicy || 'No refund policy specified' }</p>
      </section>

      {/* Gallery Images */ }
      { galleryImages && galleryImages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gallery</h2>
          <div className="grid grid-cols-3 gap-4">
            { galleryImages.map( ( image, index ) => (
              <img key={ index } src={ image } alt={ `Gallery Image ${ index + 1 }` } className="w-full h-auto" />
            ) ) }
          </div>
        </section>
      ) }

      {/* About This Event */ }
      <section className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">About this Event</h2>
        { notes && <p className="text-gray-700">{ notes }</p> }
      </section>

      {/* Additional Event Information */ }
      <section className="mb-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Additional Information</h2>
        { ageRestriction && <p className="text-gray-700 font-semibold my-3">Age Restriction: <span className='font-normal'>{ ageRestriction }</span></p> }
        { parkingOptions && <p className="text-gray-700 font-semibold">Parking: <span className='font-normal'>{ parkingOptions }</span></p> }
        { organizerContact && <p className="text-gray-700">Contact: { organizerContact }</p> }
      </section>

      
      
      

      {/* FAQ */ }
      { filteredFaqs.length > 0 ? (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div>
            { filteredFaqs.map( ( faq, index ) => (
              <Disclosure key={ index } as="div" className="pt-6 first:pt-0">
                <dt>
                  <Disclosure.Button className="group flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-lg font-semibold leading-7">{ faq.question }</span>
                    <span className="ml-6 flex h-7 items-center">
                      <ArrowDownCircleIcon
                        aria-hidden="true"
                        className="h-6 w-6 group-data-[open]:hidden text-gray-500"
                      />
                      <ArrowUpCircleIcon
                        aria-hidden="true"
                        className="h-6 w-6 [.group:not([data-open])_&]:hidden text-gray-500"
                      />
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 bg-gray-50 rounded-md p-4">
                  <p className="text-base leading-7 text-gray-700">{ faq.answer }</p>
                </Disclosure.Panel>
                <hr />
              </Disclosure>
            ) ) }
          </div>
        </section>
      ) : null }
   
    </div>
  );
};

export default EventDetails;
