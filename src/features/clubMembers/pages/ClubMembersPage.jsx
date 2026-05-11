import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  UserGroupIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";
import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Pagination from "../../../components/ui/Pagination";
import SearchInput from "../../../components/ui/SearchInput";
import TableActions from "../../../components/ui/TableActions";
import Toast from "../../../components/ui/Toast";
import { usePagination } from "../../../hooks/usePagination";

import { clubMemberService } from "../../clubMembers/services/clubMemberService";
import { clubService } from "../../clubs/services/clubService";

const emptyMemberForm = {
  studentId: "",
};

function ClubWorkspacePage() {
  const { clubId } = useParams();
  const navigate = useNavigate();

  const [club, setClub] = useState(null);
  const [members, setMembers] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(emptyMemberForm);
  const [deletingMemberId, setDeletingMemberId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingMember, setSavingMember] = useState(false);

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
    return response.data?.data ?? response.data?.Data ?? response.data;
  };

  const getId = (item) => item?.id || item?.Id;

  const getClubName = (item) => item?.name || item?.Name || "Kulüp";

  const getAdvisorName = (item) =>
    item?.advisorTeacherFullName ||
    item?.AdvisorTeacherFullName ||
    item?.teacherFullName ||
    item?.TeacherFullName ||
    "-";

  const getStudentId = (student) =>
    student?.studentId || student?.StudentId || getId(student);

  const getStudentFullName = (item) =>
    item?.studentFullName ||
    item?.StudentFullName ||
    item?.fullName ||
    item?.FullName ||
    `${item?.firstName || item?.FirstName || ""} ${item?.lastName || item?.LastName || ""
      }`.trim() ||
    "Öğrenci";

  const getStudentNumber = (item) =>
    item?.studentNumber || item?.StudentNumber || "-";

  const getClassroomName = (item) =>
    item?.classroomName ||
    item?.ClassroomName ||
    item?.className ||
    item?.ClassName ||
    "-";

  const fetchClub = async () => {
    const data = await clubService.getById(clubId);
    setClub(data || null);
  };

  const fetchMembers = async () => {
    const data = await clubMemberService.getByClubId(clubId);
    setMembers(Array.isArray(data) ? data : []);
  };

  const fetchStudents = async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.STUDENTS);
    const data = getData(response);
    setStudents(Array.isArray(data) ? data : []);
  };

  const loadPage = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchClub(), fetchMembers(), fetchStudents()]);
    } catch (error) {
      showToast(
        error.message || "Kulüp çalışma alanı yüklenirken hata oluştu.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage();
  }, [clubId]);

  const memberStudentIds = useMemo(() => {
    return members
      .map((member) => member.studentId || member.StudentId)
      .filter(Boolean);
  }, [members]);

  const selectableStudents = useMemo(() => {
    return students.filter((student) => {
      const studentId = getStudentId(student);
      const isActive = student.isActive ?? student.IsActive ?? true;

      return isActive && !memberStudentIds.includes(studentId);
    });
  }, [students, memberStudentIds]);

  const filteredMembers = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return members.filter((member) => {
      const fullName = getStudentFullName(member).toLowerCase();
      const number = String(getStudentNumber(member)).toLowerCase();
      const classroom = getClassroomName(member).toLowerCase();

      return (
        fullName.includes(normalizedSearch) ||
        number.includes(normalizedSearch) ||
        classroom.includes(normalizedSearch)
      );
    });
  }, [members, search]);

  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalItems,
    totalPages,
    paginatedItems,
    startItem,
    endItem,
  } = usePagination(filteredMembers, 5);

  const handleOpenMemberModal = () => {
    setFormData(emptyMemberForm);
    document.getElementById("club_member_modal")?.showModal();
  };

  const handleCloseMemberModal = () => {
    setFormData(emptyMemberForm);
    document.getElementById("club_member_modal")?.close();
  };

  const handleCreateMember = async () => {
    if (!formData.studentId) {
      showToast("Öğrenci seçiniz.", "error");
      return;
    }

    try {
      setSavingMember(true);

      await clubMemberService.create({
        clubId,
        studentId: formData.studentId,
      });

      showToast("Öğrenci kulübe başarıyla eklendi.");
      handleCloseMemberModal();
      await fetchMembers();
    } catch (error) {
      showToast(
        error.message || "Öğrenci kulübe eklenirken hata oluştu.",
        "error",
      );
    } finally {
      setSavingMember(false);
    }
  };

  const handleOpenDeleteMemberModal = (memberId) => {
    setDeletingMemberId(memberId);
    document.getElementById("club_member_delete_modal")?.showModal();
  };

  const handleCloseDeleteMemberModal = () => {
    setDeletingMemberId(null);
    document.getElementById("club_member_delete_modal")?.close();
  };

  const handleDeleteMember = async () => {
    try {
      await clubMemberService.delete(deletingMemberId);

      showToast("Öğrenci kulüpten çıkarıldı.");
      handleCloseDeleteMemberModal();
      await fetchMembers();
    } catch (error) {
      showToast(
        error.message || "Öğrenci kulüpten çıkarılırken hata oluştu.",
        "error",
      );
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-base-300 bg-base-100 p-10 text-center text-sm text-base-content/60 shadow-sm">
        Kulüp bilgileri yükleniyor...
      </div>
    );
  }

  if (!club) {
    return (
      <div className="rounded-3xl border border-base-300 bg-base-100 p-10 text-center shadow-sm">
        <p className="text-sm font-semibold text-base-content">
          Kulüp bulunamadı.
        </p>

        <Button
          className="mt-4"
          onClick={() => navigate("/dashboard/clubs")}
        >
          Kulüplere Dön
        </Button>
      </div>
    );
  }

  const isActive = club.isActive ?? club.IsActive ?? true;

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/clubs")}
              className="btn btn-square btn-sm border-base-300 bg-base-100"
              title="Kulüplere dön"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <UserGroupIcon className="h-5 w-5" />
                Kulüp Çalışma Alanı
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-base-content">
                  {getClubName(club)}
                </h1>

                <span
                  className={`badge ${isActive ? "badge-success" : "badge-error"
                    } badge-sm text-white`}
                >
                  {isActive ? "Aktif" : "Pasif"}
                </span>
              </div>

              <p className="mt-1 text-sm text-base-content/60">
                Sorumlu Öğretmen:{" "}
                <span className="font-medium text-base-content">
                  {getAdvisorName(club)}
                </span>
              </p>
            </div>
          </div>

          <Button onClick={handleOpenMemberModal} disabled={!isActive}>
            <span className="inline-flex items-center gap-2">
              <UserPlusIcon className="h-5 w-5" />
              Öğrenci Ekle
            </span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-sm font-medium text-base-content/60">
            Toplam Üye
          </p>
          <p className="mt-3 text-3xl font-bold text-base-content">
            {members.length}
          </p>
        </div>

        <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-sm font-medium text-base-content/60">
            Eklenebilir Öğrenci
          </p>
          <p className="mt-3 text-3xl font-bold text-base-content">
            {selectableStudents.length}
          </p>
        </div>

        <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-sm font-medium text-base-content/60">
            Kulüp Durumu
          </p>
          <p className="mt-3 text-3xl font-bold text-base-content">
            {isActive ? "Aktif" : "Pasif"}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-base-300 bg-base-100 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-base-300 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-semibold text-base-content">
              Kulüp Üyeleri
            </h2>

            <p className="mt-1 text-sm text-base-content/60">
              {filteredMembers.length} kayıt listeleniyor.
            </p>
          </div>

          <SearchInput
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Öğrenci, numara veya sınıf ara..."
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-base-200/70">
              <tr>
                <th className="text-sm">Öğrenci</th>
                <th className="text-sm">Numara</th>
                <th className="text-sm">Sınıf</th>
                <th className="text-right text-sm">İşlemler</th>
              </tr>
            </thead>

            <tbody>
              {paginatedItems.map((member) => {
                const memberId = getId(member);

                return (
                  <tr key={memberId}>
                    <td>
                      <span className="font-semibold text-base-content">
                        {getStudentFullName(member)}
                      </span>
                    </td>

                    <td>
                      <span className="text-sm text-base-content/70">
                        {getStudentNumber(member)}
                      </span>
                    </td>

                    <td>
                      <span className="text-sm text-base-content/70">
                        {getClassroomName(member)}
                      </span>
                    </td>

                    <td className="text-right">
                      <TableActions
                        hideEdit
                        onDelete={() => handleOpenDeleteMemberModal(memberId)}
                      />
                    </td>
                  </tr>
                );
              })}

              {filteredMembers.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-10 text-center text-sm text-base-content/60"
                  >
                    Bu kulüpte öğrenci bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          startItem={startItem}
          endItem={endItem}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>

      <Modal
        id="club_member_modal"
        title="Kulübe Öğrenci Ekle"
        description="Bu kulübe eklenecek öğrenciyi seçin."
        actions={
          <>
            <Button variant="secondary" onClick={handleCloseMemberModal}>
              Vazgeç
            </Button>

            <Button onClick={handleCreateMember} disabled={savingMember}>
              {savingMember ? "Ekleniyor..." : "Ekle"}
            </Button>
          </>
        }
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-base-content">
            Öğrenci
          </label>

          <select
            value={formData.studentId}
            onChange={(event) =>
              setFormData((previous) => ({
                ...previous,
                studentId: event.target.value,
              }))
            }
            className="select select-bordered w-full"
          >
            <option value="">Öğrenci seçiniz</option>

            {selectableStudents.map((student) => {
              const studentId = getStudentId(student);

              return (
                <option key={studentId} value={studentId}>
                  {getStudentFullName(student)} - {getStudentNumber(student)}
                </option>
              );
            })}
          </select>

          {selectableStudents.length === 0 && (
            <p className="text-xs text-warning">
              Eklenebilir aktif öğrenci bulunamadı veya tüm öğrenciler bu
              kulübe eklenmiş.
            </p>
          )}
        </div>
      </Modal>

      <ConfirmModal
        id="club_member_delete_modal"
        title="Öğrenci kulüpten çıkarılsın mı?"
        description="Bu öğrenci sadece kulüp üyeliğinden çıkarılır. Öğrenci kaydı silinmez."
        confirmText="Çıkar"
        cancelText="Vazgeç"
        onConfirm={handleDeleteMember}
        onCancel={handleCloseDeleteMemberModal}
      />
    </div>
  );
}

export default ClubWorkspacePage;