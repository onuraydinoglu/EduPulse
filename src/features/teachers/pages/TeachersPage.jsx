import { useEffect, useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import CreateButton from "../../../components/ui/CreateButton";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import TeacherForm from "../components/TeacherForm";
import TeacherTable from "../components/TeacherTable";
import { teacherService } from "../services/teacherService";
import { lessonService } from "../../lessons/services/lessonService";

import {
  validateForm,
  hasValidationError,
} from "../../../validations/validationRules";

import { userValidationSchema } from "../../../validations/schemas";
import { cleanPhone } from "../../../utils/phoneFormatter";

const emptyTeacherForm = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  branchLessonId: "",
  department: "",
};

function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState(emptyTeacherForm);
  const [errors, setErrors] = useState({});
  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const [deletingTeacherId, setDeletingTeacherId] = useState(null);
  const [temporaryPasswords, setTemporaryPasswords] = useState({});
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [search, setSearch] = useState("");
  const [lessons, setLessons] = useState([]);

  const isEditing = editingTeacherId !== null;

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

  useEffect(() => {
    const fetchTeachers = async () => {
      await getTeachers();
    };

    fetchTeachers();
  }, []);


  const getLessons = async () => {
    try {
      const result = await lessonService.getAll();

      if (result.isSuccess) {
        setLessons(result.data || []);
      }
    } catch (error) {
      console.error(error);
      showToast("Dersler getirilemedi.", "error");
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
    const normalizedSearch = search.toLowerCase().trim();

    return teachers.filter((teacher) => {
      const fullName = `${teacher.firstName || ""} ${teacher.lastName || ""
        }`.trim();

      return (
        fullName.toLowerCase().includes(normalizedSearch) ||
        teacher.phoneNumber?.toLowerCase().includes(normalizedSearch) ||
        teacher.email?.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [teachers, search]);

  const openModal = (id) => {
    document.getElementById(id)?.showModal();
  };

  const closeModal = (id) => {
    document.getElementById(id)?.close();
  };

  const handleOpenCreateModal = () => {
    setEditingTeacherId(null);
    setFormData(emptyTeacherForm);
    setErrors({});
    openModal("teacher_modal");
  };

  const handleOpenEditModal = (teacher) => {
    setEditingTeacherId(teacher.id);
    setErrors({});

    setFormData({
      firstName: teacher.firstName || "",
      lastName: teacher.lastName || "",
      phoneNumber: teacher.phoneNumber || "",
      email: teacher.email || "",
      branchLessonId: teacher.branchLessonId || "",
      department: teacher.department || "",
    });

    openModal("teacher_modal");
  };

  const handleCloseTeacherModal = () => {
    setEditingTeacherId(null);
    setFormData(emptyTeacherForm);
    setErrors({});
    closeModal("teacher_modal");
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingTeacherId(id);
    openModal("teacher_delete_modal");
  };

  const handleCloseDeleteModal = () => {
    setDeletingTeacherId(null);
    closeModal("teacher_delete_modal");
  };

  const handleDelete = async () => {
    if (!deletingTeacherId) return;

    try {
      const result = await teacherService.delete(deletingTeacherId);

      if (!result.isSuccess) {
        showToast(result.message || "Öğretmen silinemedi.", "error");
        return;
      }

      await getTeachers();

      handleCloseDeleteModal();
      showToast("Öğretmen başarıyla silindi.");
    } catch (error) {
      console.error(error);
      showToast(
        getErrorMessage(error, "Öğretmen silinirken hata oluştu."),
        "error"
      );
    }
  };

  const handleSubmit = async () => {
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
    };

    try {
      const result = isEditing
        ? await teacherService.update({
          id: editingTeacherId,
          ...preparedTeacher,
          isActive: true,
        })
        : await teacherService.create(preparedTeacher);

      if (!result.isSuccess) {
        const message = result.message || "İşlem başarısız.";

        setErrors({
          general: message,
        });

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

      handleCloseTeacherModal();

      showToast(
        isEditing
          ? "Öğretmen bilgileri başarıyla güncellendi."
          : "Yeni öğretmen başarıyla eklendi."
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

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Öğretmen Yönetimi
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              Öğretmenler
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Öğretmen kayıtlarını yönetin
            </p>
          </div>

          <CreateButton icon={UserPlusIcon} onClick={handleOpenCreateModal}>
            Yeni Öğretmen
          </CreateButton>
        </div>
      </section>

      <section className="radius-card overflow-hidden border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Öğretmen, telefon veya email ara..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>
        </div>

        <TeacherTable
          teachers={filteredTeachers}
          temporaryPasswords={temporaryPasswords}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </section>

      <Modal
        id="teacher_modal"
        title={
          isEditing ? "Öğretmen Bilgilerini Düzenle" : "Yeni Öğretmen Ekle"
        }
        footer={
          <>
            <Button variant="ghost" onClick={handleCloseTeacherModal}>
              Vazgeç
            </Button>

            <Button onClick={handleSubmit}>
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </>
        }
      >
        <TeacherForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          lessons={lessons}
        />
      </Modal>

      <ConfirmModal
        id="teacher_delete_modal"
        title="Öğretmeni Sil"
        description="Bu öğretmen kaydı kalıcı olarak silinecek. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default TeachersPage;