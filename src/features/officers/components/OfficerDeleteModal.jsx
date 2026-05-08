import ConfirmModal from "../../../components/ui/ConfirmModal";

function OfficerDeleteModal({ modalId, onConfirm }) {
  return (
    <ConfirmModal
      id={modalId}
      title="Memuru Sil"
      description="Bu memuru silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
      confirmText="Sil"
      cancelText="Vazgeç"
      onConfirm={onConfirm}
    />
  );
}

export default OfficerDeleteModal;