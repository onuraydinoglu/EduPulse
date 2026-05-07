import ConfirmModal from "../../../components/ui/ConfirmModal";

function StudentDeleteModal({ modalId, onClose, onConfirm }) {
  return (
    <ConfirmModal
      id={modalId}
      title="Öğrenciyi Sil"
      description="Bu öğrenciyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
      confirmText="Sil"
      cancelText="Vazgeç"
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}

export default StudentDeleteModal;