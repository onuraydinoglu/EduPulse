import { useState } from "react";
import {
  PaperAirplaneIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function ManagerDashboard() {
  const schoolInfo = {
    name: "Müdürün Okulu",
    city: "Samsun",
    principal: "Okul Müdürü",
    studentCount: 116,
    teacherCount: 24,
    classCount: 4,
    clubCount: 6,
  };

  const teachers = [
    { id: 1, fullName: "Ayşe Demir", branch: "Matematik", className: "9-A" },
    { id: 2, fullName: "Murat Çelik", branch: "Türk Dili ve Edebiyatı", className: "10-B" },
    { id: 3, fullName: "Elif Şahin", branch: "Fizik", className: "11-A" },
    { id: 4, fullName: "Ahmet Yılmaz", branch: "Kimya", className: "12-C" },
  ];

  const [noteText, setNoteText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [notes, setNotes] = useState([
    { id: 1, text: "Cuma günü öğretmenler toplantısı planlanacak." },
    { id: 2, text: "12-C sınıfının sınav sonuçları incelenecek." },
  ]);

  const [message, setMessage] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("all");
  const [sentMessages, setSentMessages] = useState([]);

  const handleSaveNote = () => {
    if (!noteText.trim()) return;

    if (editingNoteId) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingNoteId ? { ...note, text: noteText } : note
        )
      );

      setEditingNoteId(null);
    } else {
      const newNote = {
        id: Date.now(),
        text: noteText,
      };

      setNotes((prev) => [newNote, ...prev]);
    }

    setNoteText("");
  };

  const handleEditNote = (note) => {
    setEditingNoteId(note.id);
    setNoteText(note.text);
  };

  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));

    if (editingNoteId === id) {
      setEditingNoteId(null);
      setNoteText("");
    }
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setNoteText("");
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const receiver =
      selectedTeacher === "all"
        ? "Tüm Öğretmenler"
        : teachers.find((teacher) => teacher.id === Number(selectedTeacher))?.fullName;

    const newMessage = {
      id: Date.now(),
      receiver,
      text: message,
      date: new Date().toLocaleDateString("tr-TR"),
    };

    setSentMessages((prev) => [newMessage, ...prev]);
    setMessage("");
    setSelectedTeacher("all");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
        {/* Teacher Message Area */}
        <section className="radius-card border border-gray-200 bg-white p-6">
          <div className="mb-5 flex items-center gap-2">
            <PaperAirplaneIcon className="h-5 w-5 text-blue-600" />

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-950">
                Öğretmenlere Mesaj Gönder
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Okulunuzdaki öğretmenlere genel veya kişisel mesaj gönderebilirsiniz.
              </p>
            </div>
          </div>

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

            <div className="flex justify-end">
              <button
                onClick={handleSendMessage}
                className="btn-gradient inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
                Mesaj Gönder
              </button>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-5">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Gönderilen Mesajlar
            </h3>

            <div className="space-y-3">
              {sentMessages.length === 0 ? (
                <p className="text-sm text-gray-500">
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
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Personal Notes */}
        <section className="radius-card border border-gray-200 bg-white p-6">
          <div className="mb-5 flex items-center gap-2">
            <PencilSquareIcon className="h-5 w-5 text-blue-600" />

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-950">
                Kendime Notlar
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Müdür paneline özel kişisel takip notları
              </p>
            </div>
          </div>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            rows="4"
            placeholder="Kendiniz için kısa bir not yazın..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          />

          <div className="mt-3 flex justify-end gap-2">
            {editingNoteId && (
              <button
                onClick={handleCancelEdit}
                className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Vazgeç
              </button>
            )}

            <button
              onClick={handleSaveNote}
              className="btn-gradient rounded-2xl px-5 py-2 text-sm font-semibold"
            >
              {editingNoteId ? "Notu Güncelle" : "Notu Kaydet"}
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {notes.length === 0 ? (
              <p className="text-sm text-gray-500">Henüz not eklenmedi.</p>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
                >
                  <p className="text-sm text-gray-600">{note.text}</p>

                  <div className="mt-3 flex justify-end gap-2">
                    <button
                      onClick={() => handleEditNote(note)}
                      className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-white"
                    >
                      Düzenle
                    </button>

                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="inline-flex items-center gap-1 rounded-xl bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 transition hover:bg-rose-100"
                    >
                      <TrashIcon className="h-4 w-4" />
                      Sil
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ManagerDashboard;