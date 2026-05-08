import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AcademicCapIcon,
  ArrowLeftIcon,
  ClipboardDocumentListIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import Toast from "../../../components/ui/Toast";
import { classService } from "../services/classService";
import { studentService } from "../../students/services/studentService";
import { examService } from "../../exams/services/examService";

const getData = (result) => result?.data || result?.Data || result || [];

const getId = (item) => item?.id || item?.Id;
const getClassroomId = (item) => item?.classroomId || item?.ClassroomId;
const getFirstName = (item) => item?.firstName || item?.FirstName || "";
const getLastName = (item) => item?.lastName || item?.LastName || "";
const getStudentNumber = (item) => item?.studentNumber || item?.StudentNumber || "-";

const getClassName = (classroom) => {
  const grade = classroom?.grade || classroom?.Grade;
  const section = classroom?.section || classroom?.Section;

  if (!grade && !section) return "Sınıf";
  return `${grade || ""}-${section || ""}`.replace(/-$/, "");
};

const getTeacherName = (classroom) =>
  classroom?.teacherFullName ||
  classroom?.TeacherFullName ||
  classroom?.advisorTeacherFullName ||
  classroom?.AdvisorTeacherFullName ||
  classroom?.teacherName ||
  classroom?.TeacherName ||
  "-";

const getAverage = (grade) =>
  grade?.average ?? grade?.Average ?? grade?.generalAverage ?? grade?.GeneralAverage ?? "-";

const getLessonName = (grade) =>
  grade?.lessonName || grade?.LessonName || grade?.lesson?.name || grade?.Lesson?.Name || "-";

function ClassroomWorkspacePage() {
  const { classId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("students");
  const [classroom, setClassroom] = useState(null);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const classStudents = useMemo(() => {
    return students.filter((student) => getClassroomId(student) === classId);
  }, [students, classId]);

  const classGrades = useMemo(() => {
    const classStudentIds = classStudents.map((student) => getId(student));

    return grades.filter((grade) => {
      const studentId = grade?.studentId || grade?.StudentId;
      const gradeClassroomId = grade?.classroomId || grade?.ClassroomId;

      return gradeClassroomId === classId || classStudentIds.includes(studentId);
    });
  }, [grades, classStudents, classId]);

  const loadWorkspace = async () => {
    try {
      setLoading(true);

      const [classResult, studentResult, gradeResult] = await Promise.all([
        classService.getById(classId),
        studentService.getAll(),
        examService.getAll(),
      ]);

      setClassroom(getData(classResult));
      setStudents(getData(studentResult));
      setGrades(getData(gradeResult));
    } catch (error) {
      console.error(error);
      showToast(error?.message || "Sınıf çalışma alanı yüklenirken hata oluştu.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkspace();
  }, [classId]);

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <div className="rounded-3xl border border-base-300/60 bg-base-100 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/classes")}
              className="btn btn-ghost btn-circle"
              aria-label="Sınıflara dön"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-base-content">
                  {getClassName(classroom)} Sınıfı
                </h1>

                <span
                  className={`badge ${
                    classroom?.isActive ?? classroom?.IsActive
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {classroom?.isActive ?? classroom?.IsActive ? "Aktif" : "Pasif"}
                </span>
              </div>

              <p className="mt-1 text-sm text-base-content/60">
                Sınıf öğretmeni:{" "}
                <span className="font-semibold text-base-content">
                  {getTeacherName(classroom)}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Link
              to={`/dashboard/students?classroomId=${classId}`}
              className="btn btn-primary rounded-2xl"
            >
              <UserPlusIcon className="h-5 w-5" />
              Öğrenci Kaydı
            </Link>

            <Link
              to={`/dashboard/exams?classroomId=${classId}`}
              className="btn btn-outline rounded-2xl"
            >
              <ClipboardDocumentListIcon className="h-5 w-5" />
              Not Girişi
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-base-300/60 bg-base-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <UsersIcon className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm text-base-content/60">Öğrenci</p>
              <p className="text-2xl font-bold">{classStudents.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-base-300/60 bg-base-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-secondary/10 p-3 text-secondary">
              <ClipboardDocumentListIcon className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm text-base-content/60">Not Kaydı</p>
              <p className="text-2xl font-bold">{classGrades.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-base-300/60 bg-base-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-accent/10 p-3 text-accent">
              <AcademicCapIcon className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm text-base-content/60">Sınıf</p>
              <p className="text-2xl font-bold">{getClassName(classroom)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-base-300/60 bg-base-100 shadow-sm">
        <div className="border-b border-base-300/60 p-4">
          <div className="tabs tabs-boxed w-fit bg-base-200/70">
            <button
              type="button"
              className={`tab ${activeTab === "students" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("students")}
            >
              Öğrenciler
            </button>

            <button
              type="button"
              className={`tab ${activeTab === "grades" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("grades")}
            >
              Sınav Notları
            </button>
          </div>
        </div>

        {activeTab === "students" && (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-xs uppercase text-base-content/50">
                  <th>Öğrenci</th>
                  <th>Okul No</th>
                  <th>Durum</th>
                </tr>
              </thead>

              <tbody>
                {classStudents.map((student) => (
                  <tr key={getId(student)} className="hover">
                    <td>
                      <div className="font-semibold">
                        {getFirstName(student)} {getLastName(student)}
                      </div>
                    </td>

                    <td>{getStudentNumber(student)}</td>

                    <td>
                      <span
                        className={`badge ${
                          student?.isActive ?? student?.IsActive
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {student?.isActive ?? student?.IsActive ? "Aktif" : "Pasif"}
                      </span>
                    </td>
                  </tr>
                ))}

                {classStudents.length === 0 && (
                  <tr>
                    <td colSpan="3" className="py-10 text-center text-base-content/50">
                      Bu sınıfa bağlı öğrenci bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "grades" && (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-xs uppercase text-base-content/50">
                  <th>Ders</th>
                  <th>Öğrenci</th>
                  <th>Ortalama</th>
                </tr>
              </thead>

              <tbody>
                {classGrades.map((grade) => {
                  const studentId = grade?.studentId || grade?.StudentId;
                  const student = classStudents.find((item) => getId(item) === studentId);

                  return (
                    <tr key={getId(grade)} className="hover">
                      <td className="font-semibold">{getLessonName(grade)}</td>

                      <td>
                        {student
                          ? `${getFirstName(student)} ${getLastName(student)}`
                          : grade?.studentFullName || grade?.StudentFullName || "-"}
                      </td>

                      <td>{getAverage(grade)}</td>
                    </tr>
                  );
                })}

                {classGrades.length === 0 && (
                  <tr>
                    <td colSpan="3" className="py-10 text-center text-base-content/50">
                      Bu sınıfa ait not kaydı bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassroomWorkspacePage;