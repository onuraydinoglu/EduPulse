import { useEffect, useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import CreateButton from "../../../components/ui/CreateButton";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";

import { clubService } from "../../clubs/services/clubService";
import { clubMemberService } from "../services/clubMemberService";
import ClubMemberForm from "../components/ClubMemberForm";
import ClubMemberTable from "../components/ClubMemberTable";

const emptyForm = {
  clubId: "",
  studentId: "",
};

function ClubMembersPage() {
  const [members, setMembers] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState(emptyForm);
  const [deletingMemberId, setDeletingMemberId] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedClubId, setSelectedClubId] = useState("");

  const [loading, setLoading] = useState(false);
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

  const getData = (response) => {
    const result = response.data;

    if (Array.isArray(result)) return result;
    if (Array.isArray(result?.data)) return result.data;
    if (Array.isArray(result?.Data)) return result.Data;

    return [];
  };

  const refreshMembers = async () => {
    const data = await clubMemberService.getAll();
    setMembers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [membersResponse, clubsData, studentsResponse] = await Promise.all([
          clubMemberService.getAll(),
          clubService.getAll(),
          axiosInstance.get(API_ENDPOINTS.STUDENTS),
        ]);

        const studentsData = getData(studentsResponse);

        console.log("members:", membersResponse);
        console.log("clubs:", clubsData);
        console.log("students:", studentsData);

        setMembers(Array.isArray(membersResponse) ? membersResponse : []);
        setClubs(Array.isArray(clubsData) ? clubsData : []);
        setStudents(Array.isArray(studentsData) ? studentsData : []);
      } catch (error) {
        console.log("Club members load error:", error);

        showToast(
          error.response?.data?.message ||
          error.response?.data?.Message ||
          error.message ||
          "Veriler yüklenirken hata oluştu.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredMembers = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return members.filter((member) => {
      const clubName = (member.clubName || "").toLowerCase();
      const studentName = (member.studentFullName || "").toLowerCase();
      const studentNumber = (member.studentNumber || "").toLowerCase();
      const classroomName = (member.classroomName || "").toLowerCase();

      const matchesSearch =
        clubName.includes(normalizedSearch) ||
        studentName.includes(normalizedSearch) ||
        studentNumber.includes(normalizedSearch) ||
        classroomName.includes(normalizedSearch);

      const matchesClub =
        !selectedClubId || member.clubId === selectedClubId;

      return matchesSearch && matchesClub;
    });
  }, [members, search, selectedClubId]);

  const clubOptions = clubs.map((club) => ({
    label: club.name || "-",
    value: club.id,
  }));

  const handleOpenCreateModal = () => {
    setFormData(emptyForm);
    document.getElementById("club_member_modal").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("club_member_modal").close();
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingMemberId(id);
    document.getElementById("club_member_delete_modal").showModal();
  };

  const handleCloseDeleteModal = () => {
    setDeletingMemberId(null);
    document.getElementById("club_member_delete_modal").close();
  };

  const handleSubmit = async () => {
    if (!formData.clubId) {
      showToast("Kulüp seçiniz.", "error");
      return;
    }

    if (!formData.studentId) {
      showToast("Öğrenci seçiniz.", "error");
      return;
    }

    try {
      setSaving(true);

      await clubMemberService.create({
        clubId: formData.clubId,
        studentId: formData.studentId,
      });

      showToast("Öğrenci kulübe başarıyla eklendi.");
      setFormData(emptyForm);
      handleCloseModal();
      await refreshMembers();
    } catch (error) {
      showToast(
        error.response?.data?.message ||
        error.response?.data?.Message ||
        error.message ||
        "Üye eklenirken hata oluştu.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingMemberId) return;

    try {
      await clubMemberService.delete(deletingMemberId);

      showToast("Üye kulüpten çıkarıldı.");
      handleCloseDeleteModal();
      await refreshMembers();
    } catch (error) {
      showToast(
        error.response?.data?.message ||
        error.response?.data?.Message ||
        error.message ||
        "Üye silinirken hata oluştu.",
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
              Kulüp Üyeleri
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              Kulübe Üye Ekle
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Öğrencileri okul kulüplerine ekleyin veya kulüpten çıkarın
            </p>
          </div>

          <CreateButton icon={UserPlusIcon} onClick={handleOpenCreateModal}>
            Yeni Üye
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
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Kulüp, öğrenci, numara veya sınıf ara..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <select
            value={selectedClubId}
            onChange={(event) => setSelectedClubId(event.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 md:w-56"
          >
            <option value="">Tüm Kulüpler</option>

            {clubOptions.map((club) => (
              <option key={club.value} value={club.value}>
                {club.label}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">
            Kulüp üyeleri yükleniyor...
          </div>
        ) : (
          <ClubMemberTable
            members={filteredMembers}
            onDelete={handleOpenDeleteModal}
          />
        )}
      </section>

      <Modal
        id="club_member_modal"
        title="Kulübe Üye Ekle"
        footer={
          <>
            <form method="dialog">
              <Button variant="ghost">Vazgeç</Button>
            </form>

            <Button onClick={handleSubmit} disabled={saving}>
              {saving ? "Ekleniyor..." : "Ekle"}
            </Button>
          </>
        }
      >
        <ClubMemberForm
          formData={formData}
          setFormData={setFormData}
          clubs={clubs}
          students={students}
        />
      </Modal>

      <ConfirmModal
        id="club_member_delete_modal"
        title="Üyeyi Kulüpten Çıkar"
        description="Bu öğrenci seçili kulüpten çıkarılacak. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Çıkar"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default ClubMembersPage;