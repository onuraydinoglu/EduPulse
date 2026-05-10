import { useEffect, useMemo, useState } from "react";

import { teacherService } from "../services/teacherService";
import { lessonService } from "../../lessons/services/lessonService";
import { classService } from "../../classes/services/classService";
import { teacherLessonService } from "../../teacherLessons/services/teacherLessonService";

import {
  validateForm,
  hasValidationError,
} from "../../../validations/validationRules";
import { userValidationSchema } from "../../../validations/schemas";

import { cleanPhone } from "../../../utils/phoneFormatter";
import { exportToPdf } from "../../../utils/exportToPdf";

import { emptyTeacherForm } from "../constants/teacherConstants";

import {
  filterTeachers,
  getBackendFieldErrors,
  getErrorMessage,
} from "../utils/teacherHelpers";

const emptyLessonAssignForm = {
  teacherId: "",
  lessonId: "",
  classroomIds: [],
};

export function useTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  const [formData, setFormData] = useState(emptyTeacherForm);
  const [errors, setErrors] = useState({});

  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const [deletingTeacherId, setDeletingTeacherId] = useState(null);

  const [selectedTeacherForLesson, setSelectedTeacherForLesson] =
    useState(null);
  const [lessonAssignFormData, setLessonAssignFormData] = useState(
    emptyLessonAssignForm,
  );
  const [lessonAssignErrors, setLessonAssignErrors] = useState({});

  const [temporaryPasswords, setTemporaryPasswords] = useState({});
  const [toast, setToast] = useState({ message: "", type: "success" });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const isEditing = editingTeacherId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const getListData = (result) => {
    if (Array.isArray(result)) return result;
    if (result?.isSuccess) return result.data || result.Data || [];
    return result?.data || result?.Data || [];
  };

  const getTeachers = async () => {
    try {
      const result = await teacherService.getAll();

      if (result.isSuccess) {
        setTeachers(result.data || []);
      } else {
        showToast(result.message || "Öğretmenler getirilemedi.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast(getErrorMessage(error, "Sunucu hatası oluştu."), "error");
    }
  };

  const getLessons = async () => {
    try {
      const result = await lessonService.getAll();

      if (result.isSuccess) {
        setLessons(result.data || []);
      } else {
        showToast(result.message || "Dersler getirilemedi.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast(getErrorMessage(error, "Dersler getirilemedi."), "error");
    }
  };

  const getClassrooms = async () => {
    try {
      const result = await classService.getAll();
      setClassrooms(getListData(result));
    } catch (error) {
      console.error(error);
      showToast(getErrorMessage(error, "Sınıflar getirilemedi."), "error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getTeachers();
      await getLessons();
    };

    fetchData();
  }, []);

  const filteredTeachers = useMemo(() => {
    return filterTeachers(teachers, search, statusFilter);
  }, [teachers, search, statusFilter]);

  const openModal = (id) => {
    document.getElementById(id)?.showModal();
  };

  const closeModal = (id) => {
    document.getElementById(id)?.close();
  };

  const handleOpenCreateModal = (modalId) => {
    setEditingTeacherId(null);
    setFormData(emptyTeacherForm);
    setErrors({});
    openModal(modalId);
  };

  const handleOpenEditModal = (teacher, modalId) => {
    setEditingTeacherId(teacher.id);
    setErrors({});

    setFormData({
      firstName: teacher.firstName || "",
      lastName: teacher.lastName || "",
      phoneNumber: teacher.phoneNumber || "",
      email: teacher.email || "",
      branchLessonId: teacher.branchLessonId || "",
      department: teacher.department || "",
      isActive: teacher.isActive !== false,
    });

    openModal(modalId);
  };

  const handleCloseTeacherModal = (modalId) => {
    setEditingTeacherId(null);
    setFormData(emptyTeacherForm);
    setErrors({});
    closeModal(modalId);
  };

  const handleOpenDeleteModal = (id, modalId) => {
    setDeletingTeacherId(id);
    openModal(modalId);
  };

  const handleCloseDeleteModal = (modalId) => {
    setDeletingTeacherId(null);
    closeModal(modalId);
  };

  const handleDelete = async (modalId) => {
    if (!deletingTeacherId) return;

    try {
      const result = await teacherService.delete(deletingTeacherId);

      if (!result.isSuccess) {
        showToast(result.message || "Öğretmen silinemedi.", "error");
        return;
      }

      await getTeachers();
      handleCloseDeleteModal(modalId);
      showToast("Öğretmen başarıyla silindi.");
    } catch (error) {
      console.error(error);

      showToast(
        getErrorMessage(error, "Öğretmen silinirken hata oluştu."),
        "error",
      );
    }
  };

  const handleSubmit = async (modalId) => {
    const validationErrors = validateForm(formData, userValidationSchema);
    setErrors(validationErrors);

    if (hasValidationError(validationErrors)) {
      showToast("Eksik veya hatalı alanlar var.", "error");
      return;
    }

    const preparedTeacher = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phoneNumber: cleanPhone(formData.phoneNumber),
      email: formData.email.trim(),
      branchLessonId: formData.branchLessonId || null,
      department: formData.department.trim() || null,
      isActive: isEditing ? formData.isActive : true,
    };

    try {
      const result = isEditing
        ? await teacherService.update({
          id: editingTeacherId,
          ...preparedTeacher,
        })
        : await teacherService.create(preparedTeacher);

      if (!result.isSuccess) {
        const message = result.message || "İşlem başarısız.";

        setErrors({ general: message });
        showToast(message, "error");

        return;
      }

      if (!isEditing) {
        const temporaryPassword = result.message?.split("Geçici şifre: ")[1];

        if (temporaryPassword) {
          setTemporaryPasswords((prev) => ({
            ...prev,
            [preparedTeacher.email]: temporaryPassword,
          }));
        }
      }

      await getTeachers();
      handleCloseTeacherModal(modalId);

      showToast(
        isEditing
          ? "Öğretmen bilgileri başarıyla güncellendi."
          : "Yeni öğretmen başarıyla eklendi.",
      );
    } catch (error) {
      console.error(error);

      const message = getErrorMessage(error, "İşlem sırasında hata oluştu.");
      const backendFieldErrors = getBackendFieldErrors(error);

      setErrors({
        ...backendFieldErrors,
        general: message,
      });

      showToast(message, "error");
    }
  };

  const handleOpenLessonAssignModal = async (teacher, modalId) => {
    const teacherId = teacher.id || teacher.Id;
    const branchLessonId = teacher.branchLessonId || teacher.BranchLessonId || "";

    try {
      await Promise.all([getLessons(), getClassrooms()]);

      setSelectedTeacherForLesson(teacher);
      setLessonAssignErrors({});

      setLessonAssignFormData({
        teacherId,
        lessonId: branchLessonId,
        classroomIds: [],
      });

      openModal(modalId);
    } catch (error) {
      console.error(error);
      showToast("Ders atama formu açılırken hata oluştu.", "error");
    }
  };

  const handleCloseLessonAssignModal = (modalId) => {
    setSelectedTeacherForLesson(null);
    setLessonAssignFormData(emptyLessonAssignForm);
    setLessonAssignErrors({});
    closeModal(modalId);
  };

  const handleLessonAssignSubmit = async (modalId) => {
    const selectedClassroomIds = Array.isArray(lessonAssignFormData.classroomIds)
      ? lessonAssignFormData.classroomIds
      : [];

    const fieldErrors = {};

    if (!lessonAssignFormData.teacherId) {
      fieldErrors.general = "Öğretmen bilgisi bulunamadı.";
    }

    if (!lessonAssignFormData.lessonId) {
      fieldErrors.lessonId = "Ders seçiniz.";
    }

    if (selectedClassroomIds.length === 0) {
      fieldErrors.classroomIds = "En az bir sınıf seçiniz.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setLessonAssignErrors(fieldErrors);
      showToast("Eksik alanlar var.", "error");
      return;
    }

    try {
      const results = await Promise.all(
        selectedClassroomIds.map((classroomId) =>
          teacherLessonService.create({
            teacherId: lessonAssignFormData.teacherId,
            lessonId: lessonAssignFormData.lessonId,
            classroomId,
          }),
        ),
      );

      const failedResult = results.find((result) => result?.isSuccess === false);

      if (failedResult) {
        const message =
          failedResult.message || "Bazı sınıflar için ders atama işlemi başarısız.";

        setLessonAssignErrors({ general: message });
        showToast(message, "error");

        return;
      }

      handleCloseLessonAssignModal(modalId);
      showToast("Ders atama işlemi başarıyla oluşturuldu.");
    } catch (error) {
      console.error(error);

      const message = getErrorMessage(
        error,
        "Ders atama işlemi sırasında hata oluştu.",
      );

      setLessonAssignErrors({ general: message });
      showToast(message, "error");
    }
  };

  const handleExportTeachersPdf = () => {
    exportToPdf({
      title: "Öğretmen Listesi",
      fileName: "ogretmen-listesi.pdf",
      columns: [
        { header: "#", accessor: "index" },
        {
          header: "Öğretmen",
          accessor: (x) =>
            x.fullName ||
            `${x.firstName || ""} ${x.lastName || ""}`.trim() ||
            "-",
        },
        {
          header: "Branş / Departman",
          accessor: (x) => x.branchLessonName || x.department || "-",
        },
        {
          header: "Email",
          accessor: (x) => x.email || "-",
        },
        {
          header: "Telefon",
          accessor: (x) => x.phoneNumber || "-",
        },
        {
          header: "Durum",
          accessor: (x) => (x.isActive === false ? "İzinde" : "Aktif"),
        },
      ],
      rows: filteredTeachers,
    });
  };

  return {
    teachers,
    filteredTeachers,
    lessons,
    classrooms,

    formData,
    setFormData,
    errors,
    isEditing,

    temporaryPasswords,
    toast,

    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    selectedTeacherForLesson,
    lessonAssignFormData,
    setLessonAssignFormData,
    lessonAssignErrors,

    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseTeacherModal,

    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,

    handleSubmit,
    handleExportTeachersPdf,

    handleOpenLessonAssignModal,
    handleCloseLessonAssignModal,
    handleLessonAssignSubmit,
  };
}