import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import StudentForm from "./StudentForm";

function StudentFormModal({
  modalId,
  isEditing,
  formData,
  setFormData,
  classrooms,
  errors,
  onClose,
  onSubmit,
}) {
  return (
    <Modal
      id={modalId}
      title={isEditing ? "Öğrenci Güncelle" : "Yeni Öğrenci"}
      description={
        isEditing
          ? "Öğrenci bilgilerini ve sınıf atamasını güncelleyin."
          : "Yeni öğrenci hesabı oluşturun ve sınıf atamasını yapın."
      }
    >
      <StudentForm
        formData={formData}
        setFormData={setFormData}
        classrooms={classrooms}
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

export default StudentFormModal;