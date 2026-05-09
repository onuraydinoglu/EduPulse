import ConfirmModal from "../../../components/ui/ConfirmModal";

function ExamDeleteModal({ modalId, onConfirm }) {
    return (
        <ConfirmModal
            id={modalId}
            title="Sınav Notunu Sil"
            description="Bu sınav notu kaydını silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
            confirmText="Sil"
            cancelText="Vazgeç"
            onConfirm={onConfirm}
        />
    );
}

export default ExamDeleteModal;