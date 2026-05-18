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

  const canManage =
    currentRole === "schooladmin" || currentRole === "officer";

  const isPaidEvent = getEventIsPaid(event);

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
      <div className="modern-card rounded-3xl border border-base-300/70 bg-base-100/90 p-8 text-center shadow-sm">
        <h2 className="text-xl font-bold text-base-content">
          Etkinlik bulunamadı.
        </h2>

        <button
          type="button"
          onClick={handleBackToEvents}
          className="btn btn-primary mt-5 rounded-xl"
        >
          Etkinliklere Dön
        </button>
      </div>
    );
  }

  return (
    <>
      {toast.message && <Toast message={toast.message} type={toast.type} />}

      <div className="space-y-6">
        <EventMembersPageHeader
          event={event}
          onBack={handleBackToEvents}
          canManage={canManage}
          onCreate={() => handleOpenCreateModal(EVENT_MEMBER_MODAL_ID)}
          onExport={handleExportMembersPdf}
        />

        <EventMemberStatsCards event={event} members={members} />

        <EventMemberTable
          members={filteredMembers}
          search={search}
          setSearch={setSearch}
          canManage={canManage}
          canEditPayment={isPaidEvent}
          onEditPayment={(member) =>
            handleOpenPaymentEditModal(member, EVENT_MEMBER_MODAL_ID)
          }
          onDelete={(memberId) =>
            handleOpenDeleteModal(memberId, EVENT_MEMBER_DELETE_MODAL_ID)
          }
        />
      </div>

      <EventMemberFormModal
        modalId={EVENT_MEMBER_MODAL_ID}
        formData={formData}
        setFormData={setFormData}
        students={selectableStudents}
        errors={errors}
        saving={savingMember}
        isPaymentEdit={Boolean(editingPaymentMember)}
        isPaidEvent={isPaidEvent}
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
  );
}

export default EventMembersPage;