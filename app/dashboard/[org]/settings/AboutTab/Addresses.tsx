import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

interface Address
{
  id: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export default function AddressesTab ()
{
  const [ organizationAddress, setOrganizationAddress ] = useState<Address | null>( null )
  const [ mailingAddresses, setMailingAddresses ] = useState<Address[]>( [] )

  const addAddress = ( type: 'organization' | 'mailing', address: Address ) =>
  {
    if ( type === 'organization' )
    {
      setOrganizationAddress( address )
    } else
    {
      setMailingAddresses( [ ...mailingAddresses, address ] )
    }
  }

  return (
    <div className="space-y-6">
      <AddressSection
        title="Organization address"
        description="This address is your organization's official legal address on record."
        addresses={ organizationAddress ? [ organizationAddress ] : [] }
        onAddAddress={ ( address ) => addAddress( 'organization', address ) }
        singleAddress
      />
      <AddressSection
        title="Mailing and return address"
        description="Addresses can be saved and used for communicating with supporters, including return addresses on letters, and emails."
        addresses={ mailingAddresses }
        onAddAddress={ ( address ) => addAddress( 'mailing', address ) }
      />
    </div>
  )
}

interface AddressSectionProps
{
  title: string
  description: string
  addresses: Address[]
  onAddAddress: ( address: Address ) => void
  singleAddress?: boolean
}

function AddressSection ( { title, description, addresses, onAddAddress, singleAddress }: AddressSectionProps )
{
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{ title }</CardTitle>
        <AddAddressDialog onAddAddress={ onAddAddress } />
      </CardHeader>
      <CardContent>
        <CardDescription>{ description }</CardDescription>
        { addresses.length === 0 ? (
          <p className="text-sm text-gray-500 mt-4">No address found</p>
        ) : (
          <div className="mt-4 space-y-4">
            { addresses.map( ( address ) => (
              <div key={ address.id } className="p-4 border rounded-md">
                <p>{ address.street }</p>
                <p>{ `${ address.city }, ${ address.state } ${ address.zipCode }` }</p>
                <p>{ address.country }</p>
              </div>
            ) ) }
          </div>
        ) }
      </CardContent>
    </Card>
  )
}

function AddAddressDialog ( { onAddAddress }: { onAddAddress: ( address: Address ) => void } )
{
  const [ newAddress, setNewAddress ] = useState<Omit<Address, 'id'>>( {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  } )

  const handleSubmit = ( e: React.FormEvent ) =>
  {
    e.preventDefault()
    onAddAddress( {
      id: Date.now().toString(),
      ...newAddress,
    } )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>
        <form onSubmit={ handleSubmit } className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street</Label>
            <Input
              id="street"
              value={ newAddress.street }
              onChange={ ( e ) => setNewAddress( { ...newAddress, street: e.target.value } ) }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={ newAddress.city }
              onChange={ ( e ) => setNewAddress( { ...newAddress, city: e.target.value } ) }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={ newAddress.state }
              onChange={ ( e ) => setNewAddress( { ...newAddress, state: e.target.value } ) }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              value={ newAddress.zipCode }
              onChange={ ( e ) => setNewAddress( { ...newAddress, zipCode: e.target.value } ) }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={ newAddress.country }
              onChange={ ( e ) => setNewAddress( { ...newAddress, country: e.target.value } ) }
              required
            />
          </div>
          <Button type="submit">Add Address</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}