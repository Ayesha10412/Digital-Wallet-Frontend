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
//import UpdateProfile from "@/Pages/User/UpdateProfile";
import WithdrawMoney from "@/Pages/User/WithdrawMoney";
import SendMoney from "@/Pages/User/SendMoney";
import CashInForm from "@/Pages/Agent/CashInForm";
import AddMoney from "@/Pages/User/AddMoney";
import CashOutForm from "@/Pages/Agent/CashOutForm";
import ResetPassword from "@/Component/ResetPassword";
import UpdateProfile from "@/Component/UpdateProfile";
import About from "@/Component/HomePage/Component/About";
import Features from "@/Component/HomePage/Component/Features";
import Contact from "@/Component/HomePage/Component/Contact";
import Pricing from "@/Component/HomePage/Component/Pricing";
import FAQ from "@/Component/HomePage/Component/FAQ";
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
        Component: ResetPassword,
        path: "/resetPassword",
      },
      {
        Component: About,
        path: "/about",
      },
      {
        Component: Features,
        path: "/features",
      },
      {
        Component: Contact,
        path: "/contact",
      },
      {
        Component: FAQ,
        path: "/faq",
      },
      {
        Component: Pricing,
        path: "/pricing",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, Role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/profile" /> },
      ...generateRoute(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, Role.agent as TRole),
    path: "/agent",
    children: [
      { index: true, element: <Navigate to="/agent/home" /> },
      ...generateRoute(agentSidebarItems),
      {
        Component: CashInForm,
        path: "/agent/cash-in",
      },
      {
        Component: CashOutForm,
        path: "/agent/cash-out",
      },
      {
        Component: AddMoney,
        path: "/agent/addMoney",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, Role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/wallet" /> },
      ...generateRoute(userSidebarItems),
      {
        Component: WithdrawMoney,
        path: "/user/withdrawMoney",
      },
      {
        Component: SendMoney,
        path: "/user/sendMoney",
      },
      {
        Component: AddMoney,
        path: "/user/addMoney",
      },
    ],
  },
]);
