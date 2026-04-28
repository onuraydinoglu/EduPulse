import TableActions from "../../../components/ui/TableActions";

function TeacherTableRow({ teacher, temporaryPassword, onEdit, onDelete }) {
  const fullName = `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim();

  return (
    <tr className="hover:bg-base-200/60">
      <td>
        <p className="font-semibold">{fullName || "İsimsiz Öğretmen"}</p>
      </td>

      <td>{teacher.phoneNumber || "-"}</td>

      <td>{teacher.email || "-"}</td>

      <td>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          {temporaryPassword || "-"}
        </span>
      </td>

      <td>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${teacher.isActive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-600"
            }`}
        >
          {teacher.isActive ? "Aktif" : "Pasif"}
        </span>
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