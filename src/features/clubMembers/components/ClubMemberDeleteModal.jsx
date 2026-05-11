import Button from "../../../components/ui/Button";

function ClubMemberDeleteModal({ modalId, onClose, onConfirm }) {
    return (
        <dialog id={modalId} className="modal">
            <div className="modal-box max-w-md rounded-3xl border border-base-300 bg-base-100 p-0 shadow-2xl">
                <div className="border-b border-base-300 px-6 py-5">
                    <h3 className="text-xl font-bold text-base-content">
                        Öğrenci Kulüpten Çıkarılsın mı?
                    </h3>

                    <p className="mt-1 text-sm text-base-content/60">
                        Bu işlem seçili öğrenciyi kulüp üyeleri listesinden kaldırır.
                    </p>
                </div>

                <div className="flex justify-end gap-3 px-6 py-4">
                    <Button variant="ghost" onClick={onClose}>
                        Vazgeç
                    </Button>

                    <Button variant="danger" onClick={onConfirm}>
                        Çıkar
                    </Button>
                </div>
            </div>
        </dialog>
    );
}

export default ClubMemberDeleteModal;