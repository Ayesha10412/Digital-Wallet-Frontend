import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../components/ui/sidebar";
import type React from "react";
import { getSidebarItems } from "@/Utils/getSidebarItems";
import { Link, useLocation } from "react-router";
import Logo from "@/assets/icons/Logo";
import { useUserInfoQuery } from "@/Redux/Features/User/user.api";
import Logout from "./Shared/Logout";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);
  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };
  const location = useLocation();
  return (
    <Sidebar {...props}>
      <SidebarHeader className="items-center">
        <Link to="/" className="w-[20%]">
          <Logo></Logo>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We will create a sidebarGroup for each parent */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.url}
                          className={`block rounded-md px-2 py-2 transition
                            ${
                              isActive
                                ? "bg-blue-400 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }
                          `}
                        >
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <div className="mt-6 text-sm font-medium text-gray-600">
          <div className=" flex  justify-center">
            <hr className="w-[80%] my-2 border-t border-gray-300" />
          </div>
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-gray-100 rounded text-left"
          >
            Home
          </Link>

          <div className=" hover:bg-gray-200  text-sm">
            <Logout className="w-full justify-start hover:text-gray-700  border-none bg-none " />
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
