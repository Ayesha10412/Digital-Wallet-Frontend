import Wallet from "@/Pages/User/Wallet";
import UserProfile from "@/Pages/User/UserProfile";
import type { ISidebarItem } from "@/Types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Wallet",
        url: "/user/wallet",
        component: Wallet,
      },
      {
        title: "Profile",
        url: "/user/profile",
        component: UserProfile,
      },
    ],
  },
];
