/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

interface IImageUploadFieldProps
{
	name: string;
	handleChange: ( target: any ) => void;
	label?: string;  // Custom label prop
	hideName?: boolean;  // Prop to hide the name label
}

export const ImageUploadField = ( { name, handleChange, label, hideName }: IImageUploadFieldProps ) =>
{

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const retrievePathFile = ( files: any ) =>
	{
		const file = files[ 0 ];
		if ( file.type !== 'image/png' && file.type !== 'image/jpeg' )
		{
			console.error( 'Only png and jpg/jpeg allowed.' )
		} else
		{
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const target: any = {};
			const reader = new FileReader();
			reader.readAsDataURL( file );
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			reader.onloadend = e =>
			{
				target.name = name;
				target.value = reader.result;
				target.logoName = file.name;
				handleChange( { target } );
			};
		}
	}

	return (
		<div style={  { display: 'flex', flexDirection: 'column', marginBottom: '6px' } }>
			{ !hideName && <label htmlFor={ name }>{ label || name }</label> }
			<input
				type='file'
				accept='image/*'
				name={ name }
				onChange={ e => retrievePathFile( e.target.files )}/>
		</div>
	);
}
