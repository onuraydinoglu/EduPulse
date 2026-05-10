import ConfirmModal from "../../../components/ui/ConfirmModal";

function TeacherLessonDeleteModal({ modalId, onClose, onConfirm }) {
    return (
        <ConfirmModal
            id={modalId}
            title="Öğretmen Ders Atamasını Sil"
            description="Bu öğretmen ders ataması silinecek. Emin misiniz?"
            confirmText="Evet, Sil"
            cancelText="Vazgeç"
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}

export default TeacherLessonDeleteModal;