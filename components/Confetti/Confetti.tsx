'use client';

import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/useWindowSize';

export default function ConfettiComponent ()
{
  const { width, height } = useWindowSize();

  return (
    <>
      { width && height && (
        <Confetti
          width={ width }
          height={ height }
          recycle={ false }
          numberOfPieces={ 200 }
          style={ { position: 'absolute', top: 0, left: 0 } }
        />
      ) }
    </>
  );
}
