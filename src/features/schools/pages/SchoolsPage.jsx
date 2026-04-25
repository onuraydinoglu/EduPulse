import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader";
import PageToolbar from "../../../components/common/PageToolbar";
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
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const isEditing = editingSchoolId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
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
    <div>
      <Toast message={toast.message} type={toast.type} />

      <PageHeader
        title="Okullar"
        description="Sisteme kayıtlı okulları görüntüleyin ve yönetin"
      >
        <CreateButton onClick={handleOpenCreateModal}>
          Yeni Okul
        </CreateButton>
      </PageHeader>

      <PageToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Okul, şehir veya müdür ara..."
        filterValue={status}
        onFilterChange={setStatus}
        filterOptions={[
          { label: "Tüm Durumlar", value: "all" },
          { label: "Aktif", value: "Aktif" },
          { label: "Pasif", value: "Pasif" },
        ]}
      />

      <SchoolTable
        schools={filteredSchools}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />

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