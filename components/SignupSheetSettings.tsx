import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function SignupSheetSettings ()
{
  const [ fields, setFields ] = useState( [
    { label: 'Name', required: true, type: 'text' },
    { label: 'Email', required: false, type: 'email' },
    { label: 'Comment', required: false, type: 'textarea' },
  ] );
  const [ preferences, setPreferences ] = useState( {
    allowSwap: false,
  } );

  const handleFieldChange = ( index: number, key: string, value: any ) =>
  {
    const updatedFields = fields.map( ( field, i ) =>
      i === index ? { ...field, [ key ]: value } : field
    );
    setFields( updatedFields );
  };

  const addNewField = () =>
  {
    setFields( [ ...fields, { label: '', required: false, type: 'text' } ] );
  };

  const handlePreferenceChange = ( key: string, value: boolean ) =>
  {
    setPreferences( { ...preferences, [ key ]: value } );
  };

  return (
    <div className="space-y-6">
      {/* Ask Participants Section */ }
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ask Participants For:</h2>
        { fields.map( ( field, index ) => (
          <div key={ index } className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <span>{ field.label }</span>
              { field.label === 'Comment' && (
                <Button variant="ghost" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
              ) }
            </div>
            <Select
              value={ field.required ? 'Required' : 'Optional' }
              onValueChange={ ( value ) =>
                handleFieldChange( index, 'required', value === 'Required' )
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Optional" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Required">Required</SelectItem>
                <SelectItem value="Optional">Optional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) ) }
        <Button variant="outline" onClick={ addNewField }>+ More</Button>
      </div>

      {/* Preferences Section */ }
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Preferences</h2>
        
      </div>

      {/* Tabs Section for Preferences */ }
      <div>
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="restrictions">Restrictions</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            {/* General Settings Content */ }
            <div className="space-y-2">
              <Label>
                <Checkbox
                  checked={ preferences.allowSwap }
                  onCheckedChange={ ( checked: boolean | string ) => handlePreferenceChange( 'allowSwap', checked === 'true' || checked === true ) }
                />
                Allow people to "swap" slots with each other
              </Label>
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <p>Notifications content (to be implemented)</p>
          </TabsContent>
          <TabsContent value="restrictions">
            <p>Restrictions content (to be implemented)</p>
          </TabsContent>
          <TabsContent value="integrations">
            <p>Integrations content (to be implemented)</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
