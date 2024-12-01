import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ForgotPasswordPage() {
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
                className="sm:max-w-screen-sm md:max-w-screen-sm"
                theme={{ root: { children: 'w-full p-6 sm:p-8 md:p-16' } }}
            >
                <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                    Forgot your password?
                </h2>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Don&apos;t fret! Just type in your email and we will send you a code to reset
                    your password!
                </p>
                <form className="mt-8 space-y-6">
                    <div className="mb-6 flex flex-col gap-y-2">
                        <Label htmlFor="email">Your email</Label>
                        <TextInput
                            id="email"
                            name="email"
                            placeholder="name@company.com"
                            type="email"
                        />
                    </div>
                    <div className="mb-6 flex items-center gap-x-3">
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
