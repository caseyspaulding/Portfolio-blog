import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import PageBackground from "@/components/PageBackGround"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact Us - CaseySpaulding",
  description:
    "Get in touch with the Casey. I would love to hear from you! Send me a email or contact me on LinkedIn.",
}

export default function Contact ()
{
  return (
    <PageBackground>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with gradient background */ }
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500">
            Get In Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Contact Info Section */ }
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 lg:p-10">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Information
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-medium text-blue-100">Email</p>
                        <a href="mailto:casey.spaulding@me.com" className="text-white hover:text-blue-200 transition-colors mt-1 block">
                          casey.spaulding@me.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="font-medium text-blue-100">Address</p>
                        <p className="mt-1">
                          1101 Miranda Lane<br />
                          Kissimmee, FL. 34741
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-medium text-blue-100">Social</p>
                        <a
                          href="https://www.linkedin.com/in/caseyspaulding/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center mt-2 text-white hover:text-blue-200 transition-colors"
                        >
                          <svg fill="currentColor" className="h-5 w-5 mr-2" x="0px" y="0px" viewBox="0 0 50 50">
                            <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                          </svg>
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-blue-400 border-opacity-30">
                  <p className="text-blue-100 text-sm">
                    Feel free to reach out anytime. I'll get back to you as soon as possible.
                  </p>
                </div>
              </div>
            </div>

            {/* Map Section */ }
            <div className="col-span-2 p-0">
              <div className="h-full relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14045.509180239367!2d-81.4144439!3d28.3474407!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88dd86daf816a1ad%3A0xa25df25bf6770055!2sSBC%20Office%20Center!5e0!3m2!1sen!2sus!4v1727818350859!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={ { border: 0, minHeight: "500px" } }
                  allowFullScreen={ true }
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-r-xl"
                />

                {/* Overlay card with call-to-action */ }
                <div className="absolute bottom-6 right-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Ready to collaborate?</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">I'm always open to discussing new projects and opportunities.</p>
                  <a
                    href="mailto:casey.spaulding@me.com"
                    className="inline-block w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-2 px-4 rounded-lg text-center transition duration-300 transform hover:-translate-y-1"
                  >
                    Send a Message
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageBackground>
  );
}