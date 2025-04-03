import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className="layout">
      <Header />

      <div className="content-container">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
