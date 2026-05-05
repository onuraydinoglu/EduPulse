import { useEffect, useState } from "react";
import {
  PaperAirplaneIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import TableActions from "../../../components/ui/TableActions";
import CreateButton from "../../../components/ui/CreateButton";
import Toast from "../../../components/ui/Toast";
import { personalNoteService } from "../../personalNotes/services/personalNoteService";

function DashboardPage() {
  const schoolInfo = {
    name: "Müdürün Okulu",
    city: "Samsun",
    principal: "Okul Müdürü",
  };

  const teachers = [
    { id: 1, fullName: "Ayşe Demir", branch: "Matematik", className: "9-A" },
    {
      id: 2,
      fullName: "Murat Çelik",
      branch: "Türk Dili ve Edebiyatı",
      className: "10-B",
    },
    { id: 3, fullName: "Elif Şahin", branch: "Fizik", className: "11-A" },
    { id: 4, fullName: "Ahmet Yılmaz", branch: "Kimya", className: "12-C" },
  ];

  const [message, setMessage] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("all");
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [deletingMessageId, setDeletingMessageId] = useState(null);
  const [sentMessages, setSentMessages] = useState([]);

  const [notes, setNotes] = useState([]);
  const [noteForm, setNoteForm] = useState({
    title: "",
    content: "",
    isPinned: false,
    isActive: true,
  });
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [deletingNoteId, setDeletingNoteId] = useState(null);
  const [noteLoading, setNoteLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const isEditingMessage = editingMessageId !== null;
  const isEditingNote = editingNoteId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const sortNotes = (data) => {
    return Array.isArray(data)
      ? [...data].sort((a, b) => {
        const aPinned = a.isPinned ?? a.IsPinned ?? false;
        const bPinned = b.isPinned ?? b.IsPinned ?? false;

        if (aPinned !== bPinned) return bPinned - aPinned;

        const aDate = new Date(a.createdDate || a.CreatedDate || 0);
        const bDate = new Date(b.createdDate || b.CreatedDate || 0);

        return bDate - aDate;
      })
      : [];
  };

  const loadNotes = async () => {
    try {
      const data = await personalNoteService.getAll();
      setNotes(sortNotes(data));
    } catch (error) {
      showToast(error.message || "Notlar yüklenirken hata oluştu.", "error");
      setNotes([]);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialNotes = async () => {
      try {
        const data = await personalNoteService.getAll();

        if (!isMounted) return;

        setNotes(sortNotes(data));
      } catch (error) {
        if (!isMounted) return;

        showToast(error.message || "Notlar yüklenirken hata oluştu.", "error");
        setNotes([]);
      } finally {
        if (isMounted) {
          setNoteLoading(false);
        }
      }
    };

    loadInitialNotes();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenMessageModal = () => {
    setEditingMessageId(null);
    setMessage("");
    setSelectedTeacher("all");
    document.getElementById("message_modal").showModal();
  };

  const handleCloseMessageModal = () => {
    document.getElementById("message_modal").close();
    setEditingMessageId(null);
    setMessage("");
    setSelectedTeacher("all");
  };

  const handleOpenNoteModal = () => {
    setEditingNoteId(null);
    setNoteForm({
      title: "",
      content: "",
      isPinned: false,
      isActive: true,
    });
    setErrors({});
    document.getElementById("note_modal").showModal();
  };

  const handleCloseNoteModal = () => {
    document.getElementById("note_modal").close();
    setEditingNoteId(null);
    setNoteForm({
      title: "",
      content: "",
      isPinned: false,
      isActive: true,
    });
    setErrors({});
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const receiver =
      selectedTeacher === "all"
        ? "Tüm Öğretmenler"
        : teachers.find((teacher) => teacher.id === Number(selectedTeacher))
          ?.fullName;

    if (isEditingMessage) {
      setSentMessages((prev) =>
        prev.map((item) =>
          item.id === editingMessageId
            ? {
              ...item,
              receiver,
              text: message,
              date: new Date().toLocaleDateString("tr-TR"),
            }
            : item,
        ),
      );
    } else {
      const newMessage = {
        id: Date.now(),
        receiver,
        text: message,
        date: new Date().toLocaleDateString("tr-TR"),
      };

      setSentMessages((prev) => [newMessage, ...prev]);
    }

    handleCloseMessageModal();
  };

  const handleEditMessage = (item) => {
    setEditingMessageId(item.id);
    setMessage(item.text);

    const teacher = teachers.find(
      (teacher) => teacher.fullName === item.receiver,
    );

    setSelectedTeacher(teacher ? String(teacher.id) : "all");
    document.getElementById("message_modal").showModal();
  };

  const handleOpenMessageDeleteModal = (id) => {
    setDeletingMessageId(id);
    document.getElementById("message_delete_modal").showModal();
  };

  const handleDeleteMessage = () => {
    setSentMessages((prev) =>
      prev.filter((item) => item.id !== deletingMessageId),
    );

    if (editingMessageId === deletingMessageId) {
      handleCloseMessageModal();
    }

    setDeletingMessageId(null);
    document.getElementById("message_delete_modal").close();
  };

  const validateNoteForm = () => {
    const nextErrors = {};

    if (!noteForm.title.trim()) {
      nextErrors.title = "Not başlığı boş olamaz.";
    }

    if (noteForm.title.trim().length > 100) {
      nextErrors.title = "Not başlığı en fazla 100 karakter olabilir.";
    }

    if (!noteForm.content.trim()) {
      nextErrors.content = "Not içeriği boş olamaz.";
    }

    if (noteForm.content.trim().length > 2000) {
      nextErrors.content = "Not içeriği en fazla 2000 karakter olabilir.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSaveNote = async () => {
    if (!validateNoteForm()) return;

    try {
      if (isEditingNote) {
        await personalNoteService.update({
          id: editingNoteId,
          title: noteForm.title,
          content: noteForm.content,
          isPinned: noteForm.isPinned,
          isActive: noteForm.isActive,
        });

        showToast("Not başarıyla güncellendi.");
      } else {
        await personalNoteService.create({
          title: noteForm.title,
          content: noteForm.content,
          isPinned: noteForm.isPinned,
        });

        showToast("Not başarıyla oluşturuldu.");
      }

      handleCloseNoteModal();
      await loadNotes();
    } catch (error) {
      showToast(error.message || "Not işlemi sırasında hata oluştu.", "error");
    }
  };

  const handleEditNote = (note) => {
    setEditingNoteId(note.id || note.Id);
    setNoteForm({
      title: note.title || note.Title || "",
      content: note.content || note.Content || "",
      isPinned: note.isPinned ?? note.IsPinned ?? false,
      isActive: note.isActive ?? note.IsActive ?? true,
    });
    setErrors({});
    document.getElementById("note_modal").showModal();
  };

  const handleOpenNoteDeleteModal = (id) => {
    setDeletingNoteId(id);
    document.getElementById("note_delete_modal").showModal();
  };

  const handleDeleteNote = async () => {
    try {
      await personalNoteService.delete(deletingNoteId);

      if (editingNoteId === deletingNoteId) {
        handleCloseNoteModal();
      }

      showToast("Not başarıyla silindi.");
      setDeletingNoteId(null);
      document.getElementById("note_delete_modal").close();

      await loadNotes();
    } catch (error) {
      showToast(error.message || "Not silinirken hata oluştu.", "error");
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">Müdür Paneli</p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              {schoolInfo.name}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {schoolInfo.city} konumundaki okulunuzun genel yönetim paneli
            </p>
          </div>

          <div className="rounded-2xl bg-blue-50 px-5 py-3 text-sm font-medium text-blue-600">
            Müdür: {schoolInfo.principal}
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="radius-card border border-gray-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-950">
                Öğretmen Mesajları
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Gönderilen mesajları buradan takip edebilirsiniz.
              </p>
            </div>

            <CreateButton
              icon={PaperAirplaneIcon}
              onClick={handleOpenMessageModal}
            >
              Mesaj Gönder
            </CreateButton>
          </div>

          <div className="space-y-3">
            {sentMessages.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                Henüz gönderilmiş mesaj bulunmuyor.
              </p>
            ) : (
              sentMessages.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
                >
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-gray-900">
                      {item.receiver}
                    </p>

                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>

                  <p className="text-sm text-gray-600">{item.text}</p>

                  <div className="mt-3 flex justify-end">
                    <TableActions
                      onEdit={() => handleEditMessage(item)}
                      onDelete={() => handleOpenMessageDeleteModal(item.id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="radius-card border border-gray-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-950">
                Kendime Notlar
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Sana özel kişisel takip notları
              </p>
            </div>

            <CreateButton icon={PencilSquareIcon} onClick={handleOpenNoteModal}>
              Not Ekle
            </CreateButton>
          </div>

          <div className="space-y-3">
            {noteLoading ? (
              <p className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                Notlar yükleniyor...
              </p>
            ) : notes.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                Henüz not eklenmedi.
              </p>
            ) : (
              notes.map((note) => {
                const id = note.id || note.Id;
                const title = note.title || note.Title || "Başlıksız Not";
                const content = note.content || note.Content || "";
                const isPinned = note.isPinned ?? note.IsPinned ?? false;

                return (
                  <div
                    key={id}
                    className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
                  >
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-gray-900">
                        {title}
                      </p>

                      {isPinned && (
                        <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-600">
                          Sabit
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600">{content}</p>

                    <div className="mt-3 flex justify-end">
                      <TableActions
                        onEdit={() => handleEditNote(note)}
                        onDelete={() => handleOpenNoteDeleteModal(id)}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      <Modal
        id="message_modal"
        title={isEditingMessage ? "Mesajı Güncelle" : "Mesaj Gönder"}
        footer={
          <>
            <form method="dialog">
              <Button variant="ghost">Vazgeç</Button>
            </form>

            <Button onClick={handleSendMessage}>
              {isEditingMessage ? "Güncelle" : "Gönder"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          >
            <option value="all">Tüm Öğretmenler</option>

            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.fullName} - {teacher.branch} / {teacher.className}
              </option>
            ))}
          </select>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            placeholder="Öğretmenlere iletmek istediğiniz mesajı yazın..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          />
        </div>
      </Modal>

      <Modal
        id="note_modal"
        title={isEditingNote ? "Notu Güncelle" : "Not Ekle"}
        footer={
          <>
            <form method="dialog">
              <Button variant="ghost">Vazgeç</Button>
            </form>

            <Button onClick={handleSaveNote}>
              {isEditingNote ? "Güncelle" : "Kaydet"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <input
              value={noteForm.title}
              onChange={(e) =>
                setNoteForm((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
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
              onChange={(e) =>
                setNoteForm((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              rows="5"
              placeholder="Kendiniz için kısa bir not yazın..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />

            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content}</p>
            )}
          </div>

          <label className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
            <span className="text-sm font-medium text-gray-700">
              Not sabitlensin mi?
            </span>

            <input
              type="checkbox"
              checked={noteForm.isPinned}
              onChange={(e) =>
                setNoteForm((prev) => ({
                  ...prev,
                  isPinned: e.target.checked,
                }))
              }
            />
          </label>

          {isEditingNote && (
            <label className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <span className="text-sm font-medium text-gray-700">
                Aktif mi?
              </span>

              <input
                type="checkbox"
                checked={noteForm.isActive}
                onChange={(e) =>
                  setNoteForm((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
              />
            </label>
          )}
        </div>
      </Modal>

      <ConfirmModal
        id="message_delete_modal"
        title="Mesajı Sil"
        description="Bu mesaj kalıcı olarak silinecek. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDeleteMessage}
      />

      <ConfirmModal
        id="note_delete_modal"
        title="Notu Sil"
        description="Bu not kalıcı olarak silinecek. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDeleteNote}
      />
    </div>
  );
}

export default DashboardPage;