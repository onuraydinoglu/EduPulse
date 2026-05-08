import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";

import OfficerForm from "./OfficerForm";

function OfficerFormModal({
  modalId,
  isEditing,
  formData,
  setFormData,
  errors,
  onClose,
  onSubmit,
}) {
  return (
    <Modal
      id={modalId}
      title={isEditing ? "Memur Güncelle" : "Yeni Memur"}
      description={
        isEditing
          ? "Memur bilgilerini ve hesap durumunu güncelleyin."
          : "Yeni memur hesabı oluşturun."
      }
    >
      <OfficerForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        isEditing={isEditing}
      />

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose}>
          Vazgeç
        </Button>

        <Button onClick={onSubmit}>{isEditing ? "Güncelle" : "Kaydet"}</Button>
      </div>
    </Modal>
  );
}

export default OfficerFormModal;