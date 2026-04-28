import {
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function SchoolTableRow({ school, onEdit, onDelete }) {
  return (
    <tr className="transition hover:bg-gray-50">
      <td className="px-5 py-4">
        <div>
          <p className="font-medium text-gray-900">{school.name}</p>
          <p className="text-xs text-gray-400">{school.schoolCode}</p>
        </div>
      </td>

      <td className="px-5 py-4">
        <div>
          <p className="text-gray-700">{school.city}</p>
          <p className="text-xs text-gray-400">{school.district}</p>
        </div>
      </td>

      <td className="px-5 py-4 text-gray-600">
        {school.email}
      </td>

      <td className="px-5 py-4 text-gray-600">
        {school.phoneNumber}
      </td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${school.isActive
            ? "bg-emerald-50 text-emerald-600"
            : "bg-rose-50 text-rose-600"
            }`}
        >
          {school.isActive ? "Aktif" : "Pasif"}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(school)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-600 transition hover:bg-indigo-100"
          >
            <PencilSquareIcon className="h-4 w-4" />
            Düzenle
          </button>

          <button
            onClick={() => onDelete(school.id)}
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

export default SchoolTableRow;