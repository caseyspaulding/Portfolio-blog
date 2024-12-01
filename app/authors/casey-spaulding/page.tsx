

import React, { SVGProps } from 'react';
import Head from 'next/head';
import NavBar1 from '@/components/NavBarTW/NavBar1';
import FooterFull from '@/components/Footers/FooterFull';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'About Casey Spaulding | EventJacket',
  description: 'Learn more about Casey Spaulding, the founder of EventJacket, an event management software for non-profits.',
}
const CaseyAuthorPage = () =>
{
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Casey",
    "url": "https://www.eventjacket.com/authors/casey-spaulding",
    "image": "https://www.eventjacket.com/images/caseyandlaura.jpg", // Replace with your image URL
    "sameAs": [
      "https://www.linkedin.com/in/caseyspaulding/",
      "https://x.com/caseyspaulding_"
    ],
    "jobTitle": "Founder and Lead Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "EventJacket"
    }
  };

  const navigation = {
    social: [
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/caseyspaulding/',
        icon: ( props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement> ) => (
          <svg fill="currentColor" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
            <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 14 11.011719 C 12.904779 11.011719 11.919219 11.339079 11.189453 11.953125 C 10.459687 12.567171 10.011719 13.484511 10.011719 14.466797 C 10.011719 16.333977 11.631285 17.789609 13.691406 17.933594 A 0.98809878 0.98809878 0 0 0 13.695312 17.935547 A 0.98809878 0.98809878 0 0 0 14 17.988281 C 16.27301 17.988281 17.988281 16.396083 17.988281 14.466797 A 0.98809878 0.98809878 0 0 0 17.986328 14.414062 C 17.884577 12.513831 16.190443 11.011719 14 11.011719 z M 14 12.988281 C 15.392231 12.988281 15.94197 13.610038 16.001953 14.492188 C 15.989803 15.348434 15.460091 16.011719 14 16.011719 C 12.614594 16.011719 11.988281 15.302225 11.988281 14.466797 C 11.988281 14.049083 12.140703 13.734298 12.460938 13.464844 C 12.78117 13.19539 13.295221 12.988281 14 12.988281 z M 11 19 A 1.0001 1.0001 0 0 0 10 20 L 10 39 A 1.0001 1.0001 0 0 0 11 40 L 17 40 A 1.0001 1.0001 0 0 0 18 39 L 18 33.134766 L 18 20 A 1.0001 1.0001 0 0 0 17 19 L 11 19 z M 20 19 A 1.0001 1.0001 0 0 0 19 20 L 19 39 A 1.0001 1.0001 0 0 0 20 40 L 26 40 A 1.0001 1.0001 0 0 0 27 39 L 27 29 C 27 28.170333 27.226394 27.345035 27.625 26.804688 C 28.023606 26.264339 28.526466 25.940057 29.482422 25.957031 C 30.468166 25.973981 30.989999 26.311669 31.384766 26.841797 C 31.779532 27.371924 32 28.166667 32 29 L 32 39 A 1.0001 1.0001 0 0 0 33 40 L 39 40 A 1.0001 1.0001 0 0 0 40 39 L 40 28.261719 C 40 25.300181 39.122788 22.95433 37.619141 21.367188 C 36.115493 19.780044 34.024172 19 31.8125 19 C 29.710483 19 28.110853 19.704889 27 20.423828 L 27 20 A 1.0001 1.0001 0 0 0 26 19 L 20 19 z M 12 21 L 16 21 L 16 33.134766 L 16 38 L 12 38 L 12 21 z M 21 21 L 25 21 L 25 22.560547 A 1.0001 1.0001 0 0 0 26.798828 23.162109 C 26.798828 23.162109 28.369194 21 31.8125 21 C 33.565828 21 35.069366 21.582581 36.167969 22.742188 C 37.266572 23.901794 38 25.688257 38 28.261719 L 38 38 L 34 38 L 34 29 C 34 27.833333 33.720468 26.627107 32.990234 25.646484 C 32.260001 24.665862 31.031834 23.983076 29.517578 23.957031 C 27.995534 23.930001 26.747519 24.626988 26.015625 25.619141 C 25.283731 26.611293 25 27.829667 25 29 L 25 38 L 21 38 L 21 21 z"></path>
          </svg>
        ),
      },
      {
        name: 'X',
        href: 'https://x.com/caseyspaulding_',
        icon: ( props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement> ) => (
          <svg fill="currentColor" viewBox="0 0 24 24" { ...props }>
            <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
          </svg>
        ),
      },
    ],
  };



  return (
    <>

      <NavBar1 />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center">
            <img
              src="/images/caseyProfilePic.jpg" // Replace with your image path
              alt="Casey"
              className="w-40 h-40 rounded-full mb-6 object-cover"
            />
            <h1 className="text-4xl font-bold mb-2 text-center">About Casey Spaulding</h1>
            <p className="text-lg text-gray-700 text-center mb-4">
              Founder and Lead Developer at EventJacket
            </p>
            <div className="flex space-x-4 mb-8">
              <div className="flex space-x-6">
                { navigation.social.map( ( item ) => (
                  <a
                    key={ item.name }
                    href={ item.href }
                    className="text-blue-700 hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{ item.name }</span>
                    <item.icon aria-hidden="true" className="h-6 w-6" />
                  </a>
                ) ) }
              </div>
            </div>
            <div className="max-w-2xl ">
              
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
                
                


                
                <p className="text-lg text-gray-700 mb-4">
                  Hi, I'm <strong>Casey Spaulding</strong>, the founder of <strong>EventJacket</strong>, an affordable, all-in-one event management solution designed for nonprofits and community event planners. After serving 20 years in the Navy and earning degrees in both software engineering and business management, I’ve combined my passion for technology and leadership to create tools that simplify event management.
                </p>

                <p className="text-lg text-gray-700 mb-4">
                  During my time in the Navy, I organized and managed a variety of events, including retirement ceremonies, holiday parties, and change of command ceremonies. Those experiences taught me how to manage teams, coordinate logistics, and ensure everything runs smoothly — all of which laid the foundation for EventJacket.
                </p>

                <p className="text-lg text-gray-700 mb-4">
                  After leaving the Navy, I saw that many nonprofits and community event planners lacked an easy, affordable way to manage their events. That’s when I decided to create <strong>EventJacket</strong> — a platform that makes ticketing, volunteer coordination, vendor management, and CRM functions simple and accessible for organizations of all sizes.
                </p>

                <p className="text-lg text-gray-700">
                  EventJacket is my way of giving back and helping those who bring people together through events. My goal is to empower nonprofits and small organizations by giving them the tools they need to run successful events without the stress.
                </p>
              </div>

              {/* Add more content about yourself, your background, and your mission */ }
            </div>
          </div>
        </div>
      </div>
      <FooterFull />
    </>
  );
};

export default CaseyAuthorPage;
