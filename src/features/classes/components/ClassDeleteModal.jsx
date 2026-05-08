import ConfirmModal from "../../../components/ui/ConfirmModal";

function ClassDeleteModal({ modalId, onConfirm }) {
  return (
    <ConfirmModal
      id={modalId}
      title="Sınıfı Sil"
      description="Bu sınıfı silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
      confirmText="Sil"
      cancelText="Vazgeç"
      onConfirm={onConfirm}
    />
  );
}

export default ClassDeleteModal;