'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FeeCalculator ()
{
  const [ ticketPrice, setTicketPrice ] = useState( 30 )
  const [ feePayer, setFeePayer ] = useState( 'buyer' )
  const [ eventJacketFee, setEventJacketFee ] = useState( 0 )
  const [ processingFee, setProcessingFee ] = useState( 0 )
  const [ buyerPays, setBuyerPays ] = useState( 0 )
  const [ youReceive, setYouReceive ] = useState( 0 )

  useEffect( () =>
  {
    const baseEventJacketFee = 0.25
    const processingPercentage = 0.029
    const processingFixed = 0.30

    let calculatedEventJacketFee = baseEventJacketFee
    let calculatedProcessingFee = ( ticketPrice * processingPercentage ) + processingFixed

    if ( feePayer === 'buyer' )
    {
      setBuyerPays( ticketPrice + calculatedEventJacketFee + calculatedProcessingFee )
      setYouReceive( ticketPrice )
    } else
    {
      setBuyerPays( ticketPrice )
      setYouReceive( ticketPrice - calculatedEventJacketFee - calculatedProcessingFee )
    }

    setEventJacketFee( calculatedEventJacketFee )
    setProcessingFee( calculatedProcessingFee )
  }, [ ticketPrice, feePayer ] )

  return (
    <Card className="w-full max-w-md mx-auto shadow-md sm:p-3 lg:p-1 shadow-yellow-300" >
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-blue-600">
          Calculate your EventJacket fees
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">
            Understand your ticket fees. Easy.
          </p>
          <p className="text-sm text-gray-600">
            We charge 25¢ per ticket, plus 2.9% + 30¢ for credit card processing (Stripe).
            See how that works out with your ticket prices:
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ticket-price">Ticket Price ($)</Label>
            <Input
              id="ticket-price"
              type="number"
              min="0"
              step="0.01"
              value={ ticketPrice }
              onChange={ ( e ) => setTicketPrice( Number( e.target.value ) ) }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fee-payer">Who pays the fees?</Label>
            <Select value={ feePayer } onValueChange={ setFeePayer }>
              <SelectTrigger id="fee-payer">
                <SelectValue placeholder="Select who pays the fees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buyer">I want buyers to pay all fees</SelectItem>
                <SelectItem value="organizer">I want to pay all fees</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="bg-gray-100">
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between">
              <span>EventJacket Fee:</span>
              <span className="font-semibold text-blue-600">${ eventJacketFee.toFixed( 2 ) }</span>
            </div>
            <div className="flex justify-between">
              <span>Credit Card Processing:</span>
              <span className="font-semibold text-blue-600">${ processingFee.toFixed( 2 ) }</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Your Buyers Pay:</span>
              <span className="text-blue-600">${ buyerPays.toFixed( 2 ) }</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>You Receive:</span>
              <span className="text-blue-600">${ youReceive.toFixed( 2 ) }</span>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-center text-gray-500">

          <br />

        </p>
      </CardContent>
    </Card>
  )
}