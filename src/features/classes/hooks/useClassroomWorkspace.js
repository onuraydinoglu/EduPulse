import { useEffect, useMemo, useState } from "react";

import { classService } from "../services/classService";
import { teacherService } from "../../teachers/services/teacherService";
import { studentService } from "../../students/services/studentService";

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
    setStudentFormData({
      ...emptyStudentForm,
      classroomId: classId,
    });
  };

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

  const createStudent = async () => {
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
        "Öğrenci kaydedilirken hata oluştu."
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

  useEffect(() => {
    loadWorkspace();
  }, [classId]);

  return {
    activeTab,
    setActiveTab,

    classroom,
    teachers,
    students,
    grades,

    classStudents,
    classGrades,

    studentFormData,
    setStudentFormData,
    studentErrors,
    savingStudent,

    loading,
    toast,

    resetStudentForm,
    createStudent,
  };
}