import CashOutForm from "@/Pages/Agent/CashOutForm";
import AddMoney from "@/Pages/User/AddMoney";
import CashInForm from "@/Pages/User/CashInForm";
import createWallet from "@/Pages/User/createWallet";
import SendMoney from "@/Pages/User/SendMoney";
import UserProfile from "@/Pages/User/UserProfile";
import WithdrawMoney from "@/Pages/User/WithdrawMoney";
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
        title: "Add Money",
        url: "/user/addMoney",
        component: AddMoney,
      },
      {
        title: "Withdraw Money",
        url: "/user/withdrawMoney",
        component: WithdrawMoney,
      },
      {
        title: "Send Money",
        url: "/user/sendMoney",
        component: SendMoney,
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
