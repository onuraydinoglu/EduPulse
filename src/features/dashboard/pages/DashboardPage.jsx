import { authStorage } from "../../auth/services/authStorage";
import AdminDashboardPage from "./AdminDashboardPage";
import PrincipalDashboardPage from "./PrincipalDashboardPage";
import TeacherDashboardPage from "./TeacherDashboardPage";

function DashboardPage() {
  const user = authStorage.getUser();

  if (user?.role === "admin") {
    return <AdminDashboardPage />;
  }

  if (user?.role === "principal") {
    return <PrincipalDashboardPage />;
  }

  if (user?.role === "teacher") {
    return <TeacherDashboardPage />;
  }

  return null;
}

export default DashboardPage;