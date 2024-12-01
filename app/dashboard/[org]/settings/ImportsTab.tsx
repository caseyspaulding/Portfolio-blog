import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download } from "lucide-react"

interface Import
{
  id: string
  resource: string
  totalRows: number
  failedRows: number
  date: string
  status: "Completed" | "Failed" | "In Progress"
}

export default function ImportsTab ()
{
  const [ activeTab, setActiveTab ] = useState( "history" )
  const [ imports, setImports ] = useState<Import[]>( [] )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Imports</CardTitle>
        <div className="flex space-x-2">
          <Button variant="link" className="text-blue-600">
            Help Center
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> New Import
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={ activeTab } onValueChange={ setActiveTab } className="w-full">
          <TabsList>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="recurring">Recurring Plans</TabsTrigger>
          </TabsList>
          <TabsContent value="history">
            <ImportTable imports={ imports } />
          </TabsContent>
          <TabsContent value="drafts">
            <p>Drafts content</p>
          </TabsContent>
          <TabsContent value="recurring">
            <p>Recurring Plans content</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function ImportTable ( { imports }: { imports: Import[] } )
{
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Resource</TableHead>
          <TableHead>Total Rows</TableHead>
          <TableHead>Failed Rows</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { imports.length === 0 ? (
          <TableRow>
            <TableCell colSpan={ 5 } className="h-24 text-center">
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <p>You haven't imported any files.</p>
            </TableCell>
          </TableRow>
        ) : (
          imports.map( ( importItem ) => (
            <TableRow key={ importItem.id }>
              <TableCell>{ importItem.resource }</TableCell>
              <TableCell>{ importItem.totalRows }</TableCell>
              <TableCell>{ importItem.failedRows }</TableCell>
              <TableCell>{ importItem.date }</TableCell>
              <TableCell>{ importItem.status }</TableCell>
            </TableRow>
          ) )
        ) }
      </TableBody>
    </Table>
  )
}