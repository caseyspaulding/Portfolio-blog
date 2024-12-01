'use client';

import { useEffect, useState } from 'react';
import { Disclosure, Dialog, Transition, Menu } from '@headlessui/react';
import { useUser } from '@/contexts/UserContext'; // Custom hook for user context
import type { ReactNode } from 'react';
import React from 'react';
import
{
  Bars3CenterLeftIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronRightIcon,
  ClipboardDocumentIcon,

  Cog8ToothIcon,

  CogIcon,

  DocumentIcon,

  EnvelopeIcon,

  EnvelopeOpenIcon,

  FolderIcon,
  HomeIcon,

  MegaphoneIcon,

  UserGroupIcon,

  XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { signOut } from '@/app/actions/SignOut';

import { loadConnectAndInitialize } from '@stripe/connect-js';
import { fetchClientSecret } from './fetchClientSecret';


import { HiMailOpen, HiOutlineLibrary } from 'react-icons/hi';
import { ClipboardCheck, } from 'lucide-react';
import FeedbackFormDialog from '@/components/FeedbackFormDialog';






const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, current: false },

  {
    name: 'Events',
    icon: FolderIcon,
    current: false,
    children: [
      { name: 'Manage Events', href: '/events' },
      { name: 'Create Event', href: '/events/new' },
      { name: 'Scan Tickets', href: '/events/scan-tickets' },

    ],
  },
  //{ name: 'Connect', href: '/connect', icon: MessageCircleMoreIcon, current: false },

  {
    name: 'Team',
    icon: UserGroupIcon,
    current: false,
    children: [
      { name: 'Members', href: '/team/members' },
      { name: 'Committees', href: '/team/committees' },
      { name: 'Volunteers', href: '/team/volunteers' },



    ],
  },
  //{
  //  name: 'CRM',
  //  icon: ChatBubbleBottomCenterTextIcon,
  //  current: false,
  //  children: [
  //    { name: 'Volunteers', href: '/volunteers' },
  //    { name: 'Vendors', href: '/vendors' },
  //    { name: 'Performers', href: '/performers' },
  //    { name: 'Attendees', href: '/Attendees' },
  //    { name: 'Sponsors', href: '/sponsors' },
  //    { name: 'Partners', href: '/partners' },


  //  ],
  //},
  {

    name: 'Forms',
    icon: DocumentIcon,
    current: false,
    children: [
      { name: 'All Forms', href: '/forms/all-forms' },
      { name: 'Create Form', href: '/forms/new' },


    ],
  },
  {

    name: 'Sign Up Sheets',
    icon: ClipboardCheck,
    current: false,
    children: [
      { name: 'All', href: '/signup-sheets/all' },
      { name: 'Create Signup', href: '/signup-sheets/new' },
      { name: 'Groups', href: '/signup-sheets/groups' },



    ],
  },



  {
    name: 'Banking',
    icon: HiOutlineLibrary,
    current: false,
    children: [
      { name: 'Connect Account', href: '/banking' },
      { name: 'Payments', href: '/banking/payments' },
      { name: 'Pay outs', href: '/banking/payouts' },
      { name: 'Account Settings', href: '/banking/account-settings' },
      { name: 'Help', href: '/banking/help' },
    ],
  },

  //{ name: 'Settings', href: '/settings', icon: CogIcon, current: false },

];

const userNavigation = [
  { name: 'Your profile', href: '/profile' },
  { name: 'Sign out', href: '/sign-out' },
];

function classNames ( ...classes: string[] )
{
  return classes.filter( Boolean ).join( ' ' );
}

interface DashboardLayoutProps
{
  children: ReactNode;
}

export default function DashboardLayoutTW ( { children }: DashboardLayoutProps )
{
  const [ sidebarOpen, setSidebarOpen ] = useState( false );
  const { user } = useUser(); // Fetch user data from context
  const orgName = user?.orgName;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [ stripeConnectInstance, setStripeConnectInstance ] = useState<any>( null );
  const [ isCollapsed, setIsCollapsed ] = useState( true );
  // Initialize Stripe Connect
  const initializeStripeConnect = async () =>
  {
    const clientSecret = await fetchClientSecret( user?.organizationId || '' ); // Fetch the client secret from your server-side
    if ( clientSecret )
    {
      const instance = loadConnectAndInitialize( {
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
        fetchClientSecret: () => Promise.resolve( clientSecret ),
      } );
      setStripeConnectInstance( instance );
    }
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect( () =>
  {
    initializeStripeConnect();
  }, [] ); // This ensures the Stripe instance is initialized when the component mounts.
  // Call Stripe logout before server-side logout


  const handleLogout = async () =>
  {
    try
    {
      // Logout from Stripe Connect session, if instance is initialized
      if ( stripeConnectInstance )
      {
        await stripeConnectInstance.logout(); // Ensure this is awaited
        console.log( "Stripe Connect session destroyed." );
      }

      // Proceed with server-side sign out (Supabase logout)
      await signOut();
      console.log( "Signed out successfully from Supabase." );

    } catch ( error )
    {
      console.error( "Error during logout:", error );
    }
  };

  const generateHref = ( href: string ) => ( orgName ? `/dashboard/${ orgName }${ href }` : href );

  return (
    <>
      {/* Mobile Sidebar */ }
      <Transition.Root show={ sidebarOpen } as={ React.Fragment }>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={ setSidebarOpen }>
          <Transition.Child
            as={ React.Fragment }
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-blue-300 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={ React.Fragment }
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-gradient-to-tl from-blue-700 via-blue-600 to-blue-700">
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className=" flex items-center bg-blue-600 justify-center h-10 w-10 rounded-full focus:outline-none focus:bg-blue-500"
                    onClick={ () => setSidebarOpen( false ) }
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white b" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center  px-4">
                    <Link href="https://www.eventjacket.com">
                      <img
                        className="h-8 w-auto"
                        src="/images/Logo_Icon.webp"
                        alt="EventJacket"
                      />
                    </Link>
                    <Link href="https://www.eventjacket.com">
                      <span className="pl-2 font-medium text-gray-100">
                        { orgName }
                      </span>
                    </Link>
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    { navigation.map( ( item ) =>
                      !item.children ? (
                        <a
                          key={ item.name }
                          href={ generateHref( item.href ) }
                          className={ classNames(
                            item.current ? 'bg-blue-100 text-gray-100' : 'text-gray-100 hover:bg-blue-500 hover:text-gray-50',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          ) }
                        >
                          <item.icon
                            className="mr-3 flex-shrink-0 h-6 w-6 text-blue-100"
                            aria-hidden="true"
                          />
                          { item.name }
                        </a>
                      ) : (
                        <Disclosure as="div" key={ item.name } className="space-y-1">
                          { ( { open }: { open: boolean } ) => (
                            <>
                              <Disclosure.Button
                                className={ classNames(
                                  item.current ? 'bg-blue-100 text-gray-100' : 'text-gray-100 hover:bg-blue-500 hover:text-gray-50',
                                  'group flex items-center w-full rounded-md p-2 mx-1 text-left text-base font-medium leading-6'
                                ) }
                              >
                                <div className="flex items-center gap-x-3">
                                  <item.icon
                                    aria-hidden="true"
                                    className="h-6 w-6 text-blue-100"
                                  />
                                  { item.name }
                                </div>
                                <ChevronRightIcon
                                  aria-hidden="true"
                                  className={ classNames(
                                    open ? 'rotate-90 transform' : '',
                                    'ml-auto h-5 w-5 text-blue-100 group-hover:text-blue-100'
                                  ) }
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="space-y-1">
                                { item.children.map( ( subItem ) => (
                                  <Disclosure.Button
                                    key={ subItem.name }
                                    as="a"
                                    href={ generateHref( subItem.href ) }
                                    className="group flex items-center pl-10 pr-3 py-2 text-sm font-medium text-gray-100 hover:bg-blue-500 hover:text-gray-50 rounded-md"
                                  >
                                    { subItem.name }
                                  </Disclosure.Button>
                                ) ) }
                              </Disclosure.Panel>
                            </>
                          ) }
                        </Disclosure>
                      )
                    ) }
                    <FeedbackFormDialog />
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */ }
      <div className="hidden bg-gray-50 lg:flex lg:w-56 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col  flex-grow bg-gradient-to-tr  from-blue-700 via-blue-600 to-blue-700 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link href="https://www.eventjacket.com">
              <img
                className="h-8 w-auto"
                src="/images/Logo_Icon.webp"
                alt="EventJacket"
              />
            </Link>
            <Link href="https://www.eventjacket.com">
              <span className="pl-2 font-normal text-gray-100">
                { orgName }
              </span>
            </Link>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            { navigation.map( ( item ) =>
              !item.children ? (
                <a
                  key={ item.name }
                  href={ generateHref( item.href ) }
                  className={ classNames(
                    item.current ? 'bg-blue-100 text-gray-100' : 'text-gray-100 hover:bg-blue-500 hover:text-blue-100',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  ) }
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-6 w-6 text-gray-50"
                    aria-hidden="true"
                  />
                  { item.name }
                </a>
              ) : (
                <Disclosure as="div" key={ item.name } className="space-y-1">
                  { ( { open }: { open: boolean } ) => (
                    <>
                      <Disclosure.Button
                        className={ classNames(
                          item.current ? 'bg-blue-500 text-gray-100' : 'text-gray-100 hover:bg-blue-500 hover:text-gray-50',
                          'group flex items-center w-full rounded-md p-2 text-left text-sm font-normal leading-6'
                        ) }
                      >
                        <div className="flex items-center gap-x-3">
                          <item.icon
                            aria-hidden="true"
                            className="h-6 w-6 text-gray-100"
                          />
                          { item.name }
                        </div>
                        <ChevronRightIcon
                          aria-hidden="true"
                          className={ classNames(
                            open ? 'rotate-90 transform' : '',
                            'ml-auto h-5 w-5 text-gray-100 group-hover:text-gray-100'
                          ) }
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="space-y-1">
                        { item.children.map( ( subItem ) => (
                          <Disclosure.Button
                            key={ subItem.name }
                            as="a"
                            href={ generateHref( subItem.href ) }
                            className="group flex items-center pl-10 pr-2 py-2 text-sm font-medium text-gray-100 hover:bg-blue-600 hover:gray-100 rounded-md"
                          >
                            { subItem.name }
                          </Disclosure.Button>
                        ) ) }
                      </Disclosure.Panel>
                    </>
                  ) }
                </Disclosure>
              )
            ) }
            <FeedbackFormDialog />
          </nav>
        </div>
      </div>

      <div className="flex flex-col flex-1 lg:pl-56">

        <div className="sticky top-0 z-10 flex-shrink-0 shadow-md flex h-13 py-3 bg-gradient-to-l from-blue-700 via-blue-500 to-blue-700 sm:bg-none lg:bg-white max-w-8xl">

          <button
            type="button"
            className="px-4 text-gray-100 focus:outline-none  lg:hidden"
            onClick={ () => setSidebarOpen( true ) }
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3CenterLeftIcon className="h-7 w-7" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                {/* Center the orgName here */ }
                <div className="relative w-full flex justify-center items-center lg:hidden text-gray-100 focus-within:text-blue-600">
                  { orgName }
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile dropdown */ }
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="max-w-xs z-50 bg-blue-400 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={ user?.avatar || '/images/avatars/user_avatar_default.png' }
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={ React.Fragment }
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-3 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    { userNavigation.map( ( item ) => (
                      <Menu.Item key={ item.name }>
                        { ( { active }: { active: boolean } ) =>
                          item.name === 'Sign out' ? (
                            <form method="post" className="w-full">
                              <button
                                type="button"
                                onClick={ handleLogout }
                                className={ classNames(
                                  active ? 'text-gray-50' : '',
                                  'w-full text-left px-4 py-2 text-sm text-gray-700'
                                ) }
                              >
                                { item.name }
                              </button>
                            </form>
                          ) : (
                            <a
                              href={ generateHref( item.href ) }
                              className={ classNames(
                                active ? 'text-gray-50' : '',
                                'block w-full px-4 py-2 text-sm text-gray-700'
                              ) }
                            >
                              { item.name }
                            </a>
                          )
                        }
                      </Menu.Item>
                    ) ) }
                  </Menu.Items>
                </Transition>
              </Menu>

            </div>
          </div>

        </div>


        <main className=" bg-white ">
          <div className="p-4">
            { children }
            {/* Render children here */ }
          </div>
        </main>
      </div>

    </>
  );
}
