import { useState } from 'react';

interface AIChatProps {
  closeChat: () => void;
}

export default function AIChat ( { closeChat }: AIChatProps )
{
  const [ messages, setMessages ] = useState<{ sender: string; content: any }[]>( [] );
  const [ input, setInput ] = useState( '' );

  const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ) =>
  {
    e.preventDefault();

    const response = await fetch( '/api/askAI', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( { question: input } ),
    } );

    const data = await response.json();
    setMessages( ( prevMessages ) => [
      ...prevMessages,
      { sender: 'user', content: input },
      { sender: 'ai', content: data.answer },
    ] );
    setInput( '' );
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">AI Chat</h2>
      <div className="space-y-4">
        { messages.map( ( msg, idx ) => (
          <p key={ idx } className={ msg.sender === 'ai' ? 'text-green-600' : '' }>
            { msg.content }
          </p>
        ) ) }
      </div>

      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          value={ input }
          onChange={ ( e ) => setInput( e.target.value ) }
          className="w-full p-2 border rounded-md"
          placeholder="Ask me anything..."
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2 rounded-md">
          Send
        </button>
      </form>
      <button onClick={ closeChat } className="mt-4 text-red-500">Close Chat</button>
    </div>
  );
}
