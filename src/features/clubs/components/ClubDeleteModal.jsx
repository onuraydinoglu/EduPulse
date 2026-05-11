import ConfirmModal from "../../../components/ui/ConfirmModal";

function ClubDeleteModal({ modalId, onClose, onConfirm }) {
    return (
        <ConfirmModal
            id={modalId}
            title="Kulüp Silinsin mi?"
            description="Bu işlem seçili kulübü silecektir. Kulübe bağlı üyeler varsa backend kuralınıza göre işlem engellenebilir."
            confirmText="Sil"
            cancelText="Vazgeç"
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}

export default ClubDeleteModal;