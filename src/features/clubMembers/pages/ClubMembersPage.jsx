import Toast from "../../../components/ui/Toast";

import ClubMemberDeleteModal from "../components/ClubMemberDeleteModal";
import ClubMemberFormModal from "../components/ClubMemberFormModal";
import ClubMemberStatsCards from "../components/ClubMemberStatsCards";
import ClubMemberTable from "../components/ClubMemberTable";
import ClubMembersPageHeader from "../components/ClubMembersPageHeader";

import {
  CLUB_MEMBER_DELETE_MODAL_ID,
  CLUB_MEMBER_MODAL_ID,
} from "../constants/clubMemberConstants";

import { useClubMembersPage } from "../hooks/useClubMembersPage";

function ClubMembersPage() {
  const {
    club,
    members,
    filteredMembers,
    selectableStudents,

    formData,
    setFormData,
    errors,

    search,
    setSearch,

    loading,
    savingMember,

    toast,

    handleBackToClubs,

    handleOpenCreateModal,
    handleCloseCreateModal,
    handleCreateMember,

    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteMember,

    handleExportMembersPdf,
  } = useClubMembersPage();

  if (loading) {
    return (
      <div className="rounded-3xl border border-base-300 bg-base-100 p-6 text-sm text-base-content/60 shadow-sm">
        Kulüp bilgileri yükleniyor...
      </div>
    );
  }

  if (!club) {
    return (
      <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <p className="text-sm text-base-content/60">Kulüp bulunamadı.</p>

        <button
          type="button"
          onClick={handleBackToClubs}
          className="btn btn-sm mt-4 rounded-xl"
        >
          Kulüplere Dön
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {toast.message && (
        <Toast message={toast.message} type={toast.type} />
      )}

      <ClubMembersPageHeader
        club={club}
        onBack={handleBackToClubs}
        onCreate={() => handleOpenCreateModal(CLUB_MEMBER_MODAL_ID)}
        onExport={handleExportMembersPdf}
      />

      <ClubMemberStatsCards club={club} members={members} />

      <ClubMemberTable
        members={filteredMembers}
        search={search}
        setSearch={setSearch}
        onDelete={(memberId) =>
          handleOpenDeleteModal(memberId, CLUB_MEMBER_DELETE_MODAL_ID)
        }
      />

      <ClubMemberFormModal
        modalId={CLUB_MEMBER_MODAL_ID}
        formData={formData}
        setFormData={setFormData}
        selectableStudents={selectableStudents}
        errors={errors}
        saving={savingMember}
        onClose={() => handleCloseCreateModal(CLUB_MEMBER_MODAL_ID)}
        onSubmit={() => handleCreateMember(CLUB_MEMBER_MODAL_ID)}
      />

      <ClubMemberDeleteModal
        modalId={CLUB_MEMBER_DELETE_MODAL_ID}
        onClose={() => handleCloseDeleteModal(CLUB_MEMBER_DELETE_MODAL_ID)}
        onConfirm={() => handleDeleteMember(CLUB_MEMBER_DELETE_MODAL_ID)}
      />
    </div>
  );
}

export default ClubMembersPage;