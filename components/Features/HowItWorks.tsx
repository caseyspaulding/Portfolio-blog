
import React from 'react';

import Link from 'next/link'; 

const steps = [
  {
    number: 1,
    title: "Sign Up and Set Up Your Profile",
    description: "Create your free EventJacket account and set up your organization's profile. Add essential details like your organization's name, logo, and contact information."
  },
  {
    number: 2,
    title: "Create and Manage Your Events",
    description: "Use EventJacket's intuitive tools to create events, manage ticket sales, and coordinate volunteers, vendors, and performers. Customize your event pages with ease."
  },
  {
    number: 3,
    title: "Promote and Launch Your Event",
    description: "Launch your event and start selling tickets. Use built-in marketing tools to promote your event across multiple channels and track performance with analytics."
  }
];

export default function HowItWorks ()
{
  return (
    <section className="py-16 ">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            How EventJacket Works
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-gray-600">
            Here's a quick look at how we'll help you rock your next event, from planning to ticket sales and beyond.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 hidden lg:block">
         
          </div>

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-3">
            { steps.map( ( step, index ) => (
              <div
                key={ step.number }
                className={ `relative p-6 bg-white rounded-xl shadow-lg transition duration-300 hover:shadow-xl ${ index % 2 === 0 ? 'lg:top-6' : 'lg:top-0'
                  }` }
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-400 text-white">
                    <span className="text-xl font-bold">{ step.number }</span>
                  </div>
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    { step.title }
                  </h3>
                  <p className="text-gray-600">
                    { step.description }
                  </p>
                 
                </div>
              </div>
            ) ) }
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/signup">
            <button className="inline-flex items-center px-6 py-3 text-xl font-medium text-white bg-blue-700 border border-transparent rounded-3xl shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Get Started
              <svg className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}