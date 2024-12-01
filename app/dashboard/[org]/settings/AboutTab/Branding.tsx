import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudUpload } from "lucide-react"

export default function Branding ()
{
  const [ mainLogo, setMainLogo ] = useState<File | null>( null )
  const [ emailLogo, setEmailLogo ] = useState<File | null>( null )
  const [ coverPhoto, setCoverPhoto ] = useState<File | null>( null )
  const [ mainThemeColor, setMainThemeColor ] = useState( "" )

  const handleFileUpload = ( event: React.ChangeEvent<HTMLInputElement>, setFile: ( file: File | null ) => void ) =>
  {
    const file = event.target.files?.[ 0 ] || null
    setFile( file )
  }

  const handleDragOver = ( event: React.DragEvent<HTMLDivElement> ) =>
  {
    event.preventDefault()
  }

  const handleDrop = ( event: React.DragEvent<HTMLDivElement>, setFile: ( file: File | null ) => void ) =>
  {
    event.preventDefault()
    const file = event.dataTransfer.files?.[ 0 ] || null
    setFile( file )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Logos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="main-logo">Main logo</Label>
            <CardDescription>Used on your campaign pages, landing page, etc.</CardDescription>
            <div
              className="mt-2 border-2 border-dashed rounded-md p-4 text-center cursor-pointer"
              onDragOver={ handleDragOver }
              onDrop={ ( e ) => handleDrop( e, setMainLogo ) }
            >
              <input
                id="main-logo"
                type="file"
                className="hidden"
                onChange={ ( e ) => handleFileUpload( e, setMainLogo ) }
                accept="image/*"
              />
              <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-blue-600">Click to add photos</p>
              <p className="mt-1 text-xs text-gray-500">or drag and drop</p>
              { mainLogo && <p className="mt-2 text-sm text-gray-600">{ mainLogo.name }</p> }
            </div>
          </div>
          <div>
            <Label htmlFor="email-logo">Email logo</Label>
            <CardDescription>Used in your custom branded emails.</CardDescription>
            <div
              className="mt-2 border-2 border-dashed rounded-md p-4 text-center cursor-pointer"
              onDragOver={ handleDragOver }
              onDrop={ ( e ) => handleDrop( e, setEmailLogo ) }
            >
              <input
                id="email-logo"
                type="file"
                className="hidden"
                onChange={ ( e ) => handleFileUpload( e, setEmailLogo ) }
                accept="image/*"
              />
              <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-blue-600">Click to add photos</p>
              <p className="mt-1 text-xs text-gray-500">or drag and drop</p>
              { emailLogo && <p className="mt-2 text-sm text-gray-600">{ emailLogo.name }</p> }
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cover Photo</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="mt-2 border-2 border-dashed rounded-md p-4 text-center cursor-pointer"
            onDragOver={ handleDragOver }
            onDrop={ ( e ) => handleDrop( e, setCoverPhoto ) }
          >
            <input
              id="cover-photo"
              type="file"
              className="hidden"
              onChange={ ( e ) => handleFileUpload( e, setCoverPhoto ) }
              accept="image/*"
            />
            <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-blue-600">Click to add photos</p>
            <p className="mt-1 text-xs text-gray-500">or drag and drop</p>
            { coverPhoto && <p className="mt-2 text-sm text-gray-600">{ coverPhoto.name }</p> }
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="main-theme-color">Main Theme Color</Label>
            <CardDescription>Used on your Landing Page and as the default on all your campaigns.</CardDescription>
            <div className="flex space-x-2">
              <Input
                id="main-theme-color"
                type="text"
                value={ mainThemeColor }
                onChange={ ( e ) => setMainThemeColor( e.target.value ) }
                placeholder="e.g. #FF5733"
              />
              <Button>Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}