import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Check, RefreshCw, Shield, Clock, Building } from "lucide-react"

export default function AccountVerificationTab ()
{
  const [ isAuthorized, setIsAuthorized ] = useState( false )

  return (
    <div className="space-y-6">
      <VerificationStep
        step={ 1 }
        title="Verify your email"
        value=""
        completed={ false }
      />
      <VerificationStep
        step={ 2 }
        title="Verify your phone"
        value=""
        completed={ false }
      />
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-semibold">3</span>
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Verify your nonprofit</CardTitle>
            <CardDescription className="text-sm text-blue-600">Optional</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Are you a registered nonprofit? Complete this verification to claim and
            verify your nonprofit. <a href="#" className="text-blue-600 hover:underline">Learn more</a>
          </p>
          <h4 className="font-semibold mb-2">Verify your nonprofit to unlock these benefits:</h4>
          <ul className="space-y-2 mb-4">
            <BenefitItem icon={ <RefreshCw className="h-4 w-4" /> } text="Automated Payments" />
            <BenefitItem icon={ <Shield className="h-4 w-4" /> } text="Verification badge on your campaign pages" />
            <BenefitItem icon={ <Check className="h-4 w-4" /> } text="EIN number displayed on your email receipts" />
            <BenefitItem icon={ <Clock className="h-4 w-4" /> } text="Faster settlement time (48 hours)" />
            <BenefitItem icon={ <Building className="h-4 w-4" /> } text="ACH Payments" />
          </ul>
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="authorized"
              checked={ isAuthorized }
              onCheckedChange={ ( checked ) => setIsAuthorized( checked as boolean ) }
            />
            <label
              htmlFor="authorized"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I am a legal or authorized representative of the nonprofit I would
              like to verify on EventJacket
            </label>
          </div>
          <Button className="w-full sm:w-auto">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function VerificationStep ( { step, title, value, completed }: {
  step: number;
  title: string;
  value: string;
  completed: boolean;
} )
{
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-2">
        <div className={ `w-8 h-8 rounded-full flex items-center justify-center ${ completed ? 'bg-green-100' : 'bg-blue-100' }` }>
          { completed ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <span className="text-blue-600 font-semibold">{ step }</span>
          ) }
        </div>
        <CardTitle className="text-lg font-semibold">{ title }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{ value }</p>
      </CardContent>
    </Card>
  )
}

function BenefitItem ( { icon, text }: { icon: React.ReactNode; text: string } )
{
  return (
    <li className="flex items-center space-x-2">
      <div className="text-blue-600">{ icon }</div>
      <span className="text-sm">{ text }</span>
    </li>
  )
}