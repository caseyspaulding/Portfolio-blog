import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Github,  Linkedin } from 'lucide-react'

export default function Hero ()
{
  return (
    <section className="relative">
      {/* Background with a subtle gradient */ }
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left column for text content */ }
          <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Casey Spaulding
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Full Stack Developer & Tech Enthusiast
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 max-w-lg mx-auto md:mx-0">
              Passionate about creating elegant solutions to complex problems. I love learning and exploring new technologies.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mb-8">
              
              <Link href="https://www.linkedin.com/in/caseyspaulding/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400" />
              </Link>
              <Link href="https://github.com/caseyspaulding" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-6 h-6 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400" />
              </Link>

            </div>
            <Button asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Right column for image */ }
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
  )
}

