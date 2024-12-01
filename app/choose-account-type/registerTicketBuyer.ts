"use server";

import { db } from "@/db";
import { ticketBuyerProfiles } from "@/db/schemas/schema";
import { createClient } from "@/utils/supabase/server";
import { eq } from "drizzle-orm";

export const registerTicketBuyer = async () =>
{
  const supabase = await createClient();

  // Get the authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if ( authError || !user )
  {
    console.error( "Authentication error:", authError );
    return { success: false, message: "User not authenticated" };
  }

  const userId = user.id;

  try
  {
    // Check if the ticket buyer profile already exists
    const existingProfile = await db
      .select()
      .from( ticketBuyerProfiles )
      .where( eq( ticketBuyerProfiles.userId, userId ) )
      .then( ( result ) => result[ 0 ] ); // Drizzle ORM returns an array, get the first item

    if ( existingProfile )
    {
      return { success: true, userId }; // Profile already exists
    }

    // Create a new ticket buyer profile
    await db.insert( ticketBuyerProfiles ).values( {
      userId,
      // other fields can be added later by the user in their dashboard
    } );


    return { success: true, userId };
  } catch ( error )
  {
    console.error( "Error during registration:", error );
    return { success: false, message: "Could not complete registration" };
  }
};
