import ConfirmModal from "../../../components/ui/ConfirmModal";

function EventDeleteModal({ modalId, onClose, onConfirm }) {
    return (
        <ConfirmModal
            id={modalId}
            title="Etkinlik Sil"
            description="Bu etkinliği silmek istediğinize emin misiniz?"
            confirmText="Sil"
            cancelText="Vazgeç"
            onCancel={onClose}
            onConfirm={onConfirm}
        />
    );
}

export default EventDeleteModal;