import { useMemo, useState } from "react";
import {
  BuildingOffice2Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import { schools as initialSchools } from "../../../data/mockData";
import SchoolForm from "../components/SchoolForm";
import CreateButton from "../../../components/ui/CreateButton";
import SchoolTable from "../components/SchoolTable";

const emptySchoolForm = {
  name: "",
  city: "",
  principal: "",
  studentCount: "",
  status: "Aktif",
};

function SchoolsPage() {
  const [schools, setSchools] = useState(initialSchools);
  const [formData, setFormData] = useState(emptySchoolForm);
  const [editingSchoolId, setEditingSchoolId] = useState(null);
  const [deletingSchoolId, setDeletingSchoolId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const isEditing = editingSchoolId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 2500);
  };

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const matchesSearch =
        school.name.toLowerCase().includes(search.toLowerCase()) ||
        school.city.toLowerCase().includes(search.toLowerCase()) ||
        school.principal.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "all" || school.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [schools, search, status]);

  const handleOpenCreateModal = () => {
    setEditingSchoolId(null);
    setFormData(emptySchoolForm);
    document.getElementById("school_modal").showModal();
  };

  const handleOpenEditModal = (school) => {
    setEditingSchoolId(school.id);

    setFormData({
      name: school.name,
      city: school.city,
      principal: school.principal,
      studentCount: school.studentCount,
      status: school.status,
    });

    document.getElementById("school_modal").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("school_modal").close();
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingSchoolId(id);
    document.getElementById("school_delete_modal").showModal();
  };

  const handleCloseDeleteModal = () => {
    document.getElementById("school_delete_modal").close();
  };

  const handleDelete = () => {
    setSchools((prev) =>
      prev.filter((school) => school.id !== deletingSchoolId)
    );

    setDeletingSchoolId(null);
    handleCloseDeleteModal();
    showToast("Okul başarıyla silindi.", "success");
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.city || !formData.principal) {
      showToast("Lütfen okul adı, şehir ve müdür alanlarını doldurun.", "error");
      return;
    }

    if (isEditing) {
      setSchools((prev) =>
        prev.map((school) =>
          school.id === editingSchoolId
            ? {
              ...school,
              ...formData,
              studentCount: Number(formData.studentCount || 0),
            }
            : school
        )
      );

      showToast("Okul bilgileri başarıyla güncellendi.", "success");
    } else {
      const newSchool = {
        id: Date.now(),
        ...formData,
        studentCount: Number(formData.studentCount || 0),
      };

      setSchools((prev) => [newSchool, ...prev]);
      showToast("Yeni okul başarıyla eklendi.", "success");
    }

    setFormData(emptySchoolForm);
    setEditingSchoolId(null);
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Okul Yönetimi
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              Okullar
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Sisteme kayıtlı okulları görüntüleyin ve yönetin
            </p>
          </div>

          <CreateButton icon={BuildingOffice2Icon} onClick={handleOpenCreateModal}>
            Yeni Okul
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
              placeholder="Okul, şehir veya müdür ara..."
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

        <SchoolTable
          schools={filteredSchools}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </section>

      <Modal
        id="school_modal"
        title={isEditing ? "Okul Bilgilerini Düzenle" : "Yeni Okul Ekle"}
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
        <SchoolForm formData={formData} setFormData={setFormData} />
      </Modal>

      <ConfirmModal
        id="school_delete_modal"
        title="Okulu Sil"
        description="Bu okul kaydı kalıcı olarak silinecek. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default SchoolsPage;