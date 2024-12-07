'use client';

import React, { useEffect, useState } from 'react';

export default function RefreshStripe ( { params }: { params: Promise<{ id: string }> } )
{
    const [ accountLinkCreatePending, setAccountLinkCreatePending ] = useState( false );
    const [ error, setError ] = useState( false );
    const [ accountId, setAccountId ] = useState<string | null>( null );

    useEffect( () =>
    {
        let isMounted = true;

        async function fetchAccountLink ()
        {
            try
            {
                const { id } = await params; // Await the params promise
                if ( !isMounted ) return; // Prevent state updates if component unmounted
                setAccountId( id );

                if ( id )
                {
                    setAccountLinkCreatePending( true );
                    const response = await fetch( '/api/stripe/create-account-link', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify( { account: id } )
                    } );
                    const json = await response.json();

                    if ( !isMounted ) return;

                    setAccountLinkCreatePending( false );

                    const { url, error: stripeError } = json;

                    if ( url )
                    {
                        window.location.href = url;
                    }

                    if ( stripeError )
                    {
                        setError( true );
                    }
                }
            } catch ( err )
            {
                console.error( 'Error fetching account link:', err );
                if ( isMounted )
                {
                    setError( true );
                }
            }
        }

        fetchAccountLink();

        return () =>
        {
            isMounted = false;
        };
    }, [ params ] );

    return (
        <div className="container">
            <div className="banner">
                <h2>CaseySpaulding</h2>
            </div>
            <div className="content">
                <h2>Add information to start accepting money</h2>
                <p>CaseySpaulding partners with Stripe to help you receive payments securely.</p>
                { error && <p className="error">Something went wrong!</p> }
            </div>
            <div className="dev-callout">
                { accountId && (
                    <p>
                        Your connected account ID is: <code className="bold">{ accountId }</code>
                    </p>
                ) }
                { accountLinkCreatePending && <p>Creating a new Account Link...</p> }
            </div>
        </div>
    );
}
