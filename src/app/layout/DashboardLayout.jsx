import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex min-h-screen flex-col">
          <Navbar />

          <main className="flex-1 p-4 lg:p-6">
            <Outlet />
          </main>
        </div>

        <div className="drawer-side z-40">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;