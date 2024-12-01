'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

const VideoPlayer = dynamic( () => import( '../VideoFacade' ), {
  ssr: false,
  loading: () => <div className="spinner">Loading...</div>,
} );

export default function NavBarTW ()
{
  return (
    <>
      <div className="relative overflow-hidden pb-26">
        <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 lg:mt-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
              <span className="block text-base font-semibold text-gray-500 sm:text-lg lg:text-base xl:text-lg">
                👋 &nbsp;Free Account
              </span>
              <h1>
                <span className="mt-1 block text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                  <span className="block underline-effect text-gray-900"> </span>

                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                No Hidden Fees. Transparent Pricing. Easy. <br />One on One Support.
              </p>
              <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
                <Link href="/signup" passHref>
                  <button
                    type="button"
                    className="relative z-10  bg-gradient-to-r from-blue-600 to-blue-800 py-2  text-white ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-350 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 font-medium text-2xl rounded-3xl w-full sm:w-auto px-8 sm:px-12 lg:px-44 flex justify-center items-center"
                  >
                    Free Account
                  </button>
                </Link>
                <p className="mt-4 ml-3 text-sm text-gray-500">No credit card required. Start today!</p>
              </div>
            </div>
            <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-2xl lg:items-center">
              <div className="relative block w-full overflow-hidden rounded-2xl bg-white">
                <p>Image or text</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
