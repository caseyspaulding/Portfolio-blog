'use client';

import React, { useState, useEffect } from "react";
import styles from './Countdown.module.css'; // Import the CSS module

interface CountdownProps
{
  startDate: string; // Format: "Month Day, Year HH:mm:ss"
  color?: string; // Prop for text color
  labelColor?: string; // Prop for label text color
  endMessage?: string; // Message to display when the countdown ends
}

const Countdown: React.FC<CountdownProps> = ( {
  startDate,
  color = "text-black", // Default text color
  labelColor = "text-gray-600", // Default label color
  endMessage = "Event has started or ended.", // Default end message
} ) =>
{
  const calculateTimeLeft = () =>
  {
    const startDateTime = new Date( startDate ).getTime(); // Use the startDate prop
    const now = new Date().getTime();
    const timeRemaining = startDateTime - now;

    if ( timeRemaining > 0 )
    {
      const days = Math.floor( timeRemaining / ( 1000 * 60 * 60 * 24 ) );
      const hours = Math.floor(
        ( timeRemaining % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 )
      );
      const minutes = Math.floor(
        ( timeRemaining % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 )
      );
      const seconds = Math.floor( ( timeRemaining % ( 1000 * 60 ) ) / 1000 );

      return { days, hours, minutes, seconds };
    } else
    {
      return null; // Return null when the countdown ends
    }
  };

  const [ countdown, setCountdown ] = useState( calculateTimeLeft() );

  useEffect( () =>
  {
    const interval = setInterval( () =>
    {
      setCountdown( calculateTimeLeft() );
    }, 1000 );

    return () => clearInterval( interval );
  }, [ startDate ] );

  if ( !countdown )
  {
    return <div>{ endMessage }</div>; // Display end message when countdown ends
  }

  return (
    <div className='text-center ' > {/* Apply the custom font here */ }
      <div className="flex flex-wrap gap-3">
        <div className="flex flex-col">
          <span className={ `text-5xl  text-center ${ styles.customFont } font-bold ${ color }` }>{ countdown.days }</span>
          <span className={ `text-lg ${ labelColor }` }>Days</span>
        </div>
        <div className="flex flex-col">
          <span className={ `text-5xl text-center ${ styles.customFont } font-bold ${ color }` }>{ countdown.hours }</span>
          <span className={ `text-lg ${ labelColor }` }>Hours</span>
        </div>
        <div className="flex flex-col">
          <span className={ `text-5xl text-center ${ styles.customFont } font-bold ${ color }` }>{ countdown.minutes }</span>
          <span className={ `text-lg ${ labelColor }` }>Minutes</span>
        </div>
        <div className="flex flex-col">
          <span className={ `text-5xl text-center ${ styles.customFont } font-bold ${ color }` }>{ countdown.seconds }</span>
          <span className={ `text-lg ${ labelColor }` }>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
