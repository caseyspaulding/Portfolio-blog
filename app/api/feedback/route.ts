import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendEmail } from '../../../utils/sendEmail';
import { feedbackTable } from '@/db/schemas/schema';
import { db } from '@/db';


export async function POST ( request: NextRequest )
{
  // Extract the access token from the Authorization header
  const authHeader = request.headers.get( 'authorization' );
  if ( !authHeader || !authHeader.startsWith( 'Bearer ' ) )
  {
    return NextResponse.json( { error: 'Unauthorized' }, { status: 401 } );
  }

  const accessToken = authHeader.split( ' ' )[ 1 ];

  // Initialize Supabase client with the user's access token
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${ accessToken }`,
        },
      },
    }
  );

  // Get the user's session
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if ( userError || !user )
  {
    return NextResponse.json( { error: 'Unauthorized' }, { status: 401 } );
  }

  try
  {
    // Parse the form data
    const formData = await request.formData();

    // Extract fields
    const subject = formData.get( 'subject' ) as string;
    const category = formData.get( 'category' ) as string;
    const description = formData.get( 'description' ) as string;
    const attachment = formData.get( 'attachment' ) as File | null;

    // Validate required fields
    if ( !subject || !category || !description )
    {
      return NextResponse.json( { error: 'Missing required fields' }, { status: 400 } );
    }

    let attachmentUrl = null;

    // Upload attachment to Supabase Storage if present
    if ( attachment && attachment.size > 0 )
    {
      const fileName = `feedback/${ Date.now() }_${ attachment.name }`;

      // Convert File to ArrayBuffer
      const buffer = await attachment.arrayBuffer();
      const fileBytes = new Uint8Array( buffer );

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from( 'attachments' )
        .upload( fileName, fileBytes, {
          contentType: attachment.type,
          upsert: false,
        } );

      if ( uploadError )
      {
        console.error( 'Error uploading attachment:', uploadError );
        return NextResponse.json( { error: 'Error uploading attachment' }, { status: 500 } );
      }

      // Get the public URL of the uploaded file
      const { data: publicUrlData } = supabase.storage.from( 'attachments' ).getPublicUrl( fileName );

      attachmentUrl = publicUrlData?.publicUrl;
    }

    
    

    // Save feedback to the database
    await db.insert( feedbackTable ).values( {
      subject,
      category,
      description,
      attachment_url: attachmentUrl,
      user_id: user.id,
    } );

    // Fetch user profile
    const { data: userProfileData, error: userProfileError } = await supabase
      .from( 'user_profiles' )
      .select( '*' )
      .eq( 'user_id', user.id )
      .single();

    if ( userProfileError )
    {
      console.error( 'User profile not found:', userProfileError );
    }

    // Send email notification using AWS SES
    const emailSubject = `New Feedback Received: ${ subject }`;
    const emailBody = `
      <p>You have received new feedback from ${ user.email }.</p>
      ${ userProfileData ? `<p><strong>User Name:</strong> ${ userProfileData.name }</p>` : '' }
      ${ userProfileData ? `<p><strong>Organization:</strong> ${ userProfileData.organizationName }</p>` : '' }
      ${ userProfileData ? `<p><strong>Role:</strong> ${ userProfileData.role }</p>` : '' }
      <p><strong>Category:</strong> ${ category }</p>
      <p><strong>Description:</strong></p>
      <p>${ description }</p>
      ${ attachmentUrl
        ? `<p><strong>Attachment:</strong> <a href="${ attachmentUrl }">View Attachment</a></p>`
        : ''
      }
    `;
    await sendEmail( 'team@eventjacket.com', emailSubject, emailBody );

    return NextResponse.json( { message: 'Feedback submitted successfully' }, { status: 200 } );
  } catch ( error )
  {
    console.error( 'Error handling feedback submission:', error );
    return NextResponse.json( { error: 'Internal Server Error' }, { status: 500 } );
  }
}
