import FooterFull from '@/components/Footers/FooterFull';
import HeaderCentered from '@/components/HeaderCentered';
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Documentation - EventJacket',
    description:
        "Welcome to the documentation! Below, you'll find everything you need to get started with our platform."
};
export default function docs() {
    return (
        <div>
            <HeaderCentered title={'Documentation'} description={''} />

            <div className="bg-white px-6 py-32 lg:px-8">
                <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                    <p className="text-base font-semibold leading-7 text-blue-600">Documentation</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Getting Started
                    </h1>
                    <p className="mt-6 text-xl leading-8">
                        Welcome to the documentation! Below, you'll find everything you need to get
                        started with our platform.
                    </p>
                    <div className="mt-10 max-w-2xl">
                        <p>
                            This section is a placeholder for introductory content. Here, you can
                            introduce the key concepts and provide an overview of your platform.
                        </p>
                        <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
                            <li className="flex gap-x-3">
                                <CheckCircleIcon
                                    aria-hidden="true"
                                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                                />
                                <span>
                                    <strong className="font-semibold text-gray-900">
                                        Key Concept 1.
                                    </strong>{' '}
                                    Brief description or placeholder for content.
                                </span>
                            </li>
                            <li className="flex gap-x-3">
                                <CheckCircleIcon
                                    aria-hidden="true"
                                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                                />
                                <span>
                                    <strong className="font-semibold text-gray-900">
                                        Key Concept 2.
                                    </strong>{' '}
                                    Brief description or placeholder for content.
                                </span>
                            </li>
                            <li className="flex gap-x-3">
                                <CheckCircleIcon
                                    aria-hidden="true"
                                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                                />
                                <span>
                                    <strong className="font-semibold text-gray-900">
                                        Key Concept 3.
                                    </strong>{' '}
                                    Brief description or placeholder for content.
                                </span>
                            </li>
                        </ul>
                        <p className="mt-8">
                            This is another placeholder paragraph where you can add more details or
                            instructions related to the concepts introduced above.
                        </p>
                        <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                            Detailed Section Heading
                        </h2>
                        <p className="mt-6">
                            Placeholder for more detailed content, which could include step-by-step
                            guides, examples, or deeper explanations of the topics mentioned above.
                        </p>
                        <figure className="mt-10 border-l border-blue-600 pl-9">
                            <blockquote className="font-semibold text-gray-900">
                                <p>
                                    “Placeholder for a quote or important information that you want
                                    to highlight within the documentation.”
                                </p>
                            </blockquote>
                            <figcaption className="mt-6 flex gap-x-4">
                                <img
                                    alt=""
                                    src="https://via.placeholder.com/40"
                                    className="h-6 w-6 flex-none rounded-full bg-gray-50"
                                />
                                <div className="text-sm leading-6">
                                    <strong className="font-semibold text-gray-900">
                                        Placeholder Name
                                    </strong>{' '}
                                    – Placeholder Title
                                </div>
                            </figcaption>
                        </figure>
                        <p className="mt-10">
                            This paragraph can be used to provide additional context or conclusions
                            for the section above.
                        </p>
                    </div>
                    <figure className="mt-16">
                        <img
                            alt=""
                            src="https://via.placeholder.com/1310x873"
                            className="aspect-video rounded-xl bg-gray-50 object-cover"
                        />
                        <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
                            <InformationCircleIcon
                                aria-hidden="true"
                                className="mt-0.5 h-5 w-5 flex-none text-gray-300"
                            />
                            Placeholder for an image caption or description.
                        </figcaption>
                    </figure>
                    <div className="mt-16 max-w-2xl">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Final Section Heading
                        </h2>
                        <p className="mt-6">
                            Use this section for final thoughts, additional resources, or links to
                            further documentation.
                        </p>
                        <p className="mt-8">
                            Placeholder for any concluding remarks or summaries for the
                            documentation page.
                        </p>
                    </div>
                </div>
            </div>

            <FooterFull />
        </div>
    );
}
