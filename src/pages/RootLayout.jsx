import { Outlet } from "react-router-dom";
import Header from "../components/Header";
function RootLayout() {
  return (
    <>
      <Header />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
