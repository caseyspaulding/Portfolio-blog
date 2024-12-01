// hooks/useOrgData.ts
import { useEffect, useState } from 'react';
import { createClient } from '@utils/supabase/server';
import { db } from '../db';
import { userProfiles, organizations } from '@/db/schemas/schema';
import { eq, and } from 'drizzle-orm/expressions';

interface OrgData
{
    orgId: string;
    organizationName: string;
}

const useOrgData = ( orgName: string ) =>
{
    const [ orgData, setOrgData ] = useState<OrgData | null>( null ); // Allowing both OrgData and null types
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ] = useState( null );

    useEffect( () =>
    {
        const fetchOrgData = async () =>
        {
            try
            {
                const supabase = await createClient();
                const {
                    data: { user }
                } = await supabase.auth.getUser();

                if ( !user )
                {
                    throw new Error( 'Not authenticated' );
                }

                const data = await db
                    .select( {
                        orgId: userProfiles.orgId,
                        organizationName: organizations.name
                    } )
                    .from( userProfiles )
                    .innerJoin( organizations, eq( userProfiles.orgId, organizations.id ) )
                    .where( and( eq( userProfiles.userId, user.id ), eq( organizations.name, orgName ) ) )
                    .limit( 1 );

                setOrgData( data[ 0 ] || null );
            } catch ( err )
            {
                console.error( err );
            } finally
            {
                setLoading( false );
            }
        };

        fetchOrgData();
    }, [ orgName ] );

    return { orgData, loading, error };
};

export default useOrgData;
