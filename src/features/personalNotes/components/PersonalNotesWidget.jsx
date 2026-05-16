import { PencilSquareIcon } from "@heroicons/react/24/outline";

import CreateButton from "../../../components/ui/CreateButton";
import {
  PERSONAL_NOTE_DELETE_MODAL_ID,
  PERSONAL_NOTE_MODAL_ID,
} from "../constants/personalNoteConstants";
import { usePersonalNotes } from "../hooks/usePersonalNotes";
import PersonalNoteDeleteModal from "./PersonalNoteDeleteModal";
import PersonalNoteFormModal from "./PersonalNoteFormModal";
import PersonalNoteList from "./PersonalNoteList";

function PersonalNotesWidget({ showToast }) {
  const {
    notes,
    noteForm,
    noteLoading,
    errors,
    isEditingNote,
    handleChange,
    handleOpenNoteModal,
    handleEditNote,
    handleSaveNote,
    handleOpenNoteDeleteModal,
    handleDeleteNote,
  } = usePersonalNotes(showToast);

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

          <CreateButton
            icon={PencilSquareIcon}
            onClick={() => handleOpenNoteModal(PERSONAL_NOTE_MODAL_ID)}
          >
            Not Ekle
          </CreateButton>
        </div>

        <div className="space-y-3">
          <PersonalNoteList
            notes={notes}
            noteLoading={noteLoading}
            onEdit={(note) => handleEditNote(note, PERSONAL_NOTE_MODAL_ID)}
            onDelete={(id) =>
              handleOpenNoteDeleteModal(id, PERSONAL_NOTE_DELETE_MODAL_ID)
            }
          />
        </div>
      </section>

      <PersonalNoteFormModal
        id={PERSONAL_NOTE_MODAL_ID}
        noteForm={noteForm}
        errors={errors}
        isEditingNote={isEditingNote}
        onChange={handleChange}
        onSave={() => handleSaveNote(PERSONAL_NOTE_MODAL_ID)}
      />

      <PersonalNoteDeleteModal
        id={PERSONAL_NOTE_DELETE_MODAL_ID}
        onConfirm={() => handleDeleteNote(PERSONAL_NOTE_DELETE_MODAL_ID)}
      />
    </>
  );
}

export default PersonalNotesWidget;