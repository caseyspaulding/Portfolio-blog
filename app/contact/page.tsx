'use client';

import { Button } from "@/components/ui/button"
import PageBackground from "@/components/PageBackGround"
import Link from "next/link"
import { useEffect } from "react"

export default function Contact ()
{
  // Initialize Calendly when component mounts
  useEffect( () =>
  {
    const script = document.createElement( 'script' );
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild( script );

    return () =>
    {
      // Clean up on unmount
      if ( document.body.contains( script ) )
      {
        document.body.removeChild( script );
      }
    };
  }, [] );

  return (
    <PageBackground>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with gradient background */ }
        <div className="mb-10 text-center bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Get In Touch
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Have a question or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        {/* Contact Information Cards */ }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Email Card */ }
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">Email</h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-4">Drop me a line anytime</p>
            <div className="text-center">
              <a
                href="mailto:casey.spaulding@me.com"
                className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                casey.spaulding@me.com
              </a>
            </div>
          </div>

          {/* Address Card */ }
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">Address</h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-4">Where I'm based</p>
            <div className="text-center">
              <p className="text-gray-700 dark:text-gray-300">
                1101 Miranda Lane<br />
                Kissimmee, FL. 34741
              </p>
            </div>
          </div>

          {/* LinkedIn Card */ }
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white">
              <svg fill="currentColor" className="h-6 w-6" x="0px" y="0px" viewBox="0 0 50 50">
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">LinkedIn</h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-4">Let's connect</p>
            <div className="text-center">
              <a
                href="https://www.linkedin.com/in/caseyspaulding/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Connect with me
              </a>
            </div>
          </div>
        </div>

        {/* Google Calendar Section */ }
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl mb-10">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Schedule a Meeting
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Choose a time that works for you, and I'll be happy to discuss your project or answer any questions.
            </p>
          </div>

          {/* Google Calendar widget container */ }
          <div
            id="booking-widget"
            className="w-full h-screen max-h-[800px]"
          >
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1AARzlHiVQMbzwUB43x6SYc4r7-Ynlithw8aBLSD7wAdnL0Bjk5HAO-xY73WYcYF1M1ckbIT7V?gv=true"
              style={ { border: 0 } }
              width="100%"
              height="100%"
              frameBorder="0"
              title="Book time with Casey"
            />
          </div>
        </div>

        {/* Call to Action Section */ }
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Collaborate?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            I'm always excited to hear about new projects and opportunities. Let's create something amazing together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:casey.spaulding@me.com"
              className="inline-block bg-white text-blue-700 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Send an Email
            </a>
            <a
              href="#"
              onClick={ ( e ) =>
              {
                e.preventDefault();
                const calendlyWidget = document.querySelector( '.calendly-inline-widget' );
                if ( calendlyWidget )
                {
                  window.scrollTo( {
                    top: ( calendlyWidget as HTMLElement ).offsetTop - 100,
                    behavior: 'smooth'
                  } );
                }
              } }
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Book a Meeting
            </a>
          </div>
        </div>
      </main>
    </PageBackground>
  );
}