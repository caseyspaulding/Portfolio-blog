'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";


interface Tab
{
  value: string;
  label: string;
  content: React.ReactNode;
}

interface EngageProps
{
  title: string;
  description: string;
 
  tabsData: Tab[];
}

export default function TabsComponent ( { title, description,  tabsData }: EngageProps )
{
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{ title }</h1>

      <Tabs defaultValue={ tabsData[ 0 ].value } className="space-y-4">
        <TabsList>
          { tabsData.map( ( tab ) => (
            <TabsTrigger key={ tab.value } value={ tab.value }>
              { tab.label }
            </TabsTrigger>
          ) ) }
        </TabsList>

        { tabsData.map( ( tab ) => (
          <TabsContent key={ tab.value } value={ tab.value } className="space-y-4">
            { tab.content }
          </TabsContent>
        ) ) }
      </Tabs>
    </div>
  );
}


//Usage Example:
//Now, you can use the Engage component like this:

//tsx
//Copy code
//import Engage from './Engage';

//const tabsData = [
//  {
//    value: 'emails',
//    label: 'Emails',
//    content: (
//      <div>
//        <div className="flex flex-col md:flex-row gap-8">
//          <div className="flex-1 space-y-4">
//            <h2 className="text-3xl font-bold">Send personalized emails, texts, videos, and more</h2>
//            <p className="text-xl">Engage your community like never before. This is donor stewardship, done right.</p>
//            <Button size="lg">Request access</Button>
//          </div>
//          <div className="flex-1">
//            <img
//              src="/placeholder.svg?height=400&width=400"
//              alt="Engage app interface"
//              className="w-full h-auto rounded-lg shadow-lg"
//            />
//          </div>
//        </div>
//      </div>
//    ),
//  },
//  {
//    value: 'texts',
//    label: 'Texts',
//    content: <p>Content for text messaging will go here.</p>,
//  },
//  {
//    value: 'mailings',
//    label: 'Mailings',
//    content: <p>Content for mailings will go here.</p>,
//  },
//  {
//    value: 'settings',
//    label: 'Settings',
//    content: <p>Engage settings and configurations will go here.</p>,
//  },
//];

//export default function MyApp ()
//{
//  return (
//    <Engage
//      title="Engage"
//      description="Engage your audience with personalized content."
//      buttonLabel="Request access"
//      tabsData={ tabsData }
//    />
//  );
//}