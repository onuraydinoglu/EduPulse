import Modal from "../../../components/ui/Modal";
import EventMemberForm from "./EventMemberForm";

function EventMemberFormModal({
    modalId,
    formData,
    setFormData,
    students,
    errors,
    saving,
    isPaymentEdit = false,
    isPaidEvent = false,
    onClose,
    onSubmit,
}) {
    return (
        <Modal
            id={modalId}
            title={
                isPaymentEdit
                    ? "Ödeme Bilgisini Düzenle"
                    : "Etkinliğe Öğrenci Ekle"
            }
            description={
                isPaymentEdit
                    ? "Etkinlik üyesinin ödeme durumunu güncelleyin."
                    : "Seçili etkinliğe katılacak öğrenciyi belirleyin."
            }
        >
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit();
                }}
                className="space-y-5"
            >
                <EventMemberForm
                    formData={formData}
                    setFormData={setFormData}
                    students={students}
                    errors={errors}
                    isPaymentEdit={isPaymentEdit}
                    isPaidEvent={isPaidEvent}
                />

                <div className="flex justify-end gap-2 border-t border-base-300/70 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-ghost rounded-xl"
                    >
                        Vazgeç
                    </button>

                    <button
                        type="submit"
                        disabled={saving}
                        className="btn btn-primary rounded-xl"
                    >
                        {saving
                            ? "Kaydediliyor..."
                            : isPaymentEdit
                                ? "Güncelle"
                                : "Kaydet"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default EventMemberFormModal;