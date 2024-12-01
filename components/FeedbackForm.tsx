'use client'

import React, { useState } from 'react'
import { submitFeedback } from '@/app/actions/submitFeedback'
import { FileUploadButtonFeedback } from './FileUploadButtonFeedback'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

interface FeedbackFormProps
{
  closeDialog: () => void
}

export default function FeedbackForm ( { closeDialog }: FeedbackFormProps )
{
  const [ attachmentUrl, setAttachmentUrl ] = useState<string | null>( null )
  const [ category, setCategory ] = useState( 'Bug Report' )

  const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ) =>
  {
    e.preventDefault()
    const formData = new FormData( e.currentTarget )
    formData.set( 'attachmentUrl', attachmentUrl || '' )
    formData.set( 'category', category )
    await submitFeedback( formData )
    closeDialog()
  }

  return (
    <div className="w-full max-w-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">Submit Feedback</h2>
        <p className="text-sm text-muted-foreground">I value your input. - Casey</p>
      </div>
      <form onSubmit={ handleSubmit } className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select name="category" value={ category } onValueChange={ setCategory }>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bug Report">Bug Report</SelectItem>
              <SelectItem value="Feature Request">Feature Request</SelectItem>
              <SelectItem value="General Feedback">General Feedback</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" required className="min-h-[100px]" />
        </div>
        <div className="space-y-2">
          <Label>Attachment</Label>
          <FileUploadButtonFeedback
            setImageUrl={ ( url ) => setAttachmentUrl( url ) }
            label="Upload Image or Screenshot"
            orgName="Organization"
          />
          { attachmentUrl && (
            <p className="text-sm text-muted-foreground">File uploaded successfully</p>
          ) }
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={ closeDialog }>
            Cancel
          </Button>
          <Button type="submit">Submit Feedback</Button>
        </div>
      </form>
    </div>
  )
}