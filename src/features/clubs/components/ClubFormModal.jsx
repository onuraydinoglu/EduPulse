import Button from "../../../components/ui/Button";
import ClubForm from "./ClubForm";

function ClubFormModal({
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
                <div className="border-b border-base-300 px-6 py-5">
                    <h3 className="text-xl font-bold text-base-content">
                        {isEditing ? "Kulüp Güncelle" : "Yeni Kulüp Ekle"}
                    </h3>

                    <p className="mt-1 text-sm text-base-content/60">
                        Kulüp bilgilerini ve sorumlu öğretmen atamasını düzenleyin.
                    </p>
                </div>

                <div className="px-6 py-5">
                    <ClubForm
                        formData={formData}
                        setFormData={setFormData}
                        teachers={teachers}
                        errors={errors}
                        isEditing={isEditing}
                    />
                </div>

                <div className="flex justify-end gap-3 border-t border-base-300 px-6 py-4">
                    <Button variant="ghost" onClick={onClose}>
                        Vazgeç
                    </Button>

                    <Button onClick={onSubmit}>
                        {isEditing ? "Güncelle" : "Kaydet"}
                    </Button>
                </div>
            </div>
        </dialog>
    );
}

export default ClubFormModal;