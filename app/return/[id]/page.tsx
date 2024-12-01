'use client';

import Link from 'next/link';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/useWindowSize';

export default function ReturnUrlStripe() {
    const { width, height } = useWindowSize();

    return (
        <div
            style={{
                position: 'relative',
                minHeight: '100vh',
                backgroundImage: "url('/images/happypeople.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {width && height && (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={200}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                />
            )}
            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)' // Optional: adds a semi-transparent white overlay
                }}
            >
                <div className="mx-auto max-w-sm">
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                        <h1 className="mb-4 text-center text-4xl font-bold">
                            Account Link Successful!
                        </h1>
                        <p className="mb-4 text-center text-gray-600">
                            Congrats on linking your account with Stripe to EventJacket!
                        </p>
                        <p className="mb-4 text-center text-gray-600">
                            You can now start selling tickets and receiving funds to your back
                            account!
                        </p>
                        <Link href="/login" passHref>
                            <p className="mt-6 cursor-pointer rounded-md bg-blue-600 px-6 py-2 text-center font-semibold text-white">
                                Go to Login
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
