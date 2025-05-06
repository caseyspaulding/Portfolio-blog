'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowRight, Code, Server, Database } from 'lucide-react';

export default function Hero ( { theme }: { theme: string } )
{
  return (
    <div className={ theme }>
      <section className="relative overflow-hidden min-h-screen">
        {/* Background Gradient */ }
        <div
          className={ `absolute inset-0 ${ theme === 'dark'
            ? 'bg-gradient-to-b from-gray-900 via-blue-950 to-blue-900'
            : 'bg-gradient-to-b from-white via-gray-50 to-blue-50'
            }` }
          aria-hidden="true"
        />

        {/* Enhanced Decorative Grid Overlay */ }
        <div className="absolute inset-0 h-full w-full">
          <div
            className={ `absolute bottom-0 left-0 right-0 top-0 ${ theme === 'dark'
              ? 'bg-[linear-gradient(to_right,#3b82f61a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f61a_1px,transparent_1px)]'
              : 'bg-[linear-gradient(to_right,#3b82f60f_1px,transparent_1px),linear-gradient(to_bottom,#3b82f60f_1px,transparent_1px)]'
              } bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]` }
          ></div>
        </div>

        {/* Hero Content - Improved Centered Layout */ }
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-10 lg:py-10 text-center">
          {/* Profile Image + Status - Enhanced */ }
          <div className="mb-8 inline-block relative">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur-md opacity-10"></div>

            <div className="relative rounded-full overflow-hidden border-3 border-white dark:border-gray-800 shadow-xl w-32 h-32 sm:w-36 sm:h-36 mx-auto">
              <Image
                src="/images/avatars/caseyProfilePic.jpg"
                alt="Casey Spaulding"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                priority
              />

              <div className="absolute -right-1 -bottom-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
            </div>
          </div>

          {/* Title & Role - Enhanced */ }
          <div className="mb-6">
            <span className="inline-block text-sm font-semibold py-2 px-5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/70 dark:text-blue-300 mb-3 shadow-sm">
              .NET Full Stack Developer
            </span>
          </div>

          {/* Name - Enhanced Typography */ }
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500">
              Casey Spaulding
            </span>
          </h1>

          {/* Tagline - Enhanced */ }
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's build something great.
          </p>

          {/* Skills Section - Enhanced Layout */ }


          {/* Social Links - Enhanced */ }
          <div className="flex justify-center gap-5 mb-10">
            <Link
              href="https://www.linkedin.com/in/caseyspaulding/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-12 w-12 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </Link>

            <Link
              href="https://github.com/caseyspaulding"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-12 w-12 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5 text-gray-800 dark:text-gray-200" />
            </Link>

            <Link
              href="mailto:casey.spaulding@me.com"
              className="flex items-center justify-center h-12 w-12 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              aria-label="Email me"
            >
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </Link>
          </div>

          {/* CTA Buttons - Enhanced */ }
          <div className="flex flex-wrap gap-5 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-3.5 rounded-lg bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}