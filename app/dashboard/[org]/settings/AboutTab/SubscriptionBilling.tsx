import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Users2, Building, Building2 } from "lucide-react"

interface PricingTier
{
  id: string;
  contacts: string;
  monthlyPrice: number;
  annualPrice: number;
  extraContactsPrice: number;
  icon: React.ReactNode;
  recommended?: boolean;
}

const pricingTiers: PricingTier[] = [
  { id: "1", contacts: "Up to 250", monthlyPrice: 19, annualPrice: 199, extraContactsPrice: 10, icon: <Users className="h-4 w-4" />, recommended: true },
  { id: "2", contacts: "Up to 1,000", monthlyPrice: 59, annualPrice: 849, extraContactsPrice: 9, icon: <Users2 className="h-4 w-4" /> },
  { id: "3", contacts: "Up to 2,500", monthlyPrice: 119, annualPrice: 1319, extraContactsPrice: 8, icon: <Users2 className="h-4 w-4" /> },
  { id: "4", contacts: "Up to 5,000", monthlyPrice: 159, annualPrice: 1919, extraContactsPrice: 7, icon: <Building className="h-4 w-4" /> },
  { id: "5", contacts: "Up to 10,000+", monthlyPrice: 259, annualPrice: 2919, extraContactsPrice: 6, icon: <Building2 className="h-4 w-4" /> },
]

export default function SubscriptionBilling ()
{
  const [ billingCycle, setBillingCycle ] = useState<"monthly" | "annual">( "monthly" );
  const [ selectedTier, setSelectedTier ] = useState<string>( "1" );

  const selectedPlan = pricingTiers.find( ( tier ) => tier.id === selectedTier );

  const getPrice = ( tier: PricingTier | undefined ) =>
  {
    if ( !tier ) return 0;
    return billingCycle === "monthly" ? tier.monthlyPrice : tier.annualPrice / 12;
  };

  const price = getPrice( selectedPlan );
  const annualSavings = selectedPlan ? ( selectedPlan.monthlyPrice * 12 ) - selectedPlan.annualPrice : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Upgrade and unlock the full potential of your favorite fundraising tool.
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <RadioGroup
            value={ billingCycle }
            onValueChange={ ( value ) => setBillingCycle( value as "monthly" | "annual" ) }
            className="flex bg-secondary p-1 rounded-md"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="billing-monthly" className="peer sr-only" />
              <Label
                htmlFor="billing-monthly"
                className="flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
              >
                Monthly
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="annual" id="billing-annual" className="peer sr-only" />
              <Label
                htmlFor="billing-annual"
                className="flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
              >
                Annual (Best value!)
              </Label>
            </div>
          </RadioGroup>
        </div>

        <RadioGroup value={ selectedTier } onValueChange={ ( value ) => setSelectedTier( value ) }>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contacts</TableHead>
                <TableHead>
                  { billingCycle === "monthly" ? "Monthly price" : "Monthly price (billed annually)" }
                </TableHead>
                <TableHead>Extra contacts*</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { pricingTiers.map( ( tier ) =>
              {
                const tierPrice = getPrice( tier );
                const monthlyPrice = billingCycle === "monthly" ? tier.monthlyPrice : tierPrice;

                return (
                  <TableRow key={ tier.id } className={ tier.recommended ? "bg-secondary" : "" }>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={ tier.id } id={ `tier-${ tier.id }` } className="peer sr-only" />
                        <Label
                          htmlFor={ `tier-${ tier.id }` }
                          className="flex items-center space-x-2 cursor-pointer peer-data-[state=checked]:text-blue-600"
                        >
                          { tier.icon }
                          <span>{ tier.contacts }</span>
                          { tier.recommended && (
                            <span className="ml-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                              Recommended
                            </span>
                          ) }
                        </Label>
                      </div>
                    </TableCell>
                    <TableCell>
                      ${ monthlyPrice.toFixed( 2 ) }
                      { billingCycle === "annual" && (
                        <span className="text-gray-700 line-through ml-2">
                          ${ tier.monthlyPrice.toFixed( 2 ) }
                        </span>
                      ) }
                    </TableCell>
                    <TableCell>+ ${ tier.extraContactsPrice } per 100</TableCell>
                  </TableRow>
                );
              } ) }
            </TableBody>
          </Table>
        </RadioGroup>

        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-800">Up to { selectedPlan?.contacts } contacts</p>
            { billingCycle === "annual" && (
              <p className="text-sm text-blue-600">
                Save ${ annualSavings.toFixed( 2 ) } per year
              </p>
            ) }
            <p className="text-2xl font-bold mt-2">
              ${ price.toFixed( 2 ) }{ " " }
              <span className="text-sm font-normal text-gray-500">
                /{ billingCycle === "monthly" ? "mo" : "mo (annual)" }
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Billed { billingCycle === "monthly" ? "monthly" : `annually at $${ selectedPlan?.annualPrice }` }
            </p>
          </div>
          <div className="space-y-2">
            <Button className="w-full">Upgrade to EventJacket Plus</Button>
            <Button variant="outline" className="w-full">Start 30-day free trial</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <p className="text-sm text-gray-500">
          *Overage fees are calculated per 100 extra contacts. Overages will be prorated for the
          remainder of your subscription period and billed immediately.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          By subscribing to EventJacket Plus you agree to our{ " " }
          <a href="#" className="text-blue-600 hover:underline">Terms of Use</a> and{ " " }
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
      </CardFooter>
    </Card>
  );
}