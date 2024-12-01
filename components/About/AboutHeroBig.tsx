'use client'
const people = [
  {
    name: 'Casey Spaulding',
    role: 'Founder / Developer',
    imageUrl:
      '/images/avatars/caseyProfilePic.jpg',
    bio: 'Hi, I’m Casey, the founder of EventJacket. I spent 20 years in the Navy, learning the importance of discipline, reliability, and service. After teaching for two years and transitioning into software development, I saw an opportunity to give back to nonprofits—organizations that are often overlooked by large tech platforms. EventJacket is my way of helping them thrive, with tools that are affordable, powerful, and built for their needs.',
    xUrl: 'https://x.com/caseyspaulding_',
    linkedinUrl: 'https://www.linkedin.com/in/caseyspaulding/',
  },
  // More people...
]

const timeline = [
  {
    name: 'Founded Company',
    description:
      'EventJacket was born out of a passion for simplifying event management. ',
    date: 'Aug 2024',
    dateTime: '2024-08',
  },
  {
    name: 'Launched MVP',
    description:
      'Launched our Minimum Viable Product (MVP) to start helping event organizers streamline their operations.',
    date: 'Sep 2024',
    dateTime: '2024-10',
  },
  {
    name: 'Onboarded First Customer',
    description:
      'First customer, who believed in our vision and provided invaluable feedback to shape our product.',
    date: 'Oct 2024',
    dateTime: '2024-11',
  },
  {
    name: 'Released Version 1.0',
    description:
      'With feedback from our early users, we refined our platform and launched Version 1.0, packed with features to enhance the event planning experience.',
    date: 'Nov 2025',
    dateTime: '2025-03',
  },

];


const stats = [
  { label: 'Events supported so far', value: '3' },
  { label: 'Cups of Coffee', value: '100+' },
  { label: 'New features added monthly', value: '2' },
];

const values = [
  {
    name: 'Sell tickets seamlessly and affordably',
    description:
      '',
  },
  {
    name: 'Manage vendors, sponsors, volunteers, and performers in one place',
    description:
      '',
  },
  {
    name: 'Track sales and analytics in real time',
    description:
      '',
  },
  {
    name: 'Use role-based permissions to organize your team',
    description:
      '',
  },
  {
    name: 'Streamline your event with features like QR code ticket scanning',
    description:
      '',
  },

];

const team = [
  {
    name: 'Casey Spaulding',
    role: 'Founder',
    imageUrl: '/images/avatars/caseyProfilePic.jpg',
    websiteUrl: 'https://www.caseyspaulding.com',
  },
  {
    name: 'Laura Spaulding',
    role: 'Co-Founder',
    imageUrl: '/images/avatars/laura.jpg',
    websiteUrl: 'https://www.facebook.com/laura.spaulding.5',
  },
  {
    name: 'Whidbey Ren Faire',
    role: 'Advisor',
    imageUrl: '/images/avatars/wrf.jpg',
    websiteUrl: 'https://whidbeyislandrenfaire.org'
  },


  // More people...
]



export default function AboutHeroBig ()
{


  return (
    <div className="bg-white mb-10">


      <main className="isolate">
        {/* Hero section */ }
        <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-blue-100/20 pt-1">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-16">
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                Who We Are
              </h1>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">

                <p className="text-lg leading-8 mt-3 text-gray-600">
                  EventJacket was born from the realization that I could build a simple, effective, event mananagement platform to handle everything from ticket sales, event pages, and marketing without the complexity of using multiple systems.
                </p>
              </div>
              <img
                alt=""
                src="/images/family.jpg"
                className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>



        {/* Content section */ }
        <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-4 lg:px-8 xl:-mt-10">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our mission</h2>
            <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p className="text-xl leading-8 text-gray-600">
                  At EventJacket, we're on a mission to give event organizers the tools they need to plan like a pro, wow their attendees, and make every event a hit!
                </p>
                <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                  <p>
                    We believe great events can inspire, connect, and make magic happen. That’s why we’ve crafted a platform that takes care of all the tricky stuff, so organizers can focus on what really counts: creating unforgettable moments.
                  </p>
                  <p className="mt-10">
                    Our mission is to simplify event planning and elevate the experience for everyone involved. With EventJacket, you can streamline your operations, engage your audience, and let your creativity shine—without getting bogged down by the details.
                  </p>
                  <p className="mt-10">
                    We’re committed to continuously improving our platform, making sure it evolves with your needs. Whether you’re planning a small meetup or a large conference, we’re here to help you make it extraordinary.
                  </p>
                </div>
              </div>
              <div className="lg:flex lg:flex-auto lg:justify-center">
                <dl className="w-64 space-y-8 xl:w-80">
                  { stats.map( ( stat ) => (
                    <div key={ stat.label } className="flex flex-col-reverse gap-y-4">
                      <dt className="text-base leading-7 text-gray-600">{ stat.label }</dt>
                      <dd className="text-5xl font-semibold tracking-tight text-gray-900">{ stat.value }</dd>
                    </div>
                  ) ) }
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Image section */ }
        <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
          />
        </div>

        {/* Values section */ }
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Commitment</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We are committed to making event management more accessible, particularly for nonprofits and community organizations. We know budgets can be tight, so we designed EventJacket to be affordable without compromising on the features you need:
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            { values.map( ( value ) => (
              <div key={ value.name }>
                <dt className="font-semibold text-gray-900">{ value.name }</dt>
                <dd className="mt-1 text-gray-600">{ value.description }</dd>
              </div>
            ) ) }
          </dl>
        </div>

        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What Makes Us Different</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            EventJacket is not just another event management tool—it was built from the ground up by someone who has walked in your shoes. After 20 years in the Navy, and working for a nonprofit, I’ve seen firsthand the challenges nonprofits face when juggling multiple tools just to keep an event running smoothly.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            With EventJacket, you’re not dealing with a faceless corporation; you’re working with a founder who knows exactly what you need, and who’s directly involved in making sure you get it.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform simplifies event management by combining everything in one place—ticket sales, vendor coordination, volunteer management, and more. Designed to save you time and money, EventJacket adapts to your needs, whether you're organizing a small community gathering or a large festival.
          </p>

          <h2 className="text-3xl mt-6 font-bold tracking-tight text-gray-900 sm:text-4xl">Our Inspiration</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The inspiration behind EventJacket comes from real-world experience. I was volunteering at my friends non-profit, and I saw how hard it was to manage everything with several disconnected tools—each adding its own complexity and cost. It became clear to me that event organizers, especially in nonprofits, deserve a solution that simplifies their workload without breaking their budget.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            EventJacket was born out of the need for a single, all-in-one platform that serves nonprofits and community organizations—helping them create impactful events without the hassle. I knew there was a better way, and that’s what EventJacket delivers.
          </p>

          <h2 className="text-3xl mt-6 font-bold tracking-tight text-gray-900 sm:text-4xl">Looking Ahead</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            At EventJacket, we’re constantly evolving to meet the needs of our users. As both the founder and developer, I’m dedicated to adding new features, improving the user experience, and keeping our platform accessible and affordable for all nonprofits.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whether you’re planning your first small event or managing your largest festival yet, EventJacket grows with you, offering a reliable, all-in-one solution that lets you focus on what truly matters: delivering memorable experiences for your attendees. We handle the logistics, so you can focus on making an impact.
          </p>
        </div>
        <div className="bg-white py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-5">
            <div className="max-w-2xl xl:col-span-2">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Passionate about what we do and dedicated to delivering the
                best results for our clients.
              </p>
            </div>
            <ul role="list" className="-mt-12 space-y-12 divide-y divide-gray-200 xl:col-span-3">
              { people.map( ( person ) => (
                <li key={ person.name } className="flex flex-col gap-10 pt-12 sm:flex-row">
                  <img alt="" src={ person.imageUrl } className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover" />
                  <div className="max-w-xl flex-auto">
                    <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">{ person.name }</h3>
                    <p className="text-base leading-7 text-gray-600">{ person.role }</p>
                    <p className="mt-6 text-base leading-7 text-gray-600">{ person.bio }</p>
                    <ul role="list" className="mt-6 flex gap-x-6">
                      <li>
                        <a href={ person.xUrl } className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only">X</span>
                          <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
                            <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href={ person.linkedinUrl } className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only">LinkedIn</span>
                          <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
                            <path
                              d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              ) ) }
            </ul>
          </div>
        </div>
        {/* Team section */ }
        <div className="mx-auto mt-12 max-w-7xl px-6 sm:mt-48 lg:px-8 mb-11">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Team</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We’re a small but mighty team dedicated to bringing your events to life. Each of us brings unique skills and a shared passion for making event planning a breeze.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
          >
            { team.map( ( person ) => (
              <li key={ person.name }>
                <img alt="" src={ person.imageUrl } className="mx-auto h-24 w-24 rounded-full" />
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                  <a href={ person.websiteUrl } target="_blank" rel="noopener noreferrer">
                    { person.name }
                  </a>
                </h3>
                <p className="text-sm leading-6 text-gray-600">{ person.role }</p>
              </li>
            ) ) }
          </ul>
        </div>

        {/* Blog section */ }

      </main>

      {/* Footer */ }
      {/* Timeline section */ }
      {/*<div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8 mb-12">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          { timeline.map( ( item ) => (
            <div key={ item.name }>
              <time
                dateTime={ item.dateTime }
                className="flex items-center text-sm font-semibold leading-6 text-blue-600"
              >
                <svg viewBox="0 0 4 4" aria-hidden="true" className="mr-4 h-1 w-1 flex-none">
                  <circle r={ 2 } cx={ 2 } cy={ 2 } fill="currentColor" />
                </svg>
                { item.date }
                <div
                  aria-hidden="true"
                  className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                />
              </time>
              <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{ item.name }</p>
              <p className="mt-1 text-base leading-7 text-gray-600">{ item.description }</p>
            </div>
          ) ) }
        </div>
      </div>
      <div className='py-10'>

      </div>*/}
    </div>
  )
}
