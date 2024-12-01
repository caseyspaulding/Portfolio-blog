import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { orgEventTickets } from '@/db/schemas/schema';
import { eq } from 'drizzle-orm';

export async function POST ( req: NextRequest )
{
  try
  {
    const { ticketId } = await req.json();

    if ( !ticketId )
    {
      return NextResponse.json( { error: 'Ticket ID is required' }, { status: 400 } );
    }

    // Update the ticket status in the database
    const updatedTicket = await db
      .update( orgEventTickets )
      .set( { checkInStatus: true } )
      .where( eq( orgEventTickets.id, ticketId ) )
      .returning( { id: orgEventTickets.id, checkInStatus: orgEventTickets.checkInStatus } )
      .execute();

    if ( !updatedTicket.length )
    {
      return NextResponse.json( { error: 'Ticket not found or failed to update' }, { status: 404 } );
    }

    return NextResponse.json( { message: 'Ticket checked in successfully', ticket: updatedTicket[ 0 ] } );

  } catch ( error )
  {
    console.error( 'Error processing ticket check-in:', error );
    return NextResponse.json( { error: 'Internal Server Error' }, { status: 500 } );
  }
}
