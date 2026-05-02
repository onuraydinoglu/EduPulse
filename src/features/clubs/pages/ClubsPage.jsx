import { useEffect, useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import CreateButton from "../../../components/ui/CreateButton";

import ClubForm from "../components/ClubForm";
import ClubTable from "../components/ClubTable";
import { clubService } from "../services/clubService";

const emptyClubForm = {
  name: "",
  advisorTeacherId: "",
  isActive: true,
};

function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [formData, setFormData] = useState(emptyClubForm);
  const [editingClubId, setEditingClubId] = useState(null);
  const [deletingClubId, setDeletingClubId] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const getResultData = (response) => {
    return response.data?.data ?? response.data?.Data ?? response.data;
  };

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const data = await clubService.getAll();
      setClubs(Array.isArray(data) ? data : []);
    } catch (error) {
      showToast(error.message || "Kulüpler yüklenirken hata oluştu.", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.TEACHERS);
      const data = getResultData(response);
      setTeachers(Array.isArray(data) ? data : []);
    } catch {
      setTeachers([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchClubs();
      await fetchTeachers();
    };

    loadData();
  }, []);

  const filteredClubs = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return clubs.filter((club) => {
      const name = (club.name || club.Name || "").toLowerCase();

      const teacherName = (
        club.advisorTeacherFullName ||
        club.AdvisorTeacherFullName ||
        ""
      ).toLowerCase();

      const isActive = club.isActive ?? club.IsActive ?? true;

      const matchesSearch =
        name.includes(normalizedSearch) ||
        teacherName.includes(normalizedSearch);

      const matchesStatus =
        status === "all" ||
        (status === "active" && isActive) ||
        (status === "passive" && !isActive);

      return matchesSearch && matchesStatus;
    });
  }, [clubs, search, status]);

  const handleOpenCreateModal = () => {
    setEditingClubId(null);
    setFormData(emptyClubForm);
    document.getElementById("club_modal").showModal();
  };

  const handleOpenEditModal = (club) => {
    const id = club.id || club.Id;

    setEditingClubId(id);

    setFormData({
      name: club.name || club.Name || "",
      advisorTeacherId:
        club.advisorTeacherId || club.AdvisorTeacherId || "",
      isActive: club.isActive ?? club.IsActive ?? true,
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

  const handleDelete = async () => {
    try {
      await clubService.delete(deletingClubId);

      setDeletingClubId(null);
      handleCloseDeleteModal();
      showToast("Kulüp başarıyla silindi.");
      fetchClubs();
    } catch (error) {
      showToast(error.message || "Kulüp silinirken hata oluştu.", "error");
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      showToast("Kulüp adı boş bırakılamaz.", "error");
      return;
    }

    if (!formData.advisorTeacherId) {
      showToast("Sorumlu öğretmen seçiniz.", "error");
      return;
    }

    try {
      setSaving(true);

      if (isEditing) {
        await clubService.update({
          id: editingClubId,
          name: formData.name.trim(),
          advisorTeacherId: formData.advisorTeacherId,
          isActive: formData.isActive,
        });

        showToast("Kulüp bilgileri başarıyla güncellendi.");
      } else {
        await clubService.create({
          name: formData.name.trim(),
          advisorTeacherId: formData.advisorTeacherId,
        });

        showToast("Yeni kulüp başarıyla eklendi.");
      }

      setFormData(emptyClubForm);
      setEditingClubId(null);
      handleCloseModal();
      fetchClubs();
    } catch (error) {
      showToast(error.message || "Kulüp kaydedilirken hata oluştu.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Kulüp Yönetimi
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              Kulüpler
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Okulunuza ait kulüp kayıtlarını yönetin
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
            <option value="active">Aktif</option>
            <option value="passive">Pasif</option>
          </select>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">
            Kulüpler yükleniyor...
          </div>
        ) : (
          <ClubTable
            clubs={filteredClubs}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
          />
        )}
      </section>

      <Modal
        id="club_modal"
        title={isEditing ? "Kulüp Bilgilerini Düzenle" : "Yeni Kulüp Ekle"}
        footer={
          <>
            <form method="dialog">
              <Button variant="ghost">Vazgeç</Button>
            </form>

            <Button onClick={handleSubmit} disabled={saving}>
              {saving ? "Kaydediliyor..." : isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </>
        }
      >
        <ClubForm
          formData={formData}
          setFormData={setFormData}
          teachers={teachers}
        />
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