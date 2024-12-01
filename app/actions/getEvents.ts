'use server';

import { db } from '@/db';
import { events, organizations } from '@/db/schemas/schema';
import { eq } from 'drizzle-orm/expressions';

// Define the EventType to match the structure of the events table
type EventType = {
  id: string;
  orgId: string;
  name: string;
  featuredImage: string | null;
  slug: string;
  description: string | null;
  notes: string | null;
  startDate: Date | null; // Changed to Date | null to handle possible null values
  endDate: Date | null;   // Changed to Date | null to handle possible null values
  eventStartTime: string | null; // Assuming you want to keep it as a string format (like "HH:mm:ss")
  eventEndTime: string | null; // Same as above
  venue: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zipCode: string | null;
  scheduleDetails: string | null;
  bannerImage: string | null;
  galleryImages: string[] | null;
  videoLinks: string[] | null;
  organizerContact: string | null;
  maxAttendees: number | null;
  status: string;
  refundPolicy: string | null;
  timezone: string | null;
  tags: string[] | null;
  highlights: string[] | null;
  faqs: Record<string, unknown> | null; // Adjusted as per the requirement
  ageRestriction: string | null;
  parkingOptions: string | null;
  createdAt: Date | null; // Changed to Date | null to handle possible null values
  updatedAt: Date | null; // Changed to Date | null to handle possible null values
  organizationName: string;
};

export async function getEvents (): Promise<EventType[]>
{
  // Fetch all events from the database
  const eventList = await db
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
      address: events.address,
      city: events.city,
      state: events.state,
      country: events.country,
      zipCode: events.zipCode,
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
      organizationName: organizations.name,
    } )
    .from( events )
    .innerJoin( organizations, eq( events.orgId, organizations.id ) )
    .orderBy( events.createdAt );

  // Convert string dates to Date objects, handling nulls
  const formattedEventList: EventType[] = eventList.map( event => ( {
    ...event,
    startDate: event.startDate ? new Date( event.startDate ) : null, // Check for null before converting
    endDate: event.endDate ? new Date( event.endDate ) : null,       // Check for null before converting
    createdAt: event.createdAt ? new Date( event.createdAt ) : null, // Check for null before converting
    updatedAt: event.updatedAt ? new Date( event.updatedAt ) : null, // Check for null before converting
    faqs: event.faqs as Record<string, unknown> | null, // Typecast faqs explicitly
  } ) );

  return formattedEventList;
}
