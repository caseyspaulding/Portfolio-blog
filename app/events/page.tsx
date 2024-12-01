

import NavBar1 from '@/components/NavBarTW/NavBar1';
import FooterFull from '@/components/Footers/FooterFull';
import HeaderCentered from '@/components/HeaderCentered';
import EventsListComponent from '@/components/EventListComponent';
import { getEvents } from '@/app/actions/getEvents';

export const revalidate = 10; // Set revalidation for this page

const EventsPage = async () =>
{
    const eventList = await getEvents();

    return (
        <>
            <NavBar1 />
            <HeaderCentered
                title="Events"
                description="Explore the events organized with EventJacket."
            />
            <EventsListComponent eventList={ eventList } />
            <FooterFull />
        </>
    );
};

export default EventsPage;
