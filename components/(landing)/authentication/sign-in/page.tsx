import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
    return (
        <div className="mx-auto flex flex-col items-center justify-center px-6 pt-8 md:h-screen">
            <Link
                href="/"
                className="mb-8 flex items-center justify-center text-2xl font-semibold dark:text-white lg:mb-10"
            >
                <Image alt="" src="/images/logo.svg" width={43} height={44} className="mr-4 h-11" />
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                    EventJacket
                </span>
            </Link>
            <Card
                horizontal
                imgAlt=""
                imgSrc="/images/authentication/login.jpg"
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
                    Sign in to platform
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
                        <Label htmlFor="password">Your password</Label>
                        <TextInput
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            type="password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-3">
                            <Checkbox id="rememberMe" name="rememberMe" />
                            <Label htmlFor="rememberMe">Remember me</Label>
                        </div>
                        <Link
                            href="#"
                            className="text-right text-sm text-primary-700 hover:underline dark:text-primary-500"
                        >
                            Lost Password?
                        </Link>
                    </div>
                    <div className="mb-6">
                        <Button
                            size="lg"
                            color="blue"
                            type="submit"
                            theme={{ inner: { base: 'px-5 py-3' } }}
                            className="w-full px-0 py-px sm:w-auto"
                        >
                            Login to your account
                        </Button>
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Not registered?&nbsp;
                        <Link
                            href="#"
                            className="text-primary-700 hover:underline dark:text-primary-500"
                        >
                            Create account
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
}
