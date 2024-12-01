export default function Loading ()
{
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      {/* Video Splash Screen */ }
      <video
        className="h-auto w-full max-w-md"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/RetroSparklesGIF.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */ }
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/images/Logo_Icon.webp"
          alt="Logo"
          className="h-16 w-auto"


        />
        {/* Optionally add loading text */ }
      </div>
    </div>
  );
}