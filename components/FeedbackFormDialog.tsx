'use client'

import React, { useState } from 'react'
import FeedbackForm from './FeedbackForm'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MessageSquare } from 'lucide-react'

export default function FeedbackFormDialog ()
{
  const [ isOpen, setIsOpen ] = useState( false )

  const closeDialog = () => setIsOpen( false )

  return (
    <Dialog open={ isOpen } onOpenChange={ setIsOpen }>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 rounded-none px-3 py-2 text-gray-700 hover:bg-blue-100"
          onClick={ () => setIsOpen( true ) }
        >
          <MessageSquare className="h-5 w-5" />
          <span>Gimme Feedback</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="sr-only">Submit Feedback</DialogTitle>
          <DialogClose >
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <FeedbackForm closeDialog={ closeDialog } />
      </DialogContent>
    </Dialog>
  )
}