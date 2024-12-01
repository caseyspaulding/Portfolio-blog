'use server';
import { db } from "@/db";
import { orgMembers, userProfiles } from "@/db/schemas/schema";
import { and, eq } from 'drizzle-orm';
import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from "@/utils/supabase/createAdminClient";

const supabase = createClient();

export const createMember = async ( data: FormData ) =>
{
  const orgId = data.get( 'orgId' ) as string;
  const name = data.get( 'name' ) as string;
  const email = data.get( 'email' ) as string;
  const role = data.get( 'role' ) as string;
  const department = data.get( 'department' ) as string;
  const joinedDate = data.get( 'joinedDate' ) as string;
  const phoneNumber = data.get( 'phoneNumber' ) as string;
  const profileImageUrl = data.get( 'profileImageUrl' ) as string;

  const newMember = {
    orgId,
    name,
    email,
    role,
    department,
    joinedDate,
    phoneNumber,
    profileImageUrl,
    isActive: true, // Default to active
  };

  await db.insert( orgMembers ).values( newMember );
  return { success: true, message: 'Member created successfully' };
};


export const getMembersByOrg = async ( orgId: string ) =>
{
  const membersList = await db.select().from( orgMembers ).where( eq( orgMembers.orgId, orgId ) );
  return membersList;
};

export const updateMember = async ( memberId: string, data: FormData ) =>
{
  const updatedMember = {
    name: data.get( 'name' ) as string,
    role: data.get( 'role' ) as string,
    department: data.get( 'department' ) as string,
    phoneNumber: data.get( 'phoneNumber' ) as string,
    profileImageUrl: data.get( 'profileImageUrl' ) as string,
    updatedAt: new Date(),
  };

  await db.update( orgMembers )
    .set( updatedMember )
    .where( eq( orgMembers.id, memberId ) );
  return { success: true, message: 'Member updated successfully' };
};

// Invite a member to an organization
export const inviteMember = async ( email: string, orgId: string ) =>
{
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

  try
  {
    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if ( authError || !user )
    {
      console.error( 'Authentication error:', authError );
      return { success: false, message: 'User not authenticated' };
    }

    const userId = user.id;

    // Check if the user is an admin of the specified organization

    const [ profile ] = await db
      .select()
      .from( userProfiles )
      .where(
        and(
          eq( userProfiles.userId, userId ),
          eq( userProfiles.orgId, orgId )
        )
      )
      .limit( 1 );

    if ( !profile || profile.role !== 'admin' )
    {
      return {
        success: false,
        message: 'Only admins can invite members to this organization.',
      };
    }

    // Proceed to invite the member
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail( email );

    if ( error )
    {
      console.error( 'Error inviting member:', error );
      return { success: false, message: error.message };
    }

    // Prepare the joined date
    const joinedDate = new Date().toISOString().split( 'T' )[ 0 ]; // Format as 'YYYY-MM-DD'

    // Insert the new member into orgMembers
    await db.insert( orgMembers ).values( {
      orgId,
      name: '',            // Use an empty string or actual name if known
      email,
      role: 'member',
      isActive: false,
      joinedDate,
      // Include other fields as necessary, providing default values if needed
    } );

    return { success: true, message: 'Invitation sent successfully!' };
  } catch ( error: any )
  {
    console.error( 'Error during invite:', error.message );
    return { success: false, message: 'Failed to send invitation' };
  }
};


export const deleteMember = async ( memberId: string ) =>
{
  try
  {
    // Attempt to deactivate the member by setting isActive to false and updating departedAt
    await db.update( orgMembers )
      .set( { isActive: false, departedAt: new Date() } )
      .where( eq( orgMembers.id, memberId ) );

    // Return success response
    return { success: true, message: 'Member deactivated successfully' };
  } catch ( error )
  {
    // Cast the error to the Error type
    console.error( 'Failed to deactivate member:', error as Error );

    // Return error response with a generic message or pass the error message
    return { success: false, message: 'Failed to deactivate member', error: ( error as Error ).message };
  }
};
