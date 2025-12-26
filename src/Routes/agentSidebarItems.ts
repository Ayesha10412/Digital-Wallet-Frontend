import AgentProfile from "@/Pages/Agent/AgentProfile";
//import CashOutForm from "@/Pages/Agent/CashOutForm";
import Overview from "@/Pages/Agent/Overview";
import TransactionHistory from "@/Pages/TransactionHistory";
import type { ISidebarItem } from "@/Types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Dashboard",

    items: [
      { title: "Agent Home", url: "/agent/home", component: Overview },
      {
        title: "Profile",
        url: "/agent/profile",
        component: AgentProfile,
      },
      {
        title: "Transaction History",
        url: "/agent/history",
        component: TransactionHistory,
      },
    ],
  },
];
