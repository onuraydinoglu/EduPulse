import {
  AcademicCapIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

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
  if (teacher.isActive === false || teacher.IsActive === false) return "Pasif";

  return "Aktif";
};

function TeacherTableRow({
  teacher,
  temporaryPassword,
  onEdit,
  onDelete,
  mobile = false,
}) {
  const fullName = getTeacherName(teacher);
  const branch = getTeacherBranch(teacher);
  const status = getTeacherStatus(teacher);

  if (mobile) {
    return (
      <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <AcademicCapIcon className="h-6 w-6" />
            </div>

            <div className="min-w-0">
              <p className="truncate font-bold text-base-content">
                {fullName}
              </p>

              <p className="mt-1 truncate text-sm text-base-content/60">
                {branch}
              </p>
            </div>
          </div>

          <StatusBadge status={status} />
        </div>

        <div className="mt-4 space-y-2 rounded-2xl bg-base-200/50 p-3">
          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <EnvelopeIcon className="h-4 w-4" />
            <span className="truncate">{teacher.email || "-"}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <PhoneIcon className="h-4 w-4" />
            <span>{teacher.phoneNumber || "-"}</span>
          </div>

          {temporaryPassword && (
            <div className="rounded-xl bg-warning/10 px-3 py-2 text-xs font-semibold text-warning">
              Geçici şifre: {temporaryPassword}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <TableActions
            onEdit={() => onEdit(teacher)}
            onDelete={() => onDelete(teacher.id)}
          />
        </div>
      </div>
    );
  }

  return (
    <tr className="border-base-300 transition hover:bg-base-200/50">
      <td>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <AcademicCapIcon className="h-6 w-6" />
          </div>

          <div>
            <p className="font-bold text-base-content">{fullName}</p>
          </div>
        </div>
      </td>

      <td>
        <span className="rounded-full bg-base-200 px-3 py-1 text-sm font-medium text-base-content/70">
          {branch}
        </span>
      </td>

      <td className="text-sm text-base-content/70">{teacher.email || "-"}</td>

      <td className="text-sm text-base-content/70">
        {teacher.phoneNumber || "-"}
      </td>

      <td>
        <StatusBadge status={status} />
      </td>

      <td className="text-right">
        <TableActions
          onEdit={() => onEdit(teacher)}
          onDelete={() => onDelete(teacher.id)}
        />
      </td>
    </tr>
  );
}

export default TeacherTableRow;