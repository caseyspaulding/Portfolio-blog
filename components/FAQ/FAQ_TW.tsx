import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    id: 1,
    question: 'What is EventJacket?',
    answer: 'EventJacket is a platform that allows event organizers to easily input event details and automatically generate a professional web page. This page enables seamless Online Ticket Sales and promotes the event—all in one place.'
  },
  {
    id: 2,
    question: 'How do I sell tickets?',
    answer: 'For each event, you’ll follow a simple step-by-step process to enter details like the event name, date, location, ticket types, and prices. You can also choose who covers the fees and select your payment processor. Once everything is set, publish the event to create a public URL, which you can share on social media or through email campaigns. Buyers can visit the page to learn more and purchase tickets online.'
  },
  {
    id: 3,
    question: 'Why choose EventJacket?',
    answer: 'EventJacket offers a simple, cost effective solution for organizations or individuals, making it easy to manage ticket sales and more. With our user-friendly platform, you can create professional event pages, handle payments, and promote your event seamlessly—without needing multiple tools. Plus, we offer one-on-one support and assistance with setting up your event pages, ensuring you have everything you need to succeed. It’s designed to save you time, reduce hassle, and help your events thrive.'
  },
  {
    id: 4,
    question: 'How will I get paid?',
    answer: 'We pay you directly to your bank account!  United States, Canada, and Australia.'
  },
  {
    id: 5,
    question: 'Who processes my payments?',
    answer: "We securely handle and process your ticket sales payments using Stripe, a leading and trusted payment processor. With Stripe, your transactions are protected by advanced security measures, ensuring your money is safe and your customers' data is secure. Plus, you can enjoy a seamless payment experience without the added fees of other processors. Rest assured, you're in good hands!"
  },
  {
    id: 6,
    question: 'Can I customize the registration form for my event?',
    answer: 'Yes, EventJacket allows you to create custom registration forms. You can add fields to collect specific information from attendees, such as dietary requirements, session preferences, or any other details relevant to your event.'
  },
  {
    id: 7,
    question: 'How does the check-in process work with EventJacket?',
    answer: 'EventJacket provides a streamlined check-in process using QR codes. Attendees receive a unique QR code with their ticket by email, which can be scanned using our app at the event entrance for quick and efficient check-in. Try it out for Free. No credit card required.'
  },
  {
    id: 8,
    question: 'How secure are my payments?',
    answer: "EventJacket is powered by Stripe with Stripe Connect, an enterprise-level payment platform that has achieved PCI-DSS 3.2.1 Level 1 certification — the highest standard of data security recognized in the payment industry! This means your financial information and your attendees' payment details are kept exceptionally secure. Rest assured, you can trust us to protect your data."
  },
  {
    id: 9,
    question: 'Is it possible to manage multiple events simultaneously on EventJacket?',
    answer: 'Yes, EventJacket is designed to handle multiple events concurrently. You can create, manage, and track numerous events from a single dashboard, making it ideal for event planners, organizations, or venues that host various events.'
  },
  {
    id: 10,
    question: 'What\'s the maximum fee my ticket buyers will incur?',
    answer: 'At EventJacket, our standard ticketing fee is 25 cents per ticket. Ensuring that even your higher-priced tickets remain affordable for your attendees. Please note, the 3% credit card processing fee that all ticket buyers incur is separate from the ticketing fee.'
  },
  {
    id: 11,
    question: 'Is EventJacket legit?',
    answer: 'Absolutely! Give us a call, checkout our about page and EventJacket is officially registered in the state of Florida. You can view the business registration here: https://search.sunbiz.org/Inquiry/CorporationSearch/SearchResultDetail?inquirytype=EntityName&directionType=Initial&searchNameOrder=EVENTJACKET%20L240003822780&aggregateId=flal-l24000382278-a80f37fb-3daa-4424-9a27-e9b33f8bc4ca&searchTerm=Eventjacket&listNameOrder=EVENTJACKET%20L240003822780.'
  },
];

export default function FAQ_TW ()
{
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-5xl font-bold leading-10 tracking-tight text-blue-700">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            { faqs.map( ( faq ) => (
              <Disclosure key={ faq.question } as="div" className="pt-6">
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-xl font-semibold leading-7">{ faq.question }</span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon aria-hidden="true" className="h-6 w-6 group-data-[open]:hidden" />
                      <MinusSmallIcon aria-hidden="true" className="h-6 w-6 [.group:not([data-open])_&]:hidden" />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-base leading-7 text-gray-600">{ faq.answer }</p>
                </DisclosurePanel>
              </Disclosure>
            ) ) }
          </dl>
        </div>
      </div>
    </div>
  )
}
