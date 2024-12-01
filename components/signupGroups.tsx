'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createSignupSheetGroup, getSignupSheetGroups, updateSignupSheetGroup, deleteSignupSheetGroup } from '@/app/actions/signupActions'; // Adjust this path as needed
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface SignupSheetGroup
{
  id: string;
  orgId: string;
  name: string;
  description?: string | null;
  settings?: any; // Assuming settings is JSON
}

interface SignupSheetGroupsProps
{
  orgId: string; // Passed from parent component or context
}

export default function SignupSheetGroups ( { orgId }: SignupSheetGroupsProps )
{
  const [ name, setName ] = useState( '' );
  const [ description, setDescription ] = useState( '' );
  const [ settings, setSettings ] = useState( '' );
  const [ groups, setGroups ] = useState<SignupSheetGroup[]>( [] );
  const [ selectedGroup, setSelectedGroup ] = useState<SignupSheetGroup | null>( null );
  const [ loading, setLoading ] = useState( false );
  const [ message, setMessage ] = useState<string | null>( null );

  // State to control the modal
  const [ isModalOpen, setModalOpen ] = useState( false );

  // Fetch all groups for the organization
  useEffect( () =>
  {
    async function fetchGroups ()
    {
      setLoading( true );
      try
      {
        const result = await getSignupSheetGroups( orgId );
        setGroups( result );
      } catch ( error )
      {
        console.error( 'Error fetching groups:', error );
        setMessage( 'Failed to load groups.' );
      }
      setLoading( false );
    }
    fetchGroups();
  }, [ orgId ] );

  // Handle form submission for create/update
  const handleSubmit = async ( event: React.FormEvent ) =>
  {
    event.preventDefault();
    if ( !name )
    {
      setMessage( 'Group name is required.' );
      return;
    }
    setLoading( true );
    try
    {
      if ( selectedGroup )
      {
        // Update existing group
        await updateSignupSheetGroup( selectedGroup.id, {
          name,
          description,
          settings: settings ? JSON.parse( settings ) : undefined,
        } );
        setMessage( 'Group updated successfully.' );
      } else
      {
        // Create new group
        await createSignupSheetGroup( {
          orgId,
          name,
          description,
          settings: settings ? JSON.parse( settings ) : undefined,
        } );
        setMessage( 'Group created successfully.' );
      }
      // Reload groups after successful create/update
      const result = await getSignupSheetGroups( orgId );
      setGroups( result );
      setName( '' ); // Reset form
      setDescription( '' );
      setSettings( '' );
      setSelectedGroup( null );
      setModalOpen( false ); // Close the modal
    } catch ( error )
    {
      console.error( 'Error saving group:', error );
      setMessage( 'Failed to save group.' );
    }
    setLoading( false );
  };

  // Handle group selection for editing
  const handleEdit = ( group: SignupSheetGroup ) =>
  {
    setSelectedGroup( group );
    setName( group.name );
    setDescription( group.description || '' );
    setSettings( JSON.stringify( group.settings || {}, null, 2 ) );
    setModalOpen( true ); // Open modal for editing
  };

  // Handle delete group
  const handleDelete = async ( groupId: string ) =>
  {
    setLoading( true );
    try
    {
      await deleteSignupSheetGroup( groupId );
      setMessage( 'Group deleted successfully.' );
      // Reload groups after deletion
      const result = await getSignupSheetGroups( orgId );
      setGroups( result );
    } catch ( error )
    {
      console.error( 'Error deleting group:', error );
      setMessage( 'Failed to delete group.' );
    }
    setLoading( false );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Groups</h1>
      <p className="mb-4">Use this area to manage your email groups. To send emails to these groups, go to "Messages."</p>

      {/* Feedback message */ }
      { message && <div className="mb-4 text-green-600">{ message }</div> }

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">My Groups</h2>
        <Dialog open={ isModalOpen } onOpenChange={ setModalOpen }>
          <DialogTrigger asChild>
            <Button variant="outline">+ Add New Group</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{ selectedGroup ? 'Edit Group' : 'Add New Group' }</DialogTitle>
            </DialogHeader>
            <form onSubmit={ handleSubmit } className="space-y-4">
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  placeholder="Group Name"
                  value={ name }
                  onChange={ ( e ) => setName( e.target.value ) }
                />
              </div>
              <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter description"
                  value={ description }
                  onChange={ ( e ) => setDescription( e.target.value ) }
                />
              </div>
              <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                <Label htmlFor="settings">Settings (JSON)</Label>
                <Textarea
                  id="settings"
                  placeholder="Enter settings as JSON"
                  value={ settings }
                  onChange={ ( e ) => setSettings( e.target.value ) }
                />
              </div>
              <div className="flex space-x-2 mt-4">
                <Button type="submit" disabled={ loading }>
                  { selectedGroup ? 'Update Group' : 'Create Group' }
                </Button>
                <Button variant="outline" onClick={ () => setModalOpen( false ) }>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* List of groups */ }
      <div className="space-y-4">
        { loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="text-left px-4 py-2">Group Name</th>
                  <th className="text-center px-4 py-2">Members</th>
                  <th className="text-center px-4 py-2">Sign Ups</th>
                  <th className="text-center px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                { groups.length === 0 ? (
                  <tr>
                    <td colSpan={ 4 } className="text-center py-4">
                      No groups found.
                    </td>
                  </tr>
                ) : (
                  groups.map( ( group ) => (
                    <tr key={ group.id } className="border-t">
                      <td className="px-4 py-2">{ group.name }</td>
                      <td className="text-center px-4 py-2">
                        {/* Assuming you have a way to count members */ }
                        <span className="text-gray-600">0</span>
                      </td>
                      <td className="text-center px-4 py-2">
                        {/* Assuming you have a way to count sign-ups */ }
                        <span className="text-gray-600">1</span>
                      </td>
                      <td className="text-center px-4 py-2 flex justify-center space-x-2">
                        <Button variant="outline" onClick={ () => handleEdit( group ) }>
                          Edit
                        </Button>
                        <Button variant="destructive" onClick={ () => handleDelete( group.id ) }>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ) )
                ) }
              </tbody>
            </table>
          </>
        ) }
      </div>
    </div>
  );
}
