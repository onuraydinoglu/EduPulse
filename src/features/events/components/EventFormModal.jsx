import Button from "../../../components/ui/Button";
import EventForm from "./EventForm";

function EventFormModal({
    modalId,
    formData,
    setFormData,
    teachers,
    errors,
    isEditing,
    onClose,
    onSubmit,
}) {
    return (
        <dialog id={modalId} className="modal">
            <div className="modal-box max-w-2xl rounded-3xl border border-base-300 bg-base-100 p-0 shadow-2xl">
                <div className="border-b border-base-200 px-6 py-5">
                    <h3 className="text-xl font-bold text-base-content">
                        {isEditing ? "Etkinlik Güncelle" : "Yeni Etkinlik Ekle"}
                    </h3>
                    <p className="mt-1 text-sm text-base-content/50">
                        Etkinlik bilgilerini, ücret durumunu ve sorumlu öğretmenleri düzenleyin.
                    </p>
                </div>

                <div className="px-6 py-5">
                    <EventForm
                        formData={formData}
                        setFormData={setFormData}
                        teachers={teachers}
                        errors={errors}
                        isEditing={isEditing}
                    />

                    <div className="mt-6 flex justify-end gap-3">
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Vazgeç
                        </Button>

                        <Button type="button" onClick={onSubmit}>
                            {isEditing ? "Güncelle" : "Kaydet"}
                        </Button>
                    </div>
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
}

export default EventFormModal;