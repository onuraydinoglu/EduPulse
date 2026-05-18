import Toast from "../../../components/ui/Toast";
import EventDeleteModal from "../components/EventDeleteModal";
import EventFormModal from "../components/EventFormModal";
import EventsPageHeader from "../components/EventsPageHeader";
import EventStatsCards from "../components/EventStatsCards";
import EventTable from "../components/EventTable";
import {
  EVENT_DELETE_MODAL_ID,
  EVENT_MODAL_ID,
} from "../constants/eventConstants";
import { getEventStats } from "../constants/eventTableColumns";
import { useEventsPage } from "../hooks/useEventsPage";
import { getCurrentRole } from "../../../utils/authUser";

function EventsPage() {
  const {
    events,
    filteredEvents,
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
    paymentFilter,
    setPaymentFilter,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseEventModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    handleSubmit,
    handleExportEventsPdf,
  } = useEventsPage();

  const currentRole = getCurrentRole();

  const canManageEvents =
    currentRole === "schooladmin" || currentRole === "officer";

  return (
    <div className="space-y-6">
      {toast.message && <Toast message={toast.message} type={toast.type} />}

      <EventsPageHeader
        canManage={canManageEvents}
        onCreate={() => handleOpenCreateModal(EVENT_MODAL_ID)}
        onExport={handleExportEventsPdf}
      />

      <EventStatsCards items={getEventStats(events)} />

      <EventTable
        events={filteredEvents}
        teachers={teachers}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        canManage={canManageEvents}
        onEdit={(event) => handleOpenEditModal(event, EVENT_MODAL_ID)}
        onDelete={(id) => handleOpenDeleteModal(id, EVENT_DELETE_MODAL_ID)}
      />

      <EventFormModal
        modalId={EVENT_MODAL_ID}
        formData={formData}
        setFormData={setFormData}
        teachers={teachers}
        errors={errors}
        isEditing={isEditing}
        onClose={() => handleCloseEventModal(EVENT_MODAL_ID)}
        onSubmit={() => handleSubmit(EVENT_MODAL_ID)}
      />

      <EventDeleteModal
        modalId={EVENT_DELETE_MODAL_ID}
        onClose={() => handleCloseDeleteModal(EVENT_DELETE_MODAL_ID)}
        onConfirm={() => handleDelete(EVENT_DELETE_MODAL_ID)}
      />
    </div>
  );
}

export default EventsPage;