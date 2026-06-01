import { useEffect, useMemo, useState } from "react";

import { lessonService } from "../services/lessonService";
import { emptyLessonForm } from "../constants/lessonConstants";
import { filterLessons, getLessonId } from "../utils/lessonFormatters";

import {
  validateForm,
  hasValidationError,
} from "../../../validations/validationRules";

import { lessonValidationSchema } from "../../../validations/schemas";

export function useLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [formData, setFormData] = useState(emptyLessonForm);
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [deletingLessonId, setDeletingLessonId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");

  const isEditing = editingLessonId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const normalizeResultData = (result) => {
    return result?.data || result?.Data || [];
  };

  const getLessons = async () => {
    try {
      const result = await lessonService.getAll();

      if (!result.isSuccess) {
        showToast(result.message || "Dersler getirilemedi.", "error");
        return;
      }

      setLessons(normalizeResultData(result));
    } catch (error) {
      console.error(error);
      showToast(error.message || "Sunucu hatası oluştu.", "error");
    }
  };

  useEffect(() => {
    getLessons();
  }, []);

  const filteredLessons = useMemo(() => {
    return filterLessons(lessons, search);
  }, [lessons, search]);

  const openModal = (modalId) => {
    document.getElementById(modalId)?.showModal();
  };

  const closeModal = (modalId) => {
    document.getElementById(modalId)?.close();
  };

  const handleOpenCreateModal = (modalId) => {
    setEditingLessonId(null);
    setFormData(emptyLessonForm);
    setErrors({});
    openModal(modalId);
  };

  const handleOpenEditModal = (lesson, modalId) => {
    setEditingLessonId(getLessonId(lesson));

    setFormData({
      name: lesson.name || lesson.Name || "",
    });

    setErrors({});
    openModal(modalId);
  };

  const handleCloseLessonModal = (modalId) => {
    setEditingLessonId(null);
    setFormData(emptyLessonForm);
    setErrors({});
    closeModal(modalId);
  };

  const handleOpenDeleteModal = (id, modalId) => {
    setDeletingLessonId(id);
    openModal(modalId);
  };

  const handleCloseDeleteModal = (modalId) => {
    setDeletingLessonId(null);
    closeModal(modalId);
  };

  const handleSubmit = async (modalId) => {
    const validationErrors = validateForm(formData, lessonValidationSchema);

    if (hasValidationError(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const preparedLesson = {
      name: formData.name.trim(),
    };

    try {
      const result = isEditing
        ? await lessonService.update({
            id: editingLessonId,
            ...preparedLesson,
          })
        : await lessonService.create(preparedLesson);

      if (!result.isSuccess) {
        setErrors({
          general: result.message || "İşlem başarısız.",
        });
        return;
      }

      await getLessons();

      setFormData(emptyLessonForm);
      setEditingLessonId(null);
      setErrors({});
      closeModal(modalId);

      showToast(
        isEditing
          ? "Ders başarıyla güncellendi."
          : "Yeni ders başarıyla eklendi."
      );
    } catch (error) {
      console.error(error);

      setErrors({
        general:
          error.response?.data?.message ||
          error.response?.data?.Message ||
          error.response?.data?.title ||
          error.message ||
          "Sunucu hatası oluştu.",
      });
    }
  };

  const handleDelete = async (modalId) => {
    try {
      const result = await lessonService.delete(deletingLessonId);

      if (!result.isSuccess) {
        showToast(result.message || "Ders silinemedi.", "error");
        return;
      }

      await getLessons();

      setDeletingLessonId(null);
      closeModal(modalId);
      showToast("Ders başarıyla silindi.");
    } catch (error) {
      console.error(error);
      showToast(error.message || "Sunucu hatası oluştu.", "error");
    }
  };

  const handleExportLessonsPdf = () => {
    showToast("PDF indirme işlemi daha sonra bağlanacak.", "info");
  };

  return {
    lessons,
    filteredLessons,
    formData,
    setFormData,
    errors,
    isEditing,
    toast,
    search,
    setSearch,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseLessonModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleSubmit,
    handleDelete,
    handleExportLessonsPdf,
  };
}

export default useLessonsPage;