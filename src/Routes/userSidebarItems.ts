import createWallet from "@/Pages/User/createWallet";
import type { ISidebarItem } from "@/Types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Wallet",
    items: [
      {
        title: "Wallet",
        url: "/user/wallet",
        component: createWallet,
      },
    ],
  },
];
