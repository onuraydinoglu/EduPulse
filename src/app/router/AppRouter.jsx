import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RegisterSchoolPage from "../../features/auth/pages/RegisterSchoolPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import SchoolsPage from "../../features/schools/pages/SchoolsPage";
import TeachersPage from "../../features/teachers/pages/TeachersPage";
import ClassesPage from "../../features/classes/pages/ClassesPage";
import StudentsPage from "../../features/students/pages/StudentsPage";
import ExamsPage from "../../features/exams/pages/ExamsPage";
import TrialExamsPage from "../../features/trialExams/pages/TrialExamsPage";
import ClubsPage from "../../features/clubs/pages/ClubsPage";
import PrincipalReportsPage from "../../features/reports/pages/PrincipalReportsPage";
import TeacherReportsPage from "../../features/reports/pages/TeacherReportsPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/register-school" element={<RegisterSchoolPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="schools" element={<SchoolsPage />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="exams" element={<ExamsPage />} />
          <Route path="trial-exams" element={<TrialExamsPage />} />
          <Route path="clubs" element={<ClubsPage />} />
          <Route path="reports/principal" element={<PrincipalReportsPage />} />
          <Route path="reports/teacher" element={<TeacherReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;