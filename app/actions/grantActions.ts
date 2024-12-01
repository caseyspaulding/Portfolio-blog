'use server';

import { db } from "@/db";
import { grants } from "@/db/schemas/schema";
import { createClient } from "@/utils/supabase/server";

import { eq } from 'drizzle-orm'; // Import the eq operator


export const createGrant = async ( formData: FormData ) =>
{
  const orgId = formData.get( 'orgId' )?.toString() || '';
  const grantName = formData.get( 'grantName' )?.toString() || '';
  const applicantOrganization = formData.get( 'applicantOrganization' )?.toString() || '';
  const applicationDate = formData.get( 'applicationDate' )?.toString() || '';
  const amountRequested = formData.get( 'amountRequested' ) ? parseFloat( formData.get( 'amountRequested' )?.toString() || '0' ).toFixed( 2 ) : null; // Convert to string for Drizzle
  const deadline = formData.get( 'deadline' )?.toString() || '';
  const deliverables = formData.get( 'deliverables' )?.toString() || '';

  if ( !orgId || !grantName || !applicantOrganization )
  {
    throw new Error( 'Required fields are missing.' );
  }

  // Create a new grant object similar to the event example
  const newGrant = {
    orgId,
    grantName,
    applicantOrganization,
    applicationDate: new Date( applicationDate ), // Ensure proper date format
    amountRequested, // Already converted to string
    deadline: new Date( deadline ), // Ensure proper date format
    deliverables,
    status: 'submitted', // Default status
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try
  {
    // Insert the new grant into the database and return the inserted ID
    const [ insertedGrant ] = await db.insert( grants ).values( newGrant ).returning( { id: grants.id } );

    return { success: true, message: 'Grant created successfully', grantId: insertedGrant.id };
  } catch ( error )
  {
    console.error( 'Error inserting grant:', error );
    return { success: false, message: 'Error inserting grant into database' };
  }
};

export const getGrantsByOrg = async ( orgId: string ) =>
{
  const grantsList = await db
    .select()
    .from( grants )
    .where( eq( grants.orgId, orgId ) ); // Use eq from Drizzle's query helpers
  return grantsList;
};

// Utility function to get user and organization ID (reuse your existing code)
export const getUserAndOrgId = async () =>
{
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if ( userError || !user )
  {
    throw new Error( 'Not authenticated' );
  }

  const { data: profile, error: profileError } = await supabase
    .from( 'user_profiles' )
    .select( 'org_id' )
    .eq( 'user_id', user.id )
    .single();

  if ( profileError || !profile )
  {
    throw new Error( 'No organization found' );
  }

  return { user, orgId: profile.org_id };
};

// Fetch grants for the current organization
export const fetchGrantsForOrg = async () =>
{
  const { orgId } = await getUserAndOrgId(); // Retrieve orgId

  // Fetch grants for the organization from the database
  const grantsData = await db.select().from( grants ).where( eq( grants.orgId, orgId ) );

  return grantsData; // Return the fetched grants
};
// app/grants/actions.ts
export const updateGrant = async ( data: FormData ) =>
{
  const grantId = data.get( 'grantId' )?.toString() || '';
  const status = data.get( 'status' )?.toString() || '';
  const amountApproved = data.get( 'amountApproved' ) ? parseFloat( data.get( 'amountApproved' )?.toString() || '0' ).toFixed( 2 ) : null; // Convert to string for Drizzle
  const deliverables = data.get( 'deliverables' )?.toString() || '';
  const notes = data.get( 'notes' )?.toString() || '';

  if ( !grantId )
  {
    throw new Error( 'Grant ID is required.' );
  }

  await db.update( grants )
    .set( {
      status,
      amountApproved, // Now as a string matching the expected type
      deliverables,
      notes,
      updatedAt: new Date(),
    } )
    .where( eq( grants.id, grantId ) ); // Use eq for ID comparison
};



export const deleteGrant = async ( grantId: string ) =>
{
  try
  {
    await db.delete( grants ).where( eq( grants.id, grantId ) );
    return { success: true }; // Return success status
  } catch ( error )
  {
    console.error( 'Error deleting grant:', error );
    return { success: false, error: 'Failed to delete grant' }; // Return error status
  }
};