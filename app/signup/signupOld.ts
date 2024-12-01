//'use server';

//import { db } from '@/db';
//import { organizations, userProfiles } from '@/db/schemas/schema';
//import { createClient } from '@/utils/supabase/server';
//import { headers } from 'next/headers';
//import { eq } from 'drizzle-orm';

//export const signUp = async ( formData: FormData ) =>
//{
//    const origin = headers().get( 'origin' ) || 'http://localhost:3000';
//    const email = formData.get( 'email' ) as string;
//    const password = formData.get( 'password' ) as string;
//    const orgName = formData.get( 'orgName' ) as string;
//    const supabase = createClient();

//    // Input validation
//    if ( !email || !password || !orgName )
//    {
//        return { success: false, message: 'All fields are required' };
//    }

//    try
//    {
//        // Step 1: Create user
//        const { data: userResponse, error: userError } = await supabase.auth.signUp( {
//            email,
//            password,
//            options: {
//                emailRedirectTo: `${ origin }/auth/callback`
//            }
//        } );

//        if ( userError || !userResponse?.user )
//        {
//            if ( userError!.status === 429 && userError!.code === 'over_email_send_rate_limit' )
//            {
//                return { success: false, message: 'Please wait a minute before trying again.' };
//            }
//            console.error( 'User creation error:', userError );
//            return { success: false, message: 'Could not create user' };
//        }

//        const userId = userResponse.user.id;

//        // Check if the organization already exists
//        const existingOrgs = await db
//            .select()
//            .from( organizations )
//            .where( eq( organizations.name, orgName ) );

//        // If the array has at least one entry, the organization exists
//        if ( existingOrgs.length > 0 )
//        {
//            return { success: false, message: 'Organization already exists' };
//        }
//        // Use a transaction for organization and user profile creation
//        await db.transaction( async ( trx ) =>
//        {
//            // Step 2: Create organization
//            const [ org ] = await trx
//                .insert( organizations )
//                .values( { name: orgName } )
//                .returning( { id: organizations.id } );

//            if ( !org )
//            {
//                throw new Error( 'Could not create organization' );
//            }

//            // Step 3: Create user profile
//            await trx.insert( userProfiles ).values( {
//                userId: userId,
//                orgId: org.id,
//                organizationName: orgName
//            } );
//        } );

//        console.log( 'Sign up process completed successfully.' );

//        // Redirect after successful signup
//        return { success: true, message: 'Sign up successful!' };
//    } catch ( error )
//    {
//        console.error( 'Error during signup:', error );
//        return { success: false, message: 'Could not complete sign up' };
//    }
//};
