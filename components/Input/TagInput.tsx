import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import styles from './TagInput.module.css';

interface TagInputProps
{
  label: string;
  placeholder?: string;
  onTagsChange: ( tags: string[] ) => void;
}

const TagInput: React.FC<TagInputProps> = ( { label, placeholder = "Add tags...", onTagsChange } ) =>
{
  const [ tags, setTags ] = useState<string[]>( [] );
  const [ inputValue, setInputValue ] = useState<string>( '' );

  const handleAddTag = () =>
  {
    if ( inputValue.trim() && !tags.includes( inputValue.trim() ) )
    {
      const newTags = [ ...tags, inputValue.trim() ];
      setTags( newTags );
      setInputValue( '' );
      onTagsChange( newTags ); // Update parent component with new tags
    }
  };

  const handleRemoveTag = ( index: number ) =>
  {
    const newTags = tags.filter( ( _, i ) => i !== index );
    setTags( newTags );
    onTagsChange( newTags ); // Update parent component with new tags
  };

  const handleInputKeyDown = ( e: KeyboardEvent<HTMLInputElement> ) =>
  {
    if ( e.key === 'Enter' || e.key === ',' )
    {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className={ styles.tagInputContainer }>
      <label className={ styles.label }>{ label }</label>
      <div className={ styles.inputWrapper }>
        { tags.map( ( tag, index ) => (
          <span key={ index } className={ styles.chip }>
            { tag }
            <button type="button" className={ styles.chipClose } onClick={ () => handleRemoveTag( index ) }>
              ×
            </button>
          </span>
        ) ) }
        <input
          type="text"
          value={ inputValue }
          onChange={ ( e: ChangeEvent<HTMLInputElement> ) => setInputValue( e.target.value ) }
          onKeyDown={ handleInputKeyDown }
          placeholder={ placeholder }
          className={ styles.input }
        />
      </div>
    </div>
  );
};

export default TagInput;
