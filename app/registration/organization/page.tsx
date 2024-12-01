'use client';

import { useState } from 'react';
import { registerOrganization } from './registerOrganization'; // Update with correct path
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { createClient } from '@/utils/supabase/client';
import LoadingButton from '@/components/LoadingButton/LoadingButton';
import { LoadingScreen } from '@/components/Loaders/Loading';

import Head from 'next/head';
import { Input } from '@/components/ui/input';


const RegisterOrganizationPage = () =>
{
  const router = useRouter();
  const [ orgName, setOrgName ] = useState( '' );
  const [ website, setWebsite ] = useState( '' );
  const [ logoFile, setLogoFile ] = useState<File | null>( null );
  const [ loading, setLoading ] = useState( false );


  const handleFileSelect = ( e: React.ChangeEvent<HTMLInputElement> ) =>
  {
    if ( e.target.files && e.target.files[ 0 ] )
    {
      setLogoFile( e.target.files[ 0 ] );
    }
  };
  const supabase = createClient();

  const handleSubmit = async ( e: React.FormEvent ) =>
  {
    e.preventDefault();
    setLoading( true );

    const formData = new FormData();
    formData.append( 'orgName', orgName );
    formData.append( 'website', website );
    if ( logoFile )
    {
      formData.append( 'logo', logoFile );
    }

    try
    {
      const response = await registerOrganization( formData );

      if ( response.success )
      {
        toast.success( 'Organization registered successfully!' );

        // Refresh session immediately after successful registration
        const { error } = await supabase.auth.refreshSession();
        if ( error )
        {
          console.error( 'Error refreshing session:', error );
          toast.error( 'Session error. Please try again.' );
          setLoading( false );
          return;
        }

        setLoading( false );

        // Navigate to dashboard after ensuring session is refreshed
        router.push( `/dashboard/${ response.orgName }` );
      } else
      {
        console.log( 'Error during registration:', response.message );
        toast.error( 'Error creating organization' );
        setLoading( false );
      }
    } catch ( error )
    {
      console.log( 'Error during registration:', error );
      toast.error( 'Error creating organization' );
      setLoading( false );
    }
  }; return loading ? ( // If loading is true, show loading screen
    <LoadingScreen />
  ) : (

    <><Head>
      <title> Registration </title>
      <meta name="description" content=' Register your organization' />
    </Head><div className="flex min-h-screen items-center justify-center bg-gray-100"
      style={ { backgroundImage: 'url(/images/illustrations/background-3.jpg)' } }>
        <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
          <div className="mb-4 text-center">
            <img src="/images/Logo_Icon.webp" alt="EventJacket" className="h-14 w-auto mx-auto" />
            <h2 className="mt-4 text-2xl font-semibold leading-7 text-gray-900">
              Organization Registration
            </h2>
            <p className="mt-2 text-lg leading-6 text-gray-600">
              Please provide the details of your organization to complete the registration.
            </p>
          </div>

          <form onSubmit={ handleSubmit } className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <Input
                type="text"
                name="orgName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={ orgName }
                onChange={ ( e ) => setOrgName( e.target.value ) }
                required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <Input
                type="text"
                name="website"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={ website }
                onChange={ ( e ) => setWebsite( e.target.value ) }
                required />
            </div>

            <div>
              <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-700">
                  Upload Logo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <svg
                    className="h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd" />
                  </svg>
                  <button
                    type="button"
                    onClick={ () => document.getElementById( 'logoFileInput' )?.click() }
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={ handleFileSelect }
                  className="hidden"
                  id="logoFileInput" />
                { logoFile && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected file: { logoFile.name }
                  </p>
                ) }
              </div>
            </div>
            <div className="flex items-center justify-center">
              <LoadingButton
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-600"
                disabled={ loading }
              >
                { loading ? 'Registering...' : 'Register Organization' }
              </LoadingButton>
            </div>
          </form>
        </div>
      </div></>
  );
};

export default RegisterOrganizationPage;
