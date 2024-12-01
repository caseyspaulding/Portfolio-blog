import FooterFull from '@/components/Footers/FooterFull';
import NavBar1 from '@/components/NavBarTW/NavBar1';
import NewQRCodeGenerator from '@/components/NewQRCodeGenerator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FREE QR Code Generator - EventJacket',
    description:
        "Generate a free QR code for your event, business, or personal use. EventJacket's QR code generator is easy to use and free."
};

export default function QRCode() {
    return (
        <div>
            <NavBar1 />
            <NewQRCodeGenerator />
            <FooterFull />
        </div>
    );
}
