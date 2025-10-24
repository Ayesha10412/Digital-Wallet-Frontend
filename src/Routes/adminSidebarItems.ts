import AdminProfile from "@/Pages/Admin/AdminProfile";
import allTransaction from "@/Pages/Admin/allTransaction";
import AllUsers from "@/Pages/Admin/AllUsers";
import Analytics from "@/Pages/Admin/Analytics";
import type { ISidebarItem } from "@/Types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
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
    title: "Transaction Management",
    items: [
      {
        title: "All User",
        url: "/admin/all-user",
        component: AllUsers,
      },
      {
        title: "Get all Transaction",
        url: "/admin/all-transaction",
        component: allTransaction,
      },
    ],
  },
];
