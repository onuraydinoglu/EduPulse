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
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import StudentDetailModal from "../components/StudentDetailModal";

const emptyStudentForm = {
  firstName: "",
  lastName: "",
  className: "",
  club: "",
  status: "Aktif",
  schoolNumber: "",
  studentPhone: "",
  parentName: "",
  parentPhone: "",
};

function StudentsPage() {
  const [students, setStudents] = useState(() => mockApi.getStudents());
  const [formData, setFormData] = useState(emptyStudentForm);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [deletingStudentId, setDeletingStudentId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const isEditing = editingStudentId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const filteredStudents = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return students.filter((student) => {
      const fullName =
        student.fullName ||
        `${student.firstName || ""} ${student.lastName || ""}`.trim();

      const matchesSearch =
        fullName.toLowerCase().includes(normalizedSearch) ||
        student.className?.toLowerCase().includes(normalizedSearch) ||
        student.club?.toLowerCase().includes(normalizedSearch) ||
        student.school?.toLowerCase().includes(normalizedSearch);

      const matchesStatus = status === "all" || student.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [students, search, status]);

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
      className: student.className || "",
      club: student.club || "",
      status: student.status,

      schoolNumber: student.schoolNumber || "",
      studentPhone: student.studentPhone || "",
      parentName: student.parentName || "",
      parentPhone: student.parentPhone || "",
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

  const handleDelete = () => {
    setStudents((prev) =>
      prev.filter((student) => student.id !== deletingStudentId)
    );

    setDeletingStudentId(null);
    handleCloseDeleteModal();
    showToast("Öğrenci başarıyla silindi.");
  };

  const handleSubmit = () => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.className.trim()
    ) {
      showToast("Lütfen ad, soyad ve sınıf alanlarını doldurun.", "error");
      return;
    }

    const preparedStudent = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      className: formData.className.trim(),
      club: formData.club.trim() || "-",
      status: formData.status,

      schoolNumber: formData.schoolNumber,
      studentPhone: formData.studentPhone,
      parentName: formData.parentName,
      parentPhone: formData.parentPhone,
    };

    if (isEditing) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingStudentId
            ? {
              ...student,
              ...preparedStudent,
            }
            : student
        )
      );

      showToast("Öğrenci bilgileri başarıyla güncellendi.");
    } else {
      const newStudent = {
        id: Date.now(),
        ...preparedStudent,
        school: "Atatürk Anadolu Lisesi",
      };

      setStudents((prev) => [newStudent, ...prev]);
      showToast("Yeni öğrenci başarıyla eklendi.");
    }

    setFormData(emptyStudentForm);
    setEditingStudentId(null);
    handleCloseModal();
  };

  const handleOpenDetailModal = (student) => {
    setSelectedStudent(student);
    document.getElementById("student_detail_modal").showModal();
  };

  const handleCloseDetailModal = () => {
    setSelectedStudent(null);
    document.getElementById("student_detail_modal").close();
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
              Öğrenci akademik ve sosyal gelişim kayıtlarını yönetin
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
              placeholder="Öğrenci, sınıf, okul veya kulüp ara..."
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

        <StudentTable
          students={filteredStudents}
          onDetail={handleOpenDetailModal}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </section>

      <Modal
        id="student_modal"
        title={
          isEditing ? "Öğrenci Bilgilerini Düzenle" : "Yeni Öğrenci Ekle"
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
        <StudentForm formData={formData} setFormData={setFormData} />
      </Modal>

      <Modal
        id="student_detail_modal"
        title="Öğrenci Detayları"
        footer={
          <form method="dialog">
            <Button variant="ghost" onClick={handleCloseDetailModal}>
              Kapat
            </Button>
          </form>
        }
      >
        <StudentDetailModal student={selectedStudent} />
      </Modal>

      <ConfirmModal
        id="student_delete_modal"
        title="Öğrenciyi Sil"
        description="Bu öğrenci kaydı kalıcı olarak silinecek. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default StudentsPage;