import TableActions from "../../../components/ui/TableActions";
import Pagination from "../../../components/ui/Pagination";
import usePagination from "../../../hooks/usePagination";

import { MESSAGE_TABS } from "../constants/messageConstants";

import {
  formatMessageDate,
  getMessageContent,
  getMessageCreatedDate,
  getMessageDisplayReceiverName,
  getMessageId,
  getMessageIsRead,
  getMessageSenderFullName,
  getMessageTitle,
} from "../utils/messageFormatters";

function MessageList({
  loading,
  activeTab,
  activeMessages,
  onOpenDetail,
  onOpenDelete,
}) {
  const {
    currentPage,
    totalPages,
    pageSize,
    paginatedItems,
    totalItems,
    startItem,
    endItem,
    setCurrentPage,
    setPageSize,
  } = usePagination(activeMessages, 5);

  if (loading) {
    return (
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-sm text-gray-500">
        Mesajlar yükleniyor...
      </div>
    );
  }

  if (activeMessages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 p-6 text-sm text-gray-500">
        {activeTab === MESSAGE_TABS.INBOX
          ? "Henüz gelen mesaj bulunmuyor."
          : "Henüz gönderilmiş mesaj bulunmuyor."}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {paginatedItems.map((message) => {
        const id = getMessageId(message);
        const title = getMessageTitle(message);
        const content = getMessageContent(message);
        const senderFullName = getMessageSenderFullName(message);
        const receiverFullName = getMessageDisplayReceiverName(message);
        const createdDate = getMessageCreatedDate(message);
        const isRead = getMessageIsRead(message);

        return (
          <div
            key={id}
            className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-base font-semibold text-gray-900">
                    {title}
                  </h3>

                  {activeTab === MESSAGE_TABS.INBOX && !isRead && (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-600">
                      Yeni
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm font-medium text-gray-600">
                  {activeTab === MESSAGE_TABS.INBOX
                    ? `Gönderen: ${senderFullName}`
                    : `Alıcı: ${receiverFullName}`}
                </p>

                <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                  {content}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                  <span>{formatMessageDate(createdDate)}</span>
                  <span>•</span>
                  <span>
                    {activeTab === MESSAGE_TABS.INBOX ? "Gelen" : "Gönderilen"}
                  </span>
                </div>
              </div>

              <TableActions
                onDetail={() => onOpenDetail(message)}
                onDelete={() => onOpenDelete(id)}
              />
            </div>
          </div>
        );
      })}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        startItem={startItem}
        endItem={endItem}
        pageSize={pageSize}
        setPageSize={setPageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default MessageList;
