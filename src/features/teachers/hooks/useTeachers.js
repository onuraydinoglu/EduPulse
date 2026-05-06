import { useEffect, useMemo, useState } from "react";

import { teacherService } from "../services/teacherService";
import { lessonService } from "../../lessons/services/lessonService";

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

export function useTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [lessons, setLessons] = useState([]);

  const [formData, setFormData] = useState(emptyTeacherForm);
  const [errors, setErrors] = useState({});

  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const [deletingTeacherId, setDeletingTeacherId] = useState(null);

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

  const handleExportTeachersPdf = () => {
    exportToPdf({
      title: "Öğretmen Listesi",
      fileName: "ogretmen-listesi.pdf",
      columns: [
        { header: "#", accessor: "index" },
        {
          header: "Öğretmen",
          accessor: (x) =>
            x.fullName || `${x.firstName || ""} ${x.lastName || ""}`.trim(),
        },
        { header: "E-Posta", accessor: "email" },
        { header: "Telefon", accessor: "phoneNumber" },
        {
          header: "Branş / Departman",
          accessor: (x) =>
            x.branchLessonName || x.branchName || x.lessonName || x.department,
        },
        {
          header: "Durum",
          accessor: (x) => (x.isActive !== false ? "Aktif" : "Pasif"),
        },
      ],
      data: teachers,
    });
  };

  return {
    teachers,
    filteredTeachers,
    lessons,
    formData,
    setFormData,
    errors,
    isEditing,
    deletingTeacherId,
    temporaryPasswords,
    toast,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseTeacherModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    handleSubmit,
    handleExportTeachersPdf,
  };
}
