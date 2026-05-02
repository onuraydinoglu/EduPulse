import { useEffect, useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";
import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import CreateButton from "../../../components/ui/CreateButton";

import ClubMemberForm from "../components/ClubMemberForm";
import ClubMemberTable from "../components/ClubMemberTable";
import { clubMemberService } from "../services/clubMemberService";

const emptyForm = {
  clubId: "",
  studentId: "",
};

function ClubMembersPage() {
  const [clubs, setClubs] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedClubMembers, setSelectedClubMembers] = useState([]);

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedClubId, setSelectedClubId] = useState("");

  const [loading, setLoading] = useState(true);
  const [memberLoading, setMemberLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const getResultData = (response) => {
    return response.data?.data ?? response.data?.Data ?? response.data;
  };

  const loadClubsAndStudents = async () => {
    try {
      setLoading(true);

      const [clubResponse, studentResponse] = await Promise.all([
        axiosInstance.get(API_ENDPOINTS.CLUBS),
        axiosInstance.get(API_ENDPOINTS.STUDENTS),
      ]);

      const clubData = getResultData(clubResponse);
      const studentData = getResultData(studentResponse);

      setClubs(Array.isArray(clubData) ? clubData : []);
      setStudents(Array.isArray(studentData) ? studentData : []);
    } catch (error) {
      setClubs([]);
      setStudents([]);
      showToast(
        error.message || "Kulüpler ve öğrenciler yüklenirken hata oluştu.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const loadSelectedClubMembers = async (clubId) => {
    if (!clubId) return;

    try {
      setMemberLoading(true);

      const data = await clubMemberService.getByClubId(clubId);
      setSelectedClubMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      setSelectedClubMembers([]);
      showToast(
        error.message || "Kulüp üyeleri yüklenirken hata oluştu.",
        "error",
      );
    } finally {
      setMemberLoading(false);
    }
  };

  useEffect(() => {
    loadClubsAndStudents();
  }, []);

  const filteredClubs = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return clubs.filter((club) => {
      const clubId = club.id || club.Id;

      const memberCount = club.memberCount ?? club.MemberCount ?? 0;

      if (memberCount <= 0) return false;

      const clubName = (club.name || club.Name || "").toLowerCase();

      const teacherName = (
        club.advisorTeacherFullName ||
        club.AdvisorTeacherFullName ||
        club.teacherFullName ||
        club.TeacherFullName ||
        ""
      ).toLowerCase();

      const matchesClubFilter = !selectedClubId || clubId === selectedClubId;

      const matchesSearch =
        clubName.includes(normalizedSearch) ||
        teacherName.includes(normalizedSearch);

      return matchesClubFilter && matchesSearch;
    });
  }, [clubs, search, selectedClubId]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clubId) {
      newErrors.clubId = "Kulüp seçiniz.";
    }

    if (!formData.studentId) {
      newErrors.studentId = "Öğrenci seçiniz.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleOpenCreateModal = () => {
    setFormData(emptyForm);
    setErrors({});
    document.getElementById("club_member_modal")?.showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("club_member_modal")?.close();
    setFormData(emptyForm);
    setErrors({});
  };

  const handleOpenMembersModal = async (club) => {
    const clubId = club.id || club.Id;

    setSelectedClub(club);
    setSelectedClubMembers([]);

    document.getElementById("club_members_detail_modal")?.showModal();

    await loadSelectedClubMembers(clubId);
  };

  const handleCloseMembersModal = () => {
    document.getElementById("club_members_detail_modal")?.close();
    setSelectedClub(null);
    setSelectedClubMembers([]);
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingId(id);
    document.getElementById("club_member_delete_modal")?.showModal();
  };

  const handleCloseDeleteModal = () => {
    document.getElementById("club_member_delete_modal")?.close();
    setDeletingId(null);
  };

  const refreshOpenClubMembers = async () => {
    const clubId = selectedClub?.id || selectedClub?.Id;

    if (clubId) {
      await loadSelectedClubMembers(clubId);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);

      await clubMemberService.create({
        clubId: formData.clubId,
        studentId: formData.studentId,
      });

      showToast("Kulüp üyesi başarıyla eklendi.");
      handleCloseModal();
      await loadClubsAndStudents();
      await refreshOpenClubMembers();
    } catch (error) {
      showToast(
        error.message || "Kulüp üyesi eklenirken hata oluştu.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await clubMemberService.delete(deletingId);

      showToast("Kulüp üyesi başarıyla silindi.");
      handleCloseDeleteModal();
      await loadClubsAndStudents();
      await refreshOpenClubMembers();
    } catch (error) {
      showToast(
        error.message || "Kulüp üyesi silinirken hata oluştu.",
        "error",
      );
    }
  };

  const selectedClubName =
    selectedClub?.name || selectedClub?.Name || "Kulüp";

  return (
    <div className="space-y-6">
      {toast.message && <Toast message={toast.message} type={toast.type} />}

      <section className="radius-card border border-gray-200 bg-white px-6 py-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              Kulüp Üyeleri
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Kulüplere öğrenci atama ve üye listesini yönetme ekranı
            </p>
          </div>

          <CreateButton icon={UserPlusIcon} onClick={handleOpenCreateModal}>
            Yeni Kulüp Üyesi
          </CreateButton>
        </div>
      </section>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-80">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Kulüp veya öğretmen ara..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          />
        </div>

        <select
          value={selectedClubId}
          onChange={(e) => setSelectedClubId(e.target.value)}
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 md:w-64"
        >
          <option value="">Tüm Kulüpler</option>

          {clubs.map((club) => (
            <option key={club.id || club.Id} value={club.id || club.Id}>
              {club.name || club.Name || "-"}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-base-300 bg-base-100 p-8 text-center text-base-content/60">
          Kulüpler yükleniyor...
        </div>
      ) : (
        <ClubMemberTable
          clubs={filteredClubs}
          onDetail={handleOpenMembersModal}
        />
      )}

      <Modal id="club_member_modal" title="Yeni Kulüp Üyesi">
        <ClubMemberForm
          formData={formData}
          setFormData={setFormData}
          clubs={clubs}
          students={students}
          errors={errors}
        />

        <div className="modal-action">
          <Button variant="ghost" onClick={handleCloseModal}>
            Vazgeç
          </Button>

          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </Modal>

      <Modal id="club_members_detail_modal" title={`${selectedClubName} Üyeleri`}>
        {memberLoading ? (
          <div className="rounded-2xl border border-base-300 bg-base-100 p-8 text-center text-base-content/60">
            Üyeler yükleniyor...
          </div>
        ) : selectedClubMembers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 p-8 text-center text-base-content/60">
            Bu kulüpte henüz öğrenci yok.
          </div>
        ) : (
          <div className="space-y-3">
            {selectedClubMembers.map((member) => {
              const id = member.id || member.Id;

              const fullName =
                member.studentFullName ||
                member.StudentFullName ||
                member.fullName ||
                member.FullName ||
                "-";

              const number =
                member.studentNumber ||
                member.StudentNumber ||
                member.number ||
                member.Number ||
                "-";

              return (
                <div
                  key={id}
                  className="flex items-center justify-between rounded-2xl border border-base-300 bg-base-100 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-base-content">
                      {fullName}
                    </p>
                    <p className="text-sm text-base-content/55">
                      Öğrenci No: {number}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-ghost btn-sm text-error"
                    onClick={() => handleOpenDeleteModal(id)}
                    disabled={!id}
                  >
                    Sil
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="modal-action">
          <Button variant="ghost" onClick={handleCloseMembersModal}>
            Kapat
          </Button>
        </div>
      </Modal>

      <ConfirmModal
        id="club_member_delete_modal"
        title="Kulüp Üyesini Sil"
        description="Bu kulüp üyesini silmek istediğinize emin misiniz?"
        confirmText="Sil"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default ClubMembersPage;