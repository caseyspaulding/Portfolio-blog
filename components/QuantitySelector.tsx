import React from 'react';
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';


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
        variant="outline"
        size="icon"
        className="rounded-full bg-gray-200"
      >
        <Minus className="h-6 w-6" />
      </Button>

      <span className="w-8 text-center font-semibold">{ quantity }</span>

      <Button
        onClick={ handleIncrement }
        disabled={ quantity >= max }
        size="icon"
        className="rounded-full bg-blue-500"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default QuantitySelector;