// app/api/upload-image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST ( request: NextRequest )
{
  try
  {
    const formData = await request.formData();
    const file = formData.get( 'image' ) as File;

    if ( !file )
    {
      return NextResponse.json(
        { success: false, message: 'No image file provided' },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join( process.cwd(), 'public', 'uploads' );
    await mkdir( uploadsDir, { recursive: true } );

    // Generate unique filename
    const uniqueId = uuidv4();
    const fileName = file.name.replace( /\s+/g, '-' ).toLowerCase();
    const fileExt = path.extname( fileName );
    const uniqueFileName = `${ uniqueId }${ fileExt }`;
    const filePath = path.join( uploadsDir, uniqueFileName );

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from( bytes );
    await writeFile( filePath, buffer );

    // Return the image URL (relative to public folder)
    const imageUrl = `/uploads/${ uniqueFileName }`;

    return NextResponse.json( {
      success: true,
      imageUrl,
      message: 'Image uploaded successfully'
    } );
  } catch ( error )
  {
    console.error( 'Error uploading image:', error );
    return NextResponse.json(
      { success: false, message: 'Failed to upload image' },
      { status: 500 }
    );
  }
}