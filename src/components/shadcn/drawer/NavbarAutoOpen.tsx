"use client"

import * as React from "react"
// import Link from "next/link"

import { cn } from "../../../lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../../components/ui/navigation-menu"
import { Link } from "react-router-dom"

const jobComponents: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]


const contractComponents: { title: string; href: string; description: string }[] = [
  {
    title: "New",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export const NavbarAutoOpen = ({roleType, roleInfo}: any) => {
  return (
    <div> 
  
    <NavigationMenu>
      <NavigationMenuList className='flex gap-16 py-2.5'>
       
      <NavigationMenuItem>

        
      <NavigationMenuTrigger>
        <Link to='/user/home' className='no-underline text-black'>
           Home
        </Link>
      </NavigationMenuTrigger>
          <NavigationMenuContent>
           
          </NavigationMenuContent>
        </NavigationMenuItem>
       
      <NavigationMenuItem>

        
        

          <NavigationMenuTrigger>
          <Link to='/user/jobs' className='no-underline text-black'>
           Jobs
        </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
           
              <ListItem href="/docs" title="All Jobs">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Proposals">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Recent Jobs">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Best Matches">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
          <Link to={`/${roleType}/job/myContracts/${roleInfo?._id}/${roleType}`} className='no-underline text-black'>
                  <button>Contracts</button>
                </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
           
              <ListItem href="/docs" title="My Contracts">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
             
           
              <ListItem href="/docs" title="Submitted Contracts">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
             
           
              <ListItem href="/docs" title="Rejected Contracts">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
             
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
          <Link to={`/${roleType}/jobs/proposals`} className='no-underline text-black'>
                    <button>proposals</button>
                  </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
           
              <ListItem href="/docs" title="My Proposals">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
             
           
              <ListItem href="/docs" title="Rejected Proposals">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
             
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
         
        </NavigationMenuItem>
  

        <NavigationMenuItem>
          <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
         
        </NavigationMenuItem>
  
      </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
