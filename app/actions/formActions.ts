// app/actions/saveForm.ts
'use server';

import { db } from "@/db";
import { formFields, formResponses, forms } from "@/db/schemas/schema";
import { createClient } from "@/utils/supabase/server";
import { eq } from "drizzle-orm";


const supabase = await createClient();


interface FormFieldInput
{
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  order: number;
}

interface SaveFormInput
{
  orgId: string;
  formId: string;
  name: string;
  description: string;
  fields: FormFieldInput[];
  isArchived?: boolean;
  isDeleted?: boolean;
  headerMediaUrl: string | null;
  headerMediaType: string,
  isDraft?: boolean;  // Add draft flag
  creator_id: string; // Add creator_id
}



export async function saveFormHeaderMedia ( formId: string, headerMediaUrl: string )
{
  try
  {
    // Update the form record with the header media URL
    await db.update( forms )
      .set( {
        headerMediaUrl: headerMediaUrl, // Set the uploaded media URL
      } )
      .where( eq( forms.id, formId ) ); // Specify the form by ID

    return { success: true };
  } catch ( error )
  {
    console.error( "Error saving media URL to database:", error );
    return { success: false, error };
  }
}

export async function saveFormAction ( input: SaveFormInput )
{
  const {
    orgId,
    formId,
    name,
    description,
    fields,
    isArchived,
    isDeleted,
    isDraft,
    headerMediaUrl,
    headerMediaType,
    creator_id, // This is now userProfile.id
  } = input;

  // Use a transaction to save both the form and the fields
  await db.transaction( async ( tx ) =>
  {
    // Upsert the form metadata (headerMediaUrl and other details)
    await tx
      .insert( forms )
      .values( {
        id: formId,
        orgId: orgId,
        creator_id: creator_id, // Use the passed-in creator_id
        formName: name,
        description: description,
        status: 'active',
        headerMediaUrl: input.headerMediaUrl,
        headerMediaType: input.headerMediaType,
        isArchived: isArchived || false,
        isDeleted: isDeleted || false,
        isDraft: isDraft || true, // Default to true (draft mode)
      } )
      .onConflictDoUpdate( {
        target: forms.id,
        set: {
          formName: name,
          description: description,
          updatedAt: new Date(),
          headerMediaUrl: input.headerMediaUrl,
          headerMediaType: input.headerMediaType,
          isArchived: isArchived || false,
          isDeleted: isDeleted || false,
          isDraft: isDraft || true, // Update the draft status
        },
      } );

    // Upsert the form fields
    for ( const field of fields )
    {
      await tx
        .insert( formFields )
        .values( {
          id: field.id,
          formId: formId,
          fieldName: field.label,
          fieldType: field.type,
          placeholder: field.placeholder,
          options: field.options ? JSON.stringify( field.options ) : null,
          isRequired: field.required,
          order: field.order,
        } )
        .onConflictDoUpdate( {
          target: formFields.id,
          set: {
            fieldName: field.label,
            fieldType: field.type,
            placeholder: field.placeholder,
            options: field.options ? JSON.stringify( field.options ) : null,
            isRequired: field.required,
            order: field.order,
          },
        } );
    }
  } );

  console.log( 'Form and fields saved successfully' );
}


export async function getActiveForms ( orgId: string )
{
  

  try
  {
    const { data: activeForms, error } = await supabase
      .from( 'forms' )
      .select( '*' )
      .eq( 'org_id', orgId )
      .eq( 'is_archived', false )
      .eq( 'is_deleted', false )
      .eq( 'is_draft', false ); // Fetch only active forms

    if ( error )
    {
      throw new Error( 'Error fetching active forms' );
    }

    return activeForms;
  } catch ( error )
  {
    console.error( 'Error in getActiveForms:', error );
    return [];
  }
}

export async function getDraftForms ( orgId: string )
{
  

  try
  {
    const { data: draftForms, error } = await supabase
      .from( 'forms' )
      .select( '*' )
      .eq( 'org_id', orgId )
      .eq( 'is_draft', true ); // Fetch only draft forms

    if ( error )
    {
      throw new Error( 'Error fetching draft forms' );
    }

    return draftForms;
  } catch ( error )
  {
    console.error( 'Error in getDraftForms:', error );
    return [];
  }
}

export async function getArchivedForms ( orgId: string )
{
 

  try
  {
    const { data: archivedForms, error } = await supabase
      .from( 'forms' )
      .select( '*' )
      .eq( 'org_id', orgId )
      .eq( 'is_archived', true )
      .eq( 'is_deleted', false )
      .eq( 'is_draft', false ); // Fetch archived forms

    if ( error )
    {
      throw new Error( 'Error fetching archived forms' );
    }

    return archivedForms;
  } catch ( error )
  {
    console.error( 'Error in getArchivedForms:', error );
    return [];
  }
}

export async function getOrganizationById ( orgId: string ): Promise<string | null>
{
  const { data, error } = await supabase
    .from( 'organizations' )
    .select( 'name' )
    .eq( 'id', orgId )
    .single();

  if ( error )
  {
    console.error( 'Error fetching organization:', error.message );
    return null;
  }

  return data?.name || null;
}

export async function submitForm ( formData: FormData, formId: string, orgId: string )
{
  
  const responses: { [ key: string ]: any } = {};

  for ( const [ key, value ] of formData.entries() )
  {
    if ( value instanceof File )
    {
      // Generate a unique filename using current datetime and a random number
      const timestamp = Date.now(); // Current timestamp in milliseconds
      const randomNumber = Math.floor( Math.random() * 1000000 ); // Random number between 0 and 999999
      const uniqueFileName = `${ timestamp }_${ randomNumber }_${ value.name }`;

      // Handle file upload
      const { data: fileData, error: fileError } = await supabase.storage
        .from( "formImages" )
        .upload( `uploads/${ uniqueFileName }`, value );

      if ( fileError )
      {
        console.error( "Error uploading file:", fileError );
        throw new Error( "Failed to upload file" );
      }

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from( "formImages" )
        .getPublicUrl( fileData.path );

      responses[ key ] = publicUrlData.publicUrl; // Save the public URL
    } else
    {
      responses[ key ] = value;
    }
  }

  // Insert into `form_responses` table
  const { data: responseData, error: responseError } = await supabase
    .from( "form_responses" )
    .insert( {
      form_id: formId,
      org_id: orgId,
      response_data: responses,
    } )
    .select()
    .single();

  if ( responseError )
  {
    console.error( "Error saving form response:", responseError );
    throw new Error( "Failed to save form response" );
  }
}


export async function publishForm ( formId: string, orgId: string )
{
  

  try
  {
    const { error: publishError } = await supabase
      .from( 'forms' )
      .update( { is_draft: false } ) // Mark as no longer a draft
      .eq( 'id', formId )
      .eq( 'org_id', orgId );

    if ( publishError )
    {
      throw new Error( 'Failed to publish form' );
    }

    return { success: true };
  } catch ( error )
  {
    console.error( 'Error publishing form:', error );
    throw new Error( 'Failed to publish form' );
  }
}

export async function getForms ( organizationId: string )
{
  if ( !organizationId ) throw new Error( 'Organization ID is required' );

  try
  {
    const { data: formsData, error: formsError } = await supabase
      .from( 'forms' )
      .select( '*' )
      .eq( 'org_id', organizationId );

    if ( formsError ) throw new Error( 'Failed to fetch forms' );

    return formsData;
  } catch ( error )
  {
    console.error( 'Error fetching forms:', error );
    throw new Error( 'Failed to fetch forms' );
  }
}




export async function deleteForm ( formId: string, orgId: string )
{
 

  try
  {
    // Soft-delete the form by setting the isDeleted flag to true
    const { error: formError } = await supabase
      .from( 'forms' )
      .update( { is_deleted: true } ) // Mark as deleted
      .eq( 'id', formId )
      .eq( 'org_id', orgId ); // Ensure the form belongs to the org

    if ( formError )
    {
      throw new Error( 'Failed to soft-delete form' );
    }

    return { success: true };
  } catch ( error )
  {
    console.error( 'Error deleting form:', error );
    throw new Error( 'Failed to delete form' );
  }
}

export async function archiveForm ( formId: string, orgId: string )
{
 

  try
  {
    // Mark the form as archived
    const { error: archiveError } = await supabase
      .from( 'forms' )
      .update( { is_archived: true, status: 'archived' } ) // Mark as archived
      .eq( 'id', formId )
      .eq( 'org_id', orgId );

    if ( archiveError )
    {
      throw new Error( 'Failed to archive form' );
    }

    return { success: true };
  } catch ( error )
  {
    console.error( 'Error archiving form:', error );
    throw new Error( 'Failed to archive form' );
  }
}

export async function getFormResponses ( formId: string )
{
  return await db
    .select( {
      responseId: formResponses.id,
      responseData: formResponses.responseData,
      submittedAt: formResponses.submittedAt,
    } )
    .from( formResponses )
    .where( eq( formResponses.formId, formId ) );
}

export async function getFormFields ( formId: string )
{
  return await db
    .select( {
      fieldId: formFields.id,
      fieldName: formFields.fieldName,
    } )
    .from( formFields )
    .where( eq( formFields.formId, formId ) );
}
