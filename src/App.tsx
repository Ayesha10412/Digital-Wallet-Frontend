import { Outlet } from "react-router-dom";
import "./App.css";
import CommonLayout from "./Layout/CommonLayout";

function App() {
  return (
    <>
      <CommonLayout>
        <Outlet></Outlet>
      </CommonLayout>
    </>
  );
}

export default App;
