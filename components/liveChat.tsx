import { useEffect, useState } from 'react';
import { createClient } from '@utils/supabase/client';

interface LiveChatProps
{
  closeChat: () => void;
}

function LiveChat ( { closeChat }: LiveChatProps )
{
  const supabase = createClient();
  const [ messages, setMessages ] = useState<{ content: string; sender: string }[]>( [] );
  const [ input, setInput ] = useState( '' );

  useEffect( () =>
  {
    const channel = supabase
      .channel( 'realtime-chat' )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        ( payload ) =>
        {
          setMessages( ( currentMessages ) => [ ...currentMessages, payload.new as { content: string; sender: string } ] );
        }
      )
      .subscribe();

    return () =>
    {
      supabase.removeChannel( channel );
    };
  }, [] );

  const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ) =>
  {
    e.preventDefault();
    await sendMessage( input, 'user_id' ); // Replace 'user_id' with actual user ID
    setInput( '' );
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Live Chat</h2>
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
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2 rounded-md">
          Send
        </button>
      </form>
      <button onClick={ closeChat } className="mt-4 text-red-500">Close Chat</button>
    </div>
  );
}

async function sendMessage ( content: string, senderId: string )
{
  const supabase = createClient();
  const { data, error } = await supabase
    .from( 'messages' )
    .insert( [ { content, sender_id: senderId, delivery_method: 'chat' } ] );

  if ( error ) console.error( error );
}

export default LiveChat;
