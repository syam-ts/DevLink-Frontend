 
import * as React from "react"; 
import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger, 
} from "../../../components/ui/navigation-menu";

interface NavbarAutoOpenProps {
  roleType: string
};

export const NavbarAutoOpen: React.FC<NavbarAutoOpenProps> = ({ roleType }) => {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList className="flex gap-16 py-2.5">
          <NavigationMenuItem>
            <Link to="/user/home" className="no-underline text-black">
              Home
            </Link>

            <NavigationMenuContent></NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link to="/user/jobs" className="no-underline text-black">
                Jobs
              </Link>
            </NavigationMenuTrigger>
            {/* <NavigationMenuContent>
            <ul className="grid gap-3 p-10 md:w-[700px] lg:w-[700px] lg:h-[300px] lg:grid-cols-[.95fr_1fr]">
           
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
          </NavigationMenuContent> */}
          </NavigationMenuItem>

          <NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link
                to={`/${roleType}/proposals`}
                className="no-underline text-black"
              >
                <button>proposals</button>
              </Link>
            </NavigationMenuTrigger>


            <NavigationMenuTrigger>
              <Link
                to={`/${roleType}/contracts/user`}
                className="no-underline text-black"
              >
                <button>Contracts</button>
              </Link>
            </NavigationMenuTrigger>
          
            <NavigationMenuTrigger>
              <Link
                to={`/${roleType}/invites`}
                className="no-underline text-black"
              >
                <button>Invites</button>
              </Link>
            </NavigationMenuTrigger>
          
          </NavigationMenuItem>

    

        
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link
                to={`/user/wishlist`}
                className="no-underline text-black"
              >
                <button>Wishlist</button>
              </Link>
            </NavigationMenuTrigger>

           
          </NavigationMenuItem>

          <NavigationMenuItem>About</NavigationMenuItem>

          <NavigationMenuItem>Contact</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

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
  );
});
ListItem.displayName = "ListItem";
