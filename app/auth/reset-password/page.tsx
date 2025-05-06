'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Head from 'next/head';

// Import Shadcn components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ResetPassword ()
{
  const [ email, setEmail ] = useState( '' );
  const [ message, setMessage ] = useState( '' );
  const [ isLoading, setIsLoading ] = useState( false );
  const [ isSuccess, setIsSuccess ] = useState( false );
  const supabase = createClient();

  const handleResetPassword = async () =>
  {
    if ( !email ) return;

    setIsLoading( true );

    try
    {
      const { error } = await supabase.auth.resetPasswordForEmail( email, {
        redirectTo: `${ window.location.origin }/auth/confirm`, // URL for token exchange
      } );

      if ( error )
      {
        setMessage( 'Failed to send password reset email. Please try again.' );
        setIsSuccess( false );
      } else
      {
        setMessage( 'Password reset email sent. Please check your inbox.' );
        setIsSuccess( true );
      }
    } catch ( error )
    {
      setMessage( 'An unexpected error occurred. Please try again.' );
      setIsSuccess( false );
    } finally
    {
      setIsLoading( false );
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  type="email"
                  value={ email }
                  onChange={ ( e ) => setEmail( e.target.value ) }
                  required
                />
              </div>

              { message && (
                <Alert variant={ isSuccess ? "default" : "destructive" }>
                  <AlertDescription>{ message }</AlertDescription>
                </Alert>
              ) }
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={ handleResetPassword }
              className="w-full"
              disabled={ isLoading || !email }
            >
              { isLoading ? "Sending..." : "Send Reset Email" }
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}