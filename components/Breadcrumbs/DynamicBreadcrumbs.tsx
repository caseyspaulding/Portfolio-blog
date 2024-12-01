import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function DynamicBreadcrumbs ()
{
  const router = useRouter();
  const pathnames = router.pathname.split( "/" ).filter( ( x ) => x );

  return (
    <Breadcrumbs radius="md" variant="solid">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      { pathnames.map( ( value, index ) =>
      {
        const href = `/${ pathnames.slice( 0, index + 1 ).join( "/" ) }`;
        return (
          <BreadcrumbItem key={ index } href={ href }>
            { value.charAt( 0 ).toUpperCase() + value.slice( 1 ) }
          </BreadcrumbItem>
        );
      } ) }
    </Breadcrumbs>
  );
}
