// app/api/stripe/payoutsession/route.ts

import { fetchPayoutsClientSecret } from '@/app/actions/fetchPayoutsClientSecret';
import { NextResponse } from 'next/server';

export async function POST ( req: Request )
{
  try
  {
    const { orgId } = await req.json();
    const clientSecret = await fetchPayoutsClientSecret( orgId );
    return NextResponse.json( { client_secret: clientSecret } );
  } catch ( error )
  {
    return NextResponse.json( { error }, { status: 500 } );
  }
}
