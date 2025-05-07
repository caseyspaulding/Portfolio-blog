'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

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

        {/* Hero Content - Optimized for all devices */ }
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Column - Profile Info */ }
            <div className="text-center md:text-left md:col-span-7">
              {/* Title & Role */ }
              <div className="mb-4">
                <span className="inline-block text-sm font-semibold py-1 px-5 rounded-full bg-blue-600 text-white dark:bg-blue-900/70 dark:text-blue-300 shadow-sm">
                  .NET Full Stack Developer
                </span>
              </div>

              {/* Name */ }
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500">
                  Casey Spaulding
                </span>
              </h1>

              {/* Tagline */ }
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-md mx-auto md:mx-0">
                Let's build something great.
              </p>

              {/* Current Project & Learning - Simplified with minimal dots and left-aligned on mobile */ }
              <div className="space-y-4 mb-8 mx-auto md:mx-0 text-left max-w-md">
                {/* Current Project */ }
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 mt-1">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <div>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">Currently building</span>
                    <Link href="/projects" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                      DocJacket: AI-powered transaction management
                    </Link>
                  </div>
                </div>

                {/* Learning Focus */ }
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 mt-1">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <div>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">Learning focus</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      Incorporating AI into Enterprise Applications
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */ }
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                >
                  View Projects
                </Link>
              </div>
            </div>

            {/* Right Column - Image & Social */ }
            <div className="flex flex-col items-center md:col-span-5">
              {/* Profile Image */ }
              <div className="mb-8 relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur-md opacity-10"></div>
                <div className="relative rounded-full overflow-hidden border-3 border-white dark:border-gray-800 shadow-xl w-40 h-40 sm:w-48 sm:h-48">
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

              {/* Social Links */ }
              <div className="flex justify-center gap-4">
                <Link
                  href="https://www.linkedin.com/in/caseyspaulding/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </Link>

                <Link
                  href="https://github.com/caseyspaulding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                </Link>

                <Link
                  href="mailto:casey.spaulding@me.com"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  aria-label="Email me"
                >
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}