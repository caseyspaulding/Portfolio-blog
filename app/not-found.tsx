import FooterFull from '@/components/Footers/FooterFull';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {
    BookmarkSquareIcon,
    BookOpenIcon,

    RssIcon
} from '@heroicons/react/24/solid';

import Image from 'next/image';
import Link from 'next/link';


const links = [
    {
        name: 'Documentation',
        href: '/docs',
        description: 'Learn how to integrate our tools with your app.',
        icon: BookOpenIcon
    },

    {
        name: 'Guides',
        href: '/guides',
        description: 'Installation guides that cover popular setups.',
        icon: BookmarkSquareIcon
    },
    {
        name: 'Blog',
        href: '/blog',
        description: 'Read our latest news and articles.',
        icon: RssIcon
    }
];

export default function Example() {
    return (
        <div className="bg-white">
            <main className="mx-auto w-full max-w-7xl px-6 pb-8 pt-10 sm:pb-14 lg:px-2">
                <Link href="https://www.eventjacket.com">
                    <Image
                        height={40}
                        width={40}
                        alt="EventJacket logo"
                        src="/images/Logo_Icon.webp"
                        className="mx-auto h-10 w-auto sm:h-12"
                    />
                </Link>
                <div className="mx-auto mt-6 max-w-2xl text-center sm:mt-8">
                    <p className="text-base font-semibold leading-8 text-blue-700">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Ah Snap!
                    </h1>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        This page does not exist
                    </h1>
                    <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10 flex justify-center">
                        <Link href="/" className="text-lg font-semibold leading-6 text-blue-600">
                            <span aria-hidden="true">&larr;</span>
                            Back to home
                        </Link>
                    </div>
                    <p className="mt-3 text-base leading-7 text-gray-600 sm:mt-4">
                        Here are some popular pages:
                    </p>
                </div>
                <div className="mx-auto mt-8 flow-root max-w-lg sm:mt-10">
                    <h2 className="sr-only">Popular pages</h2>
                    <ul
                        role="list"
                        className="-mt-6 divide-y divide-gray-900/5 border-b border-gray-900/5"
                    >
                        {links.map((link, linkIdx) => (
                            <li key={linkIdx} className="relative flex gap-x-6 py-6">
                                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm ring-1 ring-gray-900/10">
                                    <link.icon
                                        aria-hidden="true"
                                        className="h-6 w-6 text-blue-600"
                                    />
                                </div>
                                <div className="flex-auto">
                                    <h3 className="text-sm font-semibold leading-6 text-gray-900">
                                        <a href={link.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {link.name}
                                        </a>
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        {link.description}
                                    </p>
                                </div>
                                <div className="flex-none self-center">
                                    <ChevronRightIcon
                                        aria-hidden="true"
                                        className="h-5 w-5 text-gray-400"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                   
                </div>
            </main>
            <FooterFull />
        </div>
    );
}
