import { FieldType } from '@/types/formTypes';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const loadForm = async ( formId: string ) =>
{
  try
  {
    // Fetch form data from the 'forms' table, including the new fields
    const { data: formData, error: formError } = await supabase
      .from( 'forms' )
      .select( 'id, form_name, description, status, is_archived, is_deleted, is_draft, header_media_url, header_media_type, created_at, updated_at' ) // Select the new columns here
      .eq( 'id', formId )
      .single();

    if ( formError )
    {
      throw new Error( `Error loading form: ${ formError.message }` );
    }

    // Fetch fields data from the 'form_fields' table
    const { data: fieldsData, error: fieldsError } = await supabase
      .from( 'form_fields' )
      .select( '*' )
      .eq( 'form_id', formId )
      .order( 'order', { ascending: true } );

    if ( fieldsError )
    {
      throw new Error( `Error loading form fields: ${ fieldsError.message }` );
    }

    // Map the fields to match the schema in your front end
    const parsedFieldsData = fieldsData.map( ( field: any ) => ( {
      id: field.id,
      type: field.field_type as FieldType, // Assuming FieldType is your custom type
      label: field.field_name, // Ensure naming consistency
      placeholder: field.placeholder,
      required: field.is_required, // Ensure naming consistency
      options: Array.isArray( field.options ) ? field.options : [], // Ensure options is an array
      order: field.order,
    } ) );

    // Return the complete form object, including the newly added fields
    return {
      id: formData.id,
      name: formData.form_name,
      description: formData.description,
      status: formData.status,
      isArchived: formData.is_archived,
      isDeleted: formData.is_deleted,
      isDraft: formData.is_draft,
      headerMediaUrl: formData.header_media_url, // New field for header image URL
      headerMediaType: formData.header_media_type, // New field for header media type
      createdAt: formData.created_at,
      updatedAt: formData.updated_at,
      fields: parsedFieldsData,
    };
  } catch ( error )
  {
    console.error( error );
    throw error;
  }
};