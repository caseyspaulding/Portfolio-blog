'use client';

import React, { useState } from 'react';
import TimezoneSelect, { ITimezone } from 'react-timezone-select';

interface EventTimezonePickerProps
{
  onTimezoneChange: ( timezone: string ) => void;
}

const EventTimezonePicker: React.FC<EventTimezonePickerProps> = ( { onTimezoneChange } ) =>
{
  const [ selectedTimezone, setSelectedTimezone ] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const handleTimezoneChange = ( timezone: ITimezone | string ) =>
  {
    const timezoneValue = typeof timezone === 'string' ? timezone : timezone.value;
    setSelectedTimezone( timezoneValue );
    onTimezoneChange( timezoneValue );
  };

  return (
    <div className="timezone-picker">
      <h2>Select Event Timezone</h2>
      <TimezoneSelect
        value={ selectedTimezone }
        onChange={ handleTimezoneChange }
      />
    </div>
  );
};

export default EventTimezonePicker;
