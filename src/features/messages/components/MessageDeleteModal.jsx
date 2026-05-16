import ConfirmModal from "../../../components/ui/ConfirmModal";

function MessageDeleteModal({ id, onConfirm }) {
    return (
        <ConfirmModal
            id={id}
            title="Mesajı Sil"
            description={`Bu mesaj kalıcı olarak silinecek.
Devam etmek istediğinize emin misiniz?`}
            confirmText="Evet, Sil"
            cancelText="Vazgeç"
            onConfirm={onConfirm}
        />
    );
}

export default MessageDeleteModal;