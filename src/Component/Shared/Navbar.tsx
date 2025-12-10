import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Role } from "@/Constant/Role";
import { ModeToggle } from "@/Layout/ModeToggle";
//import { authApi, useLogoutMutation } from "@/Redux/Features/auth/auth.api";
import { useUserInfoQuery } from "@/Redux/Features/User/user.api";
//import { useAppDispatch } from "@/Redux/hook";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: Role.admin },
  { href: "/agent", label: "Dashboard", role: Role.agent },
  { href: "/user", label: "Dashboard", role: Role.user },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/pricing", label: "Pricing", role: "PUBLIC" },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  // const [logout] = useLogoutMutation();
  // const dispatch = useAppDispatch();
  const location = useLocation();
  //console.log(data);
  // const handleLogout = async () => {
  //   await logout(undefined);
  //   dispatch(authApi.util.resetApiState());
  // };
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* left side */}
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem className="w-full" key={index}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          className={`py-1.5 font-medium ${
                            location.pathname === link.href
                              ? "text-blue-400"
                              : "text-muted-foreground hover:text-primary"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main div */}
          <div className="flex items-center gap-6">
            <a href="#" className="w-[10%]  text-primary hover:text-primary/90">
              <Logo></Logo>
            </a>
            {/* navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    {link.role === "PUBLIC" && (
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className={`py-1.5 font-medium ${
                              location.pathname === link.href
                                ? "text-blue-400"
                                : "text-muted-foreground hover:text-primary"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                    {link.role === data?.data?.role && (
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className={`py-1.5 font-medium ${
                              location.pathname === link.href
                                ? "text-blue-400"
                                : "text-muted-foreground hover:text-primary"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </React.Fragment>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle></ModeToggle>
          {data?.data?.email && (
          <Logout />
          )}

          {!data?.data?.email && (
            <Button asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
