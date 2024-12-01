// app/settings/AccountTab/Security.js
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';

export default function Security ()
{
  const [ formData, setFormData ] = useState( {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  } );

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) =>
  {
    const { name, value } = e.target;
    setFormData( { ...formData, [ name ]: value } );
  };

  const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) =>
  {
    e.preventDefault();
    // Validate passwords and handle form submission
    if ( formData.newPassword !== formData.confirmPassword )
    {
      alert( 'New password and confirm password do not match.' );
      return;
    }
    console.log( 'Password updated:', formData.newPassword );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Security</h2>
      <form onSubmit={ handleSubmit } className="space-y-4">
        <div>
          <Label htmlFor="currentPassword">Current Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              className="pl-10"
              value={ formData.currentPassword }
              onChange={ handleChange }
              placeholder="Enter your current password"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              className="pl-10"
              value={ formData.newPassword }
              onChange={ handleChange }
              placeholder="Enter a new password"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="pl-10"
              value={ formData.confirmPassword }
              onChange={ handleChange }
              placeholder="Confirm your new password"
            />
          </div>
        </div>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          Update Password
        </Button>
      </form>
    </div>
  );
}
