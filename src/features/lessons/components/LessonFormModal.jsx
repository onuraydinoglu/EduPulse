import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import LessonForm from "./LessonForm";

function LessonFormModal({
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
            title={isEditing ? "Ders Güncelle" : "Yeni Ders Ekle"}
            description="Ders bilgilerini doldurup kaydı tamamlayabilirsiniz."
            footer={
                <>
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Vazgeç
                    </Button>

                    <Button type="button" onClick={onSubmit}>
                        {isEditing ? "Güncelle" : "Kaydet"}
                    </Button>
                </>
            }
        >
            <LessonForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                isEditing={isEditing}
            />
        </Modal>
    );
}

export default LessonFormModal;