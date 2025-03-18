'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowRight, Code, Server, Database } from 'lucide-react';

export default function Hero ( { theme }: { theme: string } )
{
  return (
    <div className={ theme }>
      <section className="relative overflow-hidden">
        {/* Background Gradient */ }
        <div
          className={ `absolute inset-0 ${ theme === 'dark'
              ? 'bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-900'
              : 'bg-gradient-to-br from-white via-blue-50 to-indigo-100'
            }` }
          aria-hidden="true"
        />

        {/* Decorative Grid Overlay */ }
        <div className="absolute inset-0 h-full w-full">
          <div
            className={ `absolute bottom-0 left-0 right-0 top-0 ${ theme === 'dark'
                ? 'bg-[linear-gradient(to_right,#3b82f61a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f61a_1px,transparent_1px)]'
                : 'bg-[linear-gradient(to_right,#3b82f60f_1px,transparent_1px),linear-gradient(to_bottom,#3b82f60f_1px,transparent_1px)]'
              } bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]` }
          ></div>
        </div>

        {/* Animated Particles */ }
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <div className="absolute h-8 w-8 rounded-full bg-blue-600/20 dark:bg-blue-400/20 top-1/4 left-1/3 animate-float-slow"></div>
          <div className="absolute h-12 w-12 rounded-full bg-indigo-600/20 dark:bg-indigo-400/20 top-1/3 right-1/4 animate-float-medium"></div>
          <div className="absolute h-6 w-6 rounded-full bg-blue-600/20 dark:bg-blue-400/20 bottom-1/4 right-1/3 animate-float-fast"></div>
        </div>

        {/* Hero Content */ }
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Column */ }
            <div className="md:w-1/2 mb-16 md:mb-0 text-center md:text-left">
              <div className="mb-6">
                <span className="inline-block text-sm font-semibold py-1 px-3 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 mb-2">
                  .NET Full Stack Developer
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500">
                  Casey Spaulding
                </span>
              </h1>

              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                Building robust solutions with elegant architectures
              </p>

              <div className="space-y-4 mb-8 max-w-lg mx-auto md:mx-0">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-1 rounded-full">
                    <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>.NET Core & Framework Expert</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-1 rounded-full">
                    <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Azure Cloud Solutions Engineer</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-1 rounded-full">
                    <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Database & API Optimization Specialist</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
                {/* Social Links */ }
                <Link
                  href="https://www.linkedin.com/in/caseyspaulding/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-12 w-12 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </Link>

                <Link
                  href="https://github.com/caseyspaulding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-12 w-12 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <Github className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                </Link>

                <Link
                  href="mailto:casey.spaulding@me.com"
                  className="flex items-center justify-center h-12 w-12 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                >
                  View Projects
                </Link>
              </div>
            </div>

            {/* Right Column */ }
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="relative">
                {/* Decorative blue ring */ }
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-30 animate-pulse"></div>

                {/* Profile image container */ }
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                  <Image
                    src="/images/avatars/caseyProfilePic.jpg"
                    alt="Casey Spaulding"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                    priority
                  />
                </div>

                {/* Floating badges */ }
                <div className="absolute -right-6 top-5 bg-white dark:bg-gray-800 rounded-full py-2 px-3 shadow-lg flex items-center">
                  <span className="flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-medium">Available for Work</span>
                </div>

                <div className="absolute -left-6 bottom-12 bg-white dark:bg-gray-800 rounded-full py-2 px-3 shadow-lg">
                  <span className="text-xs font-medium">3+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}