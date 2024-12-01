'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import LogoSpinner from '@/components/Loaders/LogoSpinner';
import { Button } from '@nextui-org/button';
import
{
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface Form
{
  id: string;
  form_name: string;
  status: string;
  description: string | null;
  isArchived: boolean;
  isDeleted: boolean;
  isDraft: boolean;
}
export default function FormsPage ()
{
  const { user } = useUser();
  const [ forms, setForms ] = useState<Form[]>( [] );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ] = useState<string | null>( null );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ selectedFormId, setSelectedFormId ] = useState<string | null>( null );

  useEffect( () =>
  {
    async function fetchForms ()
    {
      if ( !user?.organizationId )
      {
        setError( 'Organization not found' );
        setLoading( false );
        return;
      }

      try
      {
        setLoading( true );
        const response = await fetch( '/api/forms/getForms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( { organizationId: user.organizationId } ),
        } );

        const result = await response.json();

        if ( response.ok && result.success )
        {
          setForms(
            result.forms.map( ( form: any ) => ( {
              ...form,
              isArchived: form.is_archived ?? false,
              isDeleted: false,
              isDraft: false,
              status: form.status ?? 'active',
            } ) )
          );
        } else
        {
          setError( result.message || 'Failed to fetch forms' );
        }
      } catch ( error )
      {
        console.error( 'Failed to fetch forms:', error );
        setError( 'Failed to fetch forms' );
      } finally
      {
        setLoading( false );
      }
    }

    fetchForms();
  }, [ user?.organizationId ] );

  // Labels for the status badge
  const renderStatusLabel = ( form: Form ) =>
  {
    if ( form.isDraft )
    {
      return <Badge className="bg-red-500">Draft</Badge>;
    }
    if ( form.isArchived || form.status === 'archived' )
    {
      return <Badge className="bg-yellow-400">Archived</Badge>;
    }
    return <Badge className="bg-green-500">Active</Badge>;
  };

  // Archive form handler
  const handleArchive = async ( formId: string ) =>
  {
    try
    {
      const response = await fetch( '/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( { action: 'archiveForm', formId, orgId: user?.organizationId || '' } ),
      } );

      const result = await response.json();

      if ( response.ok )
      {
        setForms(
          forms.map( ( form ) =>
            form.id === formId
              ? { ...form, isArchived: true, status: 'archived' }
              : form
          )
        );
      } else
      {
        setError( result.message || 'Failed to archive form' );
      }
    } catch ( error )
    {
      console.error( 'Failed to archive form:', error );
      setError( 'Failed to archive form' );
    }
  };

  const openModal = ( formId: string ) =>
  {
    setSelectedFormId( formId );
    onOpen();
  };

  const confirmArchive = () =>
  {
    if ( selectedFormId )
    {
      handleArchive( selectedFormId );
    }
    onOpenChange();
  };

  if ( loading )
  {
    return (
      <div className="flex justify-center items-center h-screen">
        <LogoSpinner />
      </div>
    );
  }

  if ( error )
  {
    return <p className="text-red-600 text-center">{ error }</p>;
  }


  return (
    <>
      <div className="rounded-2xl bg-white">
        <h1 className="text-2xl font-semibold mb-4">All Forms</h1>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              A list of all forms in your organization including their name and description.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link href={ `/dashboard/${ user?.organizationId }/forms/new` }>
              <div className="block rounded-3xl bg-blue-700 px-3 py-2 text-center text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">
                Add New Form
              </div>
            </Link>
          </div>
        </div>

        {/* Display forms as cards on small screens, table on larger screens */ }
        <div className="mt-8">
          {/* For large screens */ }
          <div className="hidden md:block">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                      Form Name
                    </th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                      Description
                    </th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  { forms.length > 0 ? (
                    forms.map( ( form ) => (
                      <tr key={ form.id }>
                        <td className="px-3 py-2">{ form.form_name }</td>
                        <td className="px-3 py-2">{ form.description || 'No description' }</td>
                        <td className="px-3 py-2">{ renderStatusLabel( form ) }</td>
                        <td className="">
                          <div className="flex ">
                            <Link href={ `/dashboard/${ user?.organizationId }/forms/${ form.id }` }>
                              <Button size="sm" color="primary" variant="light">
                                Edit
                              </Button>
                            </Link>
                            <Link href={ `/forms/${ user?.organizationId }/${ form.id }` }>
                              <Button size="sm" color="primary" variant="light">
                                View
                              </Button>
                            </Link>
                            <Link href={ `/dashboard/${ user?.organizationId }/forms/${ form.id }/responses` }>
                              <Button size="sm" color="primary" variant="light">
                                Responses
                              </Button>
                            </Link>
                            <Button size="sm" color="danger" variant="light" onPress={ () => openModal( form.id ) }>
                              Archive
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ) )
                  ) : (
                    <tr>
                      <td colSpan={ 4 } className="px-3 py-2 text-center text-sm text-gray-500">
                        No forms found.
                      </td>
                    </tr>
                  ) }
                </tbody>
              </table>
            </div>
          </div>

          {/* For small screens */ }
          <div className="md:hidden">
            { forms.length > 0 ? (
              forms.map( ( form ) => (
                <div key={ form.id } className="bg-white shadow rounded-lg mb-4 p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium">{ form.form_name }</h2>
                    { renderStatusLabel( form ) }
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{ form.description || 'No description' }</p>
                  <div className="mt-4 flex ">
                    <Link href={ `/dashboard/${ user?.organizationId }/forms/${ form.id }` }>
                      <Button size="sm" color="primary" variant="light">
                        Edit
                      </Button>
                    </Link>
                    <Link href={ `/forms/${ user?.organizationId }/${ form.id }` }>
                      <Button size="sm" color="primary" variant="light">
                        View Form
                      </Button>
                    </Link>
                    <Link href={ `/dashboard/${ user?.organizationId }/forms/${ form.id }/responses` }>
                      <Button size="sm" color="primary" variant="light">
                        View Responses
                      </Button>
                    </Link>
                    <Button size="sm" color="danger" variant="light" onPress={ () => openModal( form.id ) }>
                      Archive
                    </Button>
                  </div>
                </div>
              ) )
            ) : (
              <p className="text-center text-sm text-gray-500">No forms found.</p>
            ) }
          </div>
        </div>
      </div>

      {/* Modal for archive confirmation */ }
      <Modal isOpen={ isOpen } onOpenChange={ onOpenChange }>
        <ModalContent>
          { ( onClose ) => (
            <>
              <ModalHeader>Confirm Archive</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to archive this form?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={ confirmArchive }>
                  Yes, Archive
                </Button>
                <Button color="primary" onPress={ onClose }>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          ) }
        </ModalContent>
      </Modal>
    </>
  );
}
