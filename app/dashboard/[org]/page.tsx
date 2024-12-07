
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { db } from '../../../db';
import { userProfiles, organizations } from '@/db/schemas/schema';
import { eq, and } from 'drizzle-orm/expressions';
import UserProfileHeaderDashboard from '@/components/Headers/UserProfileHeaderDashboard';
import { BanknotesIcon, ChevronRightIcon, FolderIcon, HomeIcon } from '@heroicons/react/24/outline';
import DashboardCardGrid from './components/DashboardGrid/DashboardGrid';

import { Suspense } from 'react';
import { sql } from 'drizzle-orm';
import Link from 'next/link';


interface DashboardPageProps
{
    params: Promise<{ org: string }>;
}

async function getDashboardData ( orgName: string )
{
    const supabase = await createClient();

    // Fetch the authenticated user from Supabase auth
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if ( !user )
    {
        throw new Error( 'Not authenticated' );
    }

    // Fetch user's profile from your custom userProfiles table
    const userProfileData = await db
        .select( {
            id: userProfiles.id,
            organizationId: userProfiles.orgId,
            organizationName: organizations.name,
            department: userProfiles.department,
            avatar: userProfiles.profileImageUrl,
        } )
        .from( userProfiles )
        .innerJoin( organizations, eq( userProfiles.orgId, organizations.id ) )
        .where( and( eq( userProfiles.userId, user.id ), eq( organizations.name, orgName ) ) )
        .limit( 1 );

    const userProfile = userProfileData.length > 0 ? userProfileData[ 0 ] : null;

    if ( !userProfile )
    {
        return null;
    }

    const userName = user.user_metadata?.name || user.email; // Fallback to email if no name is set
    const userAvatarUrl = user.user_metadata?.avatar_url || userProfile.avatar || '/images/avatars/user_avatar_default.png';

    // Fetch total member count for the current organization
    const memberCountResult = await db
        .select( {
            count: sql`COUNT(*)`.as<number>(),
        } )
        .from( userProfiles )
        .where( eq( userProfiles.orgId, userProfile.organizationId ) );

    const totalMembers = memberCountResult[ 0 ]?.count || 0;

    return { ...userProfile, userName, avatar: userAvatarUrl, totalMembers };
}

export default async function DashboardPage ( { params }: DashboardPageProps )
{
    const { org } = await params; // Await params to get `org`

    try
    {
        const decodedOrgName = decodeURIComponent( org );
        const dashboardData = await getDashboardData( decodedOrgName );

        if ( !dashboardData )
        {
            notFound();
        }

     
     
        

       
        const userName = dashboardData.userName || 'User';
        const totalMembers = dashboardData.totalMembers;

      
        const breadcrumbs = [
            { name: 'Dashboard', href: '/' },
            { name: '', href: '' },

        ];


        return (
            <div className="max-w-8xl  px-4 sm:px-6 lg:px-8">
                <div className="bg-white">
                    <nav aria-label="Breadcrumb" className="py-4">
                        <ol role="list" className="flex items-center space-x-4">
                            { breadcrumbs.map( ( breadcrumb, index ) => (
                                <li key={ breadcrumb.name }>
                                    <div className="flex items-center">
                                        { index > 0 && (
                                            <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        ) }
                                        <Link href={ breadcrumb.href }>
                                            <span className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                                { breadcrumb.name }
                                            </span>
                                        </Link>
                                    </div>
                                </li>
                            ) ) }
                        </ol>
                    </nav>
                </div>

                <header className="mb-8">
                    <UserProfileHeaderDashboard
                        userName={ dashboardData.userName }
                        organizationName={ dashboardData.organizationName }
                        userImageUrl={ dashboardData.avatar }
                        accountStatus="Verified Account"
                    />
                </header>

                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">Your Events</h1>
                   
                </div>

                <div className="bg-white">
                
                </div>
            </div>

        );
    } catch ( error )
    {
        console.error( 'Error fetching dashboard data:', error );
        return (
            <div className="mx-auto">
                <h1 className="mb-6 text-3xl font-bold">Error</h1>
                <p className="text-xl text-red-600">
                    An error occurred while loading the dashboard. Please try again later.
                </p>
            </div>
        );
    }
}
