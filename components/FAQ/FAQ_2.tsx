import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    id: 1,
    question: 'How will I get paid?',
    answer: 'We pay you directly to your bank account!  United States, Canada, and Australia.'
  },
  {
    id: 2,
    question: 'Who processes my payments?',
    answer: "We securely handle and process your ticket sales payments using Stripe, a leading and trusted payment processor. With Stripe, your transactions are protected by advanced security measures, ensuring your money is safe and your customers' data is secure. Plus, you can enjoy a seamless payment experience without the added fees of other processors. Rest assured, you're in good hands!"
  },
  {
    id: 3,
    question: 'Can I customize the registration form for my event?',
    answer: 'Yes, EventJacket allows you to create custom registration forms. You can add fields to collect specific information from attendees, such as dietary requirements, session preferences, or any other details relevant to your event.'
  },
  {
    id: 4,
    question: 'How does the check-in process work with EventJacket?',
    answer: 'EventJacket provides a streamlined check-in process using QR codes. Attendees receive a unique QR code with their ticket, which can be scanned using our mobile app or a compatible device at the event entrance for quick and efficient check-in.'
  },
  {
    id: 5,
    question: 'How secure are my payments?',
    answer: "EventJacket is powered by Stripe with Stripe Connect, an enterprise-level payment platform that has achieved PCI-DSS 3.2.1 Level 1 certification — the highest standard of data security recognized in the payment industry! This means your financial information and your attendees' payment details are kept exceptionally secure. Rest assured, you can trust us to protect your data."
  },
  {
    id: 6,
    question: 'Is it possible to manage multiple events simultaneously on EventJacket?',
    answer: 'Yes, EventJacket is designed to handle multiple events concurrently. You can create, manage, and track numerous events from a single dashboard, making it ideal for event planners, organizations, or venues that host various events.'
  },
  {
    id: 7,
    question: 'What\'s the maximum fee my ticket buyers will incur?',
    answer: 'At EventJacket, our standard ticketing fee is 25 cents per ticket. Ensuring that even your higher-priced tickets remain affordable for your attendees. Please note, the 3% credit card processing fee that all ticket buyers incur is separate from the ticketing fee.'
  }
];

export default function Example ()
{
  return (
    <div className="bg-blue-700 rounded-2xl">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-22 lg:px-8 lg:py-30">
        <div className="mx-auto max-w-4xl divide-y divide-gray-100/10">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-100/10">
            { faqs.map( ( faq ) => (
              <Disclosure key={ faq.question } as="div" className="pt-6">
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-white">
                    <span className="text-base  leading-7">{ faq.question }</span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon aria-hidden="true" className="h-6 w-6 group-data-[open]:hidden" />
                      <MinusSmallIcon aria-hidden="true" className="h-6 w-6 [.group:not([data-open])_&]:hidden" />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-base leading-7 text-white">{ faq.answer }</p>
                </DisclosurePanel>
              </Disclosure>
            ) ) }
          </dl>
        </div>
      </div>
    </div>
  )
}
