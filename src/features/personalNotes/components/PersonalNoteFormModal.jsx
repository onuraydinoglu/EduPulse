import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";

function PersonalNoteFormModal({
    id,
    noteForm,
    errors,
    isEditingNote,
    onChange,
    onSave,
}) {
    return (
        <Modal
            id={id}
            title={isEditingNote ? "Notu Güncelle" : "Not Ekle"}
            footer={
                <>
                    <form method="dialog">
                        <Button variant="ghost">Vazgeç</Button>
                    </form>

                    <Button onClick={onSave}>
                        {isEditingNote ? "Güncelle" : "Kaydet"}
                    </Button>
                </>
            }
        >
            <div className="space-y-4">
                <div>
                    <input
                        value={noteForm.title}
                        onChange={(event) => onChange("title", event.target.value)}
                        placeholder="Not başlığı"
                        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                    />

                    {errors.title && (
                        <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                    )}
                </div>

                <div>
                    <textarea
                        value={noteForm.content}
                        onChange={(event) => onChange("content", event.target.value)}
                        rows="5"
                        placeholder="Kendiniz için kısa bir not yazın..."
                        className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                    />

                    {errors.content && (
                        <p className="mt-1 text-sm text-red-500">{errors.content}</p>
                    )}
                </div>

                {isEditingNote && (
                    <label className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                        <span className="text-sm font-medium text-gray-700">
                            Aktif mi?
                        </span>

                        <input
                            type="checkbox"
                            checked={noteForm.isActive}
                            onChange={(event) => onChange("isActive", event.target.checked)}
                        />
                    </label>
                )}
            </div>
        </Modal>
    );
}

export default PersonalNoteFormModal;