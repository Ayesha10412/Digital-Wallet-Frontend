import { Role } from "@/Constant/Role";
import { adminSidebarItems } from "@/Routes/adminSidebarItems";
import { agentSidebarItems } from "@/Routes/agentSidebarItems";
import { userSidebarItems } from "@/Routes/userSidebarItems";
import type { TRole } from "@/Types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case Role.admin:
      return [...adminSidebarItems];

    case Role.agent:
      return [...agentSidebarItems];

    case Role.user:
      return [...userSidebarItems];

    default:
      return [];
  }
};
