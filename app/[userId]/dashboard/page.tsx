import { Button } from "@nextui-org/button";


export default function UserDashboard ()
{
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Welcome to Your Dashboard!
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Explore the latest events and manage your tickets.
        </p>
        <div className="flex flex-col items-center space-y-4">
          <Button href="/events">
            <a className="w-full inline-block text-center bg-orange-500 text-white font-medium py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300">
              Checkout Events
            </a>
          </Button>
          {/* You can add more links or buttons here for other user actions */ }
          <Button href="/my-tickets">
            <a className="w-full inline-block text-center bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
              View My Tickets
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
