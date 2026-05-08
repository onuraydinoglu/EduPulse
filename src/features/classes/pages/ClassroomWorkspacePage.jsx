import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AcademicCapIcon,
  ArrowLeftIcon,
  ClipboardDocumentListIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import StudentForm from "../../students/components/StudentForm";

import { classService } from "../services/classService";
import { teacherService } from "../../teachers/services/teacherService";
import { studentService } from "../../students/services/studentService";

import {
  getClassName,
  getClassTeacherName,
} from "../utils/classFormatters";

import {
  validateForm,
  hasValidationError,
} from "../../../validations/validationRules";
import { studentValidationSchema } from "../../../validations/schemas";
import { cleanPhone } from "../../../utils/phoneFormatter";

const emptyStudentForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  studentNumber: "",
  classroomId: "",
  isActive: true,
};

const getResultData = (result) => result?.data || result?.Data || result || [];

const getId = (item) => item?.id || item?.Id;
const getClassroomId = (item) => item?.classroomId || item?.ClassroomId;
const getFirstName = (item) => item?.firstName || item?.FirstName || "";
const getLastName = (item) => item?.lastName || item?.LastName || "";
const getStudentNumber = (item) =>
  item?.studentNumber || item?.StudentNumber || "-";

const getAverage = (grade) =>
  grade?.average ??
  grade?.Average ??
  grade?.generalAverage ??
  grade?.GeneralAverage ??
  "-";

const getLessonName = (grade) =>
  grade?.lessonName ||
  grade?.LessonName ||
  grade?.lesson?.name ||
  grade?.Lesson?.Name ||
  "-";

function ClassroomWorkspacePage() {
  const { classId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("students");
  const [classroom, setClassroom] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);

  const [studentFormData, setStudentFormData] = useState({
    ...emptyStudentForm,
    classroomId: classId,
  });

  const [studentErrors, setStudentErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingStudent, setSavingStudent] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const getErrorMessage = (error, fallback) => {
    const data = error?.response?.data;

    if (typeof data === "string") return data;

    return (
      data?.message ||
      data?.Message ||
      data?.error ||
      data?.Error ||
      data?.title ||
      data?.errors?.[0] ||
      data?.Errors?.[0] ||
      error?.message ||
      fallback
    );
  };

  const getBackendFieldErrors = (error) => {
    const data = error?.response?.data;
    const backendErrors = data?.errors || data?.Errors;

    if (!backendErrors || Array.isArray(backendErrors)) return {};

    const fieldErrors = {};

    Object.entries(backendErrors).forEach(([key, value]) => {
      const fieldName = key.charAt(0).toLowerCase() + key.slice(1);
      fieldErrors[fieldName] = Array.isArray(value) ? value[0] : value;
    });

    return fieldErrors;
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

      const [classResult, teacherResult, studentResult] = await Promise.all([
        classService.getById(classId),
        teacherService.getAll(),
        studentService.getAll(),
      ]);

      if (classResult?.isSuccess === false) {
        showToast(classResult.message || "Sınıf bilgisi getirilemedi.", "error");
        return;
      }

      if (teacherResult?.isSuccess === false) {
        showToast(
          teacherResult.message || "Öğretmenler getirilemedi.",
          "error"
        );
        return;
      }

      if (studentResult?.isSuccess === false) {
        showToast(studentResult.message || "Öğrenciler getirilemedi.", "error");
        return;
      }

      setClassroom(getResultData(classResult));
      setTeachers(getResultData(teacherResult));
      setStudents(getResultData(studentResult));
      setGrades([]);
    } catch (error) {
      console.error(error);

      showToast(
        getErrorMessage(error, "Sınıf çalışma alanı yüklenirken hata oluştu."),
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkspace();
  }, [classId]);

  const handleOpenStudentModal = () => {
    setStudentErrors({});
    setStudentFormData({
      ...emptyStudentForm,
      classroomId: classId,
    });

    document.getElementById("classroom_student_modal")?.showModal();
  };

  const handleCloseStudentModal = () => {
    setStudentErrors({});
    setStudentFormData({
      ...emptyStudentForm,
      classroomId: classId,
    });

    document.getElementById("classroom_student_modal")?.close();
  };

  const handleCreateStudent = async () => {
    const preparedFormData = {
      ...studentFormData,
      classroomId: classId,
    };

    const validationErrors = validateForm(
      preparedFormData,
      studentValidationSchema
    );

    setStudentErrors(validationErrors);

    if (hasValidationError(validationErrors)) {
      showToast("Eksik veya hatalı alanlar var.", "error");
      return;
    }

    const payload = {
      firstName: preparedFormData.firstName.trim(),
      lastName: preparedFormData.lastName.trim(),
      email: preparedFormData.email.trim(),
      phoneNumber: cleanPhone(preparedFormData.phoneNumber),
      studentNumber: preparedFormData.studentNumber.trim(),
      classroomId: classId,
      isActive: true,
    };

    try {
      setSavingStudent(true);

      const result = await studentService.create(payload);

      if (result?.isSuccess === false) {
        const message = result.message || "Öğrenci kaydedilemedi.";

        setStudentErrors({
          general: message,
        });

        showToast(message, "error");
        return;
      }

      await loadWorkspace();
      handleCloseStudentModal();
      showToast("Öğrenci bu sınıfa kaydedildi.");
    } catch (error) {
      console.error(error);

      const message = getErrorMessage(
        error,
        "Öğrenci kaydedilirken hata oluştu."
      );

      const backendFieldErrors = getBackendFieldErrors(error);

      setStudentErrors({
        ...backendFieldErrors,
        general: message,
      });

      showToast(message, "error");
    } finally {
      setSavingStudent(false);
    }
  };

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
                  {classroom?.isActive ?? classroom?.IsActive
                    ? "Aktif"
                    : "Pasif"}
                </span>
              </div>

              <p className="mt-1 text-sm text-base-content/60">
                Sınıf öğretmeni:{" "}
                <span className="font-semibold text-base-content">
                  {getClassTeacherName(classroom, teachers) || "-"}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button type="button" onClick={handleOpenStudentModal}>
              <UserPlusIcon className="h-5 w-5" />
              Öğrenci Kaydı
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("grades")}
            >
              <ClipboardDocumentListIcon className="h-5 w-5" />
              Not Girişi
            </Button>
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
                        {student?.isActive ?? student?.IsActive
                          ? "Aktif"
                          : "Pasif"}
                      </span>
                    </td>
                  </tr>
                ))}

                {classStudents.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="py-10 text-center text-base-content/50"
                    >
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
                  const student = classStudents.find(
                    (item) => getId(item) === studentId
                  );

                  return (
                    <tr key={getId(grade)} className="hover">
                      <td className="font-semibold">{getLessonName(grade)}</td>

                      <td>
                        {student
                          ? `${getFirstName(student)} ${getLastName(student)}`
                          : grade?.studentFullName ||
                            grade?.StudentFullName ||
                            "-"}
                      </td>

                      <td>{getAverage(grade)}</td>
                    </tr>
                  );
                })}

                {classGrades.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="py-10 text-center text-base-content/50"
                    >
                      Bu sınıfa ait not kaydı bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        id="classroom_student_modal"
        title={`${getClassName(classroom)} Sınıfına Öğrenci Kaydı`}
        description="Bu ekrandan eklenen öğrenci otomatik olarak açık olan sınıfa atanır."
        footer={
          <>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleCloseStudentModal}
              disabled={savingStudent}
            >
              Vazgeç
            </button>

            <Button
              type="button"
              onClick={handleCreateStudent}
              disabled={savingStudent}
            >
              {savingStudent ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </>
        }
      >
        {studentErrors.general && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {studentErrors.general}
          </div>
        )}

        <div className="mb-4 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          Seçili sınıf:{" "}
          <span className="font-semibold">{getClassName(classroom)}</span>
        </div>

        <StudentForm
          formData={studentFormData}
          setFormData={setStudentFormData}
          classrooms={classroom ? [classroom] : []}
          errors={studentErrors}
          isEditing={false}
          lockedClassroomId={classId}
          hideClassroomSelect
        />
      </Modal>
    </div>
  );
}

export default ClassroomWorkspacePage;