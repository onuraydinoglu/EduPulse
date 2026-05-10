import { BookOpenIcon } from "@heroicons/react/24/outline";

import StatusBadge from "../../../components/ui/StatusBadge";
import TableActions from "../../../components/ui/TableActions";

const getTeacherName = (teacher) => {
  return (
    teacher.fullName ||
    teacher.FullName ||
    `${teacher.firstName || teacher.FirstName || ""} ${teacher.lastName || teacher.LastName || ""
      }`.trim() ||
    "-"
  );
};

const getTeacherBranch = (teacher) => {
  const branchLessonName = teacher.branchLessonName || teacher.BranchLessonName;
  const department = teacher.department || teacher.Department;

  return branchLessonName || department || "Branş atanmadı";
};

const getTeacherStatus = (teacher) => {
  const status = teacher.status || teacher.Status;

  if (status) return status;

  if (teacher.isActive === false || teacher.IsActive === false) {
    return "izinde";
  }

  return "aktif";
};

function TeacherTableRow({
  teacher,
  temporaryPassword,
  onEdit,
  onDelete,
  onAssignLesson,
}) {
  const fullName = getTeacherName(teacher);
  const branch = getTeacherBranch(teacher);
  const status = getTeacherStatus(teacher);
  const teacherId = teacher.id || teacher.Id;

  return (
    <tr className="border-b border-base-200 transition hover:bg-base-200/40">
      <td className="px-6 py-4">
        <div>
          <div className="font-semibold text-base-content">{fullName}</div>

          {temporaryPassword && (
            <div className="mt-1 rounded-lg bg-warning/10 px-2 py-1 text-xs font-medium text-warning">
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
          {teacher.email || teacher.Email || "-"}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm text-base-content/70">
          {teacher.phoneNumber || teacher.PhoneNumber || "-"}
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