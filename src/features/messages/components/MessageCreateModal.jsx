import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import {
    getUserFullName,
    getUserId,
    getUserRoleName,
} from "../utils/messageFormatters";

function MessageCreateModal({
    id,
    users,
    formData,
    submitLoading,
    onChange,
    onClose,
    onSubmit,
}) {
    return (
        <Modal
            id={id}
            title="Mesaj Gönder"
            description="Okul içi kullanıcılara mesaj gönderin"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Vazgeç
                    </Button>

                    <Button onClick={onSubmit} disabled={submitLoading}>
                        {submitLoading ? "Gönderiliyor..." : "Gönder"}
                    </Button>
                </>
            }
        >
            <div className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-semibold text-base-content/70">
                        Alıcı
                    </label>

                    <select
                        value={formData.receiverUserId}
                        onChange={(event) => onChange("receiverUserId", event.target.value)}
                        className="h-11 w-full rounded-xl border border-base-300 bg-base-100 px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                    >
                        <option value="">Alıcı seçiniz</option>

                        {users.map((user) => {
                            const userId = getUserId(user);
                            const fullName = getUserFullName(user);
                            const roleName = getUserRoleName(user);

                            return (
                                <option key={userId} value={userId}>
                                    {fullName} - {roleName}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-semibold text-base-content/70">
                        Başlık
                    </label>

                    <input
                        value={formData.title}
                        onChange={(event) => onChange("title", event.target.value)}
                        maxLength={200}
                        placeholder="Örn: Toplantı Bilgisi"
                        className="h-11 w-full rounded-xl border border-base-300 bg-base-100 px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-semibold text-base-content/70">
                        Mesaj
                    </label>

                    <textarea
                        value={formData.content}
                        onChange={(event) => onChange("content", event.target.value)}
                        rows="5"
                        maxLength={1000}
                        placeholder="Mesajınızı yazın..."
                        className="w-full resize-none rounded-xl border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                    />
                </div>
            </div>
        </Modal>
    );
}

export default MessageCreateModal;