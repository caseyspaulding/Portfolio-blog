
import NavBar from '@/components/NavBar';
import NewQRCodeGenerator from '@/components/NewQRCodeGenerator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FREE QR Code Generator - CaseySpaulding',
    description:
        "Generate a free QR code for your event, business, or personal use. CaseySpaulding's QR code generator is easy to use and free."
};

export default function QRCode ()
{
    return (
        <div>
          <NavBar />
            <NewQRCodeGenerator />
           
        </div>
    );
}
