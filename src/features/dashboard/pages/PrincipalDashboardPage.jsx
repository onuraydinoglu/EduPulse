import { useState } from "react";
import {
  PaperAirplaneIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import TableActions from "../../../components/ui/TableActions";
import CreateButton from "../../../components/ui/CreateButton";

function PrincipalDashboardPage() {
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

  const [noteText, setNoteText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [deletingNoteId, setDeletingNoteId] = useState(null);
  const [notes, setNotes] = useState([
    { id: 1, text: "Cuma günü öğretmenler toplantısı planlanacak." },
    { id: 2, text: "12-C sınıfının sınav sonuçları incelenecek." },
  ]);

  const isEditingMessage = editingMessageId !== null;
  const isEditingNote = editingNoteId !== null;

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
    setNoteText("");
    document.getElementById("note_modal").showModal();
  };

  const handleCloseNoteModal = () => {
    document.getElementById("note_modal").close();
    setEditingNoteId(null);
    setNoteText("");
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
            : item
        )
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
      (teacher) => teacher.fullName === item.receiver
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
      prev.filter((item) => item.id !== deletingMessageId)
    );

    if (editingMessageId === deletingMessageId) {
      handleCloseMessageModal();
    }

    setDeletingMessageId(null);
    document.getElementById("message_delete_modal").close();
  };

  const handleSaveNote = () => {
    if (!noteText.trim()) return;

    if (isEditingNote) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingNoteId ? { ...note, text: noteText } : note
        )
      );
    } else {
      setNotes((prev) => [{ id: Date.now(), text: noteText }, ...prev]);
    }

    handleCloseNoteModal();
  };

  const handleEditNote = (note) => {
    setEditingNoteId(note.id);
    setNoteText(note.text);
    document.getElementById("note_modal").showModal();
  };

  const handleOpenNoteDeleteModal = (id) => {
    setDeletingNoteId(id);
    document.getElementById("note_delete_modal").showModal();
  };

  const handleDeleteNote = () => {
    setNotes((prev) => prev.filter((note) => note.id !== deletingNoteId));

    if (editingNoteId === deletingNoteId) {
      handleCloseNoteModal();
    }

    setDeletingNoteId(null);
    document.getElementById("note_delete_modal").close();
  };

  return (
    <div className="space-y-6">
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
            <div className="flex items-center gap-2">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-gray-950">
                  Öğretmen Mesajları
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Gönderilen mesajları buradan takip edebilirsiniz.
                </p>
              </div>
            </div>


            <CreateButton icon={PaperAirplaneIcon} onClick={handleOpenMessageModal}>
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
            <div className="flex items-center gap-2">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-gray-950">
                  Kendime Notlar
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Müdür paneline özel kişisel takip notları
                </p>
              </div>
            </div>
            <CreateButton icon={PencilSquareIcon} onClick={handleOpenNoteModal}>
              Not Ekle
            </CreateButton>
          </div>

          <div className="space-y-3">
            {notes.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                Henüz not eklenmedi.
              </p>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
                >
                  <p className="text-sm text-gray-600">{note.text}</p>

                  <div className="mt-3 flex justify-end">
                    <TableActions
                      onEdit={() => handleEditNote(note)}
                      onDelete={() => handleOpenNoteDeleteModal(note.id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div >

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
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          rows="5"
          placeholder="Kendiniz için kısa bir not yazın..."
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
        />
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
    </div >
  );
}

export default PrincipalDashboardPage;