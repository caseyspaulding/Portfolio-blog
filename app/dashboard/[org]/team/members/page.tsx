'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';

import LogoSpinner from '@/components/Loaders/LogoSpinner';

import { getMembersByOrg, deleteMember, inviteMember } from '@/app/actions/memberActions';
import { getUserAndOrgId } from '@/utils/getUserAndOrgId';
import BreadcrumbsPageHeader from '../../components/BreadcrumbsPageHeading';
import { Button } from '@/components/ui/button';

// Import Shadcn Dialog components
import
  {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  lastLogin?: Date | null;
  departedAt?: Date | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export default function MembersPage ()
{
  const { user } = useUser();
  const [ members, setMembers ] = useState<Member[]>( [] );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ] = useState<string | null>( null );
  const [ selectedMemberId, setSelectedMemberId ] = useState<string | null>( null );

  // State for dialogs
  const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState( false );
  const [ isInviteDialogOpen, setIsInviteDialogOpen ] = useState( false );

  const [ email, setEmail ] = useState( '' );
  const [ feedback, setFeedback ] = useState<{ message: string; success: boolean } | null>( null );

  useEffect( () =>
  {
    async function fetchMembers ()
    {
      try
      {
        setLoading( true );

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
          joinedDate: member.joinedDate ? new Date( member.joinedDate ) : null,
          lastLogin: member.lastLogin ? new Date( member.lastLogin ) : null,
          departedAt: member.departedAt ? new Date( member.departedAt ) : null,
          createdAt: member.createdAt ? new Date( member.createdAt ) : null,
          updatedAt: member.updatedAt ? new Date( member.updatedAt ) : null,
          isActive: member.isActive ?? false,
        } ) );

        setMembers( parsedMembers );
      } catch ( error )
      {
        console.error( 'Failed to fetch members:', error );
        setError( 'Failed to fetch members' );
      } finally
      {
        setLoading( false );
      }
    }

    fetchMembers();
  }, [] );

  const handleDelete = async ( memberId: string ) =>
  {
    try
    {
      const response = await deleteMember( memberId );

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
    setIsDeleteDialogOpen( false );
  };

  const openDeleteDialog = ( memberId: string ) =>
  {
    setSelectedMemberId( memberId );
    setIsDeleteDialogOpen( true );
  };

  const handleInvite = async () =>
  {
    setLoading( true );
    const result = await inviteMember( email, user?.organizationId || '' );
    setFeedback( result ); // Show success or error feedback
    setLoading( false );

    if ( result.success )
    {
      // Close dialog after successful invite after a brief delay to show success message
      setTimeout( () =>
      {
        setIsInviteDialogOpen( false );
        setEmail( '' );
      }, 2000 );
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
            <Button
              onClick={ () => setIsInviteDialogOpen( true ) }
              className="block rounded-3xl bg-blue-500 px-3 py-2 text-center text-lg font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              Invite Member
            </Button>
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
                              onClick={ () => openDeleteDialog( member.id ) }
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

      {/* Delete Confirmation Dialog using Shadcn */ }
      <Dialog open={ isDeleteDialogOpen } onOpenChange={ setIsDeleteDialogOpen }>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={ () => setIsDeleteDialogOpen( false ) }
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={ () => selectedMemberId && handleDelete( selectedMemberId ) }
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite Member Dialog using Shadcn */ }
      <Dialog open={ isInviteDialogOpen } onOpenChange={ setIsInviteDialogOpen }>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite New Member</DialogTitle>
            <DialogDescription>
              Enter the email address of the person you'd like to invite to your organization.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={ email }
                onChange={ e => setEmail( e.target.value ) }
                placeholder="colleague@example.com"
                className="col-span-3"
              />
            </div>
            { feedback && (
              <div className={ `col-span-4 text-sm ${ feedback.success ? 'text-green-600' : 'text-red-600' }` }>
                { feedback.message }
              </div>
            ) }
          </div>
          <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={ () =>
              {
                setIsInviteDialogOpen( false );
                setEmail( '' );
                setFeedback( null );
              } }
            >
              Cancel
            </Button>
            <Button
              onClick={ handleInvite }
              disabled={ loading || !email }
            >
              { loading ? 'Sending...' : 'Send Invite' }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}