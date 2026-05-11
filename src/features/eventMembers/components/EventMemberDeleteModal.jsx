import ConfirmModal from "../../../components/ui/ConfirmModal";

function EventMemberDeleteModal({ modalId, onClose, onConfirm }) {
    return (
        <ConfirmModal
            id={modalId}
            title="Öğrenciyi etkinlikten çıkar"
            description="Bu öğrenciyi etkinlik katılımcı listesinden çıkarmak istediğinize emin misiniz?"
            confirmText="Evet, çıkar"
            cancelText="Vazgeç"
            confirmButtonClassName="btn-error"
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}

export default EventMemberDeleteModal;