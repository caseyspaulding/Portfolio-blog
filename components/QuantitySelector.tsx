import React from 'react';
import { Button } from '@nextui-org/react';



interface QuantitySelectorProps
{
  quantity: number;
  setQuantity: ( quantity: number ) => void;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ( { quantity, setQuantity, min = 0, max = Infinity } ) =>
{
  const handleDecrement = () =>
  {
    if ( quantity > min )
    {
      setQuantity( quantity - 1 );
    }
  };

  const handleIncrement = () =>
  {
    if ( quantity < max )
    {
      setQuantity( quantity + 1 );
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={ handleDecrement }
        disabled={ quantity <= min }
        className="p-2 bg-gray-200 rounded-full"
        size="sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
        </svg>


      </Button>
      <span className="w-8 text-center font-semibold">{ quantity }</span>
      <Button
        onClick={ handleIncrement }
        disabled={ quantity >= max }
        className="p-2 bg-blue-500 text-white rounded-full"
        size="sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>




      </Button>
    </div>
  );
};

export default QuantitySelector;