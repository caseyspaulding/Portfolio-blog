'use server';

import { db } from '@/db';
import { signupSheets, signupSheetGroups, participants, signupSheetSlots } from '@/db/schemas/schema';
import { createClient } from '@/utils/supabase/server';
import { eq, InferInsertModel, sql } from 'drizzle-orm';

const supabase = createClient();

export const getSignUps = async ( orgId: string ) =>
{
  try
  {
    // Create a subquery that counts participants per signup sheet
    const participantCounts = db
      .select( {
        signupSheetId: participants.signupSheetId,
        participantCount: sql<number>`COUNT(*)`,
      } )
      .from( participants )
      .groupBy( participants.signupSheetId )
      .as( 'participantCounts' );

    // Main query that selects signup sheets and joins with participant counts
    const signUps = await db
      .select( {
        id: signupSheets.id,
        title: signupSheets.title,
        description: signupSheets.description,
        startDate: signupSheets.startDate,
        endDate: signupSheets.endDate,
        attachmentUrls: signupSheets.attachmentUrls,
        isPublished: signupSheets.isPublished,
        isArchived: signupSheets.isArchived,
        groupId: signupSheets.groupId,
        groupName: signupSheetGroups.name,
        participantCount: participantCounts.participantCount,
      } )
      .from( signupSheets )
      .leftJoin( signupSheetGroups, eq( signupSheets.groupId, signupSheetGroups.id ) )
      .leftJoin( participantCounts, eq( participantCounts.signupSheetId, signupSheets.id ) )
      .where( eq( signupSheets.orgId, orgId ) )
      .execute();

    return signUps.map( ( signUp ) => ( {
      id: signUp.id,
      title: signUp.title,
      description: signUp.description,
      imageUrl: Array.isArray( signUp.attachmentUrls ) ? signUp.attachmentUrls[ 0 ] : undefined,
      startDate: signUp.startDate,
      endDate: signUp.endDate,
      status: signUp.isPublished ? 'Published' : 'Draft',
      isArchived: signUp.isArchived,
      groupId: signUp.groupId,
      groupName: signUp.groupName,
      participantCount: signUp.participantCount ?? 0, // Default to 0 if undefined
    } ) );
  } catch ( error )
  {
    console.error( 'Error fetching sign-ups:', error );
    throw new Error( 'Failed to fetch sign-ups' );
  }
};

export const createSignupSheet = async (
  data: InferInsertModel<typeof signupSheets>
) =>
{
  try
  {
    const result = await db
      .insert( signupSheets )
      .values( data )
      .returning();

    return result[ 0 ];
  } catch ( error )
  {
    console.error( 'Error creating signup sheet:', error );
    throw new Error( 'Failed to create signup sheet' );
  }
};

export const getSignupSheetById = async ( id: string ) =>
{
  try
  {
    const result = await db
      .select()
      .from( signupSheets )
      .where( eq( signupSheets.id, id ) );

    return result[ 0 ];
  } catch ( error )
  {
    console.error( 'Error fetching signup sheet:', error );
    throw new Error( 'Failed to fetch signup sheet' );
  }
};

export const getSignupSheets = async ( orgId?: string ) =>
{
  try
  {
    const query = db
      .select()
      .from( signupSheets )
      .where( orgId ? eq( signupSheets.orgId, orgId ) : sql`true` );

    const result = await query;
    return result;
  } catch ( error )
  {
    console.error( 'Error fetching signup sheets:', error );
    throw new Error( 'Failed to fetch signup sheets' );
  }
};

export const updateSignupSheet = async (
  id: string,
  data: Partial<{
    groupId?: string;
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    attachmentUrls?: string[];
    eventId?: string;
    isPublished?: boolean;
    isArchived?: boolean;
    slug?: string;
  }>
) =>
{
  try
  {
    const result = await db
      .update( signupSheets )
      .set( {
        ...data,
        startDate: data.startDate ? data.startDate.toISOString() : undefined,
        endDate: data.endDate ? data.endDate.toISOString() : undefined,
      } )
      .where( eq( signupSheets.id, id ) )
      .returning();

    return result[ 0 ];
  } catch ( error )
  {
    console.error( 'Error updating signup sheet:', error );
    throw new Error( 'Failed to update signup sheet' );
  }
};

export const deleteSignupSheet = async ( id: string ) =>
{
  try
  {
    const result = await db
      .delete( signupSheets )
      .where( eq( signupSheets.id, id ) )
      .returning();

    return result[ 0 ];
  } catch ( error )
  {
    console.error( 'Error deleting signup sheet:', error );
    throw new Error( 'Failed to delete signup sheet' );
  }
};

export const createSignupSheetGroup = async ( data: {
  orgId: string;
  name: string;
  description?: string;
  settings?: any; // Assuming settings is JSON
} ) =>
{
  try
  {
    const result = await db
      .insert( signupSheetGroups )
      .values( {
        orgId: data.orgId,
        name: data.name,
        description: data.description,
        settings: data.settings,
      } )
      .returning();

    return result[ 0 ];
  } catch ( error )
  {
    console.error( 'Error creating signup sheet group:', error );
    throw new Error( 'Failed to create signup sheet group' );
  }
};

export const getSignupSheetGroupById = async ( id: string ) =>
{
  try
  {
    const result = await db
      .select()
      .from( signupSheetGroups )
      .where( eq( signupSheetGroups.id, id ) );

    return result[ 0 ];
  } catch ( error )
  {
    console.error( 'Error fetching signup sheet group:', error );
    throw new Error( 'Failed to fetch signup sheet group' );
  }
};

export const getSignupSheetGroups = async ( orgId?: string ) =>
{
  try
  {
    const query = db
      .select()
      .from( signupSheetGroups )
      .where( orgId ? eq( signupSheetGroups.orgId, orgId ) : sql`true` );

    const result = await query.execute();
    return result;
  } catch ( error )
  {
    console.error( 'Error fetching signup sheet groups:', error );
    throw new Error( 'Failed to fetch signup sheet groups' );
  }
};

export const updateSignupSheetGroup = async (
  id: string,
  data: Partial<{
    name?: string;
    description?: string;
    settings?: any;
  }>
) =>
{
  try
  {
    const result = await db
      .update( signupSheetGroups )
      .set( {
        ...data,
        // Removed price property as it does not exist in the type definition
      } )
      .where( eq( signupSheetGroups.id, id ) )
      .returning();

    return result[ 0 ];
  } catch ( error )
  {
    console.error( 'Error updating signup sheet group:', error );
    throw new Error( 'Failed to update signup sheet group' );
  }
};

export const deleteSignupSheetGroup = async ( id: string ) =>
{
  try
  {
    const result = await db
      .delete( signupSheetGroups )
      .where( eq( signupSheetGroups.id, id ) )
      .returning();

    return result[ 0 ];
  } catch ( error )
  {
    console.error( 'Error deleting signup sheet group:', error );
    throw new Error( 'Failed to delete signup sheet group' );
  }
};

export const createSignupSheetSlot = async (
  data: InferInsertModel<typeof signupSheetSlots>
) =>
{
  try
  {
    const result = await db
      .insert( signupSheetSlots )
      .values( data )
      .returning();

    return result[ 0 ];
  } catch ( error )
  {
    console.error( 'Error creating signup sheet slot:', error );
    throw new Error( 'Failed to create signup sheet slot' );
  }
};

export const getSignupSheetSlotById = async ( id: string ) =>
{
  try
  {
    const result = await db
      .select()
      .from( signupSheetSlots )
      .where( eq( signupSheetSlots.id, id ) );

    return result[ 0 ];
  } catch ( error )
  {
    console.error( 'Error fetching signup sheet slot:', error );
    throw new Error( 'Failed to fetch signup sheet slot' );
  }
};

export const getSignupSheetSlots = async ( signupSheetId: string ) =>
{
  try
  {
    const result = await db
      .select()
      .from( signupSheetSlots )
      .where( eq( signupSheetSlots.signupSheetId, signupSheetId ) );

    return result;
  } catch ( error )
  {
    console.error( 'Error fetching signup sheet slots:', error );
    throw new Error( 'Failed to fetch signup sheet slots' );
  }
};

export const updateSignupSheetSlot = async (
  id: string,
  data: Partial<{
    groupId?: string;
    title?: string;
    description?: string;
    startTimestamp?: Date;
    endTimestamp?: Date;
    quantity?: number;
    filledQuantity?: number;
    hideNumberWanted?: boolean;
    collectMoney?: boolean;
    price?: number;
    currency?: string;
    waitlistCapacity?: number;
  }>
) =>
{
  try
  {
    const result = await db
      .update( signupSheetSlots )
      .set( {
        ...data,
        price: data.price !== undefined ? data.price.toString() : undefined,
      } )
      .where( eq( signupSheetSlots.id, id ) )
      .returning();

    return result[ 0 ];
  } catch ( error )
  {
    console.error( 'Error updating signup sheet slot:', error );
    throw new Error( 'Failed to update signup sheet slot' );
  }
};

export const deleteSignupSheetSlot = async ( id: string ) =>
{
  try
  {
    const result = await db
      .delete( signupSheetSlots )
      .where( eq( signupSheetSlots.id, id ) )
      .returning();

    return result[ 0 ];
  } catch ( error )
  {
    console.error( 'Error deleting signup sheet slot:', error );
    throw new Error( 'Failed to delete signup sheet slot' );
  }
};

export const getSignupSheetSlotsGroupedByDate = async ( signupSheetId: string ) =>
{
  try
  {
    // Select slots, grouped by date and time ranges
    const slots = await db
      .select( {
        date: sql`DATE(${ signupSheetSlots.startTimestamp })`,  // Extract the date part
        timeRange: sql`${ signupSheetSlots.startTimestamp } || ' - ' || ${ signupSheetSlots.endTimestamp }`,  // Time range
        title: signupSheetSlots.title,
        description: signupSheetSlots.description,
        filledQuantity: signupSheetSlots.filledQuantity,
        totalQuantity: signupSheetSlots.quantity,
      } )
      .from( signupSheetSlots )
      .where( eq( signupSheetSlots.signupSheetId, signupSheetId ) )
      .orderBy( signupSheetSlots.startTimestamp );

    return slots;  // Return grouped slots
  } catch ( error )
  {
    console.error( "Error fetching signup sheet slots by date:", error );
    throw new Error( "Failed to fetch slots grouped by date" );
  }
};