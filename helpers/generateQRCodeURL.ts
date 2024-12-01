
import type { OrgTicketType } from '@/types/dbTypes';
import { sendEmail } from '@/utils/sendEmail';
import QRCode from 'qrcode';


export async function generateQRCodeDataURL ( value: string ): Promise<string>
{
  try
  {
    // Generate the QR code as a data URL
    const qrCodeDataURL = await QRCode.toDataURL( value );
    return qrCodeDataURL;
  } catch ( error )
  {
    console.error( 'Failed to generate QR code:', error );
    throw new Error( 'Failed to generate QR code' );
  }
}

export async function sendTicketEmail (

  buyer: {

    email: string;
    firstName: string;
  },
  ticket: OrgTicketType,
  eventName: string,
  description: string,
  eventData: {
    eventDate: string;
    eventVenue: string;
    eventVenueDescription: string;
    eventFAQs: string;
  }
)
{
  console.log( `Sending ticket email to ${ buyer.email, buyer.firstName }` );
  const qrCodeDataURL = await generateQRCodeDataURL(
    `https://eventjacket.com/verify-ticket/${ ticket.id }`
  );

  // Parse FAQs from JSON string to an array
  const faqs = JSON.parse( eventData.eventFAQs ) as Array<{
    question: string;
    answer: string;
  }>;

  // Generate HTML for FAQs
  const faqsHtml = faqs
    .map(
      ( faq ) => `
        <tr>
          <td style="padding: 8px; border: 0px;"><strong>Q:</strong> ${ faq.question }</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 0px;"><strong>A:</strong> ${ faq.answer }</td>
        </tr>
      `
    )
    .join( "" );

  const emailBody = `
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Poppins, sans-serif;
        color: #ffffff;
        background-color: #e9e9e9;
        margin: 0;
        padding: 0;
        border-radius: 12px;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      .container {
        width: 100%;
        max-width: 600px;
        margin: 5 auto;
        border-radius: 12px;
        background-color: #ffffff;
        padding: 20px;
      }

      .header {
        text-align: center;
        padding: 20px 0;
        border-radius: 12px;
        background-color: #ffffff;
        color: white;
      }

      .header img {
        max-width: 150px;
        height: auto;
        display: block;
        margin: 0 auto 10px;
      }

      .content {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        color: #000000;
      }

      .content h2 {
        color: #000000;
        font-size: 24px;
        margin: 0 0 10px 0;
      }

      .content p {
        margin: 0 0 10px 0;
      }

      .highlight {
        color: #ea580c;
      }

      .button {
        display: inline-block;
        background-color: #ea580c;
        color: #fff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 12px;
        margin-top: 20px;
      }

      .qr-code {
        text-align: center;
        margin: 20px 0;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        background-color: #ffffff;
      }

      table td {
        padding: 8px;

        color: #333;
      }

      .footer {
        text-align: center;
        color: #bbb;
        font-size: 12px;
        padding: 20px 0;
      }

      .footer a {
        color: #bbb;
        text-decoration: underline;
      }

      .icon {
        display: block;
        margin: 20px auto;
      }

      .logo {
        width: 80px;

      }

      .logo-footer {
        width: 150px;
      }

      @media screen and (max-width: 600px) {
        .container {
          padding: 10px;
        }

        .content {
          padding: 15px;
        }

        .header img {
          max-width: 120px;
        }

        .content h2 {
          font-size: 20px;
        }

        .button {
          padding: 8px 15px;
        }
      }

      .first-name {
        font-size: 28px;
        margin: 0 0 10px 0;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <!-- Header Section -->
      <div class="header">
        <img src="https://www.eventjacket.com/images/logo-full.webp" class='logo' alt="EventJacket Logo">


      </div>

      <!-- Main Content Section -->
      <div class="content">
        <!-- Custom Message Section -->
        <div class="content" style="margin-top: 20px; text-align: center;">
          <h2 style='font-size: 36px;' class="first-name">${ buyer.firstName },</h2>
          <h2 style="font-size: 28px;">you've got <span
              style="background-color: #fe8522; color: #000; padding: 2px 5px;">Tickets!</span></h2>
          <img src="https://www.eventjacket.com/images/ticketsemail.png" alt="Ticket Icon" class="icon"
            style="max-width: 200px;">
        </div>

        <p>We are excited to have you join us for <strong>${ eventName }</strong>!</p>
        <p>Here are your ticket details:</p>
        <table>
          <tr>
            <td>Event Name:</td>
            <td>${ eventName }</td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>${ description }</td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>${ eventData.eventDate }</td>
          </tr>
          <tr>
            <td>Venue:</td>
            <td>${ eventData.eventVenue }</td>
          </tr>
          <tr>
            <td>Venue Description:</td>
            <td>${ eventData.eventVenueDescription || "N/A" }</td>
          </tr>
          ${ faqsHtml ? `
          <tr>
            <td colspan="2" style="text-align: center; font-size: 28px; font-weight: bold;">FAQs</td>
          </tr>
          ${ faqsHtml }
          ` : "" }
        </table>
        <div class="qr-code">
          <p>Please save this email and present the QR code below for entry:</p>
          <img src="${ qrCodeDataURL }" alt="Your Ticket QR Code" style="max-width: 200px; height: auto;" />
        </div>
        <p>We look forward to seeing you at the event!</p>
        <p>If you have any questions, feel free to contact us at <a href="mailto:support@eventjacket.com"
            style="color: #fe8522; text-decoration: none;">support@eventjacket.com</a>.</p>
      </div>



      <!-- Footer Section -->
      <div class="footer">

        <img src="https://www.eventjacket.com/images/logo-full.png" class='logo-footer' alt="EventJacket Logo">
        <p>EventJacket, Kissimmee, FL. 34747</p>
      </div>
    </div>
  </body>

</html>
  `;

  await sendEmail( buyer.email, `Your Ticket for ${ eventName }`, emailBody );
}
