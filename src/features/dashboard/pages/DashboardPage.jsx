import { Navigate } from "react-router-dom";

import { authStorage } from "../../auth/services/authStorage";
import AdminDashboardPage from "./AdminDashboardPage";
import PrincipalDashboardPage from "./PrincipalDashboardPage";
import TeacherDashboardPage from "./TeacherDashboardPage";

function DashboardPage() {
  const user = authStorage.getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = (user?.role || user?.roleName || "").toLowerCase();

  if (role === "superadmin" || role === "admin") {
    return <AdminDashboardPage />;
  }

  if (role === "schooladmin") {
    return <PrincipalDashboardPage />;
  }

  if (role === "teacher") {
    return <TeacherDashboardPage />;
  }

  return <Navigate to="/login" replace />;
}

export default DashboardPage;