import allTransaction from "@/Pages/Admin/allTransaction";
import Analytics from "@/Pages/Admin/Analytics";
import type { ISidebarItem } from "@/Types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
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
        title: "Get all Transaction",
        url: "/admin/all-transaction",
        component: allTransaction,
      },
    ],
  },
];
