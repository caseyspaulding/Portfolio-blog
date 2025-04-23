'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowRight, Code, Server, Database } from 'lucide-react';

export default function Hero ( { theme }: { theme: string } )
{
  return (
    <div className={ theme }>
      <section className="relative overflow-hidden">
        {/* Background Gradient */ }
        <div
          className={ `absolute inset-0 ${ theme === 'dark'
            ? 'bg-gradient-to-b from-gray-900 via-blue-950 to-indigo-900'
            : 'bg-gradient-to-b from-white via-blue-50 to-indigo-100'
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
        

        {/* Hero Content - Centered */ }
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 text-center">
          {/* Profile Image + Status - Top Centered */ }
          <div className="mb-6 inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-30 animate-pulse"></div>

            <div className="relative rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-lg w-24 h-24 mx-auto">
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

          {/* Title & Role */ }
          <div className="mb-4">
            <span className="inline-block text-sm font-semibold py-1 px-3 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 mb-3">
              .NET Full Stack Developer
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500">
              Casey Spaulding
            </span>
          </h1>

          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Let’s build something great.
          </p>

          {/* Skills Section */ }
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full shadow-sm">
              <Code className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">.NET Specialist</span>
            </div>

            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full shadow-sm">
              <Server className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Cloud Solutions</span>
            </div>

            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full shadow-sm">
              <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">API Optimization</span>
            </div>
          </div>

          {/* Social Links */ }
          <div className="flex justify-center gap-4 mb-8">
            <Link
              href="https://www.linkedin.com/in/caseyspaulding/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </Link>

            <Link
              href="https://github.com/caseyspaulding"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Github className="h-5 w-5 text-gray-800 dark:text-gray-200" />
            </Link>

            <Link
              href="mailto:casey.spaulding@me.com"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </Link>
          </div>

          {/* CTA Buttons */ }
          <div className="flex flex-wrap gap-4 justify-center">
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
      </section>
    </div>
  );
}