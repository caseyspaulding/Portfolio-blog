import React, { useState, ChangeEvent } from 'react';

interface CustomDateRangePickerProps
{
  startDate: string;
  endDate: string;
  onChange: ( dates: { startDate: string; endDate: string } ) => void;
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ( { startDate, endDate, onChange } ) =>
{
  // Local state to manage date inputs
  const [ localStartDate, setLocalStartDate ] = useState<string>( startDate );
  const [ localEndDate, setLocalEndDate ] = useState<string>( endDate );

  // Handler to handle date input changes
  const handleDateChange = ( event: ChangeEvent<HTMLInputElement> ) =>
  {
    const { name, value } = event.target;

    if ( name === 'startDate' )
    {
      setLocalStartDate( value );
      onChange( { startDate: value, endDate: localEndDate } );
    } else if ( name === 'endDate' )
    {
      setLocalEndDate( value );
      onChange( { startDate: localStartDate, endDate: value } );
    }
  };

  return (
    <div className="date-range-picker">
      <label>
        Start Date:
        <input
          type="date"
          name="startDate"
          value={ localStartDate }
          onChange={ handleDateChange }
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          name="endDate"
          value={ localEndDate }
          onChange={ handleDateChange }
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </label>
    </div>
  );
};

export default CustomDateRangePicker;
