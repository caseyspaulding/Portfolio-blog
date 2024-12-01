import { createClient } from '@/utils/supabase/server';
import { db } from '@/db';
import { userProfiles, organizations } from '@/db/schemas/schema';
import { eq } from 'drizzle-orm/expressions';
import type { UserType } from '@/types/UserType';

export async function fetchUserProfile (): Promise<UserType | null>
{
    try
    {
        const supabase = await createClient();

        // Get user data from Supabase auth
        const { data: { user: supabaseUser }, error: authError } = await supabase.auth.getUser();

        if ( authError )
        {
            console.error( 'Error fetching Supabase user:', authError.message );
            return null;
        }

        if ( !supabaseUser )
        {
            console.warn( 'Supabase user is not authenticated.' );
            return null;
        }

        // Fetch user profile and organization data from your custom tables
        const userProfileData = await db
            .select( {
                id: userProfiles.id,
                organizationId: userProfiles.orgId,
                organizationName: organizations.name,
                profileImageUrl: userProfiles.profileImageUrl,
                role: userProfiles.role,
                contactNumber: userProfiles.contactNumber,
                bio: userProfiles.bio,
                socialLinks: userProfiles.socialLinks,
                isActive: userProfiles.isActive,
                lastLogin: userProfiles.lastLogin,
                permissions: userProfiles.permissions,
                preferences: userProfiles.preferences,
                department: userProfiles.department,
                createdAt: userProfiles.createdAt,
                updatedAt: userProfiles.updatedAt,
            } )
            .from( userProfiles )
            .innerJoin( organizations, eq( userProfiles.orgId, organizations.id ) )
            .where( eq( userProfiles.userId, supabaseUser.id ) )
            .limit( 1 );

        if ( userProfileData.length === 0 )
        {
            console.warn( 'No user profile found for user ID:', supabaseUser.id );
            return null;
        }

        const userProfile = userProfileData[ 0 ];

        // Combine data from Supabase auth and your custom tables into UserType
        const user: UserType = {
            id: userProfile.id,
            email: supabaseUser.email!,
            orgName: userProfile.organizationName,
            organizationId: userProfile.organizationId,
            role: userProfile.role || supabaseUser.user_metadata?.role || 'admin',
            avatar: userProfile.profileImageUrl || supabaseUser.user_metadata?.avatar_url || '/images/avatars/user_avatar_default.png',
            contactNumber: userProfile.contactNumber || undefined,
            bio: userProfile.bio || undefined,
            socialLinks: ( userProfile.socialLinks as Record<string, string> ) || {},
            isActive: Boolean( userProfile.isActive ),
            lastLogin: userProfile.lastLogin ? new Date( userProfile.lastLogin ) : undefined,
            preferences: ( userProfile.preferences as Record<string, unknown> ) || {},
            department: userProfile.department || undefined,
            createdAt: userProfile.createdAt ? new Date( userProfile.createdAt ) : new Date(),
            updatedAt: userProfile.updatedAt ? new Date( userProfile.updatedAt ) : new Date(),
        };

        return user;
    } catch ( error )
    {
        console.error( 'Error fetching user profile:', error );
        return null;
    }
}