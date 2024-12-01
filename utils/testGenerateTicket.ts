// testGenerateTicket.ts
import fs from 'fs';
import { generateCustomizedTicket } from '@/utils/generateCustomizedTicket'; // Adjust the import path as needed

async function runTest ()
{
  const ticketData = {
    customerName: 'John Doe',
    eventName: 'Really Great Concert',
    eventDate: 'October 14, 2025',
    eventTime: '4:00 pm',
    price: '70.00',
    address: 'Studio Shodwe, 123 Anywhere St, Any city',
    qrCodeText: 'https://www.example.com/verify/123456',
    ticketNumber: '0123456789',
  };

  try
  {
    const ticketImageDataURL = await generateCustomizedTicket( ticketData );

    // To save the image locally as a PNG file
    const base64Data = ticketImageDataURL.replace( /^data:image\/png;base64,/, '' );
    fs.writeFileSync( 'generated-ticket.png', base64Data, 'base64' );

    console.log( 'Ticket image generated successfully!' );
  } catch ( error )
  {
    console.error( 'Error generating ticket:', error );
  }
}

runTest();
