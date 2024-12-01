import FooterFull from '@/components/Footers/FooterFull';
import HeaderCentered from '@/components/HeaderCentered';
import NavBar1 from '@/components/NavBarTW/NavBar1';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Affiliate Program - EventJacket',
    description: 'Earn money by referring customers to EventJacket'
};

export default function AffiliatePage() {
    return (
        <div className=''>
            <NavBar1 />
            <HeaderCentered
                title="Affiliate Program"
                description="Earn money by referring customers to EventJacket"
            />

            <div className=" mx-auto max-w-7xl px-4">
                <div className="py-20">
                    <h2 className="text-center text-5xl mb-8 font-extrabold ">Coming Soon!</h2>
                    <h2 className="text-2xl font-bold">How it works</h2>
                    <p className="mt-4">
                        You will receive a unique link that you can share with your audience. When
                        someone signs up for EventJacket using your link, you will earn a commission
                        on their subscription fees.
                    </p>

                    <h2 className="mt-8 text-2xl font-bold">How much can I earn?</h2>
                    <p className="mt-4">
                        You will earn 20% of the subscription fees for each customer that signs up
                        using your link.
                    </p>

                    <h2 className="mt-8 text-2xl font-bold">How do I get paid?</h2>
                    <p className="mt-4">Commissions are paid out monthly via PayPal.</p>

                    <h2 className="mt-8 text-2xl font-bold">How do I get started?</h2>
                    <p className="mt-4">
                        To get started, sign up for the affiliate program and we will provide you
                        with your unique link.
                    </p>

                    <div className="mt-8">
                        <a href="#" className="rounded bg-blue-500 px-4 py-2 font-bold text-white">
                            Sign up now
                        </a>

                        <p className="mt-4">
                            Already an affiliate?{' '}
                            <a href="#" className="text-blue-500">
                                Log in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <FooterFull />
        </div>
    );
}
