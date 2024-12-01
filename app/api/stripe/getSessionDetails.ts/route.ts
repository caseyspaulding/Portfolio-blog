import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';

// This is the equivalent of the handler function in the `pages/api` directory
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
        return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 });
    }

    try {
        // Retrieve the session details from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log('Fetched session details:', session);
        return NextResponse.json(session);
    } catch (error) {
        console.error('Failed to retrieve session details:', error);
        return NextResponse.json({ error: 'Failed to retrieve session details' }, { status: 500 });
    }
}
