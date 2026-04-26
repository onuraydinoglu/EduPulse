import { useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import { mockApi } from "../../../services/mockApi";
import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
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
  const [clubs, setClubs] = useState(() => mockApi.getClubs());
  const [formData, setFormData] = useState(emptyClubForm);
  const [editingClubId, setEditingClubId] = useState(null);
  const [deletingClubId, setDeletingClubId] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [toast, setToast] = useState({ message: "", type: "success" });

  const isEditing = editingClubId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const filteredClubs = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return clubs.filter((club) => {
      const matchesSearch =
        club.name.toLowerCase().includes(normalizedSearch) ||
        club.teacher?.toLowerCase().includes(normalizedSearch);

      const matchesStatus = status === "all" || club.status === status;

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
      name: club.name || "",
      teacher: club.teacher || "",
      studentCount: club.studentCount || "",
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
    setClubs((prev) => prev.filter((club) => club.id !== deletingClubId));

    setDeletingClubId(null);
    handleCloseDeleteModal();
    showToast("Kulüp başarıyla silindi.");
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.teacher.trim()) {
      showToast(
        "Lütfen kulüp adı ve sorumlu öğretmen alanlarını doldurun.",
        "error"
      );
      return;
    }

    if (Number(formData.studentCount || 0) < 0) {
      showToast("Öğrenci sayısı negatif olamaz.", "error");
      return;
    }

    const preparedClub = {
      name: formData.name.trim(),
      teacher: formData.teacher.trim(),
      studentCount: Number(formData.studentCount || 0),
      status: formData.status,
    };

    if (isEditing) {
      setClubs((prev) =>
        prev.map((club) =>
          club.id === editingClubId
            ? {
              ...club,
              ...preparedClub,
            }
            : club
        )
      );

      showToast("Kulüp bilgileri başarıyla güncellendi.");
    } else {
      const newClub = {
        id: Date.now(),
        ...preparedClub,
      };

      setClubs((prev) => [newClub, ...prev]);
      showToast("Yeni kulüp başarıyla eklendi.");
    }

    setFormData(emptyClubForm);
    setEditingClubId(null);
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">Kulüp Yönetimi</p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              Kulüpler
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Öğrencilerin sosyal etkinlik ve kulüp kayıtlarını takip edin
            </p>
          </div>

          <CreateButton icon={UserGroupIcon} onClick={handleOpenCreateModal}>
            Yeni Kulüp
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
              placeholder="Kulüp adı veya öğretmen ara..."
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

        <ClubTable
          clubs={filteredClubs}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </section>

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