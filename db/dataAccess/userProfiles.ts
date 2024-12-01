import { eq, SQL } from 'drizzle-orm';
import { db } from '@/db';
import { userProfiles } from '@/db/schemas/schema';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for admin operations
);

export async function updateUserProfile(
    userId: string,
    updates: Partial<typeof userProfiles.$inferSelect> & { email?: string }
) {
    try {
        // Handle email update separately
        if (updates.email) {
            const { error } = await supabase.auth.admin.updateUserById(userId, {
                email: updates.email
            });
            if (error) throw error;

            // Remove email from updates object as it's not in userProfiles table
            delete updates.email;
        }

        // Only proceed with Drizzle update if there are other fields to update
        if (Object.keys(updates).length > 0) {
            const result = await db
                .update(userProfiles)
                .set(updates)
                .where(eq(userProfiles.userId, userId))
                .returning();

            if (result.length === 0) {
                throw new Error('User profile not found');
            }

            return result[0];
        }

        // If only email was updated, fetch and return the current profile
        return await getUserProfile(userId);
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw new Error('Failed to update user profile');
    }
}

export async function getUserProfile(userId: string) {
    const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId));
    if (result.length === 0) {
        throw new Error('User profile not found');
    }
    return result[0];
}

// New function to get email (and other auth data if needed)
export async function getUserAuthData(userId: string) {
    const { data, error } = await supabase.auth.admin.getUserById(userId);
    if (error) throw error;
    return data.user;
}

export async function getFullUserProfile(userId: string) {
    const [profile, authData] = await Promise.all([
        getUserProfile(userId),
        getUserAuthData(userId)
    ]);

    return {
        ...profile,
        email: authData.email
    };
}

//export async function updateUserStripeConnect(
//    userId: string,
//    stripeData: {
//        stripeConnectedAccountId: string;
//        stripeAccountType: string;
//        stripeAccountStatus: string;
//        stripeConnectLinked: boolean;
//    }
//) {
//    try {
//        const result = await db
//            .update(userProfiles)
//            .set({
              
//                stripeAccountType: stripeData.stripeAccountType,
//                stripeAccountStatus: stripeData.stripeAccountStatus,
//                stripeConnectLinked: stripeData.stripeConnectLinked,
//                updatedAt: new Date()
//            })
//            .where(eq(userProfiles.userId, userId))
//            .returning();

//        if (result.length === 0) {
//            throw new Error('User profile not found');
//        }

//        return result[0];
//    } catch (error) {
//        console.error('Error updating user Stripe Connect information:', error);
//        throw new Error('Failed to update user Stripe Connect information');
//    }
//}
