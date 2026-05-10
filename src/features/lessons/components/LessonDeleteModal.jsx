import ConfirmModal from "../../../components/ui/ConfirmModal";

function LessonDeleteModal({ modalId, onConfirm }) {
    return (
        <ConfirmModal
            id={modalId}
            title="Dersi Sil"
            description="Bu ders kaydını silmek istediğinize emin misiniz?"
            confirmText="Sil"
            cancelText="Vazgeç"
            onConfirm={onConfirm}
        />
    );
}

export default LessonDeleteModal;