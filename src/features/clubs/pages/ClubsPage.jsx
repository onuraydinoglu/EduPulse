import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader";
import PageToolbar from "../../../components/common/PageToolbar";
import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import { clubs as initialClubs } from "../../../data/mockData";
import ClubForm from "../components/ClubForm";
import CreateButton from "../../../components/ui/CreateButton";
import ClubTable from "../components/ClubTable";


const emptyClubForm = {
  name: "",
  teacher: "",
  studentCount: "",
  status: "Aktif",
};

function ClubsPage() {
  const [clubs, setClubs] = useState(initialClubs);
  const [formData, setFormData] = useState(emptyClubForm);
  const [editingClubId, setEditingClubId] = useState(null);
  const [deletingClubId, setDeletingClubId] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const isEditing = editingClubId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const matchesSearch =
        club.name.toLowerCase().includes(search.toLowerCase()) ||
        club.teacher.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "all" || club.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [clubs, search, status]);

  const handleOpenCreateModal = () => {
    setEditingClubId(null);
    setFormData(emptyClubForm);
    document.getElementById("club_modal").showModal();
  };

  const handleOpenEditModal = (club) => {
    setEditingClubId(club.id);
    setFormData({
      name: club.name,
      teacher: club.teacher,
      studentCount: club.studentCount,
      status: club.status,
    });

    document.getElementById("club_modal").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("club_modal").close();
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingClubId(id);
    document.getElementById("club_delete_modal").showModal();
  };

  const handleCloseDeleteModal = () => {
    document.getElementById("club_delete_modal").close();
  };

  const handleDelete = () => {
    setClubs((prev) =>
      prev.filter((club) => club.id !== deletingClubId)
    );

    setDeletingClubId(null);
    handleCloseDeleteModal();
    showToast("Kulüp başarıyla silindi.");
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.teacher) {
      showToast("Lütfen kulüp adı ve sorumlu öğretmen alanlarını doldurun.", "error");
      return;
    }

    if (Number(formData.studentCount) < 0) {
      showToast("Öğrenci sayısı negatif olamaz.", "error");
      return;
    }

    if (isEditing) {
      setClubs((prev) =>
        prev.map((club) =>
          club.id === editingClubId
            ? {
              ...club,
              ...formData,
              studentCount: Number(formData.studentCount || 0),
            }
            : club
        )
      );

      showToast("Kulüp bilgileri başarıyla güncellendi.");
    } else {
      const newClub = {
        id: Date.now(),
        ...formData,
        studentCount: Number(formData.studentCount || 0),
      };

      setClubs((prev) => [newClub, ...prev]);
      showToast("Yeni kulüp başarıyla eklendi.");
    }

    setFormData(emptyClubForm);
    setEditingClubId(null);
    handleCloseModal();
  };

  return (
    <div>
      <Toast message={toast.message} type={toast.type} />

      <PageHeader
        title="Kulüpler"
        description="Öğrencilerin sosyal etkinlik ve kulüp kayıtlarını takip edin"
      >
        <CreateButton onClick={handleOpenCreateModal}>
          Yeni Kulüp
        </CreateButton>
      </PageHeader>

      <PageToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Kulüp adı veya öğretmen ara..."
        filterValue={status}
        onFilterChange={setStatus}
        filterOptions={[
          { label: "Tüm Durumlar", value: "all" },
          { label: "Aktif", value: "Aktif" },
          { label: "Pasif", value: "Pasif" },
        ]}
      />

      <ClubTable
        clubs={filteredClubs}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />

      <Modal
        id="club_modal"
        title={isEditing ? "Kulüp Bilgilerini Düzenle" : "Yeni Kulüp Ekle"}
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
        <ClubForm formData={formData} setFormData={setFormData} />
      </Modal>

      <ConfirmModal
        id="club_delete_modal"
        title="Kulübü Sil"
        description="Bu kulüp kaydı kalıcı olarak silinecek. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default ClubsPage;