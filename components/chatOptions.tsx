import { useState } from "react";
import LiveChat from "./liveChat";
import AIChat from "./aiChat";

interface ChatOptionsProps {
  closeChat: () => void;
}

export default function ChatOptions ( { closeChat }: ChatOptionsProps )
{
  const [ chatType, setChatType ] = useState( '' );

  if ( chatType === 'ai' )
  {
    return <AIChat closeChat={ closeChat } />;
  }

  if ( chatType === 'live' )
  {
    return <LiveChat closeChat={ closeChat } />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Select Chat Type</h2>
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
        onClick={ () => setChatType( 'live' ) }
      >
        Live Chat
      </button>
      <button
        className="w-full py-2 px-4 bg-green-500 text-white rounded-md"
        onClick={ () => setChatType( 'ai' ) }
      >
        AI Chat
      </button>
    </div>
  );
}
