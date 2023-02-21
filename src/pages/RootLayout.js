import { Outlet } from "react-router-dom";
import Header from "../components/Header";
function RootLayout() {
  return (
    <>
      <Header />
      <div className="d-flex justify-content-center">
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
