import { useEffect, useMemo, useState } from "react";

import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";
import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";

import ClubForm from "../components/ClubForm";
import ClubsPageHeader from "../components/ClubsPageHeader";
import ClubStatsCards from "../components/ClubStatsCards";
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
  const [statusFilter, setStatusFilter] = useState("all");
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

      const advisorTeacherId = club.advisorTeacherId || club.AdvisorTeacherId;

      const advisorTeacherFromList = teachers.find(
        (teacher) => (teacher.id || teacher.Id) === advisorTeacherId,
      );

      const teacherName = (
        club.advisorTeacherFullName ||
        club.AdvisorTeacherFullName ||
        club.teacherFullName ||
        club.TeacherFullName ||
        advisorTeacherFromList?.fullName ||
        advisorTeacherFromList?.FullName ||
        `${advisorTeacherFromList?.firstName || advisorTeacherFromList?.FirstName || ""} ${advisorTeacherFromList?.lastName || advisorTeacherFromList?.LastName || ""
        }`
      ).toLowerCase();

      const isActive = club.isActive ?? club.IsActive ?? true;

      const matchesSearch =
        name.includes(normalizedSearch) ||
        teacherName.includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && isActive) ||
        (statusFilter === "passive" && !isActive);

      return matchesSearch && matchesStatus;
    });
  }, [clubs, teachers, search, statusFilter]);

  const handleOpenCreateModal = () => {
    setEditingClubId(null);
    setFormData(emptyClubForm);
    document.getElementById("club_modal")?.showModal();
  };

  const handleOpenEditModal = (club) => {
    const id = club.id || club.Id;

    setEditingClubId(id);

    setFormData({
      name: club.name || club.Name || "",
      advisorTeacherId: club.advisorTeacherId || club.AdvisorTeacherId || "",
      isActive: club.isActive ?? club.IsActive ?? true,
    });

    document.getElementById("club_modal")?.showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("club_modal")?.close();
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingClubId(id);
    document.getElementById("club_delete_modal")?.showModal();
  };

  const handleCloseDeleteModal = () => {
    setDeletingClubId(null);
    document.getElementById("club_delete_modal")?.close();
  };

  const handleDelete = async () => {
    try {
      await clubService.delete(deletingClubId);

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

      <ClubsPageHeader onCreate={handleOpenCreateModal} />

      <ClubStatsCards clubs={clubs} />

      {loading ? (
        <div className="rounded-3xl border border-base-300 bg-base-100 p-10 text-center text-sm text-base-content/60 shadow-sm">
          Kulüpler yükleniyor...
        </div>
      ) : (
        <ClubTable
          clubs={filteredClubs}
          teachers={teachers}
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      )}

      <Modal
        id="club_modal"
        title={isEditing ? "Kulüp Güncelle" : "Yeni Kulüp"}
        description={
          isEditing
            ? "Kulüp bilgilerini güncelleyin."
            : "Okulunuz için yeni bir kulüp oluşturun."
        }
        actions={
          <>
            <Button variant="secondary" onClick={handleCloseModal}>
              Vazgeç
            </Button>

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
          isEditing={isEditing}
        />
      </Modal>

      <ConfirmModal
        id="club_delete_modal"
        title="Kulüp silinsin mi?"
        description="Bu işlem geri alınamaz. Kulüp kaydı sistemden silinecek."
        confirmText="Sil"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
        onCancel={handleCloseDeleteModal}
      />
    </div>
  );
}

export default ClubsPage;