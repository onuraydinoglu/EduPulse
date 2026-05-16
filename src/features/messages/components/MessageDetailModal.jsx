import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import {
    formatMessageDateTime,
    getMessageContent,
    getMessageCreatedDate,
    getMessageReceiverFullName,
    getMessageSenderFullName,
    getMessageTitle,
} from "../utils/messageFormatters";

function MessageDetailModal({ id, selectedMessage, onClose }) {
    return (
        <Modal
            id={id}
            title="Mesaj Detayı"
            description="Seçili mesajın detayları"
            footer={
                <Button variant="outline" onClick={onClose}>
                    Kapat
                </Button>
            }
        >
            {selectedMessage && (
                <div className="space-y-5">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-base-content/40">
                            Başlık
                        </p>

                        <h3 className="mt-1 text-xl font-bold leading-snug text-base-content">
                            {getMessageTitle(selectedMessage)}
                        </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/60">
                        <span>{getMessageSenderFullName(selectedMessage)}</span>
                        <span className="text-base-content/30">→</span>
                        <span>{getMessageReceiverFullName(selectedMessage)}</span>
                        <span className="h-1 w-1 rounded-full bg-base-content/30" />
                        <span>
                            {formatMessageDateTime(getMessageCreatedDate(selectedMessage))}
                        </span>
                    </div>

                    <div className="h-px bg-base-300" />

                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-base-content/40">
                            Mesaj
                        </p>

                        <p className="whitespace-pre-wrap rounded-2xl bg-base-200/50 px-4 py-4 text-sm leading-7 text-base-content/80">
                            {getMessageContent(selectedMessage)}
                        </p>
                    </div>
                </div>
            )}
        </Modal>
    );
}

export default MessageDetailModal;