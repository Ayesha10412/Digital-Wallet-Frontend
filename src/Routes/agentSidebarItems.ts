import AgentProfile from "@/Pages/Agent/AgentProfile";
import CashOutForm from "@/Pages/Agent/CashOutForm";
import Overview from "@/Pages/Agent/Overview";
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
        title: "Cash-Out",
        url: "/agent/cash-out",
        component: CashOutForm,
      },
    ],
  },
];
