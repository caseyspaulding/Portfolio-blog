'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent} from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


interface SignUp {
  id: string;
  imageUrl?: string;
  title: string;
  status: string;
  startDate: string;
  endDate: string;
}

const SignUpsComponent = () =>
{
  const [ signUps, setSignUps ] = useState<SignUp[]>( [] );
  const [ loading, setLoading ] = useState( true );

  useEffect( () =>
  {
    const fetchSignUps = async () =>
    {
      try
      {
        const data = await getSignUps();
        setSignUps( data );
      } catch ( error )
      {
        console.error( "Failed to fetch sign-ups", error );
      } finally
      {
        setLoading( false );
      }
    };
    fetchSignUps();
  }, [] );

  const getSignUps = async (): Promise<SignUp[]> => {
    // Replace this with your actual data fetching logic
    return [
      {
        id: '1',
        title: 'Sample Sign Up',
        status: 'Active',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
      },
    ];
  };

  const handleAction = ( action: string, id: string ) =>
  {
    switch ( action )
    {
      case 'duplicate':
        // Duplicate logic here
        break;
      case 'transfer':
        // Transfer logic here
        break;
      case 'delete':
        setSignUps( signUps.filter( ( signUp ) => signUp.id !== id ) );
        break;
      case 'archive':
        // Archive logic here
        break;
      default:
        break;
    }
  };

  if ( loading )
  {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign Ups</h1>
      <Tabs defaultValue="created">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="created">Created</TabsTrigger>
          <TabsTrigger value="invited">Invited To</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        <TabsContent value="created">
          { signUps.length === 0 ? (
            <p>No sign-ups created yet.</p>
          ) : (
            <Card className="bg-yellow-50">
              <CardHeader>
                <h2 className="text-xl font-semibold mb-4">Sign Ups I've Created</h2>
              </CardHeader>
              <CardContent>
                { signUps.map( ( signUp ) => (
                  <div key={ signUp.id } className="flex items-center justify-between mb-4">
                    <img src={ signUp.imageUrl || 'https://via.placeholder.com/150' } alt="Sign Up" className="w-24 h-24 object-cover rounded" />
                    <div className="flex-1 mx-4">
                      <h3 className="text-lg font-semibold text-blue-600 cursor-pointer">{ signUp.title }</h3>
                      <p>{ signUp.status }</p>
                    </div>
                    <div className="text-right">
                      <p>Start: { signUp.startDate }</p>
                      <p>End: { signUp.endDate }</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost">More Actions</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={ () => handleAction( 'duplicate', signUp.id ) }>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem onClick={ () => handleAction( 'transfer', signUp.id ) }>Transfer</DropdownMenuItem>
                        <DropdownMenuItem onClick={ () => handleAction( 'delete', signUp.id ) } className="text-red-600">Delete</DropdownMenuItem>
                        <DropdownMenuItem onClick={ () => handleAction( 'archive', signUp.id ) }>Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) ) }
              </CardContent>
            
                <Button variant="default" className="bg-orange-500 text-white">Past Sign Ups</Button>
                <Button variant="default" className="bg-gray-500 text-white">Archived & Deleted</Button>
             
            </Card>
          ) }
        </TabsContent>
        <TabsContent value="invited">
          <p>Invited To content (to be implemented)</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p>Favorites content (to be implemented)</p>
        </TabsContent>
        <TabsContent value="calendar">
          <p>Calendar content (to be implemented)</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignUpsComponent;
