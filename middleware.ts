import { type NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export async function middleware ( request: NextRequest )
{
    return updateSession( request );
}

// Adjust matcher to exclude all API routes
export const config = {
    matcher: [
        // Exclude API routes from middleware
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|^/auth/sign-in$|^/pricing$|^/faqs$|^/api/.*$).*)',
        '/createpost',
        '/dashboard' // Ensure this route is protected
    ]
};
