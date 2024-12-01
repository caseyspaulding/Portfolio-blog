import * as React from 'react';

interface ITextAreaProps
{
	name: string;
	rows?: number;
	cols?: number;
	role?: string;
	defaultValue?: string | number;
	handleChange: ( target: unknown ) => void;
	hideLabel?: boolean;
	value?: string | number;
	label?: string;
	placeholder?: string; // New prop for placeholder text
}

export const TextArea = ( {
	name,
	handleChange,
	role,
	rows = 4,
	cols,
	defaultValue,
	hideLabel,
	value,
	label,
	placeholder
}: ITextAreaProps ) =>
{
	return (
		<div className="flex flex-col mb-4">
			{/* Label */ }
			{ !hideLabel && (
				<label htmlFor={ name } className="mb-2 text-gray-700 font-medium">
					{ label || name }
				</label>
			) }

			{/* TextArea */ }
			<textarea
				id={ name }
				name={ name }
				onChange={ handleChange }
				rows={ rows }
				cols={ cols }
				role={ role }
				defaultValue={ defaultValue }
				value={ value }
				placeholder={ placeholder }
				className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 bg-gray-100 resize-none" // Tailwind styles
			/>
		</div>
	);
};
