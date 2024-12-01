
import { Button } from '@nextui-org/button';
import React, { useState, useEffect } from 'react';


const ModalBasic = ( { isOpen, onClose, slug }:
  { isOpen: boolean; onClose: () => void; user: unknown; slug: string } ) =>
{

  const [ isModalOpen, setIsModalOpen ] = useState( isOpen );

  useEffect( () =>
  {
    setIsModalOpen( isOpen );
  }, [ isOpen ] );

  const handleClose = () =>
  {
    setIsModalOpen( false );
    onClose();
  };

  
  if ( !isModalOpen ) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Create Tickets</h2>
        <p>Would you like to create tickets for this event now?</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button onClick={ handleClose } className="px-4 py-2 bg-gray-500 text-white rounded-lg">
            No, Thanks
          </button>
          <Button
            href={ `/dashboard/${ encodeURIComponent( slug ) }/events/${ slug }/create-tickets` }
            as='a'
            className='px-4 py-2 bg-primary text-white rounded-lg'

          
          >
            
              Yes, Create Tickets
          
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalBasic;
