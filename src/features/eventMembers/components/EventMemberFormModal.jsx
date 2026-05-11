import Modal from "../../../components/ui/Modal";
import EventMemberForm from "./EventMemberForm";

function EventMemberFormModal({
    modalId,
    formData,
    setFormData,
    students,
    errors,
    saving,
    onClose,
    onSubmit,
}) {
    return (
        <Modal
            id={modalId}
            title="Etkinliğe Öğrenci Ekle"
            description="Seçili etkinliğe katılacak öğrenciyi belirleyin."
        >
            <EventMemberForm
                formData={formData}
                setFormData={setFormData}
                students={students}
                errors={errors}
            />

            <div className="modal-action">
                <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-ghost rounded-xl"
                    disabled={saving}
                >
                    Vazgeç
                </button>

                <button
                    type="button"
                    onClick={onSubmit}
                    className="btn btn-primary rounded-xl"
                    disabled={saving}
                >
                    {saving ? "Kaydediliyor..." : "Kaydet"}
                </button>
            </div>
        </Modal>
    );
}

export default EventMemberFormModal;