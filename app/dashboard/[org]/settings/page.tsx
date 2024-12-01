'use client';

import { useState } from 'react';
import AboutTab from './AboutTab';
import AccountTab from './AccountTab';

import ImportsTab from './ImportsTab';
import DateTimeTab from './DateTimeTab';

// Define SubTab types
type AboutSubTab =
  | 'Organization Profile'
  | 'Addresses'
  | 'Branding'
  | 'Landing Page'
  | 'Account Verification'
  | 'Subscription & Billing';

type AccountSubTab = 'Profile' | 'Security' | 'Notifications';

type SubTab = AboutSubTab | AccountSubTab;

// Define MainTab type
type MainTab = 'About' | 'Account' | 'Imports' | 'Date/Time';

export default function SettingsPage ()
{
  const mainTabs: MainTab[] = [ 'About', 'Account', 'Imports', 'Date/Time' ];

  const subTabs: Record<MainTab, SubTab[]> = {
    About: [
      'Organization Profile',
      'Addresses',
      'Branding',
      'Landing Page',
      'Account Verification',
      'Subscription & Billing',
    ],
    Account: [ 'Profile', 'Security', 'Notifications' ],
   
  
    Imports: [],
    'Date/Time': [],
  };

  const [ activeMainTab, setActiveMainTab ] = useState<MainTab>( 'About' );
  const [ activeSubTab, setActiveSubTab ] = useState<SubTab>( subTabs[ 'About' ][ 0 ] );
  const [ isSidebarOpen, setIsSidebarOpen ] = useState( false );

  const renderMainContent = () =>
  {
    switch ( activeMainTab )
    {
      case 'About':
        // Type assertion ensures TypeScript knows activeSubTab is an AboutSubTab here
        return (
          <AboutTab
           // @ts-ignore
            activeSubTab={ activeSubTab as AboutSubTab }
            setActiveSubTab={ setActiveSubTab }
            subTabs={ subTabs[ activeMainTab ] as AboutSubTab[] }
          />
        );
      case 'Account':
        // Type assertion ensures TypeScript knows activeSubTab is an AccountSubTab here
        return (
          <AccountTab
            activeSubTab={ activeSubTab as AccountSubTab }
            // @ts-ignore
            setActiveSubTab={ setActiveSubTab }
            subTabs={ subTabs[ activeMainTab ] as AccountSubTab[] }
          />
        );
     
      case 'Imports':
        return <ImportsTab />;
      case 'Date/Time':
        return <DateTimeTab />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Settings - (Under Construction)</h1>

      {/* Main navigation */ }
      <nav className="flex flex-wrap space-x-2 md:space-x-6 mb-4 md:mb-6 overflow-x-auto">
        { mainTabs.map( ( tab ) => (
          <button
            key={ tab }
            className={ `pb-2 ${ activeMainTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                : 'text-gray-500'
              }` }
            onClick={ () =>
            {
              setActiveMainTab( tab );
              const firstSubTab = subTabs[ tab ][ 0 ];
              setActiveSubTab( firstSubTab );
              setIsSidebarOpen( false ); // Close sidebar on mobile when switching tabs
            } }
          >
            { tab }
          </button>
        ) ) }
      </nav>

      {/* Main content with conditional sidebar */ }
      <div className="md:flex gap-6">
        {/* Sidebar navigation for desktop and dropdown for mobile */ }
        { subTabs[ activeMainTab ] && subTabs[ activeMainTab ].length > 0 && (
          <div className="md:w-64">
            <button
              className="md:hidden bg-blue-500 text-white p-2 rounded mb-4"
              onClick={ () => setIsSidebarOpen( !isSidebarOpen ) }
            >
              { isSidebarOpen ? 'Hide' : 'Show' } Options
            </button>

            <nav
              className={ `${ isSidebarOpen ? 'block' : 'hidden'
                } md:block bg-gray-50 p-4 rounded-lg` }
            >
              { subTabs[ activeMainTab ].map( ( tab ) => (
                <button
                  key={ tab }
                  className={ `block w-full text-left py-2 px-3 rounded ${ activeSubTab === tab
                      ? 'bg-blue-100 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                    }` }
                  onClick={ () =>
                  {
                    setActiveSubTab( tab );
                    setIsSidebarOpen( false ); // Close sidebar on mobile after selection
                  } }
                >
                  { tab }
                </button>
              ) ) }
            </nav>
          </div>
        ) }

        {/* Main content */ }
        <div className="flex-1 bg-white p-4 md:p-6 rounded-lg border">{ renderMainContent() }</div>
      </div>
    </div>
  );
}
