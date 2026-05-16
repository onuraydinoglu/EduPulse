import { useEffect, useMemo, useState } from "react";
import { classService } from "../services/classService";
import { studentService } from "../../students/services/studentService";
import {
  validateForm,
  hasValidationError,
} from "../../../validations/validationRules";
import { studentValidationSchema } from "../../../validations/schemas";
import { cleanPhone } from "../../../utils/phoneFormatter";
import { isSchoolAdmin, isSuperAdmin } from "../../../utils/authUser";

const emptyStudentForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  studentNumber: "",
  classroomId: "",
};

const getResultData = (result) => result?.data || result?.Data || result || [];
const getId = (item) => item?.id || item?.Id;
const getClassroomId = (item) => item?.classroomId || item?.ClassroomId;
const getFirstName = (student) => student?.firstName || student?.FirstName || "";
const getLastName = (student) => student?.lastName || student?.LastName || "";
const getEmail = (student) => student?.email || student?.Email || "";
const getPhoneNumber = (student) =>
  student?.phoneNumber || student?.PhoneNumber || "";
const getStudentNumber = (student) =>
  student?.studentNumber || student?.StudentNumber || "";

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

export function useClassroomWorkspace(classId) {
  const [activeTab, setActiveTab] = useState("students");
  const [classroom, setClassroom] = useState(null);
  const [classrooms, setClassrooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [studentFormData, setStudentFormData] = useState({
    ...emptyStudentForm,
    classroomId: classId,
  });
  const [studentErrors, setStudentErrors] = useState({});
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [deletingStudentId, setDeletingStudentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingStudent, setSavingStudent] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const canManageStudents = isSchoolAdmin() || isSuperAdmin();
  const isEditingStudent = editingStudentId !== null;

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        message: "",
        type: "success",
      });
    }, 2500);
  };

  const openModal = (modalId) => {
    document.getElementById(modalId)?.showModal();
  };

  const closeModal = (modalId) => {
    document.getElementById(modalId)?.close();
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

  const resetStudentForm = () => {
    setStudentErrors({});
    setEditingStudentId(null);
    setDeletingStudentId(null);
    setStudentFormData({
      ...emptyStudentForm,
      classroomId: classId,
    });
  };

  const loadWorkspace = async () => {
    try {
      setLoading(true);

      const [classResult, classesResult, studentResult] = await Promise.all([
        classService.getById(classId),
        classService.getAll(),
        studentService.getAll(),
      ]);

      if (classResult?.isSuccess === false) {
        showToast(classResult.message || "Sınıf bilgisi getirilemedi.", "error");
        return;
      }

      if (classesResult?.isSuccess === false) {
        showToast(classesResult.message || "Sınıflar getirilemedi.", "error");
        return;
      }

      if (studentResult?.isSuccess === false) {
        showToast(studentResult.message || "Öğrenciler getirilemedi.", "error");
        return;
      }

      setClassroom(getResultData(classResult));
      setClassrooms(getResultData(classesResult));
      setTeachers([]);
      setStudents(getResultData(studentResult));
      setGrades([]);
    } catch (error) {
      console.error(error);

      showToast(
        getErrorMessage(error, "Sınıf çalışma alanı yüklenirken hata oluştu."),
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const createStudent = async () => {
    if (!canManageStudents) {
      showToast("Öğrenci kaydı oluşturma yetkiniz yok.", "error");
      return false;
    }

    const preparedFormData = {
      ...studentFormData,
      classroomId: classId,
    };

    const validationErrors = validateForm(
      preparedFormData,
      studentValidationSchema,
    );

    setStudentErrors(validationErrors);

    if (hasValidationError(validationErrors)) {
      showToast("Eksik veya hatalı alanlar var.", "error");
      return false;
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
        return false;
      }

      await loadWorkspace();
      resetStudentForm();
      showToast("Öğrenci bu sınıfa kaydedildi.");
      return true;
    } catch (error) {
      console.error(error);

      const message = getErrorMessage(
        error,
        "Öğrenci kaydedilirken hata oluştu.",
      );

      const backendFieldErrors = getBackendFieldErrors(error);

      setStudentErrors({
        ...backendFieldErrors,
        general: message,
      });

      showToast(message, "error");
      return false;
    } finally {
      setSavingStudent(false);
    }
  };

  const openEditStudentModal = (student, modalId) => {
    if (!canManageStudents) return;

    setEditingStudentId(getId(student));
    setDeletingStudentId(null);
    setStudentErrors({});

    setStudentFormData({
      firstName: getFirstName(student),
      lastName: getLastName(student),
      email: getEmail(student),
      phoneNumber: getPhoneNumber(student),
      studentNumber: getStudentNumber(student),
      classroomId: getClassroomId(student) || classId,
    });

    openModal(modalId);
  };

  const closeEditStudentModal = (modalId) => {
    resetStudentForm();
    closeModal(modalId);
  };

  const updateStudent = async (modalId) => {
    if (!canManageStudents) {
      showToast("Öğrenci güncelleme yetkiniz yok.", "error");
      return false;
    }

    if (!editingStudentId) return false;

    const preparedFormData = {
      ...studentFormData,
      classroomId: studentFormData.classroomId || classId,
    };

    const validationErrors = validateForm(
      preparedFormData,
      studentValidationSchema,
    );

    setStudentErrors(validationErrors);

    if (hasValidationError(validationErrors)) {
      showToast("Eksik veya hatalı alanlar var.", "error");
      return false;
    }

    const payload = {
      id: editingStudentId,
      firstName: preparedFormData.firstName.trim(),
      lastName: preparedFormData.lastName.trim(),
      email: preparedFormData.email.trim(),
      phoneNumber: cleanPhone(preparedFormData.phoneNumber),
      studentNumber: preparedFormData.studentNumber.trim(),
      classroomId: preparedFormData.classroomId,
      isActive: true,
    };

    try {
      setSavingStudent(true);

      const result = await studentService.update(payload);

      if (result?.isSuccess === false) {
        const message = result.message || "Öğrenci güncellenemedi.";

        setStudentErrors({
          general: message,
        });

        showToast(message, "error");
        return false;
      }

      await loadWorkspace();
      closeEditStudentModal(modalId);
      showToast("Öğrenci bilgileri başarıyla güncellendi.");
      return true;
    } catch (error) {
      console.error(error);

      const message = getErrorMessage(
        error,
        "Öğrenci güncellenirken hata oluştu.",
      );

      const backendFieldErrors = getBackendFieldErrors(error);

      setStudentErrors({
        ...backendFieldErrors,
        general: message,
      });

      showToast(message, "error");
      return false;
    } finally {
      setSavingStudent(false);
    }
  };

  const openDeleteStudentModal = (id, modalId) => {
    if (!canManageStudents || !id) return;

    setDeletingStudentId(id);
    setEditingStudentId(null);
    openModal(modalId);
  };

  const closeDeleteStudentModal = (modalId) => {
    setDeletingStudentId(null);
    closeModal(modalId);
  };

  const deleteStudent = async (modalId) => {
    if (!canManageStudents) {
      showToast("Öğrenci silme yetkiniz yok.", "error");
      return false;
    }

    if (!deletingStudentId) return false;

    try {
      const result = await studentService.delete(deletingStudentId);

      if (result?.isSuccess === false) {
        showToast(result.message || "Öğrenci silinemedi.", "error");
        return false;
      }

      await loadWorkspace();
      closeDeleteStudentModal(modalId);
      showToast("Öğrenci başarıyla silindi.");
      return true;
    } catch (error) {
      console.error(error);

      showToast(
        getErrorMessage(error, "Öğrenci silinirken hata oluştu."),
        "error",
      );

      return false;
    }
  };

  useEffect(() => {
    loadWorkspace();
  }, [classId]);

  return {
    activeTab,
    setActiveTab,
    classroom,
    classrooms,
    teachers,
    students,
    grades,
    classStudents,
    classGrades,
    studentFormData,
    setStudentFormData,
    studentErrors,
    isEditingStudent,
    savingStudent,
    loading,
    toast,
    canManageStudents,
    resetStudentForm,
    createStudent,
    openEditStudentModal,
    closeEditStudentModal,
    updateStudent,
    openDeleteStudentModal,
    closeDeleteStudentModal,
    deleteStudent,
  };
}