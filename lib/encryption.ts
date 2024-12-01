/* eslint-disable @typescript-eslint/no-explicit-any */
import { sealData, unsealData } from 'iron-session';

const SECRET_KEY = process.env.IRON_SESSION_PASSWORD || 'the-quick-brown-fox-jumps-over-the-lazy-dog';

export async function encryptData ( data: any ): Promise<string>
{
  return sealData( data, {
    password: SECRET_KEY,
  } );
}

export async function decryptData ( sealedData: string ): Promise<any>
{
  return unsealData( sealedData, {
    password: SECRET_KEY,
  } );
}