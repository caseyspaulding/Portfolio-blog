'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getFormResponses, getFormFields } from '@/app/actions/formActions';
import LogoSpinner from '@/components/Loaders/LogoSpinner';
import
  {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
  } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import Link from 'next/link';

interface FormResponse
{
  responseId: string;
  responseData: Record<string, any>;
  submittedAt: string;
}

interface FormField
{
  fieldId: string;
  fieldName: string;
  fieldType: string; // Added fieldType
}

export default function FormResponsesPage ()
{
  const { formId } = useParams();
  const [ responses, setResponses ] = useState<FormResponse[]>( [] );
  const [ fields, setFields ] = useState<FormField[]>( [] );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ] = useState<string | null>( null );

  // Added state variables
  const [ searchTerm, setSearchTerm ] = useState( '' );
  const [ isModalOpen, setIsModalOpen ] = useState( false );
  const [ selectedResponse, setSelectedResponse ] = useState<FormResponse | null>(
    null
  );
  const [ sortConfig, setSortConfig ] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>( null );

  useEffect( () =>
  {
    async function fetchData ()
    {
      if ( !formId )
      {
        setError( 'Form ID not provided' );
        setLoading( false );
        return;
      }

      try
      {
        setLoading( true );

        // Fetch form responses
        const responsesData = await getFormResponses( formId as string );
        const formattedResponses = responsesData.map( ( response ) => ( {
          ...response,
          submittedAt: response.submittedAt.toISOString(),
          responseData: response.responseData as Record<string, any>,
        } ) );
        setResponses( formattedResponses );

        // Fetch form fields
        const fieldsData = (
          await getFormFields( formId as string )
        ).map( ( field: any ) => ( {
          ...field,
          fieldType: field.fieldType || 'text', // Default to 'text' if fieldType is missing
        } ) );
        setFields( fieldsData );
      } catch ( error )
      {
        console.error( 'Failed to fetch form data:', error );
        setError( 'Failed to fetch form data' );
      } finally
      {
        setLoading( false );
      }
    }

    fetchData();
  }, [ formId ] );

  // Create a map of fieldId to fieldName for easy lookup
  const fieldIdToNameMap = fields.reduce( ( acc, field ) =>
  {
    acc[ field.fieldId ] = field.fieldName;
    return acc;
  }, {} as Record<string, string> );

  // Map of fieldId to fieldType
  const fieldIdToTypeMap = fields.reduce( ( acc, field ) =>
  {
    acc[ field.fieldId ] = field.fieldType;
    return acc;
  }, {} as Record<string, string> );

  function handleExportToCSV ()
  {
    // Define CSV headers
    const headers = [ 'Response ID', 'Submitted At' ];

    // Include field names in headers
    fields.forEach( ( field ) =>
    {
      headers.push( field.fieldName );
    } );

    // Map responses to CSV rows
    const csvRows = [
      headers.join( ',' ), // Header row
      ...responses.map( ( response ) =>
      {
        const row = [ response.responseId, response.submittedAt ];

        fields.forEach( ( field ) =>
        {
          const value = response.responseData[ field.fieldId ];
          if ( field.fieldType === 'file' )
          {
            if ( value )
            {
              // Include the hyperlink formula recognized by Excel/Google Sheets
              const hyperlink = `=HYPERLINK("${ value }", "Download")`;
              row.push( hyperlink );
            } else
            {
              row.push( '' );
            }
          } else
          {
            // Escape quotes in values
            const formattedValue =
              typeof value === 'string'
                ? `"${ value.replace( /"/g, '""' ) }"`
                : value;
            row.push( formattedValue );
          }
        } );

        return row.join( ',' );
      } ),
    ];

    // Create a blob and trigger download
    const csvContent = csvRows.join( '\n' );
    const blob = new Blob( [ csvContent ], { type: 'text/csv;charset=utf-8;' } );
    const url = URL.createObjectURL( blob );
    const link = document.createElement( 'a' );
    link.href = url;
    link.setAttribute( 'download', `form_responses_${ formId }.csv` );
    document.body.appendChild( link );
    link.click();
    document.body.removeChild( link );
  }

  // Implement handleSort
  function handleSort ( key: string )
  {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    )
    {
      direction = 'descending';
    }
    setSortConfig( { key, direction } );
  }

  // Implement openDetailsModal
  function openDetailsModal ( response: FormResponse )
  {
    setSelectedResponse( response );
    setIsModalOpen( true );
  }

  // Apply search and sorting
  let filteredResponses = responses;

  // Apply search filter
  if ( searchTerm )
  {
    filteredResponses = filteredResponses.filter( ( response ) =>
    {
      // Check if any of the responseData values or field names match the search term
      return Object.entries( response.responseData ).some( ( [ key, value ] ) =>
      {
        const fieldName = fieldIdToNameMap[ key ] || key;
        return (
          fieldName.toLowerCase().includes( searchTerm.toLowerCase() ) ||
          String( value ).toLowerCase().includes( searchTerm.toLowerCase() )
        );
      } );
    } );
  }

  // Apply sorting
  if ( sortConfig !== null )
  {
    filteredResponses.sort( ( a, b ) =>
    {
      const key = sortConfig.key;
      let aValue: any;
      let bValue: any;

      if ( key === 'submittedAt' )
      {
        aValue = new Date( a.submittedAt ).getTime();
        bValue = new Date( b.submittedAt ).getTime();
      } else
      {
        aValue = a.responseData[ key ];
        bValue = b.responseData[ key ];
      }

      if ( aValue < bValue )
      {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if ( aValue > bValue )
      {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    } );
  }

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
    <div className=" bg-white">
      {/* Summary Section */ }
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold">Summary</h2>
        <p>Total Responses: { responses.length }</p>
        {/* You may want to update this to compute actual statistics */ }
      </div>

      {/* Export and Search Section */ }
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex space-x-2 mb-2 sm:mb-0">
          <Button
            className="bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={ handleExportToCSV }
          >
            Export to CSV
          </Button>
          {/* Add other buttons if needed */ }
        </div>
        <input
          type="text"
          placeholder="Search responses..."
          className="px-4 py-2 border rounded-md"
          onChange={ ( e ) => setSearchTerm( e.target.value ) }
        />
      </div>

      {/* Desktop Table */ }
      <div className="overflow-x-auto hidden sm:block">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                Submitted At
                <button
                  onClick={ () => handleSort( 'submittedAt' ) }
                  className="ml-2 text-gray-500"
                >
                  ⇅
                </button>
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                Response Data
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                Attachments
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            { filteredResponses.length > 0 ? (
              filteredResponses.map( ( response ) => (
                <tr key={ response.responseId }>
                  <td className="px-3 py-2">
                    { new Date( response.submittedAt ).toLocaleString( 'en-US', {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    } ) }
                  </td>
                  <td className="px-3 py-2">
                    <ul className="list-disc list-inside">
                      { Object.entries( response.responseData ).map(
                        ( [ key, value ] ) =>
                        {
                          const fieldName = fieldIdToNameMap[ key ] || key;
                          const fieldType = fieldIdToTypeMap[ key ];

                          // If the field is an attachment, skip it here
                          if ( fieldType === 'file' || fieldType === 'attachment' )
                          {
                            return null;
                          }

                          return (
                            <li key={ key }>
                              <strong>{ fieldName }:</strong> { value }
                            </li>
                          );
                        }
                      ) }
                    </ul>
                  </td>
                  <td className="px-3 py-2">
                    { Object.entries( response.responseData ).map(
                      ( [ key, value ] ) =>
                      {
                        const fieldType = fieldIdToTypeMap[ key ];

                        if ( fieldType === 'file' || fieldType === 'attachment' )
                        {
                          return (
                            <div key={ key }>
                              <a
                                href={ value }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                { fieldIdToNameMap[ key ] || 'Attachment' }
                              </a>
                            </div>
                          );
                        }
                        return null;
                      }
                    ) }
                  </td>
                  <td className="px-3 py-2">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={ () => openDetailsModal( response ) }
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ) )
            ) : (
              <tr>
                <td
                  colSpan={ 4 }
                  className="px-3 py-2 text-center text-sm text-gray-500"
                >
                  No responses found.
                </td>
              </tr>
            ) }
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Layout */ }
      <div className="sm:hidden">
        { filteredResponses.length > 0 ? (
          filteredResponses.map( ( response ) => (
            <div
              key={ response.responseId }
              className="border rounded-lg mb-4 p-4 bg-white shadow-sm"
            >
              <div className="mb-2">
                <span className="font-medium text-gray-900">Submitted At:</span>{ ' ' }
                { new Date( response.submittedAt ).toLocaleString( 'en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                } ) }
              </div>
              <div className="mb-2">
                <span className="font-medium text-gray-900">Response Data:</span>
                <ul className="list-disc list-inside">
                  { Object.entries( response.responseData ).map( ( [ key, value ] ) =>
                  {
                    const fieldName = fieldIdToNameMap[ key ] || key;
                    const fieldType = fieldIdToTypeMap[ key ];

                    // If the field is an attachment, skip it here
                    if ( fieldType === 'file' || fieldType === 'attachment' )
                    {
                      return null;
                    }

                    return (
                      <li key={ key }>
                        <strong>{ fieldName }:</strong> { value }
                      </li>
                    );
                  } ) }
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-medium text-gray-900">Attachments:</span>
                <div>
                  { Object.entries( response.responseData ).map( ( [ key, value ] ) =>
                  {
                    const fieldType = fieldIdToTypeMap[ key ];

                    if ( fieldType === 'file' || fieldType === 'attachment' )
                    {
                      return (
                        <div key={ key }>
                          <a
                            href={ value }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            { fieldIdToNameMap[ key ] || 'Attachment' }
                          </a>
                        </div>
                      );
                    }
                    return null;
                  } ) }
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="text-blue-600 hover:text-blue-900"
                  onClick={ () => openDetailsModal( response ) }
                >
                  View Details
                </button>
              </div>
            </div>
          ) )
        ) : (
          <p className="text-center text-sm text-gray-500">
            No responses found.
          </p>
        ) }
      </div>

      {/* Modal for Viewing Detailed Response */ }
      <Modal isOpen={ isModalOpen } onClose={ () => setIsModalOpen( false ) }>
        <ModalContent>
          <ModalHeader>Response Details</ModalHeader>
          <ModalBody>
            <ul>
              { Object.entries( selectedResponse?.responseData ?? {} ).map(
                ( [ key, value ] ) =>
                {
                  const fieldName = fieldIdToNameMap[ key ] || key;
                  const fieldType = fieldIdToTypeMap[ key ];

                  if ( fieldType === 'file' || fieldType === 'attachment' )
                  {
                    return (
                      <li key={ key }>
                        <strong>{ fieldName }:</strong>{ ' ' }
                        <a
                          href={ value }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Attachment
                        </a>
                      </li>
                    );
                  } else
                  {
                    return (
                      <li key={ key }>
                        <strong>{ fieldName }:</strong> { value }
                      </li>
                    );
                  }
                }
              ) }
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button onClick={ () => setIsModalOpen( false ) }>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
