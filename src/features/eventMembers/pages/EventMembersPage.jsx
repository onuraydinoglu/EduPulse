import Toast from "../../../components/ui/Toast";
import EventMemberDeleteModal from "../components/EventMemberDeleteModal";
import EventMemberFormModal from "../components/EventMemberFormModal";
import EventMemberStatsCards from "../components/EventMemberStatsCards";
import EventMemberTable from "../components/EventMemberTable";
import EventMembersPageHeader from "../components/EventMembersPageHeader";
import {
  EVENT_MEMBER_DELETE_MODAL_ID,
  EVENT_MEMBER_MODAL_ID,
} from "../constants/eventMemberConstants";
import { useEventMembersPage } from "../hooks/useEventMembersPage";

function EventMembersPage() {
  const {
    event,
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
    isStudentRole,
    canManageMembers,
    handleBackToEvents,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleCreateMember,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteMember,
    handleExportMembersPdf,
  } = useEventMembersPage();

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
        <span className="ml-3 text-sm text-base-content/60">
          Etkinlik bilgileri yükleniyor...
        </span>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="rounded-3xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
        <h2 className="text-xl font-bold text-base-content">
          Etkinlik bulunamadı.
        </h2>

        <button
          type="button"
          onClick={handleBackToEvents}
          className="btn btn-primary mt-5 rounded-2xl"
        >
          Etkinliklere Dön
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {toast.message && <Toast message={toast.message} type={toast.type} />}

      <EventMembersPageHeader
        event={event}
        onBack={handleBackToEvents}
        onCreate={() => handleOpenCreateModal(EVENT_MEMBER_MODAL_ID)}
        onExport={handleExportMembersPdf}
        canManage={canManageMembers}
      />

      <EventMemberStatsCards event={event} members={members} />

      {!isStudentRole && (
        <>
          <EventMemberTable
            members={filteredMembers}
            search={search}
            setSearch={setSearch}
            canManage={canManageMembers}
            onDelete={(memberId) =>
              handleOpenDeleteModal(memberId, EVENT_MEMBER_DELETE_MODAL_ID)
            }
          />

          <EventMemberFormModal
            id={EVENT_MEMBER_MODAL_ID}
            students={selectableStudents}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            loading={savingMember}
            onClose={() => handleCloseCreateModal(EVENT_MEMBER_MODAL_ID)}
            onSubmit={() => handleCreateMember(EVENT_MEMBER_MODAL_ID)}
          />

          <EventMemberDeleteModal
            id={EVENT_MEMBER_DELETE_MODAL_ID}
            onClose={() => handleCloseDeleteModal(EVENT_MEMBER_DELETE_MODAL_ID)}
            onConfirm={() => handleDeleteMember(EVENT_MEMBER_DELETE_MODAL_ID)}
          />
        </>
      )}
    </div>
  );
}

export default EventMembersPage;