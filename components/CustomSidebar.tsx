import { DocumentIcon, UserGroupIcon } from "@heroicons/react/24/outline";

import { HomeIcon, FolderIcon, ClipboardCheck, Library, } from 'lucide-react';
import Link from 'next/link';
import { HiOutlineLibrary } from "react-icons/hi";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { useUser } from '@/contexts/UserContext'; // Assuming you have a user context

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  {
    name: 'Events',
    icon: FolderIcon,
    children: [
      { name: 'Manage Events', href: '/events' },
      { name: 'Create Event', href: '/events/new' },
      { name: 'Scan Tickets', href: '/events/scan-tickets' },
    ],
  },
  {
    name: 'Team',
    icon: UserGroupIcon,
    children: [
      { name: 'Members', href: '/team/members' },
      { name: 'Committees', href: '/team/committees' },
      { name: 'Volunteers', href: '/team/volunteers' },
    ],
  },
  {
    name: 'Forms',
    icon: DocumentIcon,
    children: [
      { name: 'All Forms', href: '/forms/all-forms' },
      { name: 'Create Form', href: '/forms/new' },
    ],
  },
  {
    name: 'Sign Up Sheets',
    icon: ClipboardCheck,
    children: [
      { name: 'All', href: '/signup-sheets/all' },
      { name: 'Create Signup', href: '/signup-sheets/new' },
      { name: 'Groups', href: '/signup-sheets/groups' },
    ],
  },
  {
    name: 'Banking',
    icon: HiOutlineLibrary,
    children: [
      { name: 'Connect Account', href: '/banking' },
      { name: 'Payments', href: '/banking/payments' },
      { name: 'Payouts', href: '/banking/payouts' },
      { name: 'Account Settings', href: '/banking/account-settings' },
      { name: 'Help', href: '/banking/help' },
    ],
  },
];

export default function CustomSidebar ()
{
  const { user } = useUser();
  const orgName = user?.orgName;

  // Function to generate the correct path for each link
  const generateHref = ( href: string ) => ( orgName ? `/dashboard/${ orgName }${ href }` : href );

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              { navigation.map( ( item ) =>
                !item.children ? (
                  <SidebarMenuItem key={ item.name }>
                    <SidebarMenuButton asChild>
                      <Link href={ generateHref( item.href ) }>
                        <item.icon className="mr-2" />
                        <span>{ item.name }</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <SidebarGroup key={ item.name }>
                    <SidebarGroupLabel>{ item.name }</SidebarGroupLabel>
                    <SidebarGroupContent>
                      { item.children.map( ( subItem ) => (
                        <SidebarMenuItem key={ subItem.name }>
                          <SidebarMenuButton asChild>
                            <Link href={ generateHref( subItem.href ) }>
                              { subItem.name }
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ) ) }
                    </SidebarGroupContent>
                  </SidebarGroup>
                )
              ) }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}