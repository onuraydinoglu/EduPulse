import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex min-h-screen flex-col bg-base-200/70">
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      <Sidebar collapsed={collapsed} />
    </div>
  );
}

export default DashboardLayout;