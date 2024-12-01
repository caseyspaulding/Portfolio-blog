"use client"

import React, { useState, useRef, useEffect } from 'react'
import { format, parse, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

interface DatePickerProps
{
  id?: string
  value?: string
  onChange?: ( date: string ) => void
  className?: string
  required?: boolean
}

const DatePicker: React.FC<DatePickerProps> = ( {
  id,
  value,
  onChange,
  className = "",
  required = false
} ) =>
{
  const [ selectedDate, setSelectedDate ] = useState( value ? parse( value, 'yyyy-MM-dd', new Date() ) : new Date() )
  const [ currentMonth, setCurrentMonth ] = useState( startOfMonth( selectedDate ) )
  const [ isOpen, setIsOpen ] = useState( false )
  const inputRef = useRef<HTMLInputElement>( null )
  const calendarRef = useRef<HTMLDivElement>( null )

  useEffect( () =>
  {
    const handleClickOutside = ( event: MouseEvent ) =>
    {
      if ( calendarRef.current && !calendarRef.current.contains( event.target as Node ) )
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

  const handleDateChange = ( date: Date ) =>
  {
    setSelectedDate( date )
    setIsOpen( false )
    onChange?.( format( date, 'yyyy-MM-dd' ) )
  }

  const handleInputClick = () =>
  {
    setIsOpen( true )
  }

  const renderCalendar = () =>
  {
    const monthStart = startOfMonth( currentMonth )
    const monthEnd = endOfMonth( monthStart )
    const startDate = startOfWeek( monthStart )
    const endDate = endOfWeek( monthEnd )

    const dateFormat = "d"
    const rows = []

    let days = []
    let day = startDate
    let formattedDate = ""

    while ( day <= endDate )
    {
      for ( let i = 0; i < 7; i++ )
      {
        formattedDate = format( day, dateFormat )
        const cloneDay = day
        days.push(
          <div
            key={ day.toString() }
            className={ `p-2 text-center cursor-pointer ${ !isSameMonth( day, monthStart )
              ? "text-gray-400"
              : isSameDay( day, selectedDate )
                ? "bg-blue-600 text-white rounded-full"
                : "hover:bg-gray-100"
              }` }
            onClick={ () => handleDateChange( cloneDay ) }
          >
            { formattedDate }
          </div>
        )
        day = addDays( day, 1 )
      }
      rows.push(
        <div key={ day.toString() } className="grid grid-cols-7">
          { days }
        </div>
      )
      days = []
    }
    return rows
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={ inputRef }
          type="text"
          id={ id }
          value={ format( selectedDate, 'MMMM d, yyyy' ) }
          onChange={ () => { } }
          onClick={ handleInputClick }
          className={ `w-full px-2 py-2 pl-10 pr-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${ className }` }
          required={ required }
          readOnly
        />
        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={ 18 } />
      </div>
      { isOpen && (
        <div
          ref={ calendarRef }
          className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={ () => setCurrentMonth( addDays( currentMonth, -30 ) ) }
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft size={ 20 } />
            </button>
            <div className="font-semibold">
              { format( currentMonth, 'MMMM yyyy' ) }
            </div>
            <button
              onClick={ () => setCurrentMonth( addDays( currentMonth, 30 ) ) }
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight size={ 20 } />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            { [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ].map( ( day ) => (
              <div key={ day } className="text-center font-medium text-gray-500">
                { day }
              </div>
            ) ) }
          </div>
          { renderCalendar() }
        </div>
      ) }
    </div>
  )
}

export default DatePicker