import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe'; // Adjust the path according to your project's structure

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const accountSession = await stripe.accountSessions.create({
            account: body.account,
            components: {
                account_onboarding: { enabled: true }
            }
        });

        return NextResponse.json({
            client_secret: accountSession.client_secret
        });
    } catch (error) {
        console.error(
            'An error occurred when calling the Stripe API to create an account session',
            error
        );
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
