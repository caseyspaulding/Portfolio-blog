"use client"

import React, { useState, useRef, useEffect } from 'react'
import { format, parse, addMinutes } from 'date-fns'
import { Clock } from 'lucide-react'

interface TimePickerProps
{
  id?: string
  value?: string
  onChange?: ( time: string ) => void
  className?: string
  required?: boolean
}

const TimePicker: React.FC<TimePickerProps> = ( {
  id,
  value,
  onChange,
  className = "",
  required = false
} ) =>
{
  const [ selectedTime, setSelectedTime ] = useState( value || '12:00' )
  const [ isOpen, setIsOpen ] = useState( false )
  const inputRef = useRef<HTMLInputElement>( null )
  const dropdownRef = useRef<HTMLDivElement>( null )

  const timeOptions = Array.from( { length: 48 }, ( _, i ) =>
  {
    const date = addMinutes( parse( '00:00', 'HH:mm', new Date() ), i * 30 )
    return {
      value: format( date, 'HH:mm' ),
      label: format( date, 'h:mm a' )
    }
  } )

  useEffect( () =>
  {
    const handleClickOutside = ( event: MouseEvent ) =>
    {
      if ( dropdownRef.current && !dropdownRef.current.contains( event.target as Node ) )
      {
        setIsOpen( false )
      }
    }

    document.addEventListener( 'mousedown', handleClickOutside )
    return () =>
    {
      document.removeEventListener( 'mousedown', handleClickOutside )
    }
  }, [] )

  const handleTimeChange = ( e: React.ChangeEvent<HTMLInputElement> ) =>
  {
    setSelectedTime( e.target.value )
    onChange?.( e.target.value )
  }

  const handleTimeSelect = ( time: string ) =>
  {
    setSelectedTime( time )
    setIsOpen( false )
    onChange?.( time )
  }

  const handleInputClick = () =>
  {
    setIsOpen( true )
  }

  const formatDisplayTime = ( time: string ) =>
  {
    const date = parse( time, 'HH:mm', new Date() )
    return format( date, 'h:mm a' )
  }

  return (
    <div className="relative ">
      <div className="relative">
        <input
          ref={ inputRef }
          type="text"
          id={ id }
          value={ formatDisplayTime( selectedTime ) }
          onChange={ handleTimeChange }
          onClick={ handleInputClick }
          className={ `px-4 py-2 pl-10 pr-4 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${ className }` }
          required={ required }
          readOnly
        />
        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={ 18 } />
      </div>
      { isOpen && (
        <div
          ref={ dropdownRef }
          className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
        >
          { timeOptions.map( ( time ) => (
            <div
              key={ time.value }
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={ () => handleTimeSelect( time.value ) }
            >
              { time.label }
            </div>
          ) ) }
        </div>
      ) }
    </div>
  )
}

export default TimePicker