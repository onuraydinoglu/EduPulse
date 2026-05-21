import { useEffect, useMemo, useState } from "react";

import { messageService } from "../services/messageService";
import {
  emptyMessageForm,
  MESSAGE_TABS,
} from "../constants/messageConstants";
import {
  getMessageId,
  getMessageIsRead,
} from "../utils/messageFormatters";

export function useDashboardMessages() {
  const [users, setUsers] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [inboxMessages, setInboxMessages] = useState([]);
  const [formData, setFormData] = useState(emptyMessageForm);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [activeTab, setActiveTab] = useState(MESSAGE_TABS.INBOX);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const unreadCount = useMemo(() => {
    return inboxMessages.filter((message) => !getMessageIsRead(message)).length;
  }, [inboxMessages]);

  const activeMessages =
    activeTab === MESSAGE_TABS.INBOX ? inboxMessages : sentMessages;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const openModal = (id) => {
    document.getElementById(id)?.showModal();
  };

  const closeModal = (id) => {
    document.getElementById(id)?.close();
  };

  const loadMessages = async () => {
    try {
      setLoading(true);

      const [messageUsers, inbox, sent] = await Promise.all([
        messageService.getMessageUsers(),
        messageService.getInbox(),
        messageService.getSent(),
      ]);

      setUsers(Array.isArray(messageUsers) ? messageUsers : []);
      setInboxMessages(Array.isArray(inbox) ? inbox : []);
      setSentMessages(Array.isArray(sent) ? sent : []);
    } catch (error) {
      showToast(
        error.message || "Mesajlar yüklenirken hata oluştu.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenCreateModal = (modalId) => {
    setFormData(emptyMessageForm);
    openModal(modalId);
  };

  const handleCloseCreateModal = (modalId) => {
    setFormData(emptyMessageForm);
    closeModal(modalId);
  };

  const handleOpenDetailModal = async (message, modalId) => {
    setSelectedMessage(message);

    const messageId = getMessageId(message);
    const isRead = getMessageIsRead(message);

    openModal(modalId);

    if (activeTab === MESSAGE_TABS.INBOX && messageId && !isRead) {
      try {
        await messageService.markAsRead(messageId);

        setInboxMessages((prev) =>
          prev.map((item) =>
            getMessageId(item) === messageId
              ? { ...item, isRead: true, IsRead: true }
              : item,
          ),
        );
      } catch (error) {
        showToast(
          error.message || "Mesaj okundu olarak işaretlenemedi.",
          "error",
        );
      }
    }
  };

  const handleCloseDetailModal = (modalId) => {
    setSelectedMessage(null);
    closeModal(modalId);
  };

  const handleOpenDeleteModal = (id, modalId) => {
    setSelectedMessageId(id);
    openModal(modalId);
  };

  const handleCloseDeleteModal = (modalId) => {
    setSelectedMessageId(null);
    closeModal(modalId);
  };

  const handleSendMessage = async (modalId) => {
    if (!formData.receiverUserIds.length) {
      showToast("En az bir alıcı seçmelisiniz.", "error");
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

      await Promise.all(
        formData.receiverUserIds.map((receiverUserId) =>
          messageService.send({
            receiverUserId,
            title: formData.title.trim(),
            content: formData.content.trim(),
          }),
        ),
      );

      handleCloseCreateModal(modalId);
      await loadMessages();

      showToast("Mesajlar başarıyla gönderildi.");
    } catch (error) {
      showToast(error.message || "Mesaj gönderilirken hata oluştu.", "error");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteMessage = async (modalId) => {
    if (!selectedMessageId) return;

    try {
      await messageService.delete(selectedMessageId);

      handleCloseDeleteModal(modalId);
      await loadMessages();

      showToast("Mesaj başarıyla silindi.");
    } catch (error) {
      showToast(error.message || "Mesaj silinirken hata oluştu.", "error");
    }
  };

  return {
    users,
    formData,
    selectedMessage,
    activeTab,
    setActiveTab,
    loading,
    submitLoading,
    toast,
    unreadCount,
    activeMessages,
    handleChange,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenDetailModal,
    handleCloseDetailModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleSendMessage,
    handleDeleteMessage,
  };
}