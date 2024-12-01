export function getStripeOAuthLink(orgId: string) {
    return `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${process.env.NEXT_PUBLIC_URL}/dashboard/organizations/${orgId}/stripe/callback&state=${orgId}`;
}
