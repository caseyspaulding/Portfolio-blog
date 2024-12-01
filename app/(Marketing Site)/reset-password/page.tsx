import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Reset Password - EventJacket',
    description: 'Reset your password for your EventJacket account.'
};
export default function ResetPasswordPage() {
    return (
        <div className="mx-auto flex flex-col items-center justify-center px-6 pt-8 md:h-screen">
            <Link
                href="/"
                className="mb-8 flex items-center justify-center text-2xl font-semibold dark:text-white lg:mb-10"
            >
                <Image alt="" src="/images/logo.svg" width={43} height={44} className="mr-4 h-11" />
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                    Flowbite
                </span>
            </Link>
            <Card
                horizontal
                imgAlt=""
                imgSrc="/images/authentication/reset-password.jpg"
                className="w-full md:max-w-screen-lg"
                theme={{
                    root: {
                        children: 'my-auto w-full gap-0 space-y-8 p-6 sm:p-8 lg:p-16'
                    },
                    img: {
                        horizontal: {
                            on: 'hidden w-2/3 rounded-l-lg md:w-96 md:p-0 lg:block'
                        }
                    }
                }}
            >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                    Reset your password
                </h2>
                <form className="mt-8 space-y-6">
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="email">Your email</Label>
                        <TextInput
                            id="email"
                            name="email"
                            placeholder="name@company.com"
                            type="email"
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="newPassword">New password</Label>
                        <TextInput
                            id="newPassword"
                            name="newPassword"
                            placeholder="••••••••"
                            type="password"
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                        <TextInput
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            placeholder="••••••••"
                            type="password"
                        />
                    </div>
                    <div className="flex items-center gap-x-3">
                        <Checkbox id="acceptTerms" name="acceptTerms" />
                        <Label htmlFor="acceptTerms">
                            I accept the&nbsp;
                            <Link
                                href="#"
                                className="text-primary-700 hover:underline dark:text-primary-500"
                            >
                                Terms and Conditions
                            </Link>
                        </Label>
                    </div>
                    <div>
                        <Button
                            size="lg"
                            color="blue"
                            type="submit"
                            theme={{ inner: { base: 'px-5 py-3' } }}
                            className="w-full px-0 py-px sm:w-auto"
                        >
                            Reset password
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
