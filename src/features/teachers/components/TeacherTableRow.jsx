import { BookOpenIcon } from "@heroicons/react/24/outline";

import StatusBadge from "../../../components/ui/StatusBadge";
import TableActions from "../../../components/ui/TableActions";

import {
  getTeacherBranch,
  getTeacherEmail,
  getTeacherFullName,
  getTeacherId,
  getTeacherPhoneNumber,
  getTeacherStatus,
} from "../utils/teacherFormatters";

function TeacherTableRow({
  teacher,
  temporaryPassword,
  onEdit,
  onDelete,
  onAssignLesson,
}) {
  const teacherId = getTeacherId(teacher);
  const fullName = getTeacherFullName(teacher);
  const branch = getTeacherBranch(teacher);
  const email = getTeacherEmail(teacher);
  const phoneNumber = getTeacherPhoneNumber(teacher);
  const status = getTeacherStatus(teacher);

  return (
    <tr className="border-b border-base-200 transition hover:bg-base-200/40">
      <td className="px-6 py-4">
        <div>
          <div className="font-semibold text-base-content">{fullName}</div>

          {temporaryPassword && (
            <div className="mt-1 inline-flex rounded-lg bg-warning/10 px-2 py-1 text-xs font-medium text-warning">
              Şifre: {temporaryPassword}
            </div>
          )}
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm text-base-content/70">{branch}</span>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm text-base-content/70">
          {email || "-"}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm text-base-content/70">
          {phoneNumber || "-"}
        </span>
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={status} />
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onAssignLesson(teacher)}
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-3 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-content"
            title="Ders ata"
          >
            <BookOpenIcon className="h-4 w-4" />
            Ders Ata
          </button>

          <TableActions
            onEdit={() => onEdit(teacher)}
            onDelete={() => onDelete(teacherId)}
          />
        </div>
      </td>
    </tr>
  );
}

export default TeacherTableRow;