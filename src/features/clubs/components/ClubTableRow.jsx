import {
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function ClubTableRow({ club, onEdit, onDelete }) {
  return (
    <tr className="transition hover:bg-gray-50">
      <td className="px-5 py-4">
        <div>
          <p className="font-medium text-gray-900">{club.name}</p>
          <p className="text-xs text-gray-400">
            Sorumlu: {club.teacher}
          </p>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          {club.studentCount} Öğrenci
        </span>
      </td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${club.status === "Aktif"
            ? "bg-emerald-50 text-emerald-600"
            : "bg-rose-50 text-rose-600"
            }`}
        >
          {club.status}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(club)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-600 transition hover:bg-indigo-100"
          >
            <PencilSquareIcon className="h-4 w-4" />
            Düzenle
          </button>

          <button
            onClick={() => onDelete(club.id)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600 transition hover:bg-rose-100"
          >
            <TrashIcon className="h-4 w-4" />
            Sil
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ClubTableRow;