import { useEffect, useMemo, useState } from "react";
import {
  EnvelopeIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Toast from "../../../components/ui/Toast";
import CreateButton from "../../../components/ui/CreateButton";
import TableActions from "../../../components/ui/TableActions";
import { messageService } from "../services/messageService";

const emptyForm = {
  receiverUserId: "",
  title: "",
  content: "",
};

function DashboardMessagesWidget() {
  const [users, setUsers] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [inboxMessages, setInboxMessages] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [activeTab, setActiveTab] = useState("inbox");
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const unreadCount = useMemo(() => {
    return inboxMessages.filter((message) => {
      const isRead = message.isRead ?? message.IsRead;
      return !isRead;
    }).length;
  }, [inboxMessages]);

  const activeMessages = activeTab === "inbox" ? inboxMessages : sentMessages;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  useEffect(() => {
    let isMounted = true;

    const loadMessages = async () => {
      try {
        setLoading(true);

        const [messageUsers, inbox, sent] = await Promise.all([
          messageService.getMessageUsers(),
          messageService.getInbox(),
          messageService.getSent(),
        ]);

        if (!isMounted) return;

        setUsers(Array.isArray(messageUsers) ? messageUsers : []);
        setInboxMessages(Array.isArray(inbox) ? inbox : []);
        setSentMessages(Array.isArray(sent) ? sent : []);
      } catch (error) {
        if (!isMounted) return;

        showToast(
          error.message || "Mesajlar yüklenirken hata oluştu.",
          "error",
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMessages();

    return () => {
      isMounted = false;
    };
  }, []);

  const openCreateModal = () => {
    setFormData(emptyForm);
    document.getElementById("message_modal")?.showModal();
  };

  const closeCreateModal = () => {
    setFormData(emptyForm);
    document.getElementById("message_modal")?.close();
  };

  const openDetailModal = async (message) => {
    setSelectedMessage(message);

    const messageId = message.id || message.Id;
    const isRead = message.isRead ?? message.IsRead;

    document.getElementById("message_detail_modal")?.showModal();

    if (activeTab === "inbox" && messageId && !isRead) {
      try {
        await messageService.markAsRead(messageId);
      } catch (error) {
        showToast(
          error.message || "Mesaj okundu olarak işaretlenemedi.",
          "error",
        );
      }
    }
  };

  const closeDetailModal = () => {
    setSelectedMessage(null);
    document.getElementById("message_detail_modal")?.close();
  };

  const openDeleteModal = (id) => {
    setSelectedMessageId(id);
    document.getElementById("message_delete_modal")?.showModal();
  };

  const closeDeleteModal = () => {
    setSelectedMessageId(null);
    document.getElementById("message_delete_modal")?.close();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSendMessage = async () => {
    if (!formData.receiverUserId) {
      showToast("Alıcı seçmelisiniz.", "error");
      return;
    }

    if (!formData.title.trim()) {
      showToast("Mesaj başlığı boş olamaz.", "error");
      return;
    }

    if (!formData.content.trim()) {
      showToast("Mesaj içeriği boş olamaz.", "error");
      return;
    }

    try {
      setSubmitLoading(true);

      await messageService.send({
        receiverUserId: formData.receiverUserId,
        title: formData.title.trim(),
        content: formData.content.trim(),
      });

      closeCreateModal();
      showToast("Mesaj başarıyla gönderildi.");
    } catch (error) {
      showToast(error.message || "Mesaj gönderilirken hata oluştu.", "error");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteMessage = async () => {
    if (!selectedMessageId) return;

    try {
      await messageService.delete(selectedMessageId);
      closeDeleteModal();
      showToast("Mesaj başarıyla silindi.");
    } catch (error) {
      showToast(error.message || "Mesaj silinirken hata oluştu.", "error");
    }
  };

  const getMessageValue = (message, camelKey, pascalKey, fallback = "") => {
    return message?.[camelKey] ?? message?.[pascalKey] ?? fallback;
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}

      <section className="rounded-3xl border border-base-300 bg-base-100/90 p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600">
              <EnvelopeIcon className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-base-content">Mesajlar</h2>
              <p className="text-sm text-base-content/60">
                Okul içi öğretmen, memur ve müdür mesajlaşmaları
              </p>
            </div>
          </div>

          <CreateButton icon={PaperAirplaneIcon} onClick={openCreateModal}>
            Mesaj Gönder
          </CreateButton>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl bg-base-200/70 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("inbox")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${activeTab === "inbox"
              ? "bg-base-100 text-base-content shadow-sm"
              : "text-base-content/60 hover:text-base-content"
              }`}
          >
            Gelen Kutusu
            {unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sent")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${activeTab === "sent"
              ? "bg-base-100 text-base-content shadow-sm"
              : "text-base-content/60 hover:text-base-content"
              }`}
          >
            Gönderilenler
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-40 items-center justify-center text-sm text-base-content/60">
            Mesajlar yükleniyor...
          </div>
        ) : activeMessages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-base-300 p-8 text-center">
            <EnvelopeIcon className="mx-auto mb-3 h-9 w-9 text-base-content/30" />
            <p className="text-sm font-medium text-base-content">
              {activeTab === "inbox"
                ? "Henüz gelen mesaj bulunmuyor."
                : "Henüz gönderilmiş mesaj bulunmuyor."}
            </p>
          </div>
        ) : (
          <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
            {activeMessages.map((message) => {
              const id = getMessageValue(message, "id", "Id");
              const title = getMessageValue(
                message,
                "title",
                "Title",
                "Başlıksız",
              );
              const content = getMessageValue(message, "content", "Content");
              const senderFullName = getMessageValue(
                message,
                "senderFullName",
                "SenderFullName",
              );
              const receiverFullName = getMessageValue(
                message,
                "receiverFullName",
                "ReceiverFullName",
              );
              const createdDate = getMessageValue(
                message,
                "createdDate",
                "CreatedDate",
              );
              const isRead = getMessageValue(message, "isRead", "IsRead", true);

              return (
                <article
                  key={id}
                  className={`rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md ${activeTab === "inbox" && !isRead
                    ? "border-blue-200 bg-blue-50/70"
                    : "border-base-300 bg-base-100"
                    }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-sm font-bold text-base-content">
                          {title}
                        </h3>

                        {activeTab === "inbox" && !isRead && (
                          <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                            Yeni
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-base-content/50">
                        {activeTab === "inbox"
                          ? `Gönderen: ${senderFullName}`
                          : `Alıcı: ${receiverFullName}`}
                      </p>
                    </div>

                    <TableActions
                      onDetail={() => openDetailModal(message)}
                      onDelete={() => openDeleteModal(id)}
                    />
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-base-content/70">
                    {content}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs text-base-content/40">
                    <span>
                      {createdDate
                        ? new Date(createdDate).toLocaleDateString("tr-TR")
                        : ""}
                    </span>

                    <span>
                      {activeTab === "inbox" ? "Gelen" : "Gönderilen"}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <Modal
        id="message_modal"
        title="Mesaj Gönder"
        description="Sadece kendi okulunuzdaki müdür, öğretmen ve memurlara mesaj gönderebilirsiniz."
        footer={
          <>
            <Button variant="outline" onClick={closeCreateModal}>
              Vazgeç
            </Button>

            <Button onClick={handleSendMessage} disabled={submitLoading}>
              <PaperAirplaneIcon className="h-5 w-5" />
              {submitLoading ? "Gönderiliyor..." : "Gönder"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-base-content">
              Alıcı
            </label>

            <select
              value={formData.receiverUserId}
              onChange={(event) =>
                handleChange("receiverUserId", event.target.value)
              }
              className="h-11 w-full rounded-xl border border-base-300 bg-base-100 px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            >
              <option value="">Alıcı seçiniz</option>

              {users.map((user) => (
                <option key={user.id || user.Id} value={user.id || user.Id}>
                  {user.fullName || user.FullName} -{" "}
                  {user.roleName || user.RoleName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-base-content">
              Başlık
            </label>

            <input
              value={formData.title}
              onChange={(event) => handleChange("title", event.target.value)}
              maxLength={200}
              placeholder="Örn: Toplantı Bilgisi"
              className="h-11 w-full rounded-xl border border-base-300 bg-base-100 px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-base-content">
              Mesaj
            </label>

            <textarea
              value={formData.content}
              onChange={(event) => handleChange("content", event.target.value)}
              rows="5"
              maxLength={1000}
              placeholder="Mesajınızı yazın..."
              className="w-full resize-none rounded-xl border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>
        </div>
      </Modal>

      <Modal
        id="message_detail_modal"
        title="Mesaj Detayı"
        description="Seçili mesajın detayları"
        footer={
          <Button variant="outline" onClick={closeDetailModal}>
            Kapat
          </Button>
        }
      >{selectedMessage && (
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-base-content/40">
              Başlık
            </p>

            <h3 className="mt-1 text-xl font-bold leading-snug text-base-content">
              {getMessageValue(selectedMessage, "title", "Title", "Başlıksız")}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/60">
            <span>
              {getMessageValue(
                selectedMessage,
                "senderFullName",
                "SenderFullName",
              )}
            </span>

            <span className="text-base-content/30">→</span>

            <span>
              {getMessageValue(
                selectedMessage,
                "receiverFullName",
                "ReceiverFullName",
              )}
            </span>

            <span className="h-1 w-1 rounded-full bg-base-content/30" />

            <span>
              {getMessageValue(selectedMessage, "createdDate", "CreatedDate")
                ? new Date(
                  getMessageValue(selectedMessage, "createdDate", "CreatedDate"),
                ).toLocaleString("tr-TR")
                : ""}
            </span>
          </div>

          <div className="h-px bg-base-300" />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-base-content/40">
              Mesaj
            </p>

            <p className="whitespace-pre-wrap rounded-2xl bg-base-200/50 px-4 py-4 text-sm leading-7 text-base-content/80">
              {getMessageValue(selectedMessage, "content", "Content")}
            </p>
          </div>
        </div>
      )}
      </Modal>

      <ConfirmModal
        id="message_delete_modal"
        title="Mesajı Sil"
        description="Bu mesaj kalıcı olarak silinecek. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDeleteMessage}
      />
    </>
  );
}

export default DashboardMessagesWidget;