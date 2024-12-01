import type { TextareaHTMLAttributes } from 'react';
import React from 'react';
import styles from './TextAreaEJ.module.css';

// Define the types for the props
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>
{
  label: string;
  variant?: 'outlined' | 'standard';
}

const Textarea: React.FC<TextareaProps> = ( { label, variant = 'outlined', ...props } ) =>
{
  return (
    <div className={ variant === 'outlined' ? styles[ 'outlined-input' ] : styles[ 'standard-input' ] }>
      <textarea { ...props } placeholder=" " />
      <label>{ label }</label>
      { variant === 'standard' && <span className={ styles[ 'underline' ] }></span> }
    </div>
  );
};

export default Textarea;
