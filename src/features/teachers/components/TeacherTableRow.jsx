import StatusBadge from "../../../components/ui/StatusBadge";
import TableActions from "../../../components/ui/TableActions";

const getTeacherName = (teacher) => {
  return (
    teacher.fullName ||
    teacher.FullName ||
    `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim() ||
    "-"
  );
};

const getTeacherBranch = (teacher) => {
  return (
    teacher.branch ||
    teacher.branchName ||
    teacher.lessonName ||
    teacher.department ||
    "Branş atanmadı"
  );
};

const getTeacherStatus = (teacher) => {
  const status = teacher.status || teacher.Status;

  if (status) return status;

  if (teacher.isActive === false || teacher.IsActive === false) {
    return "izinde";
  }

  return "aktif";
};

function TeacherTableRow({ teacher, temporaryPassword, onEdit, onDelete }) {
  const fullName = getTeacherName(teacher);
  const branch = getTeacherBranch(teacher);
  const status = getTeacherStatus(teacher);

  return (
    <tr className="border-b border-base-300 transition hover:bg-base-200/40">
      <td className="px-6 py-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-base-content xl:text-[15px]">
            {fullName}
          </p>

          {temporaryPassword && (
            <p className="mt-0.5 truncate text-xs text-warning">
              Şifre: {temporaryPassword}
            </p>
          )}
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="inline-flex max-w-full items-center rounded-full bg-base-200 px-2.5 py-1 text-xs font-medium text-base-content/70 xl:px-3 xl:text-sm">
          <span className="truncate">{branch}</span>
        </span>
      </td>

      <td className="px-6 py-4 text-xs text-base-content/70 xl:text-sm">
        <span className="block truncate">{teacher.email || "-"}</span>
      </td>

      <td className="px-6 py-4 text-xs text-base-content/70 xl:text-sm">
        <span className="block truncate">{teacher.phoneNumber || "-"}</span>
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={status} />
      </td>

      <td className="px-6 py-4 text-right">
        <TableActions
          onEdit={() => onEdit(teacher)}
          onDelete={() => onDelete(teacher.id)}
        />
      </td>
    </tr>
  );
}

export default TeacherTableRow;