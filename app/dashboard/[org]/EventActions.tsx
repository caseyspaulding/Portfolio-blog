'use client';

import React from 'react';
import { createEvent, updateEvent, deleteEvent } from '@/app/actions/eventActions';
import { useFormStatus } from 'react-dom';

interface EventActionsProps
{
    events: { id: string; name: string }[];
}

const EventActions: React.FC<EventActionsProps> = ( { events } ) =>
{
    const { pending } = useFormStatus();

    // Handle form submission for updating an event
    const handleUpdateEvent = ( eventId: string ) => async ( e: React.FormEvent<HTMLFormElement> ) =>
    {
        e.preventDefault(); // Prevent default form submission
        const formData = new FormData( e.currentTarget ); // Get form data
        await updateEvent( eventId, formData ); // Call your update function with form data
    };

    // Handle form submission for deleting an event
    const handleDeleteEvent = ( eventId: string ) => async ( e: React.FormEvent<HTMLFormElement> ) =>
    {
        e.preventDefault(); // Prevent default form submission
        await deleteEvent( eventId ); // Call your delete function
    };

    // Handle form submission for creating a new event
    const handleCreateEvent = async ( e: React.FormEvent<HTMLFormElement> ) =>
    {
        e.preventDefault(); // Prevent default form submission
        const formData = new FormData( e.currentTarget ); // Get form data
        await createEvent( formData ); // Call your create function with form data
    };

    return (
        <section className="mb-6 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-2xl font-semibold">Events</h2>
            <ul>
                { events.map( ( event ) => (
                    <li key={ event.id }>
                        { event.name }
                        <form onSubmit={ handleUpdateEvent( event.id ) } method="POST">
                            <input type="text" name="name" defaultValue={ event.name } />
                            <button type="submit" disabled={ pending }>
                                Update
                            </button>
                        </form>
                        <form onSubmit={ handleDeleteEvent( event.id ) } method="POST">
                            <button type="submit" disabled={ pending }>
                                Delete
                            </button>
                        </form>
                    </li>
                ) ) }
            </ul>
            <form onSubmit={ handleCreateEvent } method="POST">
                <input type="text" name="name" placeholder="New Event" required />
                <button type="submit" disabled={ pending }>
                    Create Event
                </button>
            </form>
        </section>
    );
};

export default EventActions;
