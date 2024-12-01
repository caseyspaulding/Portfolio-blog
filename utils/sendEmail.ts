import type { SendEmailCommandInput } from "@aws-sdk/client-ses";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";


// Initialize the SES client
const sesClient = new SESClient( {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
} );

export async function sendEmail (
  to: string,
  subject: string,
  body: string
): Promise<void>
{
  const params: SendEmailCommandInput = {
    Source: 'team@eventjacket.com', // Replace with your SES-verified email address
    Destination: {
      ToAddresses: [ to ], // Customer's email address
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: body, // Email body content
          Charset: 'UTF-8',
        },
      },
    },
  };

  try
  {
    const command = new SendEmailCommand( params );
    await sesClient.send( command );
    console.log( 'Email sent successfully' );
  } catch ( error: unknown )
  {
    console.error( 'Error sending email:', error );
    throw new Error( 'Failed to send email' );
  }
}

