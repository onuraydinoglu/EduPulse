import { useEffect, useMemo, useState } from "react";

import { classService } from "../services/classService";
import { teacherService } from "../../teachers/services/teacherService";

import {
  hasValidationError,
  validateForm,
} from "../../../validations/validationRules";
import { classroomValidationSchema } from "../../../validations/schemas";

import { exportToPdf } from "../../../utils/exportToPdf";
import { isSchoolAdmin, isSuperAdmin } from "../../../utils/authUser";

import { emptyClassForm } from "../constants/classConstants";
import { classPdfColumns } from "../constants/classTableColumns";

import {
  filterClasses,
  getBackendFieldErrors,
  getClassGrade,
  getClassId,
  getClassSection,
  getClassTeacherId,
  getErrorMessage,
} from "../utils/classFormatters";

export function useClassesPage() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState(emptyClassForm);
  const [errors, setErrors] = useState({});
  const [editingClassId, setEditingClassId] = useState(null);
  const [deletingClassId, setDeletingClassId] = useState(null);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");

  const isEditing = editingClassId !== null;

  const canManageClasses = isSchoolAdmin() || isSuperAdmin();

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

  const openModal = (id) => {
    document.getElementById(id)?.showModal();
  };

  const closeModal = (id) => {
    document.getElementById(id)?.close();
  };

  const loadClasses = async () => {
    try {
      const result = await classService.getAll();

      if (result?.isSuccess === false) {
        showToast(result.message || "Sınıflar yüklenirken hata oluştu.", "error");
        return;
      }

      setClasses(result.data || result.Data || []);
    } catch (error) {
      console.error(error);

      showToast(
        getErrorMessage(error, "Sınıflar yüklenirken hata oluştu."),
        "error"
      );
    }
  };

  const loadTeachers = async () => {
    if (!canManageClasses) {
      setTeachers([]);
      return;
    }

    try {
      const result = await teacherService.getAll();

      if (result?.isSuccess === false) {
        showToast(
          result.message || "Öğretmenler yüklenirken hata oluştu.",
          "error"
        );
        return;
      }

      const teacherData = result.data || result.Data || [];

      const activeTeachers = teacherData.filter((teacher) => {
        return teacher.isActive !== false && teacher.IsActive !== false;
      });

      setTeachers(activeTeachers);
    } catch (error) {
      console.error(error);

      showToast(
        getErrorMessage(error, "Öğretmenler yüklenirken hata oluştu."),
        "error"
      );
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      await loadClasses();

      if (canManageClasses) {
        await loadTeachers();
      }
    };

    loadInitialData();
  }, []);

  const filteredClasses = useMemo(() => {
    return filterClasses(classes, teachers, search, gradeFilter);
  }, [classes, teachers, search, gradeFilter]);

  const handleOpenCreateModal = (modalId) => {
    if (!canManageClasses) {
      showToast("Sınıf oluşturma yetkiniz yok.", "error");
      return;
    }

    setEditingClassId(null);
    setFormData(emptyClassForm);
    setErrors({});
    openModal(modalId);
  };

  const handleOpenEditModal = (classItem, modalId) => {
    if (!canManageClasses) {
      showToast("Sınıf düzenleme yetkiniz yok.", "error");
      return;
    }

    setEditingClassId(getClassId(classItem));
    setErrors({});

    setFormData({
      grade: String(getClassGrade(classItem) || ""),
      section: getClassSection(classItem) || "",
      teacherId: getClassTeacherId(classItem) || "",
    });

    openModal(modalId);
  };

  const handleCloseClassModal = (modalId) => {
    setEditingClassId(null);
    setFormData(emptyClassForm);
    setErrors({});
    closeModal(modalId);
  };

  const handleOpenDeleteModal = (id, modalId) => {
    if (!canManageClasses) {
      showToast("Sınıf silme yetkiniz yok.", "error");
      return;
    }

    setDeletingClassId(id);
    openModal(modalId);
  };

  const handleCloseDeleteModal = (modalId) => {
    setDeletingClassId(null);
    closeModal(modalId);
  };

  const prepareClassPayload = () => {
    return {
      grade: Number(formData.grade),
      section: formData.section.trim().toUpperCase(),
      teacherId: formData.teacherId || null,
    };
  };

  const handleSubmit = async (modalId) => {
    if (!canManageClasses) {
      showToast("Bu işlem için yetkiniz yok.", "error");
      return;
    }

    const validationErrors = validateForm(formData, classroomValidationSchema);
    setErrors(validationErrors);

    if (hasValidationError(validationErrors)) {
      showToast("Eksik veya hatalı alanlar var.", "error");
      return;
    }

    const preparedData = prepareClassPayload();

    try {
      const result = isEditing
        ? await classService.update({
          id: editingClassId,
          ...preparedData,
        })
        : await classService.create(preparedData);

      if (result?.isSuccess === false) {
        const message = result.message || "İşlem başarısız.";

        setErrors({
          general: message,
        });

        showToast(message, "error");
        return;
      }

      await loadClasses();
      handleCloseClassModal(modalId);

      showToast(isEditing ? "Sınıf güncellendi." : "Sınıf eklendi.");
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

  const handleDelete = async (modalId) => {
    if (!canManageClasses) {
      showToast("Bu işlem için yetkiniz yok.", "error");
      return;
    }

    if (!deletingClassId) return;

    try {
      const result = await classService.delete(deletingClassId);

      if (result?.isSuccess === false) {
        showToast(result.message || "Sınıf silinemedi.", "error");
        return;
      }

      await loadClasses();
      handleCloseDeleteModal(modalId);

      showToast("Sınıf silindi.");
    } catch (error) {
      console.error(error);

      showToast(
        getErrorMessage(error, "Sınıf silinirken hata oluştu."),
        "error"
      );
    }
  };

  const handleExportClassesPdf = () => {
    exportToPdf({
      title: "Sınıf Listesi",
      fileName: "sinif-listesi.pdf",
      columns: classPdfColumns,
      data: classes,
    });
  };

  return {
    classes,
    filteredClasses,
    teachers,
    formData,
    setFormData,
    errors,
    isEditing,
    deletingClassId,
    toast,
    search,
    setSearch,
    gradeFilter,
    setGradeFilter,
    canManageClasses,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseClassModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    handleSubmit,
    handleExportClassesPdf,
  };
}