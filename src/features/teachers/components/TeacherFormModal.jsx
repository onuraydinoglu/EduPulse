import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import TeacherForm from "./TeacherForm";

function TeacherFormModal({
  modalId,
  isEditing,
  formData,
  setFormData,
  lessons,
  errors,
  onClose,
  onSubmit,
}) {
  return (
    <Modal
      id={modalId}
      title={isEditing ? "Öğretmen Güncelle" : "Yeni Öğretmen"}
      description={
        isEditing
          ? "Öğretmen bilgilerini düzenleyin."
          : "Yeni öğretmen kaydı oluşturun."
      }
    >
      <TeacherForm
        formData={formData}
        setFormData={setFormData}
        lessons={lessons}
        errors={errors}
        isEditing={isEditing}
      />

      <div className="mt-6 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Vazgeç
        </Button>

        <Button type="button" onClick={onSubmit}>
          {isEditing ? "Güncelle" : "Kaydet"}
        </Button>
      </div>
    </Modal>
  );
}

export default TeacherFormModal;