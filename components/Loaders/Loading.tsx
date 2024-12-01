import Image from 'next/image';

export const LoadingScreen = () =>
{
  return (
    <div
      className="flex h-screen flex-col items-center justify-center px-4 bg-cover bg-center"
      style={ { backgroundImage: 'url(/images/illustrations/background-3.jpg)' } }
    >
      <div className="flex flex-col items-center">
        {/* Use Next.js Image component for optimized image loading */ }
        <p className="mt-4 text-2xl sm:text-xl md:text-2xl font-medium text-white text-center">
          We are building your dashboard....
        </p>
        <Image
          src="/GIFs/rocket.webp"
          alt="Loading"
          width={ 1200 }  // Replace with desired width
          height={ 1200 } // Replace with desired height
          className="w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xs"
        />


      </div>
    </div>
  );
};
