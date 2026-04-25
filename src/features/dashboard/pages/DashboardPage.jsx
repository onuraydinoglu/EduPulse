import { authStorage } from "../../auth/services/authStorage";
import AdminDashboard from "../components/AdminDashboard";
import PrincipalDashboard from "../components/PrincipalDashboard";
import TeacherDashboard from "../components/TeacherDashboard";

function DashboardPage() {
  const user = authStorage.getUser();

  if (user?.role === "admin") {
    return <AdminDashboard />;
  }

  if (user?.role === "principal") {
    return <PrincipalDashboard />;
  }

  if (user?.role === "teacher") {
    return <TeacherDashboard />;
  }

  return null;
}

export default DashboardPage;