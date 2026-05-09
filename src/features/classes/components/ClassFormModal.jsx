import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";

import ClassForm from "./ClassForm";

function ClassFormModal({
  modalId,
  isEditing,
  formData,
  setFormData,
  teachers,
  errors,
  onClose,
  onSubmit,
}) {
  return (
    <Modal
      id={modalId}
      title={isEditing ? "Sınıf Güncelle" : "Yeni Sınıf Ekle"}
      onClose={onClose}
    >
      <ClassForm
        formData={formData}
        setFormData={setFormData}
        teachers={teachers}
        errors={errors}
        isEditing={isEditing}
      />

      <div className="modal-action">
        <Button type="button" variant="ghost" onClick={onClose}>
          Vazgeç
        </Button>

        <Button type="button" variant="primary" onClick={onSubmit}>
          {isEditing ? "Güncelle" : "Kaydet"}
        </Button>
      </div>
    </Modal>
  );
}

export default ClassFormModal;