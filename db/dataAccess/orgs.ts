import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { organizations } from '@/db/schemas/schema';
import { StripeDataUpdates } from '@/types/stripeTypes';

// Fetch organization ID by name
async function getOrgIdByName ( orgName: string )
{
    const result = await db
        .select( { id: organizations.id } )
        .from( organizations )
        .where( eq( organizations.name, orgName ) )
        .limit( 1 );

    if ( result.length === 0 )
    {
        throw new Error( 'Organization not found' );
    }

    return result[ 0 ].id;
}

// Fetch organization by ID
export async function getOrganizationById ( orgId: string )
{
    return await db.select().from( organizations ).where( eq( organizations.id, orgId ) ).limit( 1 );
}

// Create a new organization
export async function createOrganization ( data: typeof organizations.$inferInsert )
{
    return await db.insert( organizations ).values( data ).returning();
}
