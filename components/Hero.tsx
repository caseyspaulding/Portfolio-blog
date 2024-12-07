'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Hero ( )
{
  const { theme } = useTheme();

  return ( <div className={ theme }>
    <section className="relative overflow-hidden">
      {/* Background Gradient */ }
      <div
        className={ `absolute inset-0 ${ theme === 'dark'
          ? 'bg-gradient-to-br from-black via-gray-900 to-green-900'
          : 'bg-gradient-to-br from-white via-gray-50 to-green-50'
          }` }
        aria-hidden="true"
      />

      {/* Decorative Grid Overlay */ }
      <div className="absolute inset-0 h-full w-full">
        <div
          className={ `absolute bottom-0 left-0 right-0 top-0 ${ theme === 'dark'
            ? 'bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]'
            } bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]` }
        ></div>
      </div>

      {/* Hero Content */ }
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Column */ }
          <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
              Casey Spaulding
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              Software Engineer | AI Enthusiast | Lifelong Learner
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-200 mb-8 max-w-lg mx-auto md:mx-0">
              I specialize in full-stack development, cloud technologies, and artificial intelligence.
              Currently exploring machine learning frameworks and building innovative solutions that drive impact.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mb-8">
              {/* Social Links */ }
              <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
                <Link
                  href="https://www.linkedin.com/in/caseyspaulding/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-10 h-10" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" aria-label="GitHub">
                <Link
                  href="https://github.com/caseyspaulding"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-12 h-12" />
                </Link>
              </Button>
            </div>
            <Button asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Right Column */ }
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96">
              <Image
                src="/images/avatars/caseyProfilePic.jpg"
                alt="Casey Spaulding"
                layout="fill"
                objectFit="cover"
                className="rounded-full shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
}
