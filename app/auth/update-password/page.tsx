'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function UpdatePassword ()
{
  const [ password, setPassword ] = useState( '' );
  const [ confirmPassword, setConfirmPassword ] = useState( '' );
  const [ message, setMessage ] = useState( '' );
  const router = useRouter();
  const supabase = createClient();

  const handleUpdatePassword = async () =>
  {
    if ( password !== confirmPassword )
    {
      setMessage( 'Passwords do not match' );
      return;
    }

    const { error } = await supabase.auth.updateUser( {
      password,
    } );

    if ( error )
    {
      setMessage( 'Failed to update password. Please try again.' );
    } else
    {
      setMessage( 'Password updated successfully!' );
      // Redirect to login or another appropriate page
      router.push( '/login' );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2>Update Your Password</h2>
      <div className="grid w-full max-w-sm gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your new password"
            value={ password }
            onChange={ ( e ) => setPassword( e.target.value ) }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            value={ confirmPassword }
            onChange={ ( e ) => setConfirmPassword( e.target.value ) }
            required
          />
        </div>

        <Button onClick={ handleUpdatePassword } className="mt-4">
          Update Password
        </Button>

        { message && <p className="mt-4 text-center">{ message }</p> }
      </div>
    </div>
  );
}