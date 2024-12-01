'use client';

import React, { useEffect, useState, use } from 'react';

export default function RefreshStripe(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const [ accountLinkCreatePending, setAccountLinkCreatePending ] = useState( false );
    const [ error, setError ] = useState( false );
    const [ accountId, setAccountId ] = useState<string | null>( null );

    useEffect( () =>
    {
        async function fetchAccountLink ()
        {
            const { id } = await params; // Await params here
            setAccountId( id );

            if ( id )
            {
                setAccountLinkCreatePending( true );
                fetch( '/api/stripe/create-account-link', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( { account: id } )
                } )
                    .then( ( response ) => response.json() )
                    .then( ( json ) =>
                    {
                        setAccountLinkCreatePending( false );

                        const { url, error } = json;

                        if ( url )
                        {
                            window.location.href = url;
                        }

                        if ( error )
                        {
                            setError( true );
                        }
                    } );
            }
        }
        fetchAccountLink();
    }, [ params ] );

    return (
        <div className="container">
            <div className="banner">
                <h2>EventJacket</h2>
            </div>
            <div className="content">
                <h2>Add information to start accepting money</h2>
                <p>EventJacket partners with Stripe to help you receive payments securely.</p>
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
