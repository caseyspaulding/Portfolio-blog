import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUpPage ()
{
    return (
        <div className="mx-auto flex flex-col items-center justify-center px-6 pt-8 md:h-screen">
            <Link
                href="/"
                className="mb-8 flex items-center justify-center text-2xl font-semibold dark:text-white lg:mb-10"
            >
                <Image alt="" src="/images/logo.svg" width={ 43 } height={ 44 } className="mr-4 h-11" />
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                    EventJacket
                </span>
            </Link>
            <Card
                horizontal
                imgSrc="/images/authentication/create-account.jpg"
                imgAlt=""
                className="w-full md:max-w-screen-lg"
                theme={ {
                    root: {
                        children: 'my-auto w-full gap-0 space-y-8 p-6 sm:p-8 lg:p-16'
                    },
                    img: {
                        horizontal: {
                            on: 'hidden rounded-l-lg md:w-96 md:p-0 lg:block'
                        }
                    }
                } }
            >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                    Create a Free Account
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
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="confirmPassword">Confirm password</Label>
                        <TextInput
                            id="confirmPassword"
                            name="confirmPassword"
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
                    <div className="mb-7">
                        <Button
                            size="lg"
                            color="blue"
                            type="submit"
                            theme={ { inner: { base: 'px-5 py-3' } } }
                            className="w-full px-0 py-px sm:w-auto"
                        >
                            Create account
                        </Button>
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Already have an account?&nbsp;
                        <Link
                            href="#"
                            className="text-primary-700 hover:underline dark:text-primary-500"
                        >
                            Login here
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
}
