import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe'; // Adjust the path according to your project's structure

export async function POST() {
    try {
        const account = await stripe.accounts.create({});

        return NextResponse.json({ account: account.id });
    } catch (error) {
        console.error('An error occurred when calling the Stripe API to create an account:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
