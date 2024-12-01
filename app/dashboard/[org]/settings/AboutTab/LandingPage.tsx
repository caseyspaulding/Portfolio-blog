import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, MessageSquare } from "lucide-react"

export default function LandingPage ()
{
  const [ enableGeneralDonations, setEnableGeneralDonations ] = useState( false )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Landing Page</CardTitle>
          <CardDescription>
            Your landing page displays all of your fundraising campaigns in one easy place.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 bg-green-100 p-2 rounded-md">
            <Input
              value=""
              readOnly
              className="bg-transparent border-none"
            />
            <Button size="sm" variant="ghost">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Giving Hub</CardTitle>
          <CardDescription>
            Upgrade your Landing Page to a Giving Hub to power your organization with a beautiful website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="text-blue-600">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat with us
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mission-statement">Mission Statement</Label>
            <Textarea
              id="mission-statement"
              placeholder="Optional"
              className="h-24"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="about-organization">About your Organization</Label>
            <div className="border rounded-md p-2">
              <div className="flex space-x-2 mb-2">
                <Button variant="outline" size="sm">Paragraph</Button>
                <Button variant="outline" size="sm">
                  <span className="font-bold">B</span>
                </Button>
                <Button variant="outline" size="sm">
                  <span className="italic">I</span>
                </Button>
                <Button variant="outline" size="sm">
                  <span className="underline">U</span>
                </Button>
              </div>
              <Textarea
                id="about-organization"
                placeholder="Tell your story..."
                className="min-h-[100px] border-none focus:ring-0"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>General Donations</CardTitle>
          <CardDescription>
            A campaign to accept general donations on your landing page and website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="general-donations"
              checked={ enableGeneralDonations }
              onCheckedChange={ setEnableGeneralDonations }
            />
            <Label htmlFor="general-donations">Enable General Donations</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}