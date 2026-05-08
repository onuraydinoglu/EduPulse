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
      title={isEditing ? "Sınıf Güncelle" : "Yeni Sınıf"}
      description={
        isEditing
          ? "Sınıf seviyesini, şubesini ve sınıf öğretmeni atamasını güncelleyin."
          : "Yeni sınıf oluşturun ve isteğe bağlı sınıf öğretmeni atayın."
      }
    >
      <ClassForm
        formData={formData}
        setFormData={setFormData}
        teachers={teachers}
        errors={errors}
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

export default ClassFormModal;