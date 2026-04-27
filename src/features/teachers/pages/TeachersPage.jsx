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

const emptyTeacherForm = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  schoolId: "",
};

function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState(emptyTeacherForm);
  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const [deletingTeacherId, setDeletingTeacherId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [search, setSearch] = useState("");

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
        setTeachers(result.data);
      } else {
        showToast(result.message || "Öğretmenler getirilemedi.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast(error.message || "Sunucu hatası oluştu.", "error");
    }
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      await getTeachers();
    };

    fetchTeachers();
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

  const handleOpenCreateModal = () => {
    setEditingTeacherId(null);
    setFormData(emptyTeacherForm);
    document.getElementById("teacher_modal").showModal();
  };

  const handleOpenEditModal = (teacher) => {
    setEditingTeacherId(teacher.id);

    setFormData({
      firstName: teacher.firstName || "",
      lastName: teacher.lastName || "",
      phoneNumber: teacher.phoneNumber || "",
      email: teacher.email || "",
      schoolId: teacher.schoolId || "",
    });

    document.getElementById("teacher_modal").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("teacher_modal").close();
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingTeacherId(id);
    document.getElementById("teacher_delete_modal").showModal();
  };

  const handleCloseDeleteModal = () => {
    document.getElementById("teacher_delete_modal").close();
  };

  const handleDelete = async () => {
    try {
      const result = await teacherService.delete(deletingTeacherId);

      if (!result.isSuccess) {
        showToast(result.message || "Öğretmen silinemedi.", "error");
        return;
      }

      await getTeachers();

      setDeletingTeacherId(null);
      handleCloseDeleteModal();
      showToast("Öğretmen başarıyla silindi.");
    } catch (error) {
      console.error(error);
      showToast(error.message || "Sunucu hatası oluştu.", "error");
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.schoolId.trim()
    ) {
      showToast("Lütfen ad, soyad, telefon ve okul alanlarını doldurun.", "error");
      return;
    }

    const preparedTeacher = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      email: formData.email.trim(),
      schoolId: formData.schoolId.trim(),
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
        showToast(result.message || "İşlem başarısız.", "error");
        return;
      }

      await getTeachers();

      setFormData(emptyTeacherForm);
      setEditingTeacherId(null);
      handleCloseModal();

      showToast(
        isEditing
          ? "Öğretmen bilgileri başarıyla güncellendi."
          : "Yeni öğretmen başarıyla eklendi."
      );
    } catch (error) {
      console.error(error);
      showToast(error.message || "Sunucu hatası oluştu.", "error");
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
            <form method="dialog">
              <Button variant="ghost">Vazgeç</Button>
            </form>

            <Button onClick={handleSubmit}>
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </>
        }
      >
        <TeacherForm formData={formData} setFormData={setFormData} />
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