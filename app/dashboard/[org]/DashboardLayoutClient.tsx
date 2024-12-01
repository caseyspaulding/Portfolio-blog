"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { loadStripe, Stripe } from "@stripe/stripe-js"
import Link from "next/link"
import
{
  ChevronRight,
  ClipboardCheck,
  ChevronsUpDown,

  FolderIcon,
  HomeIcon,
  MoreHorizontal,
  ArrowBigDownIcon,
  MoveRightIcon,
  TicketCheck,

} from "lucide-react"
import { HiOutlineLibrary } from "react-icons/hi"

import UserProvider from "@/contexts/UserContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import
{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import
{
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import
{
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import
{
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import type { UserType } from "@/types/UserType"
import { DocumentIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import { signOut } from "@/app/actions/SignOut"
import FeedbackFormDialog from "@/components/FeedbackFormDialog"

interface DashboardLayoutClientProps
{
  children: React.ReactNode
  user: UserType | null
  stripePublishableKey: string
}


export default function DashboardLayoutClient ( {
  children,
  user,
  stripePublishableKey,
}: DashboardLayoutClientProps )
{
  const [ stripe, setStripe ] = useState<Stripe | null>( null )
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [ stripeConnectInstance, setStripeConnectInstance ] = useState<any>( null );
  // Initialize Stripe
  useEffect( () =>
  {
    const initializeStripe = async () =>
    {
      if ( stripePublishableKey )
      {
        const stripeInstance = await loadStripe( stripePublishableKey )
        setStripe( stripeInstance )
      }
    }

    initializeStripe()
  }, [ stripePublishableKey ] )

  const handleLogout = async () =>
  {
    try
    {
      // Logout from Stripe Connect session, if instance is initialized
      if ( stripeConnectInstance )
      {
        await stripeConnectInstance.logout(); // Ensure this is awaited
        console.log( "Stripe Connect session destroyed." );
      }

      // Proceed with server-side sign out (Supabase logout)
      await signOut();
      console.log( "Signed out successfully from Supabase." );

    } catch ( error )
    {
      console.error( "Error during logout:", error );
    }
  };

  const orgName = user?.orgName

  // Navigation structure with dynamic links based on orgName
  const navigation = [
    { name: "Dashboard", href: "/", icon: HomeIcon },
    {
      name: "Events",
      icon: FolderIcon,
      children: [
        { name: "Manage Events", href: "/events" },
        { name: "Create Event", href: "/events/new" },
        { name: "Scan Tickets", href: "/events/scan-tickets" },
      ],
    },
    { name: "Scan Tickets", href: "/events/scan-tickets", icon: TicketCheck },
    {
      name: "Team",
      icon: UserGroupIcon,
      children: [
        { name: "Members", href: "/team/members" },

      ],
    },
    {
      name: "Forms",
      icon: DocumentIcon,
      children: [
        { name: "All Forms", href: "/forms/all-forms" },
        { name: "Create Form", href: "/forms/new" },
      ],
    },
    //{
    //  name: "Sign Up Sheets",
    //  icon: ClipboardCheck,
    //  children: [
    //    { name: "All", href: "/signup-sheets/all" },
    //    { name: "Create Signup", href: "/signup-sheets/new" },
    //    { name: "Groups", href: "/signup-sheets/groups" },
    //  ],
    //},
    {
      name: "Banking",
      icon: HiOutlineLibrary,
      children: [
        { name: "Connect Account", href: "/banking" },
        { name: "Payments", href: "/banking/payments" },
        { name: "Payouts", href: "/banking/payouts" },
        { name: "Account Settings", href: "/banking/account-settings" },
        { name: "Help", href: "/banking/help" },
      ],
    },
  ]

  // Function to generate the correct path for each link
  const generateHref = ( href: string ) =>
    orgName ? `/dashboard/${ orgName }${ href }` : href

  return (
    <UserProvider initialUser={ user }>
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg ">
                        <img
                          src="/images/Logo_Icon.webp"
                          width={ 32 }
                          height={ 32 }
                        />
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          { orgName || "Organization" }
                        </span>
                        <span className="truncate text-xs">Dashboard</span>
                      </div>

                    </SidebarMenuButton>
                  </DropdownMenuTrigger>


                  {/* Add organization switching logic here if needed */ }

                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
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
                            <item.icon className="mr-2 h-5 w-5" />
                            <span>{ item.name }</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ) : (
                      <Collapsible
                        key={ item.name }
                        asChild
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                              <item.icon className="mr-2 h-5 w-5" />
                              <span>{ item.name }</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenu>
                              { item.children.map( ( subItem ) => (
                                <SidebarMenuItem key={ subItem.name }>
                                  <SidebarMenuButton asChild>
                                    <Link href={ generateHref( subItem.href ) }>
                                      <span>{ subItem.name }</span>
                                    </Link>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              ) ) }
                            </SidebarMenu>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    )
                  ) }
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Support</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <FeedbackFormDialog />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={ user?.avatar || "/placeholder.svg" }
                          alt={ user?.name || "User" }
                        />
                        <AvatarFallback className="rounded-lg">
                          { user?.name?.[ 0 ] || "U" }
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          { user?.name || "User" }
                        </span>
                        <span className="truncate text-xs">
                          { user?.email || "user@example.com" }
                        </span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="bottom"
                    align="end"
                    sideOffset={ 4 }
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage
                            src={ user?.avatar || "/placeholder.svg" }
                            alt={ user?.name || "User" }
                          />
                          <AvatarFallback className="rounded-lg">
                            { user?.name?.[ 0 ] || "U" }
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            { user?.name || "User" }
                          </span>
                          <span className="truncate text-xs">
                            { user?.email || "user@example.com" }
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href={ generateHref( '/profile' ) } className="w-full text-left">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {/*<DropdownMenuItem>Settings</DropdownMenuItem>*/ }
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={ handleLogout }>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1"  >

              </SidebarTrigger >



            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{ children }</div>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  )
}

