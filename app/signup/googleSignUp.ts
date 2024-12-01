'use server';

import { db } from '@/db';
import { organizations, userProfiles } from '@/db/schemas/schema';
import { createClient } from '@/utils/supabase/server';
import { eq } from 'drizzle-orm';

export const googleSignUp = async ( idToken: string, orgName: string ) =>
{
  const supabase = await createClient();

  try
  {
    // Step 1: Sign in with Google ID token
    const { data: userResponse, error: userError } = await supabase.auth.signInWithIdToken( {
      provider: 'google',
      token: idToken,
    } );

    if ( userError || !userResponse?.user )
    {
      console.error( 'Google sign-in error:', userError );
      return { success: false, message: 'Could not sign in with Google' };
    }

    const userId = userResponse.user.id;

    // Check if the organization already exists
    const existingOrgs = await db
      .select()
      .from( organizations )
      .where( eq( organizations.name, orgName ) );

    if ( existingOrgs.length > 0 )
    {
      return { success: false, message: 'Organization already exists' };
    }

    // Use a transaction for organization and user profile creation
    await db.transaction( async ( trx ) =>
    {
      const [ org ] = await trx
        .insert( organizations )
        .values( { name: orgName } )
        .returning( { id: organizations.id } );

      if ( !org )
      {
        throw new Error( 'Could not create organization' );
      }

      await trx.insert( userProfiles ).values( {
        userId: userId,
        orgId: org.id,
        organizationName: orgName,
      } );
    } );

    console.log( 'Google sign-up process completed successfully.' );
    return { success: true, message: 'Sign up successful!' };
  } catch ( error )
  {
    console.error( 'Error during Google sign-up:', error );
    return { success: false, message: 'Could not complete sign up' };
  }
};