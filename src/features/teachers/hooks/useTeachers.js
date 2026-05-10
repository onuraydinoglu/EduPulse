import { useEffect, useMemo, useState } from "react";

import { classService } from "../../classes/services/classService";
import { lessonService } from "../../lessons/services/lessonService";
import { teacherLessonService } from "../../teacherLessons/services/teacherLessonService";
import { teacherService } from "../services/teacherService";

import {
  emptyTeacherForm,
  emptyTeacherLessonAssignForm,
} from "../constants/teacherConstants";

import {
  filterTeachers,
  getTeacherEmail,
  getTeacherId,
} from "../utils/teacherFormatters";

export function useTeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  const [formData, setFormData] = useState(emptyTeacherForm);
  const [assignFormData, setAssignFormData] = useState(
    emptyTeacherLessonAssignForm
  );

  const [errors, setErrors] = useState({});
  const [assignErrors, setAssignErrors] = useState({});

  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const [deletingTeacherId, setDeletingTeacherId] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

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

  const normalizeResultData = (result) => {
    return result?.data || result?.Data || [];
  };

  const getTeachers = async () => {
    try {
      const result = await teacherService.getAll();

      if (!result.isSuccess) {
        showToast(result.message || "Öğretmenler getirilemedi.", "error");
        return;
      }

      const data = normalizeResultData(result);

      const onlyTeachers = data.filter((teacher) => {
        const roleName = teacher.roleName || teacher.RoleName;
        return !roleName || roleName.toLowerCase() === "teacher";
      });

      setTeachers(onlyTeachers);
    } catch (error) {
      console.error(error);
      showToast(error.message || "Sunucu hatası oluştu.", "error");
    }
  };

  const getLessons = async () => {
    try {
      const result = await lessonService.getAll();

      if (result.isSuccess) {
        setLessons(normalizeResultData(result));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getClassrooms = async () => {
    try {
      const result = await classService.getAll();

      if (result.isSuccess) {
        setClassrooms(normalizeResultData(result));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchInitialData = async () => {
    await Promise.all([getTeachers(), getLessons(), getClassrooms()]);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const filteredTeachers = useMemo(() => {
    return filterTeachers(teachers, search, statusFilter);
  }, [teachers, search, statusFilter]);

  const openModal = (modalId) => {
    document.getElementById(modalId)?.showModal();
  };

  const closeModal = (modalId) => {
    document.getElementById(modalId)?.close();
  };

  const handleOpenCreateModal = (modalId) => {
    setEditingTeacherId(null);
    setFormData(emptyTeacherForm);
    setErrors({});
    openModal(modalId);
  };

  const handleOpenEditModal = (teacher, modalId) => {
    setEditingTeacherId(getTeacherId(teacher));

    setFormData({
      firstName: teacher.firstName || teacher.FirstName || "",
      lastName: teacher.lastName || teacher.LastName || "",
      phoneNumber: teacher.phoneNumber || teacher.PhoneNumber || "",
      email: teacher.email || teacher.Email || "",
      branchLessonId: teacher.branchLessonId || teacher.BranchLessonId || "",
      department: teacher.department || teacher.Department || "",
      isActive: teacher.isActive ?? teacher.IsActive ?? true,
    });

    setErrors({});
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

  const validateTeacherForm = () => {
    const nextErrors = {};

    if (!formData.firstName?.trim()) {
      nextErrors.firstName = "Ad alanı zorunludur.";
    }

    if (!formData.lastName?.trim()) {
      nextErrors.lastName = "Soyad alanı zorunludur.";
    }

    if (!formData.phoneNumber?.trim()) {
      nextErrors.phoneNumber = "Telefon alanı zorunludur.";
    }

    if (!formData.email?.trim()) {
      nextErrors.email = "Email alanı zorunludur.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (modalId) => {
    if (!validateTeacherForm()) return;

    const preparedTeacher = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      email: formData.email.trim(),
      branchLessonId: formData.branchLessonId || null,
      department: formData.department?.trim() || null,
      isActive: formData.isActive ?? true,
    };

    try {
      const result = isEditing
        ? await teacherService.update({
          id: editingTeacherId,
          ...preparedTeacher,
        })
        : await teacherService.create(preparedTeacher);

      if (!result.isSuccess) {
        setErrors({ general: result.message || "İşlem başarısız." });
        return;
      }

      if (!isEditing) {
        const temporaryPassword = result.message?.split("Geçici şifre: ")[1];

        if (temporaryPassword) {
          setTemporaryPasswords((prev) => ({
            ...prev,
            [preparedTeacher.email]: temporaryPassword,
            [preparedTeacher.email.toLowerCase()]: temporaryPassword,
          }));
        }
      }

      await getTeachers();

      setFormData(emptyTeacherForm);
      setEditingTeacherId(null);
      setErrors({});
      closeModal(modalId);

      showToast(
        isEditing
          ? "Öğretmen bilgileri başarıyla güncellendi."
          : "Yeni öğretmen başarıyla eklendi."
      );
    } catch (error) {
      console.error(error);
      setErrors({ general: error.message || "Sunucu hatası oluştu." });
    }
  };

  const handleDelete = async (modalId) => {
    try {
      const result = await teacherService.delete(deletingTeacherId);

      if (!result.isSuccess) {
        showToast(result.message || "Öğretmen silinemedi.", "error");
        return;
      }

      await getTeachers();

      setDeletingTeacherId(null);
      closeModal(modalId);
      showToast("Öğretmen başarıyla silindi.");
    } catch (error) {
      console.error(error);
      showToast(error.message || "Sunucu hatası oluştu.", "error");
    }
  };

  const handleOpenAssignLessonModal = (teacher, modalId) => {
    setSelectedTeacher(teacher);
    setAssignFormData(emptyTeacherLessonAssignForm);
    setAssignErrors({});
    openModal(modalId);
  };

  const handleCloseAssignLessonModal = (modalId) => {
    setSelectedTeacher(null);
    setAssignFormData(emptyTeacherLessonAssignForm);
    setAssignErrors({});
    closeModal(modalId);
  };

  const validateAssignForm = () => {
    const nextErrors = {};

    if (!assignFormData.lessonId) {
      nextErrors.lessonId = "Ders seçimi zorunludur.";
    }

    if (!assignFormData.classroomIds?.length) {
      nextErrors.classroomIds = "En az bir sınıf seçmelisiniz.";
    }

    setAssignErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleAssignLessonSubmit = async (modalId) => {
    if (!validateAssignForm()) return;

    const teacherId = getTeacherId(selectedTeacher);

    try {
      const requests = assignFormData.classroomIds.map((classroomId) =>
        teacherLessonService.create({
          teacherId,
          lessonId: assignFormData.lessonId,
          classroomId,
        })
      );

      const results = await Promise.all(requests);
      const failedResult = results.find((result) => !result.isSuccess);

      if (failedResult) {
        setAssignErrors({
          general: failedResult.message || "Ders atama işlemi başarısız.",
        });
        return;
      }

      setSelectedTeacher(null);
      setAssignFormData(emptyTeacherLessonAssignForm);
      setAssignErrors({});
      closeModal(modalId);

      showToast("Ders atama işlemi başarıyla tamamlandı.");
    } catch (error) {
      console.error(error);
      setAssignErrors({
        general: error.message || "Sunucu hatası oluştu.",
      });
    }
  };

  const handleExportTeachersPdf = () => {
    showToast("PDF indirme işlemi daha sonra bağlanacak.", "info");
  };

  return {
    teachers,
    filteredTeachers,
    lessons,
    classrooms,
    formData,
    setFormData,
    assignFormData,
    setAssignFormData,
    errors,
    assignErrors,
    isEditing,
    selectedTeacher,
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
    handleOpenAssignLessonModal,
    handleCloseAssignLessonModal,
    handleAssignLessonSubmit,
    handleExportTeachersPdf,
    getTeacherEmail,
  };
}

export default useTeachersPage;