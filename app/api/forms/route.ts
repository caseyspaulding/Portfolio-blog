// app/api/forms/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/db';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';
import { forms, formFields } from '@/db/schemas/schema';

// POST handler to handle multiple form-related actions
export async function POST ( request: Request )
{
  const requestData = await request.json();
  const { action, ...data } = requestData;

  const originHeader = headers();
  const origin = ( await originHeader ).get( 'origin' ) || 'http://localhost:3000';

  switch ( action )
  {
    case 'saveFormHeaderMedia':
      return await saveFormHeaderMedia( data );

    case 'saveForm':
      return await saveForm( data );

    case 'getActiveForms':
      return await getActiveForms( data.orgId );

    case 'archiveForm':
      return await archiveForm( data.formId, data.orgId );

    default:
      return NextResponse.json( { success: false, message: 'Invalid action' }, { status: 400 } );
  }
}

// Save form header media URL in the database
async function saveFormHeaderMedia ( { formId, headerMediaUrl }: { formId: string; headerMediaUrl: string } )
{
  if ( !formId || !headerMediaUrl )
  {
    return NextResponse.json( { success: false, message: 'Form ID and header media URL are required' }, { status: 400 } );
  }

  try
  {
    const [ updatedForm ] = await db
      .update( forms )
      .set( { headerMediaUrl } )
      .where( eq( forms.id, formId ) )
      .returning();

    return NextResponse.json( { success: true, form: updatedForm } );
  } catch ( error )
  {
    console.error( 'Error saving header media URL:', error );
    return NextResponse.json( { success: false, message: 'Error saving media URL' }, { status: 500 } );
  }
}

// Save or update a form along with its fields in the database
async function saveForm ( data: { orgId: any; formId: any; name: any; description: any; fields: any; creator_id: any; headerMediaUrl: any; headerMediaType: any; } )
{
  const { orgId, formId, name, description, fields, creator_id, headerMediaUrl, headerMediaType } = data;

  if ( !orgId || !formId || !name || !creator_id )
  {
    return NextResponse.json( { success: false, message: 'Missing required fields' }, { status: 400 } );
  }

  try
  {
    await db.transaction( async ( tx ) =>
    {
      await tx.insert( forms ).values( {
        id: formId,
        orgId,
        creator_id,
        formName: name,
        description,
        status: 'active',
        headerMediaUrl,
        headerMediaType,
      } ).onConflictDoUpdate( {
        target: forms.id,
        set: { formName: name, description, headerMediaUrl, headerMediaType },
      } );

      for ( const field of fields )
      {
        await tx.insert( formFields ).values( {
          id: field.id,
          formId,
          fieldName: field.label,
          fieldType: field.type,
          placeholder: field.placeholder,
          options: field.options ? JSON.stringify( field.options ) : null,
          isRequired: field.required,
          order: field.order,
        } ).onConflictDoUpdate( {
          target: formFields.id,
          set: { fieldName: field.label, fieldType: field.type },
        } );
      }
    } );
    return NextResponse.json( { success: true, message: 'Form saved successfully' } );
  } catch ( error )
  {
    console.error( 'Error saving form:', error );
    return NextResponse.json( { success: false, message: 'Error saving form' }, { status: 500 } );
  }
}

// Retrieve active forms
async function getActiveForms ( orgId: string )
{
  if ( !orgId )
  {
    return NextResponse.json( { success: false, message: 'Organization ID is required' }, { status: 400 } );
  }

  const supabase = await createClient();

  try
  {
    const { data: activeForms, error } = await supabase
      .from( 'forms' )
      .select( '*' )
      .eq( 'org_id', orgId )
      .eq( 'is_archived', false )
      .eq( 'is_deleted', false )
      .eq( 'is_draft', false );

    if ( error ) throw error;

    return NextResponse.json( { success: true, forms: activeForms } );
  } catch ( error )
  {
    console.error( 'Error fetching active forms:', error );
    return NextResponse.json( { success: false, message: 'Error fetching active forms' }, { status: 500 } );
  }
}

// Archive a form
async function archiveForm ( formId: string, orgId: string )
{
  if ( !formId || !orgId )
  {
    return NextResponse.json( { success: false, message: 'Form ID and Organization ID are required' }, { status: 400 } );
  }

  try
  {
    const [ archivedForm ] = await db
      .update( forms )
      .set( { isArchived: true } )
      .where( eq( forms.id, formId ) )
      .returning();

    return NextResponse.json( { success: true, form: archivedForm } );
  } catch ( error )
  {
    console.error( 'Error archiving form:', error );
    return NextResponse.json( { success: false, message: 'Error archiving form' }, { status: 500 } );
  }
}
