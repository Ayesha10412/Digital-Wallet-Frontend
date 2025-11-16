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
import UpdateProfile from "@/Pages/User/UpdateProfile";
import WithdrawMoney from "@/Pages/User/WithdrawMoney";
import SendMoney from "@/Pages/User/SendMoney";
import CashInForm from "@/Pages/User/CashInForm";
import AddMoney from "@/Pages/User/AddMoney";
//import CashOutForm from "@/Pages/User/CashOutForm";
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
        Component: UpdateProfile,
        path: "/profile/edit",
      },
      {
        Component: WithdrawMoney,
        path: "/user/withdrawMoney",
      },
      {
        Component: SendMoney,
        path: "/user/sendMoney",
      },
      {
        Component: CashInForm,
        path: "/user/cash-in",
      },
      // {
      //   Component: CashOutForm,
      //   path: "/user/cash-out",
      // },
      {
        Component: AddMoney,
        path: "/user/addMoney",
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
          { index: true, element: <Navigate to="/agent/home" /> },
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
