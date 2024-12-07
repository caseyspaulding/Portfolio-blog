'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { createClient } from '@utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { submitForm, getOrganizationById } from '@/app/actions/formActions';

// Define the type for async params
type Params = Promise<{ orgId: string; formId: string }>;

interface FormField
{
  id: string;
  fieldType: string;
  fieldName: string;
  placeholder?: string;
  isRequired: boolean;
  options?: string[];
  order: number;
}

interface Form
{
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  headerMediaUrl?: string;
  backgroundType?: string;
  backgroundValue?: string;
}

const supabase = createClient();

async function getForm ( formId: string ): Promise<Form | null>
{
  const { data: formData } = await supabase
    .from( 'forms' )
    .select( '*' )
    .eq( 'id', formId )
    .single();

  if ( !formData ) return null;

  const { data: fieldsData } = await supabase
    .from( 'form_fields' )
    .select( '*' )
    .eq( 'form_id', formId )
    .order( 'order', { ascending: true } );

  const parsedFieldsData = fieldsData?.map( ( field ) => ( {
    id: String( field.id ),
    fieldType: field.field_type,
    fieldName: field.field_name,
    placeholder: field.placeholder ?? undefined,
    isRequired: field.is_required ?? false,
    options: typeof field.options === 'string' ? JSON.parse( field.options ) : null,
    order: field.order,
  } ) ) ?? [];

  return {
    id: formData.id,
    name: formData.form_name,
    description: formData.description ?? '',
    headerMediaUrl: formData.header_media_url ?? undefined,
    backgroundType: ( formData as any ).background_type as string | undefined,
    fields: parsedFieldsData,
  };
}

export default async function SharedForm ( { params }: { params: Params } )
{
  const { orgId, formId } = await params; // Awaiting the params promise
  const [ form, setForm ] = useState<Form | null>( null );
  const [ orgName, setOrgName ] = useState<string | null>( null );
  const { toast } = require( '@/hooks/use-toast' ).useToast();
  const [ isPending, startTransition ] = useTransition();
  const { register, handleSubmit, reset } = useForm();

  useEffect( () =>
  {
    // Now that we have orgId and formId after awaiting params,
    // we can directly use them in useEffect to fetch data.

    async function fetchData ()
    {
      const loadedForm = await getForm( formId );
      const loadedOrgName = await getOrganizationById( orgId );
      setForm( loadedForm );
      setOrgName( loadedOrgName );
    }

    fetchData();
  }, [ orgId, formId ] );

  if ( !form )
  {
    return <div className="text-center py-10">Loading...</div>;
  }

  const onSubmit = async ( data: any ) =>
  {
    // Convert checkbox groups to arrays
    const formattedData = { ...data };
    form.fields.forEach( ( field ) =>
    {
      if ( field.fieldType === 'checkbox' && field.options )
      {
        const value = data[ field.id ];
        formattedData[ field.id ] = Array.isArray( value ) ? value : value ? [ value ] : [];
      }
    } );

    // Create a FormData object from formattedData
    const formData = new FormData();
    Object.keys( formattedData ).forEach( ( key ) =>
    {
      const value = formattedData[ key ];
      if ( Array.isArray( value ) )
      {
        value.forEach( ( v ) => formData.append( key, v ) );
      } else
      {
        formData.append( key, value );
      }
    } );

    startTransition( () =>
    {
      ( async () =>
      {
        await submitForm( formData, form.id, orgId );
        reset();
        toast( {
          title: 'Form Submitted',
          description: 'Your form has been successfully submitted!',
        } );
      } )();
    } );
  };

  // ... rest of the component (background style, renderField, JSX) remains the same
}
