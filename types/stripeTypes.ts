import { organizations } from '@/db/schemas/schema';

export type StripeDataUpdates = {
    stripeConnectAccountId?: string;
    stripeConnectLinked?: boolean;
    stripeAccountCreated?: Date;

    // Add other Stripe-related fields here if needed
};
