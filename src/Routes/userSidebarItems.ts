import CashInForm from "@/Pages/Agent/CashInForm";
import CashOutForm from "@/Pages/Agent/CashOutForm";
import createWallet from "@/Pages/User/createWallet";
import UserProfile from "@/Pages/User/UserProfile";
import type { ISidebarItem } from "@/Types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Wallet",
        url: "/user/wallet",
        component: createWallet,
      },
      {
        title: "Profile",
        url: "/user/profile",
        component: UserProfile,
      },
      {
        title: "Cash In",
        url: "/user/cash-in",
        component: CashInForm,
      },
      {
        title: "Cash Out",
        url: "/user/cash-out",
        component: CashOutForm,
      },
    ],
  },
];
