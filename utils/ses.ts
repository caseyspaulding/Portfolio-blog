import type { SendEmailCommandInput, SendEmailCommandOutput } from "@aws-sdk/client-ses";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Initialize the SES client
const sesClient = new SESClient( {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
} );

// Define the sendEmail function with proper typing
export async function sendEmail ( to: string, subject: string, body: string ): Promise<SendEmailCommandOutput>
{
    const params: SendEmailCommandInput = {
        Source: 'team@yourdomain.com', // Replace with your SES-verified email address
        Destination: {
            ToAddresses: [ to ], // Customer's email address
        },
        Message: {
            Subject: {
                Data: subject, // Email subject, like "Your Ticket Information"
                Charset: 'UTF-8',
            },
            Body: {
                Html: {
                    Data: body, // Email body containing the ticket details
                    Charset: 'UTF-8',
                },
            },
        },
    };

    try
    {
        const command = new SendEmailCommand( params );
        const result = await sesClient.send( command );
        console.log( 'Email sent successfully:', result );
        return result;
    } catch ( error: any )
    {
        console.error( 'Error sending email:', error );
        throw new Error( error.message );
    }
}
