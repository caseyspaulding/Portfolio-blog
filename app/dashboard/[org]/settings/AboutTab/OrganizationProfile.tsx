import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Globe, Linkedin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

interface OrganizationProfileProps
{
  activeSubTab: string;
  setActiveSubTab: ( tab: string ) => void;
  subTabs: string[];
}

export default function OrganizationProfile ( { activeSubTab, setActiveSubTab, subTabs }: OrganizationProfileProps )
{
  const [ earlyAccessBeta, setEarlyAccessBeta ] = useState( false )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account-name">Account name*</Label>
            <Input id="account-name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Time zone</Label>
            <Select defaultValue="America/New_York">
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">America/New_York</SelectItem>
                <SelectItem value="Europe/London">Europe/London</SelectItem>
                <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input id="email" type="email" className="pl-10" placeholder="Enter email address" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input id="phone" type="tel" className="pl-10" placeholder="Enter phone number" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Accounts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input className="pl-10" />
          </div>
          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Enter LinkedIn URL" className="pl-10" />
          </div>
          <div className="relative">
            <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Enter Facebook URL" className="pl-10" />
          </div>
          <div className="relative">
            <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Enter X URL" className="pl-10" />
          </div>
          <div className="relative">
            <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Enter Instagram URL" className="pl-10" />
          </div>
          <div className="relative">
            <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Enter YouTube URL" className="pl-10" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Early Access Beta</CardTitle>
          <CardDescription>
            Turning this on will give you early access to new beta and experimental features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="early-access"
              checked={ earlyAccessBeta }
              onCheckedChange={ setEarlyAccessBeta }
            />
            <Label htmlFor="early-access">Enable Early Access Beta</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="text-blue-600 hover:underline p-0">Learn more</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Once you delete your account, you will no longer be able to access it and all data associated with your account will be deleted.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="destructive">Delete account</Button>
        </CardFooter>
      </Card>
    </div>
  )
}