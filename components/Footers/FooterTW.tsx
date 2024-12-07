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
    <footer className="bg-white dark:bg-black mb-12">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 lg:px-8">
        {/* User Profile */ }
        <div className="mt-4 flex justify-center items-center">

        </div>



        {/* Footer Text and Flag */ }
        <div className="mt-2 flex flex-col items-center space-y-2">


          <p className="mt-2 pb-12 text-center text-xs leading-5 text-gray-500">
            &copy; { currentYear } Casey Spaulding - All rights reserved.
          </p>
          <UserProfileMenu />
        </div>
      </div>
    </footer>
  );
}
