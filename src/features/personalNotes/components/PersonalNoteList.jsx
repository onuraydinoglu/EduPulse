import TableActions from "../../../components/ui/TableActions";
import {
    getPersonalNoteContent,
    getPersonalNoteId,
    getPersonalNoteTitle,
} from "../utils/personalNoteFormatters";

function PersonalNoteList({
    notes,
    noteLoading,
    onEdit,
    onDelete,
}) {
    if (noteLoading) {
        return (
            <p className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                Notlar yükleniyor...
            </p>
        );
    }

    if (notes.length === 0) {
        return (
            <p className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                Henüz not eklenmedi.
            </p>
        );
    }

    return notes.map((note) => {
        const id = getPersonalNoteId(note);
        const title = getPersonalNoteTitle(note);
        const content = getPersonalNoteContent(note);

        return (
            <div
                key={id}
                className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
            >
                <div className="mb-1 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-gray-900">{title}</p>
                </div>

                <p className="text-sm text-gray-600">{content}</p>

                <div className="mt-3 flex justify-end">
                    <TableActions
                        onEdit={() => onEdit(note)}
                        onDelete={() => onDelete(id)}
                    />
                </div>
            </div>
        );
    });
}

export default PersonalNoteList;