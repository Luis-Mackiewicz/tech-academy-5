import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4FBFA]">
      <Header />
      <main className="flex-grow pt-[12vh]">
        {" "}
        {/* 8vh (altura do Header) + 4vh (margem superior) */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
