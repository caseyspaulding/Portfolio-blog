import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { getEventIdBySlug } from "@/app/actions/getEventIdBySlug";
import { eq } from "drizzle-orm/expressions";
import { JsonLd } from 'react-schemaorg';
import type { Event as SchemaEvent } from 'schema-dts'
import { events, organizations, orgTicketTypes } from "@/db/schemas/schema";
import NavBar1 from "@/components/NavBarTW/NavBar1";

import EventImage from "@/components/EventHomeOne/Hero/EventImage";
import Countdown from "@/components/Countdown/Countdown";
import BuyTicketsButton from "@/components/EventHomeOne/BuyTicketsButton";
import StickyFooterBuyTickets from "@/components/EventHomeOne/StickeyFooterBuyTickets";
import EventDetails from "@/components/EventHomeOne/EventDetails";
import '@/styles/gradientHeader.css';
import FooterTW from "@/components/Footers/FooterTW";
import Script from "next/script";
import Head from "next/head";
import { absoluteUrl } from "@/utils/absoluteUrl";
import Navbar from "@/components/NavBarTW/NavBarEvents";
import ShareModal from "@/components/share-modal";


interface Params
{
    eventSlug: string;
}

interface FAQ
{
    question: string;
    answer: string;
}

export async function generateMetadata ( { params }: { params: Promise<Params> } )
{
    const { eventSlug } = await params; // Await params here
    const eventId = await getEventIdBySlug( eventSlug );

    if ( !eventId )
    {
        return notFound();
    }

    const eventWithOrg = await db
        .select( {
            eventId: events.id,
            eventName: events.name,
            description: events.description,
            startDate: events.startDate,
            endDate: events.endDate,
            featuredImage: events.featuredImage,
        } )
        .from( events )
        .where( eq( events.id, eventId ) )
        .limit( 1 );

    const eventData = eventWithOrg[ 0 ];

    if ( !eventData )
    {
        return notFound();
    }

    const imageUrl = eventData.featuredImage?.startsWith( 'http' )
        ? eventData.featuredImage
        : absoluteUrl( eventData.featuredImage || '/images/og-eventjacket.jpg' );

    const fullUrl = absoluteUrl( `/events/${ eventSlug }` );

    return {
        title: `${ eventData.eventName } - EventJacket`,
        description: `${ eventData.description } - Come Join Us!`,
        openGraph: {
            title: eventData.eventName,
            description: eventData.description || 'Join us for this amazing event!',
            url: fullUrl,
            type: 'website',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: eventData.eventName,
                },
            ],
        },
        additionalMetaTags: [
            {
                property: 'fb:app_id',
                content: '2283279935382121',
            },
        ],
        // Moved themeColor to viewport

    };
}

export default async function EventPage ( { params }: { params: Promise<Params> } )
{
    const { eventSlug } = await params; // Await `params` here
    const eventId = await getEventIdBySlug( eventSlug );

    if ( !eventId )
    {
        notFound();
    }

    // Fetch event with organization details
    const eventWithOrg = await db
        .select( {
            eventId: events.id,
            eventName: events.name,
            description: events.description,
            startDate: events.startDate,
            endDate: events.endDate,
            eventStartTime: events.eventStartTime,
            eventEndTime: events.eventEndTime,
            featuredImage: events.featuredImage,
            venue: events.venue,
            organizerContact: events.organizerContact,
            venueImage: events.venueImage,
            address: events.address,
            city: events.city,
            state: events.state,
            country: events.country,
            zipCode: events.zipCode,
            notes: events.notes,
            scheduleDetails: events.scheduleDetails,
            bannerImage: events.bannerImage,
            galleryImages: events.galleryImages,
            videoLinks: events.videoLinks,
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
            orgId: events.orgId,
            orgName: organizations.name,
            orgLogoUrl: organizations.logoUrl,
        } )
        .from( events )
        .innerJoin( organizations, eq( events.orgId, organizations.id ) )
        .where( eq( events.id, eventId ) )
        .limit( 1 );

    const eventData = eventWithOrg[ 0 ];

    const faqs: FAQ[] | null =
        typeof eventData.faqs === 'string' ? JSON.parse( eventData.faqs ) : Array.isArray( eventData.faqs ) ? eventData.faqs : null;

    if ( !eventData )
    {
        notFound();
    }

    // Fetch tickets separately
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

    if ( !tickets.length )
    {
        notFound();
    }

    const ticket = tickets[ 0 ];

    const imageUrl = absoluteUrl( eventData.featuredImage || '/images/event-default.jpg' );

    return (
        <><Head>
            <Script src="https://accounts.google.com/gsi/client" defer></Script>
        </Head >
            <JsonLd<SchemaEvent>
                item={ {
                    "@context": "https://schema.org",
                    "@type": "Event",
                    name: eventData.eventName,
                    description: eventData.description || "No description available",
                    startDate: eventData.startDate ? new Date( eventData.startDate ).toLocaleDateString() : "",
                    endDate: eventData.endDate ? new Date( eventData.endDate ).toLocaleDateString() : "",
                    location: {
                        "@type": "Place",
                        name: eventData.venue || "No venue available",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: eventData.city || "No city available",
                            addressRegion: eventData.state || "No state available",
                            postalCode: eventData.zipCode || "No zip code available",
                            addressCountry: eventData.country || "No country available",
                        },
                    },
                    image: [ imageUrl ],
                    offers: tickets.map( ticket => ( {
                        "@type": "Offer",
                        price: ticket.price || "0.00",
                        priceCurrency: ticket.currency || "USD",
                        availability: ticket.quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
                        url: absoluteUrl( `/events/${ eventSlug }` ),
                    } ) ),
                } }
            />

            <Navbar
                logoUrl={ eventData.orgLogoUrl || '/images/logo.png' }
                orgName={ eventData.orgName }
                eventName={ eventData.eventName }

            />
            <main className="">
                <div className="relative z-20 max-w-screen-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 xl:p-9">
                    { eventData.featuredImage && (
                        <EventImage
                            imageUrl={ eventData.featuredImage }
                            alt={ `${ eventData.eventName || 'Event' } image` }
                            overlayColor=""
                        />
                    ) }

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-8">
                        <div className="xl:col-span-2 space-y-4">
                            <span className="text-gray-500 dark:text-gray-400">
                                { eventData.startDate && eventData.endDate ? (
                                    <>
                                        { new Date( eventData.startDate ).toDateString() } - { new Date( eventData.endDate ).toDateString() }
                                    </>
                                ) : eventData.startDate ? (
                                    new Date( eventData.startDate ).toDateString()
                                ) : eventData.endDate ? (
                                    new Date( eventData.endDate ).toDateString()
                                ) : (
                                    "No dates available"
                                ) }
                            </span>

                            <h1 className="font-extrabold text-5xl lg:text-6xl text-gray-800 dark:text-white">
                                { eventData.eventName }
                            </h1>

                            <h2 className="text-xl leading-none text-gray-900 dark:text-gray-200">
                                { eventData.description }
                            </h2>

                            <EventDetails
                                eventId={ eventData.eventId }
                                name={ eventData.eventName }
                                description={ eventData.description }
                                notes={ eventData.notes }
                                startDate={ eventData.startDate }
                                endDate={ eventData.endDate }
                                eventStartTime={ eventData.eventStartTime }
                                eventEndTime={ eventData.eventEndTime }
                                venue={ eventData.venue }
                                venueImage={ eventData.venueImage }
                                address={ eventData.address }
                                city={ eventData.city }
                                state={ eventData.state }
                                country={ eventData.country }
                                zipCode={ eventData.zipCode }
                                scheduleDetails={ eventData.scheduleDetails }
                                bannerImage={ eventData.bannerImage }
                                galleryImages={ eventData.galleryImages }
                                videoLinks={ eventData.videoLinks }
                                organizerContact={ eventData.organizerContact }
                                maxAttendees={ eventData.maxAttendees }
                                status={ eventData.status }
                                refundPolicy={ eventData.refundPolicy }
                                timezone={ eventData.timezone }
                                tags={ eventData.tags }
                                highlights={ eventData.highlights }
                                faqs={ faqs }
                                ageRestriction={ eventData.ageRestriction }
                                parkingOptions={ eventData.parkingOptions }
                                createdAt={ eventData.createdAt as string | null }
                                updatedAt={ eventData.updatedAt as string | null }
                            />
                        </div>

                        <aside className="xl:col-span-1 space-y-6 xl:space-y-10">
                            <div className="sticky top-20">
                                <BuyTicketsButton eventSlug={ eventSlug } priceRange={ ticket.price } />

                                <div className="lg:ml-16 sm:text-center mt-2">
                                    <ShareModal eventName={ eventData.eventName } />
                                    <Countdown
                                        startDate={ ticket.eventDate ? ticket.eventDate.toString() : "" }
                                        color="text-gray-700"
                                        labelColor="text-gray-500"
                                    />
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                <div className="lg:mt-8 pt-2 mt-20 mb-16">
                    <FooterTW />
                </div>
            </main>

            <StickyFooterBuyTickets eventSlug={ eventSlug } priceRange={ ticket.price } />
        </>
    );
}
