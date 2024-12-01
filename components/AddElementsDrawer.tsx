import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { PlusCircle, X } from 'lucide-react'

type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'radio' | 'select' | 'date' | 'file'

interface AddElementsDrawerProps
{
  onAddField: ( type: FieldType ) => void
}

export function AddElementsDrawer ( { onAddField }: AddElementsDrawerProps )
{
  const [ isOpen, setIsOpen ] = useState( false )

  const handleAddField = ( type: FieldType ) =>
  {
    onAddField( type )
    setIsOpen( false )
  }

  return (
    <Sheet open={ isOpen } onOpenChange={ setIsOpen }>
      <SheetTrigger asChild>
        <Button className="mb-4">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Form Element
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Form Elements</SheetTitle>
          
            
         
        </SheetHeader>
        <div className="grid gap-4 py-4">
          
          { ( [ 'text', 'textarea', 'number', 'checkbox', 'radio', 'select', 'date', 'file' ] as FieldType[] ).map( ( type ) => (
            <Button
              key={ type }
              onClick={ () => handleAddField( type ) }
              className="justify-start"
              variant="outline"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add { type.charAt( 0 ).toUpperCase() + type.slice( 1 ) }
            </Button>
          ) ) }
        </div>
      </SheetContent>
    </Sheet>
  )
}