'use client';

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from "next/link";
import toast from "react-hot-toast";
import FooterFull from "@/components/Footers/FooterFull";
import MyButton from "../login/submit-button";
import { Metadata } from "next";
import { Input } from "@/components/ui/input";

declare global
{
    interface Window
    {
        handleSignInWithGoogle: ( response: { credential: string } ) => void;
    }
}

export default function Component ()
{

    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ isFormValid, setIsFormValid ] = useState( false );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ isLoading, setIsLoading ] = useState( false ); // Loading state
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ isValid, setIsValid ] = useState( false );
    const [ isVisible, setIsVisible ] = useState( false );
    const router = useRouter();

    useEffect( () =>
    {
        const emailIsValid = email.includes( '@' ) && email.includes( '.' );
        const passwordIsValid = password.length >= 8;
        setIsFormValid( emailIsValid && passwordIsValid );
    }, [ email, password ] );

    const toggleVisibility = () => setIsVisible( !isVisible );


    const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) =>
    {
        event.preventDefault();
        const formData = new FormData( event.currentTarget );

        const response = await fetch( '/api/signup', {
            method: 'POST',
            body: formData,
        } );
        const result = await response.json();

        if ( result.success )
        {
            router.push( result.redirectTo || '/choose-account-type' );
        } else
        {
            toast.error( 'Error creating account.' );
            console.error( result.message );
        }
    };

    useEffect( () =>
    {
        window.handleSignInWithGoogle = async ( response ) =>
        {
            const formData = new FormData();
            formData.append( 'googleToken', response.credential );

            try
            {
                const apiResponse = await fetch( '/api/signup', {
                    method: 'POST',
                    body: formData,
                } );
                const result = await apiResponse.json();

                if ( result.success )
                {
                    router.push( result.redirectTo || '/choose-account-type' );
                } else
                {
                    toast.error( 'Google sign-in failed.' );
                }
            } catch ( error )
            {
                console.error( 'Error during Google sign-in:', error );
                toast.error( 'Unexpected error during Google sign-in.' );
            }
        };

        const script = document.createElement( 'script' );
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild( script );

        return () =>
        {
            document.body.removeChild( script );
        };
    }, [] );


    return (
        <>
            <Head>
                <title>Create Account - EventJacket</title>
                <meta name="description" content="Create your EventJacket account to manage your events, sell tickets, and track attendees." />

            </Head>

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
                            <h1 className="mt-1 text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
                                Create an account
                            </h1>

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
                                data-text="signup_with"
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
                        <form className="space-y-6" onSubmit={ handleSubmit }>
                            <Input

                                name="email"
                                placeholder="Enter your email"
                                type="email"

                                value={ email }
                                onChange={ ( e ) => setEmail( e.target.value ) }
                                required
                            />
                            <Input
                                className="text-gray-500"


                                name="password"
                                placeholder="Enter your password"
                                type={ isVisible ? "text" : "password" }

                                value={ password }
                                onChange={ ( e ) => setPassword( e.target.value ) }
                                required
                            />
                            <MyButton
                                type="submit"
                                className="w-full bg-blue-600 font-medium py-2 text-medium text-white hover:bg-blue-500 rounded-3xl"
                                isLoading={ isLoading }
                                spinnerDelay={ 1000 } // 1 second delay before hiding spinner
                                loadingMessage="Signing In..."

                            >
                                Create Account
                            </MyButton>
                        </form>
                        <p className="text-center text-sm mt-4">
                            Already have an account?&nbsp;
                            <Link href="/login" >
                                Log In
                            </Link>
                        </p>

                    </div >
                </div>
            </div>
            <FooterFull />
        </>
    );
}