import React from "react";
import Link from "next/link"; // Import Link for navigation
import { ChevronRight } from "lucide-react"; // Import ChevronRight icon
import { useRouter } from "next/router";

export default function DynamicBreadcrumbs ()
{
  const router = useRouter();
  const pathnames = router.pathname.split( "/" ).filter( ( x ) => x );

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Home
          </Link>
        </li>

        { pathnames.map( ( value, index ) =>
        {
          const href = `/${ pathnames.slice( 0, index + 1 ).join( "/" ) }`;
          const isLast = index === pathnames.length - 1;

          return (
            <React.Fragment key={ index }>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </li>
              <li>
                <Link
                  href={ href }
                  className={ `text-sm font-medium ${ isLast
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                    }` }
                  aria-current={ isLast ? "page" : undefined }
                >
                  { value.charAt( 0 ).toUpperCase() + value.slice( 1 ) }
                </Link>
              </li>
            </React.Fragment>
          );
        } ) }
      </ol>
    </nav>
  );
}