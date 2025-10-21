import Footer from "@/Component/Shared/Footer";
import Navbar from "@/Component/Shared/Navbar";
import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}
export default function CommonLayout({ children }: IProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <div className="grow-1">{children}</div>
      <Footer></Footer>
    </div>
  );
}
