'use client';

import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { createClient } from '@/utils/supabase/client';
import Head from 'next/head';




export default function ResetPassword ()
{
  const [ email, setEmail ] = useState( '' );
  const [ message, setMessage ] = useState( '' );
  const supabase = createClient();

  const handleResetPassword = async () =>
  {
    const { error } = await supabase.auth.resetPasswordForEmail( email, {
      redirectTo: `${ window.location.origin }/auth/confirm`, // URL for token exchange
    } );

    if ( error )
    {
      setMessage( 'Failed to send password reset email. Please try again.' );
    } else
    {
      setMessage( 'Password reset email sent. Please check your inbox.' );
    }
  };

  return (
    
    <>
      <Head>
        <title>Reset Password</title>
      </Head>


      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2>Reset Password</h2>
        <Input
          label="Email Address"
          name="email"
          placeholder="Enter your email"
          type="email"
          value={ email }
          onChange={ ( e ) => setEmail( e.target.value ) }
          required
        />
        <Button onClick={ handleResetPassword } className="mt-4">
          Send Reset Email
        </Button>
        { message && <p className="mt-4 text-center">{ message }</p> }
      </div>
    </>
  );
}
