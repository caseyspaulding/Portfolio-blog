import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: 'Thank You - EventJacket',
  description:
    'Thank you for confirming your email! You are all set to start creating events!',
};
export default function ThankYouPage ()
{
  return (
    <>
      <div className="flex h-screen min-h-screen flex-col items-center justify-center bg-blue-700 px-4">
        <main className="flex w-full max-w-7xl flex-grow flex-col justify-center px-4 lg:px-8">
          <div className="flex flex-shrink-0 justify-center mb-8">
            <a href="#" className="inline-flex">
              <span className="sr-only">EventJacket</span>
              <img
                alt="EventJacket Logo"
                src="/images/Logo_Icon.webp"
                className="h-16 w-auto"
              />
            </a>
          </div>
          <div className="flex items-center justify-center">
            <div className="rounded-2xl shadow-2xl bg-gradient-to-r from-blue-500 via-sky-500 to-blue-500 max-w-md w-full">
              <div className="flex flex-col rounded-2xl items-center p-8 space-y-6 bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-green-500 w-24 h-24 sm:w-28 sm:h-28"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 text-center">
                  Confirmed!
                </h1>
                <p className="text-center text-lg sm:text-base text-gray-700">
                  Thank you for confirming your email! You are all set to start
                  creating events!
                </p>
                <Link href="/login" passHref>
                  <div className="mt-3 inline-flex items-center text-lg px-6 py-3 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400">
                    Get Started
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>

  )
}