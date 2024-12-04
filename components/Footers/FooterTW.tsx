'use client';

import Link from "next/link";
import type { JSX, SVGProps } from "react";
import UserProfileMenu from "../UserProfile";

const navigation = {
  main: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "blog" },
    { name: "Affiliate", href: "/affiliate" },
  ],
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/CaseySpaulding",
      icon: ( props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement> ) => (
        <svg fill="currentColor" viewBox="0 0 24 24" { ...props }>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },

    {
      name: "X",
      href: "https://x.com/CaseySpaulding_",
      icon: ( props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement> ) => (
        <svg fill="currentColor" viewBox="0 0 24 24" { ...props }>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
  ],
};

export default function FooterTW ()
{
  const currentYear = new Date().getFullYear(); // Get the current year
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6   lg:px-8">
        <div className=" mt-4 flex justify-center items-center">


          <UserProfileMenu />
        </div>




        <div className="mt-10 flex justify-center space-x-10">

          { navigation.social.map( ( item ) => (
            <a
              key={ item.name }
              href={ item.href }
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{ item.name }</span>
              <item.icon aria-hidden="true" className="h-6 w-6" />
            </a>
          ) ) }
        </div>
        {/* Centering the flag and text together */ }
        <div className="mt-5 flex justify-center items-center space-x-2">
          <p className="text-center text-xs leading-5 text-gray-500">

          </p>

        </div>
        <div className="flex justify-center items-center mt-1 h-full">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
            className="h-4 w-6"
            alt="US Flag"
          />
        </div>
        <p className="mt-1 text-center text-xs leading-5 text-gray-500">

        </p>

        <p className="mt-5 pb-12 text-center text-xs leading-5 text-gray-500">
          &copy; { currentYear } Casey Spaulding - All rights reserved.
        </p>
      </div>
    </footer>
  );
}
