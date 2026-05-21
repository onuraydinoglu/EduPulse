import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import {
  formatMessageDateTime,
  getMessageContent,
  getMessageCreatedDate,
  getMessageDisplayReceiverName,
  getMessageSenderFullName,
  getMessageTitle,
} from "../utils/messageFormatters";

function MessageDetailModal({ id, selectedMessage, onClose }) {
  return (
    <Modal
      id={id}
      title="Mesaj Detayı"
      footer={
        <Button type="button" variant="ghost" onClick={onClose}>
          Kapat
        </Button>
      }
    >
      {selectedMessage && (
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Başlık
            </p>

            <h3 className="mt-1 text-lg font-semibold text-gray-900">
              {getMessageTitle(selectedMessage)}
            </h3>
          </div>

          <div className="rounded-xl bg-base-200 p-3 text-sm text-gray-600">
            {getMessageSenderFullName(selectedMessage)} →{" "}
            {getMessageDisplayReceiverName(selectedMessage)}
            <span className="mx-2">•</span>
            {formatMessageDateTime(getMessageCreatedDate(selectedMessage))}
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Mesaj
            </p>

            <p className="whitespace-pre-line rounded-xl border border-base-300 bg-base-100 p-4 text-sm leading-6 text-gray-700">
              {getMessageContent(selectedMessage)}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default MessageDetailModal;
