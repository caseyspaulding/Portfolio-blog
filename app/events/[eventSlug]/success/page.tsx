import { Button } from '@nextui-org/button';
import { getEventIdBySlug } from '@/app/actions/getEventIdBySlug';
import { events, organizations, orgCustomers, orgTicketTypes } from '@/db/schemas/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import ConfettiComponent from '@/components/Confetti/Confetti';


interface SuccessPageProps
{
    params: Promise<{ eventSlug: string }>;

}

export default async function SuccessPage ( {
    params,

}: SuccessPageProps )
{
    const { eventSlug } = await params; // Await params here


    console.log( 'Received eventSlug:', eventSlug );



    // Fetch the event ID by slug
    const eventId = await getEventIdBySlug( eventSlug );
    console.log( 'Fetched event ID:', eventId );
    if ( !eventId )
    {
        console.error( 'Event ID not found, triggering 404' );
        notFound();
    }

    // Fetch event and organization details
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
    console.log( 'Fetched event data:', eventWithOrg );

    const eventData = eventWithOrg[ 0 ];
    if ( !eventData )
    {
        console.error( 'Event data not found, triggering 404' );
        notFound();
    }

    // Fetch tickets and customer details
    const ticketsWithCustomer = await db
        .select( {
            ticketId: orgTicketTypes.id,
            eventId: orgTicketTypes.eventId,
            orgId: orgTicketTypes.orgId,
            ticketName: orgTicketTypes.name,
            doorOpenTime: orgTicketTypes.doorOpenTime,
            description: orgTicketTypes.description,
            price: orgTicketTypes.price,
            quantity: orgTicketTypes.quantity,
            eventDate: orgTicketTypes.eventDate,
            saleStartDate: orgTicketTypes.saleStartDate,
            saleEndDate: orgTicketTypes.saleEndDate,
            customerName: orgCustomers.firstName,
        } )
        .from( orgTicketTypes )
        .innerJoin( orgCustomers, eq( orgTicketTypes.orgId, orgCustomers.orgId ) )
        .where( eq( orgTicketTypes.eventId, eventId ) );
    console.log( 'Fetched ticket data:', ticketsWithCustomer );

    if ( !ticketsWithCustomer.length )
    {
        console.error( 'No tickets found, triggering 404' );
        notFound();
    }

    const ticket = ticketsWithCustomer[ 0 ];
    const eventDate = ticket.eventDate;
    const eventLocation = `${ eventData.venue || '' }`.trim();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200">
            <ConfettiComponent />
            <div className="relative w-full max-w-lg m-2">
                <div className="absolute inset-0 rounded-2xl "></div>
                <div className="relative m-3 rounded-2xl bg-white p-8 text-center shadow-2xl">
                    <div className="flex justify-center">
                        <img src='/images/green-checkmark.png' className="mb-4 h-14" />
                    </div>
                    <h1 className="mb-4 text-2xl">
                        You got ticket(s) to <br /> <span className="font-extrabold">{ eventData.eventName }</span>.
                    </h1>
                    {/* Display ticket information */ }

                    <p className="mb-2 mt-2 text-lg">Your ticket(s) have been sent to the email address you provided during checkout.</p>
                    <div className="mb-4 text-left">
                        <h2 className="text-xl font-semibold mb-2">Event Details</h2>
                        <p><strong>Date:</strong> { eventDate }</p>
                        <p><strong>Location:</strong> { eventLocation }</p>
                        <p className="mt-2">Please bring your ticket (email or printed) to the event to be scanned at the door.</p>
                    </div>
                    <div className="flex justify-center space-x-4 mt-6">
                        <Button as="a" href={ `/events/${ eventSlug }` } className="text-white bg-orange-500">
                            View Event Details
                        </Button>
                        <Button href="/events" className="text-white bg-orange-500">
                            Explore More Events
                        </Button>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                        <p>If you have any questions, please contact our support team at <a href="mailto:support@eventjacket.com" className="text-blue-600">support@eventjacket.com</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
