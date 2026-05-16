import TableActions from "../../../components/ui/TableActions";
import { MESSAGE_TABS } from "../constants/messageConstants";
import {
    formatMessageDate,
    getMessageContent,
    getMessageCreatedDate,
    getMessageId,
    getMessageIsRead,
    getMessageReceiverFullName,
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
    if (loading) {
        return (
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-sm text-base-content/60">
                Mesajlar yükleniyor...
            </div>
        );
    }

    if (activeMessages.length === 0) {
        return (
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-sm text-base-content/60">
                {activeTab === MESSAGE_TABS.INBOX
                    ? "Henüz gelen mesaj bulunmuyor."
                    : "Henüz gönderilmiş mesaj bulunmuyor."}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {activeMessages.map((message) => {
                const id = getMessageId(message);
                const title = getMessageTitle(message);
                const content = getMessageContent(message);
                const senderFullName = getMessageSenderFullName(message);
                const receiverFullName = getMessageReceiverFullName(message);
                const createdDate = getMessageCreatedDate(message);
                const isRead = getMessageIsRead(message);

                return (
                    <div
                        key={id}
                        className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="min-w-0 flex-1">
                                <div className="mb-1 flex flex-wrap items-center gap-2">
                                    <h3 className="truncate text-base font-bold text-base-content">
                                        {title}
                                    </h3>

                                    {activeTab === MESSAGE_TABS.INBOX && !isRead && (
                                        <span className="rounded-full bg-info/10 px-2 py-0.5 text-xs font-semibold text-info">
                                            Yeni
                                        </span>
                                    )}
                                </div>

                                <p className="text-xs font-medium text-base-content/50">
                                    {activeTab === MESSAGE_TABS.INBOX
                                        ? `Gönderen: ${senderFullName}`
                                        : `Alıcı: ${receiverFullName}`}
                                </p>

                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-base-content/70">
                                    {content}
                                </p>

                                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-base-content/40">
                                    <span>{formatMessageDate(createdDate)}</span>
                                    <span className="h-1 w-1 rounded-full bg-base-content/30" />
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
        </div>
    );
}

export default MessageList;