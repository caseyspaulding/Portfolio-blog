import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { v4 as uuidv4 } from 'uuid'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, Trash2, Save, Share2, Copy, Eye } from 'lucide-react'
import { saveFormAction } from '@/app/actions/formActions';

import { loadForm } from '@/utils/loadForm'
import ShareFormModal from './ShareFormModal'
import CustomAlertDialog from './CustomAlertDialog'
import { createClient } from '@/utils/supabase/client'
import { AddElementsDrawer } from './AddElementsDrawer'


const supabase = createClient();
type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'radio' | 'select' | 'date' | 'file'

interface FormField
{
  id: string
  type: FieldType
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
  order: number
}

interface Form
{
  id: string
  name: string
  description: string | null
  fields: FormField[]
}

const initialForm: Form = {
  id: '',
  name: '',
  description: '',
  fields: []
}

interface FormEditorProps
{
  orgId: string;  // Org ID to associate with the form
  formId: string; // Form ID to load the form
  user: any;     // User object
}

export function FormEditorComponent ( { orgId, formId, user }: FormEditorProps )
{
  const [ form, setForm ] = useState<Form>( initialForm );
  const [ activeTab, setActiveTab ] = useState<'builder' | 'preview'>( 'builder' );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ] = useState<string | null>( null );
  const [ headerMediaUrl, setHeaderMediaUrl ] = useState<string | null>( null );
  const [ headerMediaFile, setHeaderMediaFile ] = useState<File | null>( null ); // New state for header media file
  const [ isUploading, setIsUploading ] = useState( false );
  const [ headerMediaPreview, setHeaderMediaPreview ] = useState<string | null>( null ); // For preview


  useEffect( () =>
  {
    const load = async () =>
    {
      if ( formId )
      {
        setLoading( true );
        try
        {
          const formData = await loadForm( formId );
          console.log( "Loaded Form Data:", formData );

          // Update form data
          setForm( formData );

          // Set header media values from the loaded form
          if ( formData.headerMediaUrl )
          {
            setHeaderMediaUrl( formData.headerMediaUrl );
            setHeaderMediaPreview( formData.headerMediaUrl ); // Assuming you want to show the preview from the URL
          }
        } catch ( error )
        {
          console.error( 'Error loading form data:', error );
          setError( 'Failed to load form data. Please try again.' );
        } finally
        {
          setLoading( false );
        }
      }
    };

    load();
  }, [ formId ] );


  if ( error )
  {
    return <div className="text-red-500">{ error }</div>;
  }

  const onDragEnd = ( result: any ) =>
  {
    if ( !result.destination ) return

    const items = Array.from( form.fields )
    const [ reorderedItem ] = items.splice( result.source.index, 1 )
    items.splice( result.destination.index, 0, reorderedItem )

    const updatedFields = items.map( ( field, index ) => ( { ...field, order: index } ) )
    setForm( { ...form, fields: updatedFields } )
  }


  // Save form
  const saveForm = async ( isDraft = false, isArchived = false ) =>
  {
    if ( !form.id )
    {
      form.id = uuidv4(); // Generate form ID if not set
    }

    // Fetch user_profiles.id where user_profiles.userId = userId
    const { data: userProfile, error: userProfileError } = await supabase
      .from( 'user_profiles' )
      .select( 'user_id' ) // Fetch the user_id, not id
      .eq( 'user_id', user.id ) // Assuming userId.id is the correct value from Supabase auth
      .single();

    if ( userProfileError || !userProfile )
    {
      console.error( 'Error fetching user profile:', userProfileError );
      return;
    }
    // Upload the header media if the file is selected
    let uploadedHeaderMediaUrl = headerMediaUrl;
    if ( headerMediaFile )
    {
      uploadedHeaderMediaUrl = await handleFileUpload( headerMediaFile );
      console.log( 'Uploaded header media URL:', uploadedHeaderMediaUrl );
      setHeaderMediaUrl( uploadedHeaderMediaUrl ); // Store the URL in state
    }

    const input = {
      orgId: orgId,
      formId: form.id,
      name: form.name,
      description: form.description || '',
      fields: form.fields,
      isDraft: isDraft,
      isArchived: isArchived,
      headerMediaUrl: uploadedHeaderMediaUrl, // Set the uploaded URL
      headerMediaType: 'image', // Assuming you're working with an image
      creator_id: userProfile.user_id, // Use the user_id, not the id
    };
    try
    {
      await saveFormAction( input );
      // Show success alert
      showAlert( {
        title: 'Success',
        description: 'Form saved successfully!',
        type: 'success',
      } );
    } catch ( error )
    {
      console.error( 'Error saving form:', error );
      // Show error alert
      showAlert( {
        title: 'Error',
        description: 'Error saving form. Please try again.',
        type: 'error',
      } );
    }
  };



  const [ alertState, setAlertState ] = useState<{
    open: boolean;
    title: string;
    description: string;
    type: 'info' | 'success' | 'warning' | 'error';
    onConfirm: ( () => void ) | null;
  }>( {
    open: false,
    title: '',
    description: '',
    type: 'info',
    onConfirm: null,
  } );

  const showAlert = ( { title, description, type = 'info', onConfirm = null }: { title: string, description: string, type?: 'info' | 'success' | 'warning' | 'error', onConfirm?: ( () => void ) | null } ) =>
  {
    setAlertState( {
      open: true,
      title,
      description,
      type,
      onConfirm,
    } );
  };
  // Share form

  const shareForm = () =>
  {
    if ( !form.id )
    {
      showAlert( {
        title: 'Notice',
        description: 'Please save the form before sharing.',
        type: 'warning',
      } );
      return;
    }

    // Use orgId (or slug) and formId in the share URL
    const shareUrl = `${ window.location.origin }/forms/${ orgId }/${ form.id }`;
    navigator.clipboard.writeText( shareUrl );
    showAlert( {
      title: 'Success',
      description: 'Form share link copied to clipboard.',
      type: 'success',
    } );
  };

  const renderField = ( field: FormField ) =>
  {
    switch ( field.type )
    {
      case 'text':
      case 'number':
      case 'date':
        return <Input type={ field.type } id={ field.id } placeholder={ field.placeholder } required={ field.required } />
      case 'textarea':
        return <Textarea id={ field.id } placeholder={ field.placeholder } required={ field.required } />
      case 'checkbox':
        return (
          <div>
            { field.options?.map( ( option, index ) => (
              <div key={ index } className="flex items-center space-x-2">
                <Checkbox id={ `${ field.id }-${ index }` } />
                <Label htmlFor={ `${ field.id }-${ index }` }>{ option }</Label>
              </div>
            ) ) }
          </div>
        );
      case 'radio':
        return (
          <RadioGroup>
            { field.options?.map( ( option, index ) => (
              <div key={ index } className="flex items-center space-x-2">
                <RadioGroupItem value={ option } id={ `${ field.id }-${ index }` } />
                <Label htmlFor={ `${ field.id }-${ index }` }>{ option }</Label>
              </div>
            ) ) }
          </RadioGroup>
        )
      case 'select':
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              { field.options?.map( ( option, index ) => (
                <SelectItem key={ index } value={ option }>{ option }</SelectItem>
              ) ) }
            </SelectContent>
          </Select>
        )
      case 'file':
        return <Input type="file" id={ field.id } required={ field.required } />
      default:
        return null
    }
  }
  const viewFormLive = () =>
  {
    if ( !form.id )
    {
      showAlert( {
        title: 'Notice',
        description: 'Please save the form before viewing.',
        type: 'warning',
      } );
      return;
    }

    // Construct the form URL
    const formUrl = `${ window.location.origin }/forms/${ orgId }/${ form.id }`;

    // Open the form in a new, smaller window
    window.open(
      formUrl,
      '_blank',
      'width=800,height=600,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes'
    );
  };

  const addField = ( type: FieldType ) =>
  {
    const newField: FormField = {
      id: uuidv4(),
      type,
      label: `New ${ type } field`,
      placeholder: `Enter ${ type }`,
      required: false,
      options: [ 'radio', 'select', 'checkbox' ].includes( type ) ? [ 'Option 1', 'Option 2' ] : undefined,
      order: form.fields.length,
    };
    setForm( { ...form, fields: [ ...form.fields, newField ] } );
  };

  // Upload header image to Supabase
  // Upload header image to Supabase
  const handleFileUpload = async ( file: File ) =>
  {
    setIsUploading( true );

    // Use timestamp for a unique file name
    const timestamp = new Date().getTime();
    const uniqueFileName = `${ timestamp }_${ file.name }`; // Append the timestamp to the file name

    // Create a folder for the organization but not for the timestamp
    const filePath = `public/${ user?.orgName }/${ uniqueFileName }`;

    // Upload the file to Supabase
    const { data, error } = await supabase.storage
      .from( 'media' )
      .upload( filePath, file );

    if ( error )
    {
      console.error( 'Error uploading file:', error.message );
      setIsUploading( false );
      return null;
    }

    // Get the public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from( 'media' )
      .getPublicUrl( filePath ); // Use the correct file path here

    if ( !publicUrlData )
    {
      console.error( 'Error getting public URL' );
      setIsUploading( false );
      return null;
    }

    setIsUploading( false );
    return publicUrlData?.publicUrl || null;
  };
  // Handle file selection and preview generation
  const handleFileChange = ( e: React.ChangeEvent<HTMLInputElement> ) =>
  {
    const file = e.target.files?.[ 0 ] || null;
    setHeaderMediaFile( file );

    // Generate preview
    if ( file )
    {
      const reader = new FileReader();
      reader.onloadend = () =>
      {
        setHeaderMediaPreview( reader.result as string ); // Set preview URL
      };
      reader.readAsDataURL( file ); // Read file as data URL
    } else
    {
      setHeaderMediaPreview( null ); // Reset preview if no file is selected
    }
  };

  const removeField = ( id: string ) =>
  {
    setForm( { ...form, fields: form.fields.filter( field => field.id !== id ) } )
  }

  const updateField = ( id: string, updates: Partial<FormField> ) =>
  {
    setForm( {
      ...form,
      fields: form.fields.map( field =>
        field.id === id ? { ...field, ...updates } : field
      )
    } )
  }

  return (
    <div className="">
      <CustomAlertDialog
        open={ alertState.open }
        onOpenChange={ ( open: any ) => setAlertState( ( prev ) => ( { ...prev, open } ) ) }
        title={ alertState.title }
        description={ alertState.description }
        onConfirm={ () =>
        {
          if ( alertState.onConfirm )
          {
            alertState.onConfirm();
          }
          setAlertState( ( prev ) => ( { ...prev, open: false } ) );
        } }
        showCancel={ !!alertState.onConfirm }
        type={ alertState.type } // Pass the 'type' prop here
      />
      <h1 className="text-3xl font-bold mb-4">Edit Form</h1>

      <Tabs className="w-full" value={ activeTab } onValueChange={ ( value: string ) => setActiveTab( value as 'builder' | 'preview' ) }>
        <TabsList className="mb-4">
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <label htmlFor="formUrl" className="block text-sm font-medium text-gray-700">
          Form Live URL
        </label>
        <div className="mt-1 flex">
          <input
            type="text"
            name="formUrl"
            id="formUrl"
            value={ `${ window.location.origin }/forms/${ orgId }/${ form.id }` }
            readOnly
            className="flex-grow block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
          />
          <Button
            variant="outline"
            className="ml-2"
            onClick={ () =>
            {
              const formUrl = `${ window.location.origin }/forms/${ orgId }/${ form.id }`
              if ( form.id )
              {
                navigator.clipboard.writeText( formUrl )
                showAlert( {
                  title: 'Success',
                  description: 'Form URL copied to clipboard.',
                  type: 'success',
                } )
              } else
              {
                showAlert( {
                  title: 'Notice',
                  description: 'Please save the form to generate the URL.',
                  type: 'warning',
                } )
              }
            } }
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button className="ml-2" onClick={ viewFormLive }>
            <Eye className="h-4 w-4 mr-2" />
            View Live
          </Button>
        </div>
        <div className='flex mt-2'>

          <ShareFormModal form={ form } orgId={ orgId } />
        </div>
        <TabsContent value="builder">

          <div className='flex gap-3'>

            <AddElementsDrawer onAddField={ addField } />
            <Button variant="secondary" onClick={ () => saveForm( false ) }>
              <Save className="h-4 w-4 mr-2" />
              Save Form
            </Button>
          </div>

          <div className="w-full md:w-3/4">

            <Card>
              <CardHeader>
                <CardTitle>Your Form</CardTitle>
              </CardHeader>
              <div className="mx-4 md:mx-6 mb-4">
                <label htmlFor="headerMedia" className="block text-sm font-medium text-gray-700 mb-2">
                  Add an event featured image
                </label>

                {/* Image Preview Section */ }
                <div className="relative flex items-center justify-center">
                  { headerMediaPreview ? (
                    <img
                      src={ headerMediaPreview }
                      alt="Header Preview"
                      className="rounded-lg shadow-md w-full"
                      style={ { maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' } }
                    />
                  ) : (
                    // If no image is uploaded, display a placeholder with appropriate dimensions
                    <div
                      className="bg-gray-200 rounded-lg flex items-center justify-center w-full"
                      style={ { height: '200px' } }
                    >
                      <p className="text-gray-500">No image uploaded - 1536 x 864 pixels</p>

                    </div>

                  ) }

                  {/* Upload Button (Overlays the image) */ }
                  <label
                    htmlFor="headerMedia"
                    className="absolute inset-0 rounded-2xl flex items-center justify-center bg-blue-700 bg-opacity-70 text-white text-lg font-medium cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    Upload Form Header Image
                  </label>
                  <input
                    type="file"
                    id="headerMedia"
                    onChange={ handleFileChange }
                    className="hidden"
                  />
                </div>

              </div>

              <CardContent>
                <div className="mb-4">
                  <Input
                    value={ form.name }
                    onChange={ ( e ) => setForm( { ...form, name: e.target.value } ) }
                    placeholder="Untitled Form"
                    className="text-2xl font-bold mb-2"
                  />
                  <Textarea
                    value={ form.description || '' }
                    onChange={ ( e ) => setForm( { ...form, description: e.target.value } ) }
                    placeholder="Form Description"
                  />
                </div>
                <DragDropContext onDragEnd={ onDragEnd }>
                  <Droppable droppableId="form-fields">
                    { ( provided ) => (
                      <div { ...provided.droppableProps } ref={ provided.innerRef } className="space-y-4">
                        { form.fields.map( ( field, index ) => (
                          <Draggable key={ field.id } draggableId={ field.id } index={ index }>
                            { ( provided ) => (
                              <div
                                ref={ provided.innerRef }
                                { ...provided.draggableProps }
                                { ...provided.dragHandleProps }
                                className="bg-white p-4 rounded-md shadow-sm border border-gray-200"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <Input
                                    value={ field.label }
                                    onChange={ ( e ) => updateField( field.id, { label: e.target.value } ) }
                                    className="font-semibold"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={ () => removeField( field.id ) }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="space-y-2">
                                  <Input
                                    value={ field.placeholder }
                                    onChange={ ( e ) => updateField( field.id, { placeholder: e.target.value } ) }
                                    placeholder="Placeholder text"
                                  />
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      id={ `${ field.id }-required` }
                                      checked={ field.required }
                                      onCheckedChange={ ( checked ) => updateField( field.id, { required: checked } ) }
                                    />
                                    <Label htmlFor={ `${ field.id }-required` }>Required</Label>
                                  </div>
                                  { [ 'radio', 'select', 'checkbox' ].includes( field.type ) && (
                                    <Textarea
                                      value={ field.options?.join( '\n' ) }
                                      onChange={ ( e ) => updateField( field.id, { options: e.target.value.split( '\n' ) } ) }
                                      placeholder="Enter options (one per line)"
                                    />
                                  ) }
                                </div>
                              </div>
                            ) }
                          </Draggable>
                        ) ) }
                        { provided.placeholder }
                      </div>
                    ) }
                  </Droppable>
                </DragDropContext>
              </CardContent>
            </Card>
          </div>

        </TabsContent>
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Form Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Display uploaded header image in preview */ }
              { headerMediaPreview && (
                <div className="mb-4">

                  <img
                    src={ headerMediaPreview } // Use the preview URL instead of waiting for headerMediaUrl
                    alt="Form Header"
                    className="rounded-lg shadow-md mb-5"
                    style={ { maxWidth: '500px', maxHeight: '300px', objectFit: 'cover' } }
                  />
                </div>
              ) }
              <h2 className="text-2xl font-bold mb-4">{ form.name }</h2>
              <p className="text-gray-600 mb-4">{ form.description }</p>
              <form className="space-y-4">
                { form.fields.map( ( field ) => (
                  <div key={ field.id } className="space-y-2">
                    <Label htmlFor={ field.id }>{ field.label }{ field.required && <span className="text-red-500">*</span> }</Label>
                    { renderField( field ) }
                  </div>
                ) ) }
                <Button type="submit">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
function handleFileUpload ( headerMediaFile: File ): string | PromiseLike<string | null> | null
{
  throw new Error( 'Function not implemented.' )
}

