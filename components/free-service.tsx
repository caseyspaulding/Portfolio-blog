export default function FreeServices ()
{
  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Completely Free Service!</h2>
      <p className="text-lg md:text-xl text-center mb-8">
        <span className="bg-white text-blue-600 px-2 py-1 rounded">But..how?</span>
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        <ul className="space-y-2">
          
          <li className="flex items-start">
            <span className="mr-2">•</span>
            No setup charges
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            No monthly charges
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            No private label charges
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            No onboarding charges
          </li>
        </ul>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            No training charges
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            No provisioning charges
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            No annual maintenance charges
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            No customer support charges
          </li>
        </ul>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            No per user charges
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            No feature-based pricing
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            No software development charges
          </li>
          
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Service fees are paid by attendees/donors with 50 cents added per transaction
          </li>
        </ul>
      </div>
    </div>
  )
}