import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import ExamForm from "./ExamForm";

function ExamFormModal({
    modalId,
    isEditing,
    formData,
    setFormData,
    students,
    lessons,
    errors,
    onClose,
    onSubmit,
}) {
    return (
        <Modal
            id={modalId}
            title={isEditing ? "Sınav Notunu Güncelle" : "Yeni Sınav Notu"}
            description="Öğrenci, ders ve not bilgilerini girerek sınav kaydını yönetin."
            footer={
                <>
                    <Button variant="ghost" onClick={onClose}>
                        Vazgeç
                    </Button>

                    <Button onClick={onSubmit}>
                        {isEditing ? "Güncelle" : "Kaydet"}
                    </Button>
                </>
            }
        >
            <ExamForm
                formData={formData}
                setFormData={setFormData}
                students={students}
                lessons={lessons}
                errors={errors}
                isEditing={isEditing}
            />
        </Modal>
    );
}

export default ExamFormModal;