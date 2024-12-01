'use server';

import { db } from '@/db';
import { ticketBuyerProfiles } from '@/db/schemas/schema';


export const registerAttendee = async ( formData: FormData ) =>
{
  const userId = formData.get( 'userId' ) as string; // Ensure you get the user ID from context or session
  const fullName = formData.get( 'fullName' ) as string;
  const contactNumber = formData.get( 'contactNumber' ) as string;

  // Input validation
  if ( !fullName || !contactNumber )
  {
    return { success: false, message: 'All fields are required' };
  }

  try
  {
    await db.insert( ticketBuyerProfiles ).values( {
      userId,
      contactNumber,
      // ... other attendee fields
    } );

    return { success: true, message: 'Attendee registration complete!' };
  } catch ( error )
  {
    console.error( 'Error during attendee registration:', error );
    return { success: false, message: 'Could not complete registration' };
  }
};
