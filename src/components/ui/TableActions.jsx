import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

function TableActions({ onProfile, onEdit, onDelete, onDetail }) {
  return (
    <div className="flex justify-end gap-2">
      {onProfile && (
        <button
          type="button"
          onClick={onProfile}
          className="btn btn-ghost btn-sm rounded-xl text-primary"
        >
          <UserCircleIcon className="h-4 w-4" />
          Profil
        </button>
      )}

      {onDetail && (
        <button
          type="button"
          onClick={onDetail}
          className="inline-flex items-center gap-1.5 rounded-xl border border-base-300 px-3 py-2 text-xs font-semibold text-base-content/70 transition hover:bg-base-200 cursor-pointer"
        >
          <EyeIcon className="h-4 w-4" />
          Detay
        </button>
      )}

      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-content cursor-pointer"
        >
          <PencilSquareIcon className="h-4 w-4" />
          Düzenle
        </button>
      )}

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-1.5 rounded-xl border border-error/30 bg-error/10 px-3 py-2 text-xs font-semibold text-error transition hover:bg-error hover:text-error-content cursor-pointer"
        >
          <TrashIcon className="h-4 w-4" />
          Sil
        </button>
      )}
    </div>
  );
}

export default TableActions;