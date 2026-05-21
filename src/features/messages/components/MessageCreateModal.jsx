import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import MultiSelectDropdown from "../../../components/ui/MultiSelectDropdown";
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
  const userOptions = users.map((user) => {
    const userId = getUserId(user);
    const fullName = getUserFullName(user);
    const roleName = getUserRoleName(user);

    return {
      value: userId,
      label: `${fullName} - ${roleName}`,
    };
  });

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
        <MultiSelectDropdown
          label="Alıcı"
          value={formData.receiverUserIds}
          onChange={(value) => onChange("receiverUserIds", value)}
          options={userOptions}
          placeholder="Alıcı seçiniz"
          emptyText="Alıcı bulunamadı"
        />

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
