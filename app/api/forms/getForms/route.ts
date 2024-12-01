// app/api/forms/get-forms/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST ( request: Request )
{
  const { organizationId } = await request.json();

  // Validate the organizationId
  if ( !organizationId )
  {
    return NextResponse.json( { success: false, message: 'Organization ID is required' }, { status: 400 } );
  }

  const supabase = await createClient();

  try
  {
    const { data: formsData, error: formsError } = await supabase
      .from( 'forms' )
      .select( '*' )
      .eq( 'org_id', organizationId );

    if ( formsError )
    {
      console.error( 'Failed to fetch forms:', formsError );
      return NextResponse.json( { success: false, message: 'Failed to fetch forms' }, { status: 500 } );
    }

    return NextResponse.json( { success: true, forms: formsData } );
  } catch ( error )
  {
    console.error( 'Error fetching forms:', error );
    return NextResponse.json( { success: false, message: 'Failed to fetch forms' }, { status: 500 } );
  }
}
