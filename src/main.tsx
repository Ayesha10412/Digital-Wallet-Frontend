import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/index.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./Redux/store.ts";
import { Toaster } from "./components/ui/sonner.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster richColors />
    </ReduxProvider>
  </StrictMode>
);
