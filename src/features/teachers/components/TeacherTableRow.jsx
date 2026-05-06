import StatusBadge from "../../../components/ui/StatusBadge";
import TableActions from "../../../components/ui/TableActions";

function TeacherTableRow({ teacher, temporaryPassword, onEdit, onDelete }) {
  const fullName = `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim();

  const branchOrDepartment =
    teacher.branchLessonName ||
    teacher.BranchLessonName ||
    teacher.department ||
    teacher.Department ||
    "-";

  const isActive = teacher.isActive ?? teacher.IsActive ?? true;

  return (
    <tr className="group border-b border-gray-100 transition hover:bg-gray-50/80">
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-sm font-bold text-blue-600">
            {fullName ? fullName.charAt(0).toUpperCase() : "Ö"}
          </div>

          <div>
            <p className="font-semibold text-gray-950">
              {fullName || "İsimsiz Öğretmen"}
            </p>

            {temporaryPassword && (
              <p className="mt-1 text-xs font-medium text-amber-600">
                Geçici şifre: {temporaryPassword}
              </p>
            )}
          </div>
        </div>
      </td>

      <td className="py-4">
        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
          {branchOrDepartment}
        </span>
      </td>

      <td className="py-4 text-sm text-gray-600">{teacher.email || "-"}</td>

      <td className="py-4 text-sm text-gray-600">
        {teacher.phoneNumber || "-"}
      </td>

      <td className="py-4">
        <StatusBadge
          status={teacher.status || (isActive ? "Aktif" : "İzinde")}
        />
      </td>

      <td className="py-4 text-right">
        <TableActions
          onEdit={() => onEdit(teacher)}
          onDelete={() => onDelete(teacher.id)}
        />
      </td>
    </tr>
  );
}

export default TeacherTableRow;