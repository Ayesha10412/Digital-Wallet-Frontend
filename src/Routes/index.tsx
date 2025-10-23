import App from "@/App";
import Home from "@/Component/HomePage/Home";
import { Role } from "@/Constant/Role";
import DashboardLayout from "@/Layout/DashboardLayout";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import Unauthorized from "@/Pages/Unauthorized";
import type { TRole } from "@/Types";
import { withAuth } from "@/Utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { generateRoute } from "@/Utils/generateRoute";
import { agentSidebarItems } from "./agentSidebarItems";
export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        index: true,
      },
      {
        Component: Register,
        path: "/register",
      },
      {
        Component: Login,
        path: "/login",
      },
      {
        Component: Unauthorized,
        path: "/unauthorized",
      },

      {
        Component: withAuth(DashboardLayout, Role.admin as TRole),
        path: "/admin",
        children: [
          { index: true, element: <Navigate to="/admin/all-transaction" /> },
          ...generateRoute(adminSidebarItems),
        ],
      },
      {
        Component: withAuth(DashboardLayout, Role.agent as TRole),
        path: "/agent",
        children: [
          { index: true, element: <Navigate to="/agent/profile" /> },
          ...generateRoute(agentSidebarItems),
        ],
      },
      {
        Component: withAuth(DashboardLayout, Role.user as TRole),
        path: "/user",
        children: [
          { index: true, element: <Navigate to="/user/wallet" /> },
          ...generateRoute(userSidebarItems),
        ],
      },
    ],
  },
]);
