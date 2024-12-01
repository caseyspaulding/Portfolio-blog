"use client";

import Image from "next/image";

interface NavbarProps
{
  logoUrl?: string;
  orgName: string;
  eventName: string;
}

export default function Navbar ( {
  logoUrl,
  orgName,
  eventName,
}: NavbarProps = {
    orgName: "Company Name",
    eventName: "Event Name",
  } )
{
  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              { logoUrl ? (
                <Image
                  src={ logoUrl }
                  alt={ orgName }
                  width={ 32 }
                  height={ 32 }
                  className="mr-2"
                />
              ) : (
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mr-2">
                  <span className="text-lg font-bold">{ orgName.charAt( 0 ) }</span>
                </div>
              ) }
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">{ eventName }</span>
                <span className="text-sm text-foreground">{ `by ${ orgName }` }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
