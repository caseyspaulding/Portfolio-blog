'use client';

import type { Ref } from 'react';
import { useState, forwardRef } from 'react';
import getStripe from '@/utils/stripeClient';
import { Button } from '@nextui-org/react';
import InputFieldEJ from '@/components/Input/TagInput';
import QuantitySelector from '@/components/QuantitySelector';
import { Input } from '@/components/ui/input';

interface TicketPurchaseClientProps
{
    ticket: unknown; // Define your Ticket type here if you have it
    eventSlug: string;
    quantity: number; // Quantity for the selected ticket
    setQuantity: ( quantity: number ) => void; // Function to update the quantity
}

const TicketPurchaseClient = ( { ticket, eventSlug, quantity, setQuantity }: TicketPurchaseClientProps, ref: Ref<HTMLInputElement> ) =>
{
    const [ loading, setLoading ] = useState( false );
    const [ errorMessage, setErrorMessage ] = useState<string | null>( null );
    const [ firstName, setFirstName ] = useState( '' );
    const [ lastName, setLastName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );


    const handleBuyTicket = async () =>
    {
        setLoading( true );
        setErrorMessage( null );

        if ( !firstName || !lastName || !email )
        {
            setErrorMessage( 'Please fill in all the required fields.' );
            setLoading( false );
            return;
        }

        try
        {
            const response = await fetch( '/api/stripe/createCheckoutSession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {
                    ticket,
                    eventSlug,
                    buyer: { firstName, lastName, email },
                    quantity, // Send the selected quantity to backend
                } ),
            } );

            const data = await response.json();

            if ( !response.ok )
            {
                setErrorMessage( data.error || 'An error occurred while processing your request.' );
                return;
            }

            const stripe = await getStripe();

            if ( stripe )
            {
                const { error } = await stripe.redirectToCheckout( { sessionId: data.id } );

                if ( error )
                {
                    console.error( 'Stripe Checkout error:', error );
                    setErrorMessage( 'An error occurred during checkout. Please try again.' );
                }
            }
        } catch ( error )
        {
            console.error( 'Failed to create checkout session:', error );
            setErrorMessage( 'Failed to create checkout session. Please try again.' );
        } finally
        {
            setLoading( false );
        }
    };

    return (
        <div className="space-y-4 w-full">
            { errorMessage && <div className="mb-4 text-red-600 font-bold">{ errorMessage }</div> }
            <Input
                type="text"
                placeholder="First Name"
                value={ firstName }
                onChange={ ( e ) => setFirstName( e.target.value ) }
                className="w-full"
                ref={ ref }
                required

            />
            <Input
                type="text"
                placeholder="Last Name"
                value={ lastName }
                onChange={ ( e ) => setLastName( e.target.value ) }
                className="w-full"
                required

            />
            <Input
                type="email"
                placeholder="Email"
                value={ email }
                onChange={ ( e ) => setEmail( e.target.value ) }
                className="w-full"
                required

            />

            <QuantitySelector
                quantity={ quantity }
                setQuantity={ setQuantity }
                min={ 1 }  // Assuming minimum quantity is 1
                max={ 10 }  // Set a maximum if needed, or remove this prop for no upper limit
            />

            <Button
                onClick={ handleBuyTicket }
                disabled={ loading }
                className="w-full mt-2 rounded-3xl text-xl  bg-gradient-to-tl from-blue-600 to-blue-400 px-4 py-2 font-normal text-white hover:bg-blue-500"
            >
                { loading ? 'Processing...' : 'Check out' }
            </Button>
        </div>
    );
};

export default forwardRef( TicketPurchaseClient );
