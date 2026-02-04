import AdminProfile from "@/Pages/Admin/AdminProfile";
import AllAgents from "@/Pages/Admin/AllAgents";
import AllUsers from "@/Pages/Admin/AllUsers";
import Analytics from "@/Pages/Admin/Analytics";
import type { ISidebarItem } from "@/Types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin Dashboard",
    items: [
        {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
      {
        title: "Profile",
        url: "/admin/profile",
        component: AdminProfile,
      },
    
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All Agent",
        url: "/admin/all-agent",
        component: AllAgents,
      },
      {
        title: "All User",
        url: "/admin/all-user",
        component: AllUsers,
      },
     
    ],
  },
];
