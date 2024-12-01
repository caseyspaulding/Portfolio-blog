'use client';

import { useEffect, useState } from "react";
import { BuildingOfficeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { useParams } from 'next/navigation'; // Import useParams from Next.js

interface UserProfileHeaderProps
{
  userName: string;
  organizationName: string;
  userImageUrl: string;
  accountStatus: string;
}

const UserProfileHeaderDashboard: React.FC<UserProfileHeaderProps> = ( {
  userName,
  organizationName,
  userImageUrl,
  accountStatus
} ) =>
{
  const [ greeting, setGreeting ] = useState( "Good Morning" );
  const params = useParams(); // Get route parameters using useParams
  const orgId = params.org; // Retrieve orgId from the URL params

  useEffect( () =>
  {
    const currentHour = new Date().getHours();

    if ( currentHour < 12 )
    {
      setGreeting( "Good Morning" );
    } else if ( currentHour < 18 )
    {
      setGreeting( "Good Afternoon" );
    } else
    {
      setGreeting( "Good Evening" );
    }
  }, [] );

  return (
    <div className="bg-white">
      <div className="">
        <div className="py-6 md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            {/* Profile */ }
            <div className="flex items-center">
              <img
                alt={ userName }
                src={ userImageUrl }
                className="hidden h-16 w-16 rounded-full sm:block"
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <img
                    alt={ userName }
                    src={ userImageUrl }
                    className="h-16 w-16 rounded-full sm:hidden"
                  />
                  <h1 className="ml-3 text-xl font-bold leading-7 text-gray-800 sm:leading-9 break-words">
                    { greeting }, { userName }
                  </h1>
                </div>
                <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                  <dt className="sr-only">Company</dt>
                  <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                    <BuildingOfficeIcon
                      aria-hidden="true"
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    />
                    { organizationName }
                  </dd>
                  <dt className="sr-only">Account status</dt>
                  <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                    <CheckCircleIcon
                      aria-hidden="true"
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-500"
                    />
                    { accountStatus }
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0 md:ml-4 md:mt-0">
            <Button
              as="a"
              href={ `/dashboard/${ orgId }/events` } // Use orgId from params
              className="w-full md:w-auto inline-flex items-center rounded-3xl bg-white px-3 py-2 text-lg font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-50 hover:ring-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Manage Events
            </Button>
            <Button
              as="a"
              href={ `/dashboard/${ orgId }/events/new` } // Use orgId from params
              className="w-full md:w-auto inline-flex items-center rounded-3xl bg-blue-700 px-3 py-2 text-lg font-normal text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              Create Event
            </Button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default UserProfileHeaderDashboard;
