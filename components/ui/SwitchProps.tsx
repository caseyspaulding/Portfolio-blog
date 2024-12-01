// components/ui/switch.js
'use client';

import React from 'react';

interface SwitchProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SwitchProps ( { id, name, checked, onChange }: SwitchProps )
{
  return (
    <label htmlFor={ id } className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        id={ id }
        name={ name }
        checked={ checked }
        onChange={ onChange }
        className="sr-only"
      />
      <div
        className={ `w-11 h-6 bg-gray-200 rounded-full relative ${ checked ? 'bg-blue-600' : 'bg-gray-300'
          }` }
      >
        <div
          className={ `h-5 w-5 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${ checked ? 'translate-x-5' : 'translate-x-0'
            }` }
        ></div>
      </div>
    </label>
  );
}
