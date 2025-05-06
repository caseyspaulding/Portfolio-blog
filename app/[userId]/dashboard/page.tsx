import { Button } from "@/components/ui/button"; // Changed to shadcn Button

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
          {/* Changed to shadcn Button pattern with asChild */ }
          <Button
            asChild
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            <a href="/events">Checkout Events</a>
          </Button>

          {/* Changed to shadcn Button pattern with asChild */ }
          <Button
            asChild
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            <a href="/my-tickets">View My Tickets</a>
          </Button>
        </div>
      </div>
    </div>
  );
}