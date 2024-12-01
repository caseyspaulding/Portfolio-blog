import { CheckIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Customizable Tickets',
    description: 'Design and create tickets that reflect your event’s branding and style.',
  },
  {
    name: 'Multiple Ticket Types',
    description: 'Offer various ticket options such as VIP, early bird, and general admission.',
  },
  {
    name: 'Seamless Checkout',
    description: 'Provide a smooth and secure checkout process for your attendees.',
  },
  {
    name: 'Real-Time Analytics',
    description: 'Track ticket sales and attendee data in real-time to optimize your strategy.',
  },
  {
    name: 'Mobile Ticketing',
    description: 'Allow attendees to access and manage their tickets directly from their smartphones.',
  },
  {
    name: 'QR Code Scanning',
    description: 'Enable quick and efficient check-in with QR code scanning at the event entrance.',
  },
  {
    name: 'Automated Email Notifications',
    description: 'Keep your attendees informed with automated confirmation and reminder emails.',
  },
  {
    name: 'Flexible Payment Options',
    description: 'Support multiple payment methods, including credit cards, PayPal, and more.',
  },
]

export default function TicketingFeatures ()
{
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All-in-one Ticketing Platform
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            EventJacket provides a comprehensive ticketing solution that empowers you to manage ticket sales, track attendees, and deliver an exceptional event experience.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          { features.map( ( feature ) => (
            <div key={ feature.name } className="flex items-start">
              <CheckIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              <div className="ml-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{ feature.name }</h3>
                <p className="mt-2 text-base leading-7 text-gray-600">{ feature.description }</p>
              </div>
            </div>
          ) ) }
        </div>
      </div>
    </div>
  )
}
