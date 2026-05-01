import TableActions from "../../../components/ui/TableActions";
import StatusBadge from "../../../components/ui/StatusBadge";

function TeacherTableRow({ teacher, temporaryPassword, onEdit, onDelete }) {
  const fullName = `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim();

  return (
    <tr className="hover:bg-base-200/60">
      <td>
        <p className="font-semibold">{fullName || "İsimsiz Öğretmen"}</p>
      </td>

      <td>{teacher.email || "-"}</td>

      <td>{teacher.phoneNumber || "-"}</td>

      <td>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          {temporaryPassword || "-"}
        </span>
      </td>

      <td>
        <StatusBadge status={teacher.isActive ? "Aktif" : "Pasif"} />
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