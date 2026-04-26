import { useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import { mockApi } from "../../../services/mockApi";
import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import CreateButton from "../../../components/ui/CreateButton";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import TeacherForm from "../components/TeacherForm";
import TeacherTable from "../components/TeacherTable";

const emptyTeacherForm = {
  firstName: "",
  lastName: "",
  age: "",
  branch: "",
  status: "Aktif",
};

function TeachersPage() {
  const [teachers, setTeachers] = useState(() => mockApi.getTeachers());
  const [formData, setFormData] = useState(emptyTeacherForm);
  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const [deletingTeacherId, setDeletingTeacherId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const isEditing = editingTeacherId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const filteredTeachers = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return teachers.filter((teacher) => {
      const fullName =
        teacher.fullName ||
        `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim();

      const matchesSearch =
        fullName.toLowerCase().includes(normalizedSearch) ||
        teacher.branch.toLowerCase().includes(normalizedSearch) ||
        teacher.className?.toLowerCase().includes(normalizedSearch) ||
        teacher.school?.toLowerCase().includes(normalizedSearch);

      const matchesStatus = status === "all" || teacher.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [teachers, search, status]);

  const handleOpenCreateModal = () => {
    setEditingTeacherId(null);
    setFormData(emptyTeacherForm);
    document.getElementById("teacher_modal").showModal();
  };

  const handleOpenEditModal = (teacher) => {
    const [firstName = "", ...lastNameParts] = teacher.fullName
      ? teacher.fullName.split(" ")
      : [teacher.firstName || "", teacher.lastName || ""];

    setEditingTeacherId(teacher.id);

    setFormData({
      firstName: teacher.firstName || firstName,
      lastName: teacher.lastName || lastNameParts.join(" "),
      age: teacher.age || "",
      branch: teacher.branch,
      status: teacher.status,
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

  const handleDelete = () => {
    setTeachers((prev) =>
      prev.filter((teacher) => teacher.id !== deletingTeacherId)
    );

    setDeletingTeacherId(null);
    handleCloseDeleteModal();
    showToast("Öğretmen başarıyla silindi.");
  };

  const handleSubmit = () => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.age ||
      !formData.branch.trim()
    ) {
      showToast("Lütfen ad, soyad, yaş ve branş alanlarını doldurun.", "error");
      return;
    }

    if (Number(formData.age) <= 0) {
      showToast("Yaş 0'dan büyük olmalıdır.", "error");
      return;
    }

    const preparedTeacher = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      age: Number(formData.age),
      branch: formData.branch.trim(),
      status: formData.status,
    };

    if (isEditing) {
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.id === editingTeacherId
            ? {
              ...teacher,
              ...preparedTeacher,
            }
            : teacher
        )
      );

      showToast("Öğretmen bilgileri başarıyla güncellendi.");
    } else {
      const newTeacher = {
        id: Date.now(),
        ...preparedTeacher,
        school: "Atatürk Anadolu Lisesi",
        className: "-",
        classCount: 0,
      };

      setTeachers((prev) => [newTeacher, ...prev]);
      showToast("Yeni öğretmen başarıyla eklendi.");
    }

    setFormData(emptyTeacherForm);
    setEditingTeacherId(null);
    handleCloseModal();
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
              Öğretmen kayıtlarını ve branş bilgilerini yönetin
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
              placeholder="Öğretmen, branş, okul veya sınıf ara..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 md:w-52"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="Aktif">Aktif</option>
            <option value="Pasif">Pasif</option>
          </select>
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