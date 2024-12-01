// app/settings/AboutTab.js
'use client';

import OrganizationProfile from './AboutTab/OrganizationProfile';
import Addresses from './AboutTab/Addresses';
import Branding from './AboutTab/Branding';
import LandingPage from './AboutTab/LandingPage';
import AccountVerification from './AboutTab/AccountVerification';



type SubTab = 'Organization Profile' | 'Addresses' | 'Branding' | 'Landing Page' | 'Account Verification';

interface AboutTabProps
{

  activeSubTab: SubTab;

}


export default function AboutTab ( { activeSubTab }: AboutTabProps )
{
  switch ( activeSubTab )
  {
    case 'Organization Profile':
      return <OrganizationProfile activeSubTab={ '' } setActiveSubTab={ function ( tab: string ): void
      {
        throw new Error( 'Function not implemented.' );
      } } subTabs={ [] } />;
    case 'Addresses':
      return <Addresses />;
    case 'Branding':
      return <Branding />;
    case 'Landing Page':
      return <LandingPage />;
    case 'Account Verification':
      return <AccountVerification />;

    default:
      return null;
  }
}
