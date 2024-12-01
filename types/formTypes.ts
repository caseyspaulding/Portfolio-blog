export type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'radio' | 'select' | 'date' | 'file';

export interface FormField
{
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  order: number;
}

export interface Form
{
  id: string;
  name: string;
  description: string;
  fields: FormField[];
}
