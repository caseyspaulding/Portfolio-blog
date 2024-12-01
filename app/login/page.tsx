'use client';

import React, { useState, useEffect, use } from "react";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import Head from "next/head";

import { verifyAndRedirect } from "./signin";
import { createClient } from "@/utils/supabase/client";
import FooterFull from "@/components/Footers/FooterFull";
import MyButton from "./submit-button";
import Script from "next/script";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";


declare global
{
    interface Window
    {
        handleSignInWithGoogle: ( response: { credential: string } ) => void;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LoginComponent(props: { searchParams: Promise<any> }) {
    const searchParams = use(props.searchParams);

    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ isValid, setIsValid ] = useState( false );
    const [ isVisible, setIsVisible ] = useState( false );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ isLoading, setIsLoading ] = useState( false ); // Loading state
    const router = useRouter();
    const supabase = createClient(); // Initialize Supabase client
    const [ errorMessage, setErrorMessage ] = useState( "" );

    const toggleVisibility = () => setIsVisible( !isVisible );

    useEffect( () =>
    {
        const isEmailValid = /\S+@\S+\.\S+/.test( email );
        setIsValid( isEmailValid && password.length > 0 );
    }, [ email, password ] );

    useEffect( () =>
    {
        const checkAuthStatus = async () =>
        {
            try
            {
                const { data: { session } } = await supabase.auth.getSession();
                if ( session )
                {
                    const { data: { user } } = await supabase.auth.getUser();
                    if ( user )
                    {
                        const userId = user.id;
                        const { data: org, error } = await supabase
                            .from( 'organizations' )
                            .select( 'id' )
                            .eq( 'user_id', userId )
                            .single();

                        if ( error )
                        {
                            console.error( 'Error fetching organization:', error );
                            setErrorMessage( 'Error fetching organization. Please try again.' );
                        } else if ( org )
                        {

                            router.push( '/dashboard' ); // Only redirect after all checks are successful
                        } else
                        {
                            setErrorMessage( 'You do not have an associated organization. Please contact support or create an organization.' );
                        }
                    } else
                    {
                        setErrorMessage( 'Unable to retrieve user information. Please try logging in again.' );
                    }
                }
            } catch ( error )
            {
                console.error( 'Error during authentication check:', error );
                setErrorMessage( 'An unexpected error occurred. Please try again.' );
            }
        };

        checkAuthStatus();

        window.handleSignInWithGoogle = async ( response ) =>
        {
            try
            {
                console.log( "Google Sign-In Response:", response );
                const token = response.credential;
                const result = await verifyAndRedirect( token );
                console.log( "Verification result:", result );

                if ( result.success )
                {
                    console.log( 'Google Sign-In successful, redirecting to', result.redirectTo );
                    router.push( result.redirectTo as string );
                } else
                {
                    setErrorMessage( result.message || "Google sign-in failed" );
                    console.error( result.message );
                }
            } catch ( error )
            {
                console.error( 'Error during Google Sign-In:', error );
                setErrorMessage( 'Google sign-in failed. Please try again.' );
            }
        };


    }, [ supabase, router ] );

    const handleLogin = async ( e: React.FormEvent<HTMLFormElement> ) =>
    {
        setIsLoading( true ); // Start loading
        e.preventDefault();
        const formData = new FormData( e.currentTarget );

        try
        {
            // Call the server action to handle email/password login
            const result = await verifyAndRedirect( { formData } );

            if ( result.success )
            {
                router.push( result.redirectTo as string );
            } else
            {
                setErrorMessage( result.message || 'Email/Password sign-in failed' );
                console.error( result.message );
            }
        } catch ( error )
        {
            setErrorMessage( 'An unexpected error occurred during login.' );
            console.error( error );
        } finally
        {
            setIsLoading( false ); // Stop loading
        }
    };

    return (
        <>
            <Head>
                <title>Login </title>
                <meta name="description" content="Login to your EventJacket account to manage your events." />
                
            </Head>
            {/* Google Sign-In Script */ }
            <Script
                src="https://accounts.google.com/gsi/client"
                async
                defer
                onLoad={ () =>
                {
                    console.log( 'Google Sign-In script loaded' );
                } }
            />


            <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center" style={ { backgroundImage: "url('/images/festival-4.png')" } }>
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                {/* Login Card */ }
                <div className="relative z-10 flex flex-1 flex-col justify-center items-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="w-full max-w-md lg:w-96 bg-white p-6 rounded-3xl shadow-2xl">
                        <div className="mb-1">
                            <img
                                alt="EventJacket Logo"
                                src="/images/logo-full.png"
                                className="h-12 w-auto mx-auto"
                            />
                            <h1 className="mt-2 text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">Log In</h1>
                            <h2 className="mt-2 text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
                                Welcome Back
                            </h2>
                            <p className="mt-2 text-lg leading-6 text-gray-500 text-center">
                                Log in to your account to continue
                            </p>
                        </div>



                        <div className='flex justify-center w-full'>
                            <div
                                id="g_id_onload"
                                data-client_id="820727006892-1j07b2899mm4c8esa9ciiug6gu34ticn.apps.googleusercontent.com"
                                data-context="signup"
                                data-ux_mode="popup"
                                data-callback="handleSignInWithGoogle"
                                data-auto_select="true"
                                data-itp_support="true"
                                data-use_fedcm_for_prompt="true"
                                className="flex justify-center"
                            >
                            </div>
                            <div
                                className="g_id_signin mt-4"
                                data-type="standard"
                                data-shape="pill"
                                data-theme="outline"
                                data-text="signin_with"
                                data-size="large"
                                data-logo_alignment="left"
                                data-width="300"
                            ></div>
                        </div>
                        <div className="relative my-4">
                            <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm font-medium leading-6">
                                <span className="bg-white px-4 text-gray-900">Or continue with</span>
                            </div>
                        </div>
                        <form className="flex flex-col gap-3" onSubmit={ handleLogin }>
                            <Input
                                
                                name="email"
                                placeholder="Enter your email"
                                type="email"
                              
                                value={ email }
                                onChange={ ( e ) => setEmail( e.target.value ) }
                                required
                            />
                            <Input
                                
                                
                                name="password"
                                placeholder="Enter your password"
                                type={ isVisible ? "text" : "password" }
                               
                                value={ password }
                                onChange={ ( e ) => setPassword( e.target.value ) }
                                required
                            />
                            <div className="flex items-center justify-between px-1 py-2">
                               
                                <Link className="text-default-500" href="/auth/reset-password" >
                                    Forgot password?
                                </Link>
                            </div>
                            <MyButton
                                type="submit"
                                className="w-full bg-blue-500 font-medium py-2 text-medium text-white hover:bg-blue-400 rounded-3xl"
                                isLoading={ isLoading }
                                spinnerDelay={ 1000 } // 1 second delay before hiding spinner
                                loadingMessage="Signing In..."

                            >
                                Log In
                            </MyButton>
                            { searchParams?.message && (
                                <p className="mt-4 rounded border border-red-500 bg-red-100 p-4 text-center text-red-700">
                                    { searchParams.message }
                                </p>
                            ) }
                            { errorMessage && (
                                <p className="mt-4 rounded border border-red-500 bg-red-100 p-4 text-center text-red-700">
                                    { errorMessage }
                                </p>
                            ) }
                        </form>
                        <p className="text-center text-sm mt-4 ">
                            Don't have an account?&nbsp;
                            <Link href="/signup" >
                                Create Account
                            </Link>
                        </p>

                    </div >
                </div>
            </div>
            <FooterFull />

        </>
    );
}
