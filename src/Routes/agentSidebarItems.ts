import AgentProfile from "@/Pages/Agent/AgentProfile";
import type { ISidebarItem } from "@/Types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent",
    items: [
      {
        title: "Profile",
        url: "/agent/profile",
        component: AgentProfile,
      },
    ],
  },
];
