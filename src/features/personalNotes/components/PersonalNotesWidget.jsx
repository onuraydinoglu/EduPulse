import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import TableActions from "../../../components/ui/TableActions";
import CreateButton from "../../../components/ui/CreateButton";
import { personalNoteService } from "../services/personalNoteService";

const emptyForm = {
  title: "",
  content: "",
  isActive: true,
};

function PersonalNotesWidget({ showToast }) {
  const [notes, setNotes] = useState([]);
  const [noteForm, setNoteForm] = useState(emptyForm);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [deletingNoteId, setDeletingNoteId] = useState(null);
  const [noteLoading, setNoteLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const isEditingNote = editingNoteId !== null;

  const sortNotes = (data) => {
    return Array.isArray(data)
      ? [...data].sort((a, b) => {

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
      showToast?.(error.message || "Notlar yüklenirken hata oluştu.", "error");
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

        showToast?.(error.message || "Notlar yüklenirken hata oluştu.", "error");
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

  const handleOpenNoteModal = () => {
    setEditingNoteId(null);
    setNoteForm(emptyForm);
    setErrors({});
    document.getElementById("note_modal").showModal();
  };

  const handleCloseNoteModal = () => {
    document.getElementById("note_modal").close();
    setEditingNoteId(null);
    setNoteForm(emptyForm);
    setErrors({});
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
          isActive: noteForm.isActive,
        });

        showToast?.("Not başarıyla güncellendi.");
      } else {
        await personalNoteService.create({
          title: noteForm.title,
          content: noteForm.content,
        });

        showToast?.("Not başarıyla oluşturuldu.");
      }

      handleCloseNoteModal();
      await loadNotes();
    } catch (error) {
      showToast?.(error.message || "Not işlemi sırasında hata oluştu.", "error");
    }
  };

  const handleEditNote = (note) => {
    setEditingNoteId(note.id || note.Id);
    setNoteForm({
      title: note.title || note.Title || "",
      content: note.content || note.Content || "",
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

      showToast?.("Not başarıyla silindi.");
      setDeletingNoteId(null);
      document.getElementById("note_delete_modal").close();

      await loadNotes();
    } catch (error) {
      showToast?.(error.message || "Not silinirken hata oluştu.", "error");
    }
  };

  return (
    <>
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

              return (
                <div
                  key={id}
                  className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
                >
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-gray-900">
                      {title}
                    </p>
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
        id="note_delete_modal"
        title="Notu Sil"
        description="Bu not kalıcı olarak silinecek. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDeleteNote}
      />
    </>
  );
}

export default PersonalNotesWidget;