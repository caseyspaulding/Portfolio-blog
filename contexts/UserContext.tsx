'use client';

import React, { createContext, useContext, useCallback, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import { createClient } from '@/utils/supabase/client';
import type { ReactNode } from 'react';
import type { UserType } from '@/types/UserType';

type UserContextType = {
    user: UserType | null;
    loading: boolean;
    signInWithGoogle: ( token: string ) => Promise<void>;
    signOut: () => Promise<void>;
};

type UserProviderProps = {
    children: ReactNode;
    initialUser: UserType | null; // Ensure this is the correct prop name
};

const UserContext = createContext<UserContextType | undefined>( undefined );

export default function UserProvider ( { children, initialUser }: UserProviderProps )
{
    const supabase = createClient();

    const { data: user, error, mutate } = useSWR<UserType | null, Error>(
        '/api/fetchUserProfile',
        async ( url ) =>
        {
            const response = await fetch( url );
            if ( !response.ok ) throw new Error( 'Failed to fetch user profile' );
            return response.json();
        },
        {
            fallbackData: initialUser, // Correctly use initialUser here
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const loading = !user && !error;

    useEffect( () =>
    {
        if ( typeof window !== 'undefined' )
        {
            if ( user )
            {
                sessionStorage.setItem( 'user', JSON.stringify( user ) );
            } else
            {
                sessionStorage.removeItem( 'user' );
            }
        }
    }, [ user ] );

    const signInWithGoogle = useCallback(
        async ( token: string ) =>
        {
            try
            {
                const { error } = await supabase.auth.signInWithIdToken( {
                    provider: 'google',
                    token,
                } );

                if ( error )
                {
                    console.error( 'Error during Google sign-in:', error.message );
                    mutate( null, false );
                    return;
                }

                mutate();
            } catch ( error )
            {
                console.error( 'Unexpected error during Google sign-in:', error );
                mutate( null, false );
            }
        },
        [ supabase, mutate ]
    );

    const signOut = useCallback(
        async () =>
        {
            try
            {
                const { error } = await supabase.auth.signOut();
                if ( error ) throw error;
                sessionStorage.removeItem( 'user' );
                mutate( null, false );
            } catch ( error )
            {
                console.error( 'Error during sign-out:', error );
            }
        },
        [ supabase, mutate ]
    );

    const contextValue = useMemo(
        () => ( { user: user ?? null, loading, signInWithGoogle, signOut } ),
        [ user, loading, signInWithGoogle, signOut ]
    );

    return <UserContext.Provider value={ contextValue }>{ children }</UserContext.Provider>;
}

export function useUser ()
{
    const context = useContext( UserContext );
    if ( context === undefined )
    {
        throw new Error( 'useUser must be used within a UserProvider' );
    }
    return context;
}
