import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import TableActions from "../../../components/ui/TableActions";
import CreateButton from "../../../components/ui/CreateButton";

function TeacherDashboardPage() {
  const teacherInfo = {
    fullName: "Ayşe Demir",
    branch: "Matematik",
    className: "9-A",
    school: "Müdürün Okulu",
  };

  const principalMessages = [
    {
      id: 1,
      sender: "Okul Müdürü",
      text: "Cuma günü yapılacak öğretmenler toplantısına katılım sağlayınız.",
      date: "26.04.2026",
    },
    {
      id: 2,
      sender: "Okul Müdürü",
      text: "9-A sınıfının deneme sınavı sonuçları hafta sonuna kadar sisteme girilmelidir.",
      date: "25.04.2026",
    },
  ];

  const [noteText, setNoteText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [deletingNoteId, setDeletingNoteId] = useState(null);

  const [notes, setNotes] = useState([
    { id: 1, text: "9-A sınıfında riskli öğrencilerle birebir görüşme yapılacak." },
    { id: 2, text: "Matematik yazılı sonuçları sisteme işlenecek." },
  ]);

  const isEditingNote = editingNoteId !== null;

  const handleOpenNoteModal = () => {
    setEditingNoteId(null);
    setNoteText("");
    document.getElementById("teacher_note_modal").showModal();
  };

  const handleCloseNoteModal = () => {
    document.getElementById("teacher_note_modal").close();
    setEditingNoteId(null);
    setNoteText("");
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
    document.getElementById("teacher_note_modal").showModal();
  };

  const handleOpenNoteDeleteModal = (id) => {
    setDeletingNoteId(id);
    document.getElementById("teacher_note_delete_modal").showModal();
  };

  const handleDeleteNote = () => {
    setNotes((prev) => prev.filter((note) => note.id !== deletingNoteId));

    if (editingNoteId === deletingNoteId) {
      handleCloseNoteModal();
    }

    setDeletingNoteId(null);
    document.getElementById("teacher_note_delete_modal").close();
  };

  return (
    <div className="space-y-6">
      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Öğretmen Paneli
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              {teacherInfo.fullName}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {teacherInfo.school} okulundaki {teacherInfo.className} sınıfı
              yönetim paneli
            </p>
          </div>

          <div className="rounded-2xl bg-blue-50 px-5 py-3 text-sm font-medium text-blue-600">
            {teacherInfo.branch} Öğretmeni
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="radius-card border border-gray-200 bg-white p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold tracking-tight text-gray-950">
              Müdür Mesajları
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Müdür tarafından size veya öğretmenlere gönderilen duyurular
            </p>
          </div>

          <div className="space-y-3">
            {principalMessages.map((message) => (
              <div
                key={message.id}
                className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
              >
                <div className="mb-1 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-gray-900">
                    {message.sender}
                  </p>

                  <span className="text-xs text-gray-400">
                    {message.date}
                  </span>
                </div>

                <p className="text-sm text-gray-600">{message.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="radius-card border border-gray-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-950">
                Kendime Notlar
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Öğretmen paneline özel kişisel takip notları
              </p>
            </div>

            <CreateButton icon={PencilSquareIcon} onClick={handleOpenNoteModal}>
              Not Ekle
            </CreateButton>
          </div>

          <div className="space-y-3">
            {notes.map((note) => (
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
            ))}
          </div>
        </section>
      </div>

      <Modal
        id="teacher_note_modal"
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
        id="teacher_note_delete_modal"
        title="Notu Sil"
        description="Bu not kalıcı olarak silinecek. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDeleteNote}
      />
    </div>
  );
}

export default TeacherDashboardPage;