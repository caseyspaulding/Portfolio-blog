'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EventJacketCalculator ()
{
  const [ ticketPrice, setTicketPrice ] = useState( 50 )
  const [ attendeesPerEvent, setAttendeesPerEvent ] = useState( 1000 )
  const [ eventsPerYear, setEventsPerYear ] = useState( 6 )
  const [ feesPaidBy, setFeesPaidBy ] = useState( 'organizer' )

  const [ eventJacketFees, setEventJacketFees ] = useState( 0 )
  const [ eventbriteFees, setEventbriteFees ] = useState( 0 )
  const [ ticketLeapFees, setTicketLeapFees ] = useState( 0 )
  const [ showClixFees, setShowClixFees ] = useState( 0 )
  const [ ticketSpiceFees, setTicketSpiceFees ] = useState( 0 )

  useEffect( () =>
  {
    const totalRevenue = ticketPrice * attendeesPerEvent * eventsPerYear

    // EventJacket fees (25¢ per ticket + 2.9% + 30¢ for payment processing)
    const eventJacket = ( 0.25 * attendeesPerEvent * eventsPerYear ) + ( 0.029 * totalRevenue ) + ( 0.30 * attendeesPerEvent * eventsPerYear )
    setEventJacketFees( eventJacket )

    // Eventbrite fees (3.7% + $1.79 per ticket + 2.9% payment processing)
    const eventbrite = ( 0.037 * totalRevenue ) + ( 1.79 * attendeesPerEvent * eventsPerYear ) + ( 0.029 * totalRevenue )
    setEventbriteFees( eventbrite )

    // TicketLeap fees ($1 + 2% per ticket + 3% payment processing)
    const ticketLeap = ( 1 * attendeesPerEvent * eventsPerYear ) + ( 0.02 * totalRevenue ) + ( 0.03 * totalRevenue )
    setTicketLeapFees( ticketLeap )

    // ShowClix fees (estimated at 4% + $1.50 per ticket)
    const showClix = ( 0.04 * totalRevenue ) + ( 1.50 * attendeesPerEvent * eventsPerYear )
    setShowClixFees( showClix )

    // TicketSpice fees (99¢ per ticket + 2.9% + 30¢ for payment processing)
    const ticketSpice = ( 0.99 * attendeesPerEvent * eventsPerYear ) + ( 0.029 * totalRevenue ) + ( 0.30 * attendeesPerEvent * eventsPerYear )
    setTicketSpiceFees( ticketSpice )
  }, [ ticketPrice, attendeesPerEvent, eventsPerYear ] )

  const calculateSavings = ( platform: number ): string =>
  {
    const savings = platform - eventJacketFees;
    return savings > 0 ? savings.toFixed( 2 ) : '0.00';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mb-10">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Compare <span className="text-blue-500">EventJacket</span> with the rest.
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-center text-lg">
          At just 25¢ per ticket + 2.9% + 30¢ payment processing (Stripe), calculate how much you'll save.
        </p>
        <p className="text-center text-lg font-semibold">
          See how EventJacket compares to other popular ticketing platforms.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ticket-price">Average Ticket Price ($)</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="ticket-price"
                min={ 1 }
                max={ 500 }
                step={ 1 }
                value={ [ ticketPrice ] }
                onValueChange={ ( value ) => setTicketPrice( value[ 0 ] ) }
                className="flex-grow"
              />
              <Input
                type="number"
                value={ ticketPrice }
                onChange={ ( e ) => setTicketPrice( Number( e.target.value ) ) }
                className="w-20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendees">Attendees Per Event</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="attendees"
                min={ 100 }
                max={ 10000 }
                step={ 100 }
                value={ [ attendeesPerEvent ] }
                onValueChange={ ( value ) => setAttendeesPerEvent( value[ 0 ] ) }
                className="flex-grow"
              />
              <Input
                type="number"
                value={ attendeesPerEvent }
                onChange={ ( e ) => setAttendeesPerEvent( Number( e.target.value ) ) }
                className="w-20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="events">Events Per Year</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="events"
                min={ 1 }
                max={ 20 }
                step={ 1 }
                value={ [ eventsPerYear ] }
                onValueChange={ ( value ) => setEventsPerYear( value[ 0 ] ) }
                className="flex-grow"
              />
              <Input
                type="number"
                value={ eventsPerYear }
                onChange={ ( e ) => setEventsPerYear( Number( e.target.value ) ) }
                className="w-20"
              />
            </div>
          </div>


        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">VS EventBrite</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-center">${ calculateSavings( eventbriteFees ) }</p>
              <p className="text-center text-sm text-muted-foreground">Savings per year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">VS TicketLeap</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-center">${ calculateSavings( ticketLeapFees ) }</p>
              <p className="text-center text-sm text-muted-foreground">Savings per year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">VS ShowClix</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-center">${ calculateSavings( showClixFees ) }</p>
              <p className="text-center text-sm text-muted-foreground">Savings per year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">VS TicketSpice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-center">${ calculateSavings( ticketSpiceFees ) }</p>
              <p className="text-center text-sm text-muted-foreground">Savings per year</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-tr from-yellow-100 to-yellow-300 text-blue-800 ">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-center mb-4">Total savings with EventJacket</h3>
            <p className="text-4xl font-bold text-center">
              ${ calculateSavings( Math.max( eventbriteFees, ticketLeapFees, showClixFees, ticketSpiceFees ) ) } - ${ calculateSavings( Math.min( eventbriteFees, ticketLeapFees, showClixFees, ticketSpiceFees ) ) } / year
            </p>
            <p className="text-center mt-2">
              or ${ ( Number( calculateSavings( Math.max( eventbriteFees, ticketLeapFees, showClixFees, ticketSpiceFees ) ) ) * 5 ).toFixed( 2 ) } -
              ${ ( Number( calculateSavings( Math.min( eventbriteFees, ticketLeapFees, showClixFees, ticketSpiceFees ) ) ) * 5 ).toFixed( 2 ) }
              every 5 years
            </p>
          </CardContent>
        </Card>

        <p className="text-sm text-center text-muted-foreground">
          Calculator based on EventJacket's ticketing fees of 50¢ per paid ticket + 2.9% + 30¢ payment processing with Stripe.
        </p>
      </CardContent>
    </Card>
  )
}