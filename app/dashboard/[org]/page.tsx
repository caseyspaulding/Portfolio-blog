import { fetchEventsForOrg } from './actions';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { db } from '../../../db';
import { userProfiles, organizations } from '@/db/schemas/schema';
import { eq, and } from 'drizzle-orm/expressions';
import UserProfileHeaderDashboard from '@/components/Headers/UserProfileHeaderDashboard';
import { BanknotesIcon, ChevronRightIcon, FolderIcon, HomeIcon } from '@heroicons/react/24/outline';
import DashboardCardGrid from './components/DashboardGrid/DashboardGrid';
import { fetchTicketSalesForOrg } from '@/app/actions/dashboardActions';
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

        const ticketSales = await fetchTicketSalesForOrg( dashboardData.organizationId );
        const totalSales = ticketSales ? ticketSales.reduce( ( acc, sale ) => acc + sale.amount, 0 ) : 0;
        const formattedTotalSales = `$${ ( totalSales / 100 ).toFixed( 2 ) }`; // Assuming amount is in cents

        const events = await fetchEventsForOrg();
        const userName = dashboardData.userName || 'User';
        const totalMembers = dashboardData.totalMembers;

        const cards = [
            {
                name: 'Tickets Sold',
                icon: BanknotesIcon,
                amount: formattedTotalSales,
                href: `/dashboard/${ decodedOrgName }/banking/payments`,
            },
            {
                name: 'Total Events',
                icon: FolderIcon,
                amount: events.length,
                href: `/dashboard/${ decodedOrgName }/events`, // Dynamic link based on orgName
            },
            {
                name: 'Members',
                icon: HomeIcon,
                amount: totalMembers.toString(),
                href: `/dashboard/${ decodedOrgName }/team/members`,
            },
        ];

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
                    { events.length > 0 ? (
                        <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                                                Event Name
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell">
                                                Description
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">
                                                Start Date
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell">
                                                End Date
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Status
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        { events.map( ( event ) => (
                                            <tr key={ event.id }>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                                    <Link href={ `/events/${ event.slug }` }>
                                                        <span className="hover:underline">{ event.name }</span>
                                                    </Link>
                                                </td>
                                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                                    { event.description || 'No description available' }
                                                </td>
                                                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 md:table-cell">
                                                    { event.startDate ? new Date( event.startDate ).toLocaleDateString() : 'N/A' }
                                                </td>
                                                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                                    { event.endDate ? new Date( event.endDate ).toLocaleDateString() : 'N/A' }
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ event.status }</td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                                                    <Link href={ `/events/${ event.slug }` }>
                                                        <span className="text-indigo-600 hover:text-indigo-900">
                                                            View<span className="hidden sm:inline"> Public Page</span>
                                                            <span className="sr-only">, { event.name }</span>
                                                        </span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ) ) }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">No events found for your organization.</p>
                    ) }
                </div>

                <div className="bg-white">
                    <DashboardCardGrid cards={ cards } />
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
