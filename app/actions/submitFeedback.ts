'use server';

import { createClient } from '@/utils/supabase/server';
import { sendEmail } from '@/utils/sendEmail';

export async function submitFeedback ( formData: FormData )
{
  const supabase = await createClient();

  // Extract form data
  const subject = formData.get( 'subject' ) as string;
  const category = formData.get( 'category' ) as string;
  const description = formData.get( 'description' ) as string;
  const attachmentUrl = formData.get( 'attachmentUrl' ) as string; // Attachment URL from hidden input

  if ( !subject || !category || !description )
  {
    throw new Error( 'Missing required fields' );
  }

  // Fetch the authenticated user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const userId = userData?.user?.id;
  const userName = userData?.user?.user_metadata?.full_name;
  if ( userError || !userId )
  {
    console.error( 'User authentication error:', userError );
    throw new Error( 'User authentication failed' );
  }

  // Store feedback in the database
  await supabase.from( 'feedback' ).insert( {
    subject,
    category,
    description,
    attachment_url: attachmentUrl,
    user_id: userId,
  } );

  // Fetch user profile for email notification
  const { data: userProfileData } = await supabase
    .from( 'user_profiles' )
    .select( '*' )
    .eq( 'user_id', userId )
    .single();

  // Send email notification
  const emailSubject = `New Feedback Received: ${ subject }`;
  const emailBody = `
    <p>You have received new feedback from ${ userName }.</p>
    <p><strong>Category:</strong> ${ category }</p>
    <p><strong>Description:</strong></p>
    <p>${ description }</p>
    ${ attachmentUrl ? `<p><strong>Attachment:</strong> <a href="${ attachmentUrl }">View Attachment</a></p>` : '' }
  `;
  await sendEmail( 'team@eventjacket.com', emailSubject, emailBody );
}
