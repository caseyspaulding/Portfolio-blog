// components/SplashScreen.tsx
import React from 'react';

const SplashScreen = () =>
{
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* Add your animated GIF or spinner here */ }
      <img src="/path/to/your/animated-gif.gif" alt="Loading..." className="h-48 w-48" />
      {/* Alternatively, use a spinner */ }
      {/* <div className="loader">Loading...</div> */ }
    </div>
  );
};

export default SplashScreen;
