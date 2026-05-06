import ConfirmModal from "../../../components/ui/ConfirmModal";

function TeacherDeleteModal({ modalId, onClose, onConfirm }) {
  return (
    <ConfirmModal
      id={modalId}
      title="Öğretmen Sil"
      description="Bu öğretmeni silmek istediğinize emin misiniz?"
      confirmText="Sil"
      cancelText="Vazgeç"
      onCancel={onClose}
      onConfirm={onConfirm}
    />
  );
}

export default TeacherDeleteModal;