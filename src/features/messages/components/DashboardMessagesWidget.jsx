import {
  EnvelopeIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import CreateButton from "../../../components/ui/CreateButton";
import Toast from "../../../components/ui/Toast";
import {
  MESSAGE_DELETE_MODAL_ID,
  MESSAGE_DETAIL_MODAL_ID,
  MESSAGE_MODAL_ID,
} from "../constants/messageConstants";
import { useDashboardMessages } from "../hooks/useDashboardMessages";
import MessageCreateModal from "./MessageCreateModal";
import MessageDeleteModal from "./MessageDeleteModal";
import MessageDetailModal from "./MessageDetailModal";
import MessageList from "./MessageList";
import MessageTabs from "./MessageTabs";

function DashboardMessagesWidget() {
  const {
    users,
    formData,
    selectedMessage,
    activeTab,
    setActiveTab,
    loading,
    submitLoading,
    toast,
    unreadCount,
    activeMessages,
    handleChange,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenDetailModal,
    handleCloseDetailModal,
    handleOpenDeleteModal,
    handleSendMessage,
    handleDeleteMessage,
  } = useDashboardMessages();

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}

      <section className="rounded-3xl border border-base-300 bg-base-100/80 p-5 shadow-sm backdrop-blur">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div>
              <h2 className="text-xl font-bold text-base-content">
                Mesajlar
              </h2>

              <p className="mt-1 text-sm text-base-content/60">
                Okul içi öğretmen, memur ve müdür mesajlaşmaları
              </p>
            </div>
          </div>

          <CreateButton
            icon={PaperAirplaneIcon}
            onClick={() => handleOpenCreateModal(MESSAGE_MODAL_ID)} >
            Mesaj Gönder
          </ CreateButton>
        </div>

        <MessageTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unreadCount={unreadCount}
        />

        <MessageList
          loading={loading}
          activeTab={activeTab}
          activeMessages={activeMessages}
          onOpenDetail={(message) =>
            handleOpenDetailModal(message, MESSAGE_DETAIL_MODAL_ID)
          }
          onOpenDelete={(id) =>
            handleOpenDeleteModal(id, MESSAGE_DELETE_MODAL_ID)
          }
        />
      </section>

      <MessageCreateModal
        id={MESSAGE_MODAL_ID}
        users={users}
        formData={formData}
        submitLoading={submitLoading}
        onChange={handleChange}
        onClose={() => handleCloseCreateModal(MESSAGE_MODAL_ID)}
        onSubmit={() => handleSendMessage(MESSAGE_MODAL_ID)}
      />

      <MessageDetailModal
        id={MESSAGE_DETAIL_MODAL_ID}
        selectedMessage={selectedMessage}
        onClose={() => handleCloseDetailModal(MESSAGE_DETAIL_MODAL_ID)}
      />

      <MessageDeleteModal
        id={MESSAGE_DELETE_MODAL_ID}
        onConfirm={() => handleDeleteMessage(MESSAGE_DELETE_MODAL_ID)}
      />
    </>
  );
}

export default DashboardMessagesWidget;