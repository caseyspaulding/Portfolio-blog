'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';

import LogoSpinner from '@/components/Loaders/LogoSpinner';
import { Button } from '@nextui-org/react';
import
{
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@nextui-org/modal';
import { deleteVolunteer, getVolunteersForOrg } from '@/app/actions/VolunteerActions';
import BreadcrumbsPageHeader from '../../components/BreadcrumbsPageHeading';

interface Volunteer
{
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    status?: string | null;
    orgId: string;
    notes?: string | null;
    eventId: string;
    phone?: string | null;
    waiverSigned?: boolean | null;
}

export default function VolunteersPage ()
{
    const { user } = useUser();
    const [ volunteers, setVolunteers ] = useState<Volunteer[]>( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ] = useState<string | null>( null );
    const [ selectedVolunteerId, setSelectedVolunteerId ] = useState<string | null>( null );
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // Fetch volunteers when the component mounts or when user.orgName changes
    useEffect( () =>
    {
        let isMounted = true; // Prevent setting state on unmounted component

        async function fetchVolunteers ()
        {
            if ( !user?.orgName )
            {
                if ( isMounted )
                {
                    setError( 'Organization not found' );
                    setLoading( false );
                }
                return;
            }

            try
            {
                setLoading( true );
                const fetchedVolunteers = await getVolunteersForOrg( user.orgName );
                if ( isMounted )
                {
                    setVolunteers( fetchedVolunteers );
                }
            } catch ( error )
            {
                console.error( 'Failed to fetch volunteers:', error );
                if ( isMounted )
                {
                    setError( 'Failed to fetch volunteers' );
                }
            } finally
            {
                if ( isMounted )
                {
                    setLoading( false );
                }
            }
        }

        fetchVolunteers();

        return () =>
        {
            isMounted = false;
        };
    }, [ user?.orgName ] );

    // Function to open the delete confirmation modal
    const openModal = ( volunteerId: string ) =>
    {
        setSelectedVolunteerId( volunteerId );
        onOpen(); // Open the modal
    };

    // Function to confirm and handle the deletion of a volunteer
    const confirmDelete = async () =>
    {
        if ( selectedVolunteerId )
        {
            try
            {
                setLoading( true );
                await deleteVolunteer( selectedVolunteerId );
                // Remove the deleted volunteer from the state
                setVolunteers( ( prevVolunteers ) =>
                    prevVolunteers.filter( ( volunteer ) => volunteer.id !== selectedVolunteerId )
                );
                setSelectedVolunteerId( null );
                onOpenChange(); // Close the modal
            } catch ( error )
            {
                console.error( 'Failed to delete volunteer:', error );
                setError( 'Failed to delete volunteer' );
            } finally
            {
                setLoading( false );
            }
        }
    };

    const breadcrumbs = [
        { name: 'Dashboard', href: '/' },
        { name: 'All Volunteers', href: '/volunteers', current: true },
    ];

    // Handle loading and error states
    if ( loading )
    {
        return <LogoSpinner />;
    }

    if ( error )
    {
        return (
            <div className="sm:px-6 p-6 rounded-2xl bg-white">
                <BreadcrumbsPageHeader title="All Volunteers" breadcrumbs={ breadcrumbs } />
                <div className="text-red-600 mt-4">{ error }</div>
            </div>
        );
    }

    return (
        <>
            <div className="sm:px-6 p-6 rounded-2xl bg-white">
                <BreadcrumbsPageHeader title="All Volunteers" breadcrumbs={ breadcrumbs } />
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the volunteers in your organization, including their name, role, and
                            status.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Link href={ `/dashboard/${ user?.orgName }/volunteers/new` }>
                            <div className="block rounded-3xl bg-blue-500 px-3 py-2 text-center text-lg font-semibold text-white shadow-sm hover:bg-blue-400">
                                Add New Volunteer
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50 hidden md:table-header-group">
                                        <tr>
                                            <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                                                Name
                                            </th>
                                            <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                                                Role
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
                                        { volunteers.length > 0 ? (
                                            volunteers.map( ( volunteer ) => (
                                                <tr key={ volunteer.id } className="block md:table-row">
                                                    <td className="block md:table-cell px-3 py-2">{ volunteer.name }</td>
                                                    <td className="block md:table-cell px-3 py-2">{ volunteer.role }</td>
                                                    <td className="block md:table-cell px-3 py-2">{ volunteer.status }</td>
                                                    <td className="block md:table-cell px-3 py-2">
                                                        <Link
                                                            href={ `/dashboard/${ user?.orgName }/volunteers/${ volunteer.id }/edit` }
                                                        >
                                                            <div className="text-blue-600 hover:text-blue-900 cursor-pointer">
                                                                Edit
                                                            </div>
                                                        </Link>
                                                        <button
                                                            onClick={ () => openModal( volunteer.id ) }
                                                            className="text-red-600 hover:text-red-900 cursor-pointer mt-2"
                                                        >
                                                            Delete
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
                                                    No volunteers found.
                                                </td>
                                            </tr>
                                        ) }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for delete confirmation */ }
            <Modal isOpen={ isOpen } onOpenChange={ onOpenChange }>
                <ModalContent>
                    { () => (
                        <>
                            <ModalHeader>Confirm Deletion</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this volunteer? This action cannot be undone.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={ confirmDelete }>
                                    Yes, Delete
                                </Button>
                                <Button color="primary" onPress={ () => onOpenChange() }>
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
