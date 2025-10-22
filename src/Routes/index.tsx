import App from "@/App";
import Home from "@/Component/HomePage/Home";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import { createBrowserRouter } from "react-router";
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
    ],
  },
]);
