'use client';

import { createClient } from '@/utils/supabase/client';
import { Button } from '@headlessui/react';

import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

export default function CheckoutButton() {
    const handleCheckout = async () => {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();

        if (!data?.user) {
            toast.error('You must be logged in to subscribe');
            return;
        }
        const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

        const stripe = await stripePromise;
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
                email: data.user.email,
                userId: data.user.id
            })
        });
        const session = await response.json();
        await stripe?.redirectToCheckout({ sessionId: session.id });
    };
    return <Button onClick={handleCheckout}>CheckoutButton</Button>;
}
