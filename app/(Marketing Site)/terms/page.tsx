import FooterFull from '@/components/Footers/FooterFull';
import HeaderCentered from '@/components/HeaderCentered';
import NavBar1 from '@/components/NavBarTW/NavBar1';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service - EventJacket',
    description:
        'Read the Terms of Service for EventJacket, a cloud-based event management software solution.'
};

export default function PrivacyPolicy() {
    return (
        <>
            <NavBar1 />
            <HeaderCentered
                title="Terms of Service"
                description='Welcome to EventJacket ("Service"). By accessing or using our Service, you agree to comply with and be bound by these Terms of Service ("Terms"). If you do not agree with these Terms, please do not use the Service.'
            />
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-7 max-w-7xl bg-white p-6 text-gray-800 ">
                    <h2 className="mb-4 text-xl font-bold">Description of Service</h2>
                    <p className="mb-6">
                        Event Jacket provides a cloud-based software solution designed to assist
                        event organizers in managing their operations, ticketing, communications,
                        marketing, invoicing, and other related tasks.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">User Account</h2>
                    <p className="mb-6">
                        To use our Service, you must create an account. You agree to provide
                        accurate, current, and complete information during the registration process
                        and to update such information to keep it accurate, current, and complete.
                        You are responsible for safeguarding your account credentials and are solely
                        responsible for any activity that occurs under your account.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">Usage and Restriction</h2>
                    <p className="mb-6">
                        You agree not to use the Service for any unlawful or unauthorized purpose.
                        You shall not modify, adapt, translate, or reverse engineer any part of the
                        Service. You shall not attempt to gain unauthorized access to any part of
                        the Service or its related systems.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">Payment and Subscription</h2>
                    <p className="mb-6">
                        Access to the Service may require payment of subscription fees. By
                        subscribing, you authorize us to charge your chosen payment method on a
                        recurring basis until you cancel your subscription. You agree that
                        subscription fees are non-refundable.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">Data and Privacy</h2>
                    <p className="mb-6">
                        We may collect and process certain information about you and your usage of
                        the Service. Please review our Privacy Policy to understand how we handle
                        your data and protect your privacy.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">Content Ownership</h2>
                    <p className="mb-6">
                        You retain ownership of the data you upload to the Service. By using the
                        Service, you grant us a non-exclusive, worldwide, royalty-free license to
                        use, reproduce, and distribute your content solely for the purpose of
                        providing and improving the Service.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">Intellectual Property</h2>
                    <p className="mb-6">
                        The Service and its original content, features, and functionality are and
                        will remain the exclusive property of Event Jacket. The Service is protected
                        by copyright, trademark, and other laws.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">Termination</h2>
                    <p className="mb-6">
                        We reserve the right to suspend or terminate your account and access to the
                        Service at our sole discretion, without notice or liability, for any reason
                        including breach of these Terms.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">Disclaimer</h2>
                    <p className="mb-6">
                        The Service is provided "as is" and "as available" without warranties of any
                        kind, either expressed or implied, including but not limited to, implied
                        warranties of merchantability, fitness for a particular purpose, or
                        non-infringement.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">Limitation of Liability</h2>
                    <p className="mb-6">
                        In no event shall Event Jacket or its directors, employees, partners, or
                        suppliers be liable for any indirect, incidental, special, consequential, or
                        punitive damages, including without limitation, loss of profits, data loss,
                        goodwill, or other intangible losses.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">Changes to Terms</h2>
                    <p className="mb-6">
                        We reserve the right to modify or replace these Terms at any time. Your
                        continued use of the Service after any changes constitutes acceptance of the
                        modified Terms.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">Governing Authority</h2>
                    <p className="mb-6">
                        These Terms shall be governed and construed in accordance with the laws of
                        the State of Florida, United States of America, without regard to its
                        conflict of law provisions.
                    </p>

                    <h2 className="mb-4 text-xl font-bold">Contact Information</h2>
                    <p className="mb-6">
                        If you have any questions about these Terms, please contact us at
                        admin@eventjacket.com
                    </p>

                    <p className="mt-6">
                        By using the Service, you acknowledge that you have read, understood, and
                        agreed to these Terms of Service.
                    </p>

                    <p className="mt-2 font-semibold">Effective Date: August 1, 2024</p>
                </div>
            </div>
            <FooterFull />
        </>
    );
}
