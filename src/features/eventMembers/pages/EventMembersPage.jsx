import Toast from "../../../components/ui/Toast";
import EventMemberDeleteModal from "../components/EventMemberDeleteModal";
import EventMemberFormModal from "../components/EventMemberFormModal";
import EventMemberStatsCards from "../components/EventMemberStatsCards";
import EventMemberTable from "../components/EventMemberTable";
import EventMembersPageHeader from "../components/EventMembersPageHeader";
import StudentEventDetailCard from "../components/StudentEventDetailCard";
import {
  EVENT_MEMBER_DELETE_MODAL_ID,
  EVENT_MEMBER_MODAL_ID,
} from "../constants/eventMemberConstants";
import { useEventMembersPage } from "../hooks/useEventMembersPage";
import { getEventIsPaid } from "../utils/eventMemberFormatters";
import { getCurrentRole } from "../../../utils/authUser";

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
    editingPaymentMember,
    handleBackToEvents,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenPaymentEditModal,
    handleCreateMember,
    handleUpdatePayment,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteMember,
    handleExportMembersPdf,
  } = useEventMembersPage();

  const currentRole = getCurrentRole();

  const isStudent = currentRole === "student";

  const canManage =
    currentRole === "schooladmin" || currentRole === "officer";

  const canViewMembers =
    canManage || currentRole === "teacher";

  const isPaidEvent = getEventIsPaid(event);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
        <span className="ml-3 text-sm text-base-content/60">
          Etkinlik bilgileri yükleniyor...
        </span>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-base-content">
          Etkinlik bulunamadı.
        </h2>

        <button className="btn btn-outline" onClick={handleBackToEvents}>
          Etkinliklere Dön
        </button>
      </div>
    );
  }

  if (isStudent) {
    return (
      <>
        {toast.message && <Toast message={toast.message} type={toast.type} />}

        <EventMembersPageHeader
          event={event}
          onBack={handleBackToEvents}
          canManage={false}
          isStudentView
        />

        <StudentEventDetailCard event={event} />
      </>
    );
  }

  return (
    <>
      {toast.message && <Toast message={toast.message} type={toast.type} />}

      <EventMembersPageHeader
        event={event}
        onBack={handleBackToEvents}
        onCreate={() => handleOpenCreateModal(EVENT_MEMBER_MODAL_ID)}
        onExport={canViewMembers ? handleExportMembersPdf : undefined}
        canManage={canManage}
      />

      <EventMemberStatsCards event={event} members={members} />

      {canViewMembers && (
        <EventMemberTable
          members={filteredMembers}
          search={search}
          setSearch={setSearch}
          canManage={canManage}
          canEditPayment={canManage && isPaidEvent}
          onEditPayment={(member) =>
            handleOpenPaymentEditModal(member, EVENT_MEMBER_MODAL_ID)
          }
          onDelete={(memberId) =>
            handleOpenDeleteModal(memberId, EVENT_MEMBER_DELETE_MODAL_ID)
          }
        />
      )}

      {canManage && (
        <>
          <EventMemberFormModal
            modalId={EVENT_MEMBER_MODAL_ID}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            students={selectableStudents}
            saving={savingMember}
            isPaidEvent={isPaidEvent}
            editingPaymentMember={editingPaymentMember}
            onClose={() => handleCloseCreateModal(EVENT_MEMBER_MODAL_ID)}
            onSubmit={() =>
              editingPaymentMember
                ? handleUpdatePayment(EVENT_MEMBER_MODAL_ID)
                : handleCreateMember(EVENT_MEMBER_MODAL_ID)
            }
          />

          <EventMemberDeleteModal
            modalId={EVENT_MEMBER_DELETE_MODAL_ID}
            onClose={() => handleCloseDeleteModal(EVENT_MEMBER_DELETE_MODAL_ID)}
            onConfirm={() => handleDeleteMember(EVENT_MEMBER_DELETE_MODAL_ID)}
          />
        </>
      )}
    </>
  );
}

export default EventMembersPage;