'use client';

import { useState, useEffect } from 'react';
import { loadConnectAndInitialize, StripeConnectInstance } from '@stripe/connect-js';

export const useStripeConnect = (connectedAccountId: string | undefined) => {
    const [stripeConnectInstance, setStripeConnectInstance] = useState<
        StripeConnectInstance | undefined
    >(undefined);

    useEffect(() => {
        if (connectedAccountId) {
            const fetchClientSecret = async () => {
                const response = await fetch('/api/stripe/createAccountSession', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        account: connectedAccountId
                    })
                });

                if (!response.ok) {
                    const { error } = await response.json();
                    throw error;
                } else {
                    const { client_secret: clientSecret } = await response.json();
                    return clientSecret;
                }
            };

            const stripeInstance = loadConnectAndInitialize({
                publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
                fetchClientSecret,
                appearance: {
                    overlays: 'dialog',
                    variables: {
                        colorPrimary: '#155ce9'
                    }
                }
            });

            setStripeConnectInstance(stripeInstance);
        }
    }, [connectedAccountId]);

    return stripeConnectInstance;
};

export default useStripeConnect;
