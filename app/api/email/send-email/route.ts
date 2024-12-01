import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendEmail'; // Adjust this path as necessary

export async function POST ( request: Request )
{
    try
    {
        // Parse the request body to get the email details
        const { to, subject, body } = await request.json();

        // Send the email using the utility function
        await sendEmail( to, subject, body );

        // Return a success response
        return NextResponse.json( { message: 'Email sent successfully' } );
    } catch ( error: unknown )
    {
        console.error( 'Failed to send email:', error );
        return NextResponse.json(
            { message: 'Failed to send email', error },
            { status: 500 }
        );
    }
}
