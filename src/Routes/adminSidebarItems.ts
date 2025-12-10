import AdminProfile from "@/Pages/Admin/AdminProfile";
import AllUsers from "@/Pages/Admin/AllUsers";
import Analytics from "@/Pages/Admin/Analytics";
import type { ISidebarItem } from "@/Types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Profile",
        url: "/admin/profile",
        component: AdminProfile,
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All User",
        url: "/admin/all-user",
        component: AllUsers,
      },
     
    ],
  },
];
