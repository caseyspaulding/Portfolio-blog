"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { registerTicketBuyer } from "./registerTicketBuyer"; // Server action for registering ticket buyer


export default function ChooseAccountType ()
{
  const router = useRouter();

  const handleAttendeeRegistration = async () =>
  {
    // Call server action to create ticket buyer profile
    const result = await registerTicketBuyer();

    if ( result.success )
    {
      // Redirect to the ticket buyer's dashboard
      router.push( `/${ result.userId }/dashboard` );
    } else
    {
      console.error( result.message );
    }
  };

  const handleOrganizationRegistration = () =>
  {
    router.push( "/registration/organization" ); 
  };

  return (
    <div
      className="flex h-screen flex-col items-center justify-center px-4 bg-cover bg-center"
      style={ { backgroundImage: 'url(/images/illustrations/background-3.jpg)' } }
    >
      <div className="flex h-screen flex-col items-center justify-center px-4">
        
       
        <div className="mt-2 flex w-full max-w-sm flex-col bg-white gap-4 rounded-3xl px-8 py-6 shadow-2xl text-center">
          <img src="/images/Logo_Icon.webp" alt="Logo" className="w-12 h-12 mx-auto" />
        <h1 className="text-2xl font-bold text-blue-700">Choose Account Type</h1>
        <p className="text-lg text-gray-800">Are you attending events or creating events?</p>
        <div className="flex flex-row justify-center gap-6 mt-6">
          <Button
            onClick={ handleAttendeeRegistration }
            className="flex flex-col items-center justify-center w-24 h-24 bg-blue-500 hover:bg-blue-600 text-white shadow-2xl"
            ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
              </svg>


           
            <span className="text-lg">Attend</span>
          </Button>
          <Button
            onClick={ handleOrganizationRegistration }
              className="flex flex-col items-center shadow-2xl justify-center w-24 h-24 bg-blue-500 hover:bg-blue-600 text-white"
          >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
              </svg>

            <span className="text-lg">Create  </span>
          </Button>
        </div>
      </div>
      </div>
      </div>
  );
}
