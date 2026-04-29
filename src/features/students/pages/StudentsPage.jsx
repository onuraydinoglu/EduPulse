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
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import { studentService } from "../services/studentService";

const emptyStudentForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(emptyStudentForm);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [deletingStudentId, setDeletingStudentId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [search, setSearch] = useState("");

  const isEditing = editingStudentId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const getErrorMessage = (error, fallback) => {
    const data = error?.response?.data;

    return (
      data?.message ||
      data?.Message ||
      data?.error ||
      data?.Error ||
      data?.errors?.[0] ||
      data?.Errors?.[0] ||
      error?.message ||
      fallback
    );
  };

  const getStudents = async () => {
    try {
      const result = await studentService.getAll();

      if (result.isSuccess) {
        setStudents(result.data || []);
      } else {
        showToast(result.message || "Öğrenciler getirilemedi.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast(error.message || "Sunucu hatası oluştu.", "error");
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      await getStudents();
    };

    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return students.filter((student) => {
      const fullName =
        student.fullName ||
        `${student.firstName || ""} ${student.lastName || ""}`.trim();

      return (
        fullName.toLowerCase().includes(normalizedSearch) ||
        student.email?.toLowerCase().includes(normalizedSearch) ||
        student.phoneNumber?.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [students, search]);

  const handleOpenCreateModal = () => {
    setEditingStudentId(null);
    setFormData(emptyStudentForm);
    document.getElementById("student_modal").showModal();
  };

  const handleOpenEditModal = (student) => {
    setEditingStudentId(student.id);

    setFormData({
      firstName: student.firstName || "",
      lastName: student.lastName || "",
      email: student.email || "",
      phoneNumber: student.phoneNumber || "",
    });

    document.getElementById("student_modal").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("student_modal").close();
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingStudentId(id);
    document.getElementById("student_delete_modal").showModal();
  };

  const handleCloseDeleteModal = () => {
    document.getElementById("student_delete_modal").close();
  };

  const handleSubmit = async () => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim()
    ) {
      showToast("Lütfen tüm alanları doldurun.", "error");
      return;
    }

    const preparedData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim(),
    };

    try {
      if (isEditing) {
        await studentService.update({
          id: editingStudentId,
          ...preparedData,
        });

        showToast("Öğrenci güncellendi.");
      } else {
        await studentService.create(preparedData);
        showToast("Öğrenci eklendi.");
      }

      await getStudents();

      setFormData(emptyStudentForm);
      setEditingStudentId(null);
      handleCloseModal();
    } catch (error) {
      showToast(getErrorMessage(error, "İşlem sırasında hata oluştu."), "error");
    }
  };

  const handleDelete = async () => {
    try {
      await studentService.delete(deletingStudentId);

      await getStudents();

      setDeletingStudentId(null);
      handleCloseDeleteModal();
      showToast("Öğrenci silindi.");
    } catch (error) {
      showToast(
        getErrorMessage(error, "Öğrenci silinirken hata oluştu."),
        "error"
      );
    }
  };

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Öğrenci Yönetimi
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              Öğrenciler
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Öğrenci kullanıcı hesaplarını yönetin
            </p>
          </div>

          <CreateButton icon={UserPlusIcon} onClick={handleOpenCreateModal}>
            Yeni Öğrenci
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
              placeholder="Öğrenci, e-posta veya telefon ara..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>
        </div>

        <StudentTable
          students={filteredStudents}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </section>

      <Modal
        id="student_modal"
        title={isEditing ? "Öğrenci Düzenle" : "Yeni Öğrenci"}
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
        <StudentForm formData={formData} setFormData={setFormData} />
      </Modal>

      <ConfirmModal
        id="student_delete_modal"
        title="Öğrenciyi Sil"
        description="Bu öğrenci kullanıcı kaydı silinecek. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default StudentsPage;