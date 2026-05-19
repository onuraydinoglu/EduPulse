import Toast from "../../../components/ui/Toast";

import ClubDeleteModal from "../components/ClubDeleteModal";

import ClubFormModal from "../components/ClubFormModal";

import ClubsPageHeader from "../components/ClubsPageHeader";

import ClubStatsCards from "../components/ClubStatsCards";

import ClubTable from "../components/ClubTable";

import {
  CLUB_DELETE_MODAL_ID,
  CLUB_MODAL_ID,
} from "../constants/clubConstants";

import { getClubStats } from "../constants/clubTableColumns";

import { useClubsPage } from "../hooks/useClubsPage";

import { canManageSchoolData } from "../../../utils/authUser";

function ClubsPage() {
  const {
    clubs,
    filteredClubs,
    teachers,
    formData,
    setFormData,
    errors,
    isEditing,
    toast,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseClubModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    handleSubmit,
    handleExportClubsPdf,
  } = useClubsPage();

  const canManageClubs = canManageSchoolData();

  return (
    <div className="space-y-6">
      {toast.message && <Toast message={toast.message} type={toast.type} />}

      <ClubsPageHeader
        canManage={canManageClubs}
        onCreate={() => handleOpenCreateModal(CLUB_MODAL_ID)}
        onExport={handleExportClubsPdf}
      />

      <ClubStatsCards items={getClubStats(clubs)} />

      <ClubTable
        clubs={filteredClubs}
        teachers={teachers}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        canManage={canManageClubs}
        onEdit={(club) => handleOpenEditModal(club, CLUB_MODAL_ID)}
        onDelete={(id) => handleOpenDeleteModal(id, CLUB_DELETE_MODAL_ID)}
      />

      {canManageClubs && (
        <>
          <ClubFormModal
            modalId={CLUB_MODAL_ID}
            formData={formData}
            setFormData={setFormData}
            teachers={teachers}
            errors={errors}
            isEditing={isEditing}
            onClose={() => handleCloseClubModal(CLUB_MODAL_ID)}
            onSubmit={() => handleSubmit(CLUB_MODAL_ID)}
          />

          <ClubDeleteModal
            modalId={CLUB_DELETE_MODAL_ID}
            onClose={() => handleCloseDeleteModal(CLUB_DELETE_MODAL_ID)}
            onConfirm={() => handleDelete(CLUB_DELETE_MODAL_ID)}
          />
        </>
      )}
    </div>
  );
}

export default ClubsPage;