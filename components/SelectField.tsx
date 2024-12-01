import * as React from 'react';

interface ISelectFieldProps {
	name: string;
	options: string[];
	handleChange: (target: unknown) => void;
}

export const SelectField = ({ name, options, handleChange }: ISelectFieldProps) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}>
			<label className='font-bold'>{name}</label>
			<select className='border  p-2 mt-1'name={name} onChange={handleChange}>
				{options.map((option: string, index: number) => (
					<option key={index} value={option}>{option}</option>
				))}
			</select>
		</div>
	);
}

