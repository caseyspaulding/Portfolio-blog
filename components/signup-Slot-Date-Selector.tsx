"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, MapPinIcon, VideoIcon, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

function AddSlotsModal ()
{
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">+ Add Slots</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Slots</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="single">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single Slot</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Slots</TabsTrigger>
          </TabsList>
          <TabsContent value="single">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title of Slot</Label>
                <Input id="title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment">Help Comment</Label>
                <Input id="comment" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Number Wanted</Label>
                <Input id="number" type="number" defaultValue={ 1 } />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="hide-number" />
                <Label htmlFor="hide-number">Hide Number Wanted</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="waitlist" />
                <Label htmlFor="waitlist">Waitlist</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="collect-money" />
                <Label htmlFor="collect-money">Collect Money</Label>
              </div>
              <div className="bg-gray-100 p-4 rounded-md text-sm">
                <p>You can use your sign up page to collect money from your group. This feature makes it easy to sell items, gather donations, coordinate registrations and more. Add specific prices or a general donation option to any slot on your sign up. Sign up participants can pay with a debit or credit card as a part of the sign up process. <a href="#" className="text-blue-500">View Details</a></p>
              </div>
              <div className="space-y-2">
                <Label>Images</Label>
                <Button variant="outline">+ Add Images</Button>
              </div>
            </div>
            <div className="flex justify-between">
              <Button>Save</Button>
              <Button>Save and Add Another</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function AddDatesModal ()
{
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">+ Add Dates</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Dates/Times</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="time-slots">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calendar">Add From Calendar</TabsTrigger>
            <TabsTrigger value="recurring">Add Recurring Days</TabsTrigger>
            <TabsTrigger value="time-slots">Add Time Slots</TabsTrigger>
          </TabsList>
          <TabsContent value="time-slots">
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <Label>Days Of The Event</Label>
                <Input type="date" className="w-auto" />
                <span>to</span>
                <Input type="date" className="w-auto" />
              </div>
              <div>
                <Label>Including These Days</Label>
                <div className="flex space-x-2 mt-2">
                  { [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ].map( ( day ) => (
                    <Button key={ day } variant="outline" size="sm">{ day }</Button>
                  ) ) }
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Label>Time Range</Label>
                <Input type="time" className="w-auto" />
                <select className="border rounded p-1">
                  <option>AM</option>
                  <option>PM</option>
                </select>
                <span>to</span>
                <Input type="time" className="w-auto" />
                <select className="border rounded p-1">
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Label>Time Slot Increment</Label>
                <span>Every</span>
                <Input type="number" className="w-20" defaultValue={ 30 } />
                <select className="border rounded p-1">
                  <option>Minutes</option>
                  <option>Hours</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location (Optional)</Label>
                <div className="flex items-center space-x-2">
                  <Input id="location" />
                  <Button variant="outline" size="icon"><MapPinIcon className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon"><VideoIcon className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
            <Button className="w-full bg-lime-500 hover:bg-lime-600 text-white">Add Time Slot</Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default function SignUpFormatSelector ()
{
  const [ signUpFormat, setSignUpFormat ] = useState( "sortByDate" )
  const [ dates, setDates ] = useState<string[]>( [] )
  const [ slots, setSlots ] = useState<string[]>( [] )

  const renderFormatContent = () =>
  {
    switch ( signUpFormat )
    {
      case "singleDateRSVP":
        return (
          <>
            <div className="space-y-4 mb-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input id="eventDate" type="date" className="w-auto" />
                <span>at</span>
                <Input type="time" className="w-auto" />
                <span>to</span>
                <Input type="time" className="w-auto" />
                <select className="border rounded p-1">
                  <option>EDT</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" className="flex-grow" />
                <Button variant="outline" size="icon"><MapPinIcon className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><VideoIcon className="h-4 w-4" /></Button>
              </div>
              <div className="space-y-2">
                <Checkbox id="seeAttendees" />
                <Label htmlFor="seeAttendees">Allow everyone to see RSVP attendees</Label>
              </div>
              <div className="space-y-2">
                <Checkbox id="includeSlots" />
                <Label htmlFor="includeSlots">Include sign up slots for items to bring or do at event</Label>
              </div>
              <div className="space-y-2">
                <Checkbox id="countChildren" />
                <Label htmlFor="countChildren">Keep a separate count of children attending</Label>
              </div>
            </div>
            <AddSlotsModal />
          </>
        )
      case "slotsOnly":
        return (
          <>
            <div className="flex items-center space-x-2 mb-4">
              <Label htmlFor="endDate">Sign Up End Date</Label>
              <Input id="endDate" type="date" className="w-auto" />
            </div>
            <AddSlotsModal />
          </>
        )
      case "sortBySlot":
        return (
          <div className="flex justify-between mb-4">
            <AddSlotsModal />
            <AddDatesModal />
          </div>
        )
      case "sortByDate":
      default:
        return (
          <div className="flex justify-between mb-4">
            <AddDatesModal />
            <AddSlotsModal />
          </div>
        )
    }
  }

  const renderTable = () =>
  {
    switch ( signUpFormat )
    {
      case "singleDateRSVP":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-md overflow-hidden">
              <div className="bg-brown-600 text-white p-2">Available Slot</div>
              <div className="bg-green-100 p-2 space-y-2">
                { slots.map( ( _, index ) => (
                  <div key={ index } className="bg-gray-400 h-6 w-full rounded" />
                ) ) }
              </div>
            </div>
            <div className="border rounded-md overflow-hidden">
              <div className="bg-brown-600 text-white p-2">RSVP Responses</div>
              <div className="bg-green-100 p-2 space-y-2">
                <div>Yes</div>
                <div>Person 1 (2 Guests)</div>
                <div>No</div>
                <div>Person 2</div>
              </div>
            </div>
          </div>
        )
      case "slotsOnly":
        return (
          <div className="border rounded-md overflow-hidden">
            <div className="bg-brown-600 text-white p-2">Available Slot</div>
            <div className="bg-green-100">
              { slots.map( ( _, index ) => (
                <div key={ index } className="flex items-center justify-between p-2 border-b last:border-b-0">
                  <div className="bg-gray-400 h-6 w-3/4 rounded" />
                  <Button className="bg-red-400 hover:bg-red-500 text-white">Sign Up</Button>
                </div>
              ) ) }
            </div>
          </div>
        )
      case "sortBySlot":
      case "sortByDate":
      default:
        return (
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-brown-600 text-white">
                  <th className="p-2 text-left">{ signUpFormat === "sortByDate" ? "Dates/Times" : "Available Slot" }</th>
                  <th className="p-2 text-left">{ signUpFormat === "sortByDate" ? "Available Slot" : "Dates/Times" }</th>
                </tr>
              </thead>
              <tbody>
                { dates.map( ( _, dateIndex ) => (
                  <tr key={ dateIndex } className="border-t bg-green-100">
                    <td className="p-2">
                      { signUpFormat === "sortByDate" ? (
                        <>
                          <div className="bg-gray-400 h-6 w-3/4 rounded" />
                          <div className="bg-gray-400 h-6 w-1/4 mt-2 rounded" />
                        </>
                      ) : (
                        <div className="bg-gray-400 h-6 w-3/4 rounded" />
                      ) }
                    </td>
                    <td className="p-2">
                      { slots.map( ( _, slotIndex ) => (
                        <div key={ slotIndex } className="flex items-center justify-between mb-2">
                          { signUpFormat === "sortByDate" ? (
                            <div className="bg-gray-400 h-6 w-3/4 rounded" />
                          ) : (
                            <>
                              <div className="bg-gray-400 h-6 w-3/4 rounded" />
                              <div className="bg-gray-400 h-6 w-1/4 ml-2 rounded" />
                            </>
                          ) }
                          <Button className="bg-red-400 hover:bg-red-500 text-white ml-2">Sign Up</Button>
                        </div>
                      ) ) }
                    </td>
                  </tr>
                ) ) }
              </tbody>
            </table>
          </div>
        )
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Select a sign up format</h2>

      <RadioGroup value={ signUpFormat } onValueChange={ setSignUpFormat } className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <RadioGroupItem value="sortByDate" id="sortByDate" className="peer sr-only" />
          <Label
            htmlFor="sortByDate"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4  hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <span className="text-lg font-semibold">Sort by Date</span>
            <span className="text-sm text-muted-foreground">For sign ups having one or more slots per date/time</span>
          </Label>
        </div>
        <div className="space-y-2">
          <RadioGroupItem value="sortBySlot" id="sortBySlot" className="peer sr-only" />
          <Label
            htmlFor="sortBySlot"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <span className="text-lg font-semibold">Sort by Slot</span>
            <span className="text-sm text-muted-foreground">For sign ups where slot options should be considered first</span>
          </Label>
        </div>
        <div className="space-y-2">
          <RadioGroupItem value="slotsOnly" id="slotsOnly" className="peer sr-only" />
          <Label
            htmlFor="slotsOnly"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <span className="text-lg font-semibold">Slots Only</span>
            <span className="text-sm text-muted-foreground">For sign ups without a specific date or time involved</span>
          </Label>
        </div>
        <div className="space-y-2">
          <RadioGroupItem value="singleDateRSVP" id="singleDateRSVP" className="peer sr-only" />
          <Label
            htmlFor="singleDateRSVP"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <span className="text-lg font-semibold">Single Date RSVP</span>
            <span className="text-sm text-muted-foreground">For a one date event where you want to see who can attend</span>
          </Label>
        </div>
      </RadioGroup>

      { renderFormatContent() }

      { renderTable() }

      <Button className="bg-lime-500 hover:bg-lime-600 text-white mt-6">Save and Continue</Button>
    </div>
  )
}