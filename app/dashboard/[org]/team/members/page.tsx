'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';

import LogoSpinner from '@/components/Loaders/LogoSpinner';
import { Button } from '@nextui-org/react'; // Import NextUI components
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { getMembersByOrg, deleteMember, inviteMember } from '@/app/actions/memberActions';
import { getUserAndOrgId } from '@/utils/getUserAndOrgId';
import BreadcrumbsPageHeader from '../../components/BreadcrumbsPageHeading';


interface Member
{
  id: string;
  name: string;
  email: string;
  role: string;
  department: string | null;
  joinedDate: Date | null;
  isActive: boolean;
  profileImageUrl: string | null;
}

export default function MembersPage ()
{
  const { user } = useUser();
  const [ members, setMembers ] = useState<Member[]>( [] );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ] = useState<string | null>( null );
  const [ selectedMemberId, setSelectedMemberId ] = useState<string | null>( null ); // Selected member for deletion
  const { isOpen: isDeleteModalOpen, onOpen: openDeleteModal, onOpenChange: onDeleteModalChange } = useDisclosure(); // Modal for deletion
  const { isOpen: isInviteModalOpen, onOpen: openInviteModal, onOpenChange: onInviteModalChange } = useDisclosure(); // Modal for inviting
  const [ email, setEmail ] = useState( '' );
  const [ feedback, setFeedback ] = useState<{ message: string; success: boolean } | null>( null );
  
  useEffect( () =>
  {
    async function fetchMembers ()
    {
      try
      {
        setLoading( true ); // Set loading state

        // Fetch user and orgId using utility function
        const { orgId } = await getUserAndOrgId();

        if ( !orgId )
        {
          setError( 'Organization not found' );
          setLoading( false );
          return;
        }

        // Fetch members using the organization ID
        const fetchedMembers = await getMembersByOrg( orgId );

        // Ensure that date fields are parsed as Date objects and isActive is boolean
        const parsedMembers = fetchedMembers.map( ( member ) => ( {
          ...member,
          joinedDate: member.joinedDate ? new Date( member.joinedDate ) : null,  // Parse joinedDate
          lastLogin: member.lastLogin ? new Date( member.lastLogin ) : null,      // Parse lastLogin
          departedAt: member.departedAt ? new Date( member.departedAt ) : null,   // Parse departedAt
          createdAt: member.createdAt ? new Date( member.createdAt ) : null,      // Parse createdAt
          updatedAt: member.updatedAt ? new Date( member.updatedAt ) : null,      // Parse updatedAt
          isActive: member.isActive ?? false,  // Ensure isActive is boolean (defaults to false if null)
        } ) );

        setMembers( parsedMembers ); // Set the parsed members to state
      } catch ( error )
      {
        console.error( 'Failed to fetch members:', error );
        setError( 'Failed to fetch members' );
      } finally
      {
        setLoading( false ); // Ensure loading state is reset
      }
    }

    fetchMembers();
  }, [] );


  const handleDelete = async ( memberId: string ) =>
  {
    if ( confirm( 'Are you sure you want to delete this member?' ) )
    {
      try
      {
        const response = await deleteMember( memberId ); // Call the delete member server action

        if ( response.success )
        {
          setMembers( members.filter( ( member ) => member.id !== memberId ) );
        } else
        {
          setError( response.error || 'Failed to delete member' );
        }
      } catch ( error )
      {
        console.error( 'Failed to delete member:', error );
        setError( 'Failed to delete member' );
      }
    }
  };

  if ( loading )
  {
    return (
      <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' } }>
        <LogoSpinner />
      </div>
    );
  }

  if ( error )
  {
    return <p className="text-red-600">{ error }</p>;
  }

  const breadcrumbs = [
    { name: 'Dashboard', href: '/' },
    { name: 'All Members', href: '/members', current: true },
  ];

  const openModal = ( memberId: string ) =>
  {
    setSelectedMemberId( memberId );
    openInviteModal();
  };

  
  const handleInvite = async () =>
  {
    setLoading( true );
    const result = await inviteMember( email, user?.organizationId || '' );
    setFeedback( result ); // Show success or error feedback
    setLoading( false );
  };
  const confirmDelete = () =>
  {
    if ( selectedMemberId )
    {
      handleDelete( selectedMemberId );
    }
    onDeleteModalChange(); // Close the modal
  };

  return (
    <>
      <div className="sm:px-6 p-6 rounded-2xl bg-white">
        <BreadcrumbsPageHeader title="All Members" breadcrumbs={ breadcrumbs } />
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              A list of all members of your organization including their name, email, role, and department.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            {/*<Button
              as = "a"
              href={ `/dashboard/${ user?.orgName }/members/new` }
              className=" block rounded-3xl bg-blue-500 px-3 py-2 text-center text-lg font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              
                Add New Member
             
            </Button>*/}
          </div>
          <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
            <Button
              as = "a"
              onPress={ openInviteModal }
              className="block rounded-3xl bg-blue-500 px-3 py-2 text-center text-lg font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >Invite Member
            </Button>

            <Modal isOpen={ isInviteModalOpen } onOpenChange={ onInviteModalChange }>
              <ModalContent>
                { onClose => (
                  <>
                    <ModalHeader>Invite New Member</ModalHeader>
                    <ModalBody>
                      <input
                        type="email"
                        value={ email }
                        onChange={ e => setEmail( e.target.value ) }
                        placeholder="Enter member's email"
                        className="w-full border border-gray-300 rounded-lg p-2"
                      />
                      { feedback && (
                        <p className={ feedback.success ? 'text-green-500' : 'text-red-500' }>
                          { feedback.message }
                        </p>
                      ) }
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onPress={ handleInvite } isDisabled={ loading }>
                        { loading ? 'Inviting...' : 'Send Invite' }
                      </Button>
                      <Button color="danger" onPress={ onClose }>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </>
                ) }
              </ModalContent>
            </Modal>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50 hidden md:table-header-group">
                    <tr>
                      <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                      <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">Department</th>
                      <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    { members.length > 0 ? (
                      members.map( ( member ) => (
                        <tr key={ member.id } className="block md:table-row md:border-none md:shadow-none mb-4 md:mb-0">
                          <td className="block md:table-cell px-3 py-2">
                            <strong className="md:hidden">Name: </strong>
                            { member.name }
                          </td>
                          <td className="block md:table-cell px-3 py-2">
                            <strong className="md:hidden">Email: </strong>
                            { member.email }
                          </td>
                          <td className="block md:table-cell px-3 py-2">
                            <strong className="md:hidden">Role: </strong>
                            { member.role }
                          </td>
                          <td className="block md:table-cell px-3 py-2">
                            <strong className="md:hidden">Department: </strong>
                            { member.department }
                          </td>
                          <td className="block md:table-cell px-3 py-2">
                            {/* Edit Member */ }
                            <Link href={ `/dashboard/${ user?.orgName }/members/${ member.id }/edit` }>
                              <div className="text-blue-600 hover:text-blue-900 cursor-pointer">
                                Edit
                              </div>
                            </Link>

                            {/* Delete Member */ }
                            <button
                              onClick={ () => openModal( member.id ) }
                              className="text-red-600 hover:text-red-900 cursor-pointer mt-2"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ) )
                    ) : (
                      <tr>
                        <td colSpan={ 5 } className="px-3 py-2 text-center text-sm text-gray-500">
                          No members found.
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
      <Modal isOpen={ isDeleteModalOpen } onOpenChange={ onDeleteModalChange }>
        <ModalContent>
          { ( onClose ) => (
            <>
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this member? This action cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={ confirmDelete }>
                  Yes, Delete
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
