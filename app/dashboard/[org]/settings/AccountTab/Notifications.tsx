// app/settings/AccountTab/Notifications.js
'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { SwitchProps } from '@radix-ui/react-switch';

export default function Notifications ()
{
  const [ notifications, setNotifications ] = useState( {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  } );

  const handleToggle = ( e: React.ChangeEvent<HTMLInputElement> ) =>
  {
    const { name, checked } = e.target;
    setNotifications( { ...notifications, [ name ]: checked } );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="emailNotifications">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive updates via email.
            </p>
          </div>
          <Switch
            id="emailNotifications"
            name="emailNotifications"
            checked={ notifications.emailNotifications }
            onChange={ handleToggle as SwitchProps['onChange'] }
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="smsNotifications">SMS Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive updates via SMS.
            </p>
          </div>
          <Switch
            id="smsNotifications"
            name="smsNotifications"
            checked={ notifications.smsNotifications }
            onChange={ handleToggle as SwitchProps['onChange'] }
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="pushNotifications">Push Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive push notifications.
            </p>
          </div>
          <Switch
            id="pushNotifications"
            name="pushNotifications"
            checked={ notifications.pushNotifications }
            onChange={ handleToggle as SwitchProps['onChange'] }
          />
        </div>
      </div>
    </div>
  );
}
