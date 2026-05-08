import Toast from "../../../components/ui/Toast";

import OfficerDeleteModal from "../components/OfficerDeleteModal";
import OfficerFormModal from "../components/OfficerFormModal";
import OfficersPageHeader from "../components/OfficersPageHeader";
import OfficerStatsCards from "../components/OfficerStatsCards";
import OfficerTable from "../components/OfficerTable";

import {
  OFFICER_DELETE_MODAL_ID,
  OFFICER_MODAL_ID,
} from "../constants/officerConstants";

import { getOfficerStats } from "../constants/officerTableColumns";
import { useOfficersPage } from "../hooks/useOfficersPage";

function OfficersPage() {
  const {
    officers,
    filteredOfficers,

    formData,
    setFormData,
    errors,
    isEditing,
    temporaryPasswords,
    toast,

    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseOfficerModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    handleSubmit,
    handleExportOfficersPdf,
  } = useOfficersPage();

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <OfficersPageHeader
        onCreate={() => handleOpenCreateModal(OFFICER_MODAL_ID)}
        onExport={handleExportOfficersPdf}
      />

      <OfficerStatsCards
        items={getOfficerStats(officers, temporaryPasswords)}
      />

      <OfficerTable
        officers={filteredOfficers}
        temporaryPasswords={temporaryPasswords}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onEdit={(officer) =>
          handleOpenEditModal(officer, OFFICER_MODAL_ID)
        }
        onDelete={(id) =>
          handleOpenDeleteModal(id, OFFICER_DELETE_MODAL_ID)
        }
      />

      <OfficerFormModal
        modalId={OFFICER_MODAL_ID}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        onClose={() => handleCloseOfficerModal(OFFICER_MODAL_ID)}
        onSubmit={() => handleSubmit(OFFICER_MODAL_ID)}
      />

      <OfficerDeleteModal
        modalId={OFFICER_DELETE_MODAL_ID}
        onClose={() => handleCloseDeleteModal(OFFICER_DELETE_MODAL_ID)}
        onConfirm={() => handleDelete(OFFICER_DELETE_MODAL_ID)}
      />
    </div>
  );
}

export default OfficersPage;