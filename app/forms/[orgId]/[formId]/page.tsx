'use client';

import React, { useEffect, useState, useTransition, use } from 'react';
import { createClient } from '@utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { submitForm } from '@/app/actions/formActions';
import { useToast } from "@/hooks/use-toast";
import { getOrganizationById } from '@/app/actions/formActions';

const supabase = createClient();

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

async function getForm ( formId: string ): Promise<Form | null>
{
  const { data: formData, error: formError } = await supabase
    .from( 'forms' )
    .select( '*' )
    .eq( 'id', formId )
    .single();

  if ( formError )
  {
    console.error( 'Error loading form:', formError );
    return null;
  }

  const { data: fieldsData, error: fieldsError } = await supabase
    .from( 'form_fields' )
    .select( '*' )
    .eq( 'form_id', formId )
    .order( 'order', { ascending: true } );

  if ( fieldsError )
  {
    console.error( 'Error loading form fields:', fieldsError );
    return null;
  }

  const parsedFieldsData = fieldsData?.map( ( field ) => ( {
    id: String(field.id),
    fieldType: field.field_type,
    fieldName: field.field_name,
    placeholder: field.placeholder ?? undefined,
    isRequired: field.is_required ?? false,
    options: typeof field.options === 'string' ? JSON.parse(field.options) : null,
    order: field.order,
  } ) );

  return {
    id: formData.id,
    name: formData.form_name,
    description: formData.description ?? '',
    headerMediaUrl: formData.header_media_url ?? undefined,
    backgroundType: (formData as any).background_type as string | undefined,
    fields: parsedFieldsData ?? [],
  };
}

export default function SharedForm(props: { params: Promise<{ orgId: string; formId: string }> }) {
  const params = use(props.params);
  const { toast } = useToast();
  const [ form, setForm ] = useState<Form | null>( null );
  const [ isPending, startTransition ] = useTransition();
  const { register, handleSubmit, reset } = useForm();
  const [ orgName, setOrgName ] = useState<string | null>( null );

  useEffect( () =>
  {
    async function fetchData ()
    {
      const { orgId, formId } = await params; // Await params here
      if ( formId && orgId )
      {
        getForm( formId ).then( setForm );
        getOrganizationById( orgId ).then( setOrgName );
      }
    }
    fetchData();
  }, [ params ] );

  if ( !form )
  {
    return <div className="text-center py-10">Loading...</div>;
  }

  const onSubmit = async ( data: any, orgId: string ) =>
  {
    // Convert checkbox groups to arrays
    const formattedData = { ...data };
    form.fields.forEach( ( field ) =>
    {
      if ( field.fieldType === 'checkbox' && field.options )
      {
        // Ensure the data is an array
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

  // Determine the background style for the form
  const backgroundStyle =
    form.backgroundType === 'image'
      ? { backgroundImage: `url(${ form.backgroundValue })`, backgroundSize: 'cover', backgroundPosition: 'center' }
      : form.backgroundType === 'color'
        ? { backgroundColor: form.backgroundValue }
        : { backgroundImage: 'linear-gradient(to top, #e7e5e4 0%, #fafaf9 100%)' }; // default gradient

  const renderField = ( field: FormField ) =>
  {
    switch ( field.fieldType )
    {
      case 'textarea':
        return (
          <Textarea
            id={ field.id }
            placeholder={ field.placeholder }
            required={ field.isRequired }
            { ...register( field.id ) }
            className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case 'select':
        return (
          <select
            id={ field.id }
            required={ field.isRequired }
            { ...register( field.id ) }
            className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an option</option>
            { field.options?.map( ( option: string, index: number ) => (
              <option key={ index } value={ option }>
                { option }
              </option>
            ) ) }
          </select>
        );
      case 'radio':
        return (
          <div className="space-y-2"> {/* Add vertical spacing here */ }
            { field.options?.map( ( option: string, index: number ) => (
              <div key={ index } className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={ `${ field.id }-${ index }` }
                  value={ option }
                  { ...register( field.id ) }
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <Label htmlFor={ `${ field.id }-${ index }` }>{ option }</Label>
              </div>
            ) ) }
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-2"> {/* Add vertical spacing here */ }
            { field.options?.map( ( option: string, index: number ) => (
              <div key={ index } className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={ `${ field.id }-${ index }` }
                  value={ option }
                  { ...register( field.id ) }
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <Label htmlFor={ `${ field.id }-${ index }` }>{ option }</Label>
              </div>
            ) ) }
          </div>
        );
      default:
        return (
          <Input
            type={ field.fieldType }
            id={ field.id }
            placeholder={ field.placeholder }
            required={ field.isRequired }
            { ...register( field.id ) }
            className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pb-16" style={ backgroundStyle }>
      <div className="w-full max-w-5xl p-4">
        <div className="flex justify-center items-center py-4">
          <h2 className="text-3xl font-bold text-gray-800">{ orgName }</h2>
        </div>
        { form.headerMediaUrl && (

          <div className="">
            <img
              src={ form.headerMediaUrl }
              alt="Form Header"
              className="w-full max-w-screen-lg mx-auto rounded-t-2xl shadow-md object-cover"
              style={ { maxHeight: '300px' } }
            />
          </div>
        ) }
        <Card className="rounded-2xl max-w-5xl mx-auto bg-opacity-50 backdrop-blur-lg pb-16 text-2xl shadow-lg">
          <CardHeader className="bg-blue-500 text-white font-normal ">
            <CardTitle><h1>{ form.name }</h1></CardTitle>
          </CardHeader>
          <CardContent>
            <p className="my-4 text-gray-700">{ form.description }</p>
            <form id="dynamic-form" onSubmit={ handleSubmit( async ( data ) => onSubmit( data, ( await params ).orgId ) ) } className="space-y-4">
              { form.fields.map( ( field ) => (
                <div key={ field.id } className="space-y-2">
                  <Label htmlFor={ field.id } className="font-semibold">
                    { field.fieldName }
                    { field.isRequired && <span className="text-red-500">*</span> }
                  </Label>
                  { renderField( field ) }
                </div>
              ) ) }
              <div className="sm:static fixed bottom-0 left-0 w-full p-4 z-10 flex justify-center">
                <Button
                  type="submit"
                  disabled={ isPending }
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xl  max-w-lg px-8 py-4 rounded-md"
                >
                  { isPending ? 'Submitting...' : 'Submit' }
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
