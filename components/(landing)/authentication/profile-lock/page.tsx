import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { HiLockOpen } from 'react-icons/hi';

export default function ProfileLockPage() {
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
                className="w-full sm:max-w-screen-sm md:max-w-screen-sm md:flex-row"
                theme={{ root: { children: 'w-full p-6 sm:p-8 md:p-16' } }}
            >
                <div className="flex space-x-4">
                    <Image
                        alt=""
                        width={32}
                        height={32}
                        src="/images/users/bonnie-green.png"
                        className="h-8 w-8 rounded-full"
                    />
                    <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                        Bonnie Green
                    </h2>
                </div>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Better to be safe than sorry.
                </p>
                <form className="mt-8 space-y-6">
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="password">Your password</Label>
                        <TextInput
                            id="password"
                            name="password"
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
                            theme={{ inner: { base: 'flex items-center px-5 py-3' } }}
                            className="w-full px-0 py-px sm:w-auto"
                        >
                            <HiLockOpen className="mr-2 text-xl" />
                            Unlock
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
