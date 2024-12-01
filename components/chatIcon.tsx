import React from 'react';
import { useState } from 'react';
import ChatOptions from './chatOptions';

export default function ChatIcon ()
{
  const [ isOpen, setIsOpen ] = useState( false );

  return (
    <>
      <div
        className="fixed bottom-4 right-4 bg-blue-600 rounded-full p-4 cursor-pointer"
        onClick={ () => setIsOpen( !isOpen ) }
      >
        <img src="/chat-icon.svg" alt="Chat" width="30" height="30" />
      </div>

      { isOpen && (
        <div className="fixed bottom-16 right-4 bg-white shadow-lg rounded-lg p-6 w-80">
          <ChatOptions closeChat={ () => setIsOpen( false ) } />
        </div>
      ) }
    </>
  );
}
