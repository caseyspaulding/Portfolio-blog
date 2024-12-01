'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext'; // Importing the custom user context

interface Breadcrumb
{
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps
{
  title: string;
  breadcrumbs: Breadcrumb[];
}

/**
 * Breadcrumbs Component
 *
 * This component dynamically generates breadcrumbs and a page title.
 * It also uses the user's organization name to generate dynamic URLs.
 *
 * @example
 * // Usage Example:
 * const breadcrumbs = [
 *   { name: 'Jobs', href: '/jobs' },
 *   { name: 'Engineering', href: '/jobs/engineering' },
 *   { name: 'Back End Developer', href: '/jobs/engineering/backend', current: true },
 * ];
 *
 * <Breadcrumbs title="Back End Developer" breadcrumbs={breadcrumbs} />
 *
 * @param {string} title - The title of the current page.
 * @param {Breadcrumb[]} breadcrumbs - An array of breadcrumb objects.
 * @returns {JSX.Element}
 */
export default function BreadcrumbsPageHeader ( { title, breadcrumbs }: BreadcrumbsProps )
{
  const { user } = useUser(); // Fetch user data from context
  const orgName = user?.orgName;

  const generateHref = ( href: string ) => ( orgName ? `/dashboard/${ orgName }${ href }` : href );

  return (
    <div>
      <div>
        {/* Back Navigation for Small Screens */ }
        <nav aria-label="Back" className="sm:hidden">
          <Link href={ generateHref( breadcrumbs.length > 1 ? breadcrumbs[ breadcrumbs.length - 2 ].href : '/' ) }>
            <div className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
              <ChevronLeftIcon aria-hidden="true" className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" />
              Back
            </div>
          </Link>
        </nav>

        {/* Breadcrumbs for Larger Screens */ }
        <nav aria-label="Breadcrumb" className="hidden sm:flex">
          <ol role="list" className="flex items-center space-x-4">
            { breadcrumbs.map( ( breadcrumb, index ) => (
              <li key={ breadcrumb.name }>
                <div className="flex items-center">
                  { index > 0 && (
                    <ChevronRightIcon
                      aria-hidden="true"
                      className="h-5 w-5 mr-4 flex-shrink-0 text-gray-400"
                    />
                  ) }
                  <Link href={ generateHref( breadcrumb.href ) }>
                    <div
                      className={ ` text-sm  font-medium text-gray-500 hover:text-gray-700 ${ breadcrumb.current ? 'text-gray-700' : ''
                        }` }
                      aria-current={ breadcrumb.current ? 'page' : undefined }
                    >
                      { breadcrumb.name }
                    </div>
                  </Link>
                </div>
              </li>
            ) ) }
          </ol>
        </nav>
      </div>

      {/* Page Title and Actions */ }
      <div className="mt-2 md:flex md:items-center md:justify-between mb-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-3xl font-semibold mb-4 pt-2 mt-1 pb-3 leading-7 text-gray-900 sm:mt-1 sm:truncate sm:text-3xl sm:tracking-tight">
            { title }
          </h2>
        </div>
        <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">

        </div>
      </div>
    </div>
  );
}
