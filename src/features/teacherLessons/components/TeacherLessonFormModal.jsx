import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";

import TeacherLessonForm from "./TeacherLessonForm";

function TeacherLessonFormModal({
    modalId,
    isEditing,
    formData,
    setFormData,
    teachers,
    lessons,
    classrooms,
    errors,
    onClose,
    onSubmit,
}) {
    return (
        <Modal
            id={modalId}
            title={
                isEditing
                    ? "Öğretmen Ders Atamasını Düzenle"
                    : "Yeni Öğretmen Ders Ataması"
            }
            description="Öğretmen, ders ve sınıf bilgilerini seçerek atamayı yönetin."
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
            <TeacherLessonForm
                formData={formData}
                setFormData={setFormData}
                teachers={teachers}
                lessons={lessons}
                classrooms={classrooms}
                errors={errors}
                isEdit={isEditing}
                onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit();
                }}
            />
        </Modal>
    );
}

export default TeacherLessonFormModal;