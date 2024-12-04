'use client';

import Link from "next/link";
import UserProfileMenu from "../UserProfile";
import { Button } from "@/components/ui/button";
import
  {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import { Facebook, Twitter } from "lucide-react"; // Icons from lucide-react

const navigation = {
  main: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Affiliate", href: "/affiliate" },
  ],
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/CaseySpaulding",
      icon: Facebook,
    },
    {
      name: "X",
      href: "https://x.com/CaseySpaulding_",
      icon: Twitter, // For X (formerly Twitter)
    },
  ],
};

export default function Footer ()
{
  const currentYear = new Date().getFullYear(); // Get the current year
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 lg:px-8">
        {/* User Profile */ }
        <div className="mt-4 flex justify-center items-center">
          <UserProfileMenu />
        </div>

        {/* Social Icons */ }
        <div className="mt-10 flex justify-center space-x-10">
          { navigation.social.map( ( item ) => (
            <TooltipProvider key={ item.name }>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <a href={ item.href } target="_blank" rel="noopener noreferrer">
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                      <span className="sr-only">{ item.name }</span>
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{ item.name }</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) ) }
        </div>

        {/* Footer Text and Flag */ }
        <div className="mt-5 flex flex-col items-center space-y-2">
         
          <img
            src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
            className="h-4 w-6"
            alt="US Flag"
          />
          <p className="mt-5 pb-12 text-center text-xs leading-5 text-gray-500">
            &copy; { currentYear } Casey Spaulding - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
