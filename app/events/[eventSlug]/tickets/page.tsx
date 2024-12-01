
import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { events, orgTicketTypes, organizations } from "@/db/schemas/schema";
import { getEventIdBySlug } from "@/app/actions/getEventIdBySlug";
import { eq } from "drizzle-orm/expressions";
import { absoluteUrl } from "@/utils/absoluteUrl";
import type { Metadata } from "next/types";
import BuyTicketsComp from "@/components/EventHomeOne/Hero/BuyTicketsComp";
import FooterTW from "@/components/Footers/FooterTW";
import Script from "next/script";


interface Params
{
  eventSlug: string;
}

export async function generateMetadata ( {
  params,
}: {
  params: Promise<Params>;
} ): Promise<Metadata>
{
  const { eventSlug } = await params; // Await params here
  const eventId = await getEventIdBySlug( eventSlug );

  if ( !eventId )
  {
    return {
      title: "Event Not Found",
      description: "The requested event could not be found.",
    };
  }

  const eventWithOrg = await db
    .select( {
      eventId: events.id,
      eventName: events.name,
      description: events.description,
      startDate: events.startDate,
      endDate: events.endDate,
      featuredImage: events.featuredImage,
      venue: events.venue,
      city: events.city,
      state: events.state,
      zipCode: events.zipCode,
      country: events.country,
      orgId: events.orgId,
      orgName: organizations.name,
    } )
    .from( events )
    .innerJoin( organizations, eq( events.orgId, organizations.id ) )
    .where( eq( events.id, eventId ) )
    .limit( 1 );

  const eventData = eventWithOrg[ 0 ];

  if ( !eventData )
  {
    return {
      title: "Event Not Found",
      description: "The requested event could not be found.",
    };
  }

  const title = `${ eventData.eventName } | Get your tickets.`;
  const description = `${ eventData.description } - Get your tickets to ${ eventData.eventName }`;
  const imageUrl = absoluteUrl( eventData.featuredImage || "/images/event-default.jpg" );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: absoluteUrl( `/events/${ eventSlug }` ),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: eventData.eventName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ imageUrl ],
    },
  };
}

export default async function BuyTickets ( {
  params,
}: {
  params: Promise<Params>;
} )
{
  const { eventSlug } = await params; // Await params here
  const eventId = await getEventIdBySlug( eventSlug );

  if ( !eventId )
  {
    notFound();
  }
  const eventWithOrg = await db
    .select( {
      eventId: events.id,
      eventName: events.name,
      description: events.description,
      startDate: events.startDate,
      endDate: events.endDate,
      featuredImage: events.featuredImage,
      venue: events.venue,
      city: events.city,
      state: events.state,
      zipCode: events.zipCode,
      country: events.country,
      orgId: events.orgId,
      orgName: organizations.name,
    } )
    .from( events )
    .innerJoin( organizations, eq( events.orgId, organizations.id ) )
    .where( eq( events.id, eventId ) )
    .limit( 1 );

  const eventData = eventWithOrg[ 0 ];

  if ( !eventData )
  {
    notFound();
  }

  const tickets = await db
    .select( {
      id: orgTicketTypes.id,
      eventId: orgTicketTypes.eventId,
      orgId: orgTicketTypes.orgId,
      name: orgTicketTypes.name,
      description: orgTicketTypes.description,
      price: orgTicketTypes.price,
      quantity: orgTicketTypes.quantity,
      eventDate: orgTicketTypes.eventDate,
      saleStartDate: orgTicketTypes.saleStartDate,
      saleEndDate: orgTicketTypes.saleEndDate,
      isEarlyBird: orgTicketTypes.isEarlyBird,
      maxPerCustomer: orgTicketTypes.maxPerCustomer,
      isFree: orgTicketTypes.isFree,
      category: orgTicketTypes.category,
      promoCodeRequired: orgTicketTypes.promoCodeRequired,
      availableOnline: orgTicketTypes.availableOnline,
      groupDiscountAvailable: orgTicketTypes.groupDiscountAvailable,
      refundable: orgTicketTypes.refundable,
      currency: orgTicketTypes.currency,
      salesLimitPerDay: orgTicketTypes.salesLimitPerDay,
      createdAt: orgTicketTypes.createdAt,
      updatedAt: orgTicketTypes.updatedAt,
    } )
    .from( orgTicketTypes )
    .where( eq( orgTicketTypes.eventId, eventId ) );



  return (
    <>
      {/* Load Stripe Script here for payment functionality */ }
      <Script src="https://connect.stripe.com/connect-js" strategy="lazyOnload" defer />

      <div className="bg-white flex justify-center items-center min-h-screen">
        <BuyTicketsComp
          eventName={ eventData.eventName }
          eventSubtitle={ eventData.description || "" }
          eventDate={
            eventData.startDate
              ? new Date( eventData.startDate ).toLocaleDateString()
              : ""
          }
          location={ eventData.venue || "No venue available" }
          startDate={
            eventData.startDate
              ? new Date( eventData.startDate ).toISOString()
              : ""
          }
          tickets={ tickets as [] } // Pass the array of tickets
          eventSlug={ eventSlug }
          featuredImage={ eventData.featuredImage || "" } // Pass the featured image
        />
      </div>
      <FooterTW />

    </>
  );
}
