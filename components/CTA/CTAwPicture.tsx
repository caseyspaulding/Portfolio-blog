import { CheckCircleIcon } from '@heroicons/react/20/solid'


const benefits = [
  'Sell tickets online',
  'Relationship management',
  'Custom Forms',
  'Organize teams and events',
  'Automate your workflow',
  'Data analytics',
]

export default function CTAwPicture ()
{
  return (
    <>
      <div className=" py-24 sm:py-32">
      
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
            <img
              alt="People at a festival"
              src="/images/festival-4.webp"
              className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm" />
            <div className="w-full flex-auto">
              <h2 className="text-3xl font-bold tracking-tight text-slate-700 sm:text-4xl">Boost your productivity today.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-700">
                Get Started Today. No credit card required.
              </p>
              <ul
                role="list"
                className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-blue-700 sm:grid-cols-2"
              >
                { benefits.map( ( benefit ) => (
                  <li key={ benefit } className="flex gap-x-3">
                    <CheckCircleIcon aria-hidden="true" className="h-7 w-5 flex-none" />
                    { benefit }
                  </li>
                ) ) }
              </ul>
              <div className="mt-10 flex">
                <a
                  href="/signup"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div></>
    
  )
}
