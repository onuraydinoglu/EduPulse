import ConfirmModal from "../../../components/ui/ConfirmModal";

function PersonalNoteDeleteModal({ id, onConfirm }) {
    return (
        <ConfirmModal
            id={id}
            title="Notu Sil"
            description="Bu not kalıcı olarak silinecek. Devam etmek istediğinize emin misiniz?"
            confirmText="Evet, Sil"
            cancelText="Vazgeç"
            onConfirm={onConfirm}
        />
    );
}

export default PersonalNoteDeleteModal;