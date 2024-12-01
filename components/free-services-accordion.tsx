import * as React from "react"
import
  {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function FreeServiceAccordion()
{
  const categories = [
    {
      title: "No Setup Costs",
      items: [ "No setup Fees", "No private label fees", "No onboarding fees" ]
    },
    {
      title: "No Ongoing Fees",
      items: [ "No training charges", "No provisioning charges", "No annual maintenance charges", "No customer support charges" ]
    },
    {
      title: "No Hidden Costs",
      items: [ "No per user charges", "No feature-based pricing", "No software development charges", "Service fees are paid by attendees/donors" ]
    }
  ]

  return (
    <Card className="w-full max-w-4xl rounded-3xl mx-auto mt-36">
      <CardHeader className="text-center rounded-3xl bg-gradient-to-tr from-yellow-200 to-yellow-400 text-blue-800">
        <CardTitle className="text-3xl  mb-6 md:text-4xl ">Completely Free Services</CardTitle>
        <CardDescription className="text-lg md:text-xl mt-4">
          <span className="bg-blue-500 text-white px-4 mt-2 py-1 rounded-2xl">Whats that mean?</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Accordion type="single" collapsible className="w-full">
          { categories.map( ( category, index ) => (
            <AccordionItem key={ index } value={ `item-${ index }` }>
              <AccordionTrigger className="text-lg font-semibold">{ category.title }</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  { category.items.map( ( item, itemIndex ) => (
                    <li key={ itemIndex }>{ item }</li>
                  ) ) }
                </ul>
              </AccordionContent>
            </AccordionItem>
          ) ) }
        </Accordion>
      </CardContent>
    </Card>
  )
}