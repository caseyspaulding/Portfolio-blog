// app/settings/AccountTab.js
'use client';

import Profile from './AccountTab/Profile';
import Security from './AccountTab/Security';
import Notifications from './AccountTab/Notifications';

type AccountTabProps = {
  activeSubTab: 'Profile' | 'Security' | 'Notifications';
};

export default function AccountTab ( { activeSubTab }: AccountTabProps )
{
  switch ( activeSubTab )
  {
    case 'Profile':
      return <Profile />;
    case 'Security':
      return <Security />;
    case 'Notifications':
      return <Notifications />;
    default:
      return null;
  }
}
