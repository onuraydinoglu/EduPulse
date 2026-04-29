import TableActions from "../../../components/ui/TableActions";

function StudentTableRow({ student, onEdit, onDelete }) {
  const fullName =
    student.fullName ||
    `${student.firstName || ""} ${student.lastName || ""}`.trim();

  const isActive = student.isActive ?? student.IsActive ?? true;

  return (
    <tr className="hover:bg-base-200/60">
      <td>
        <div>
          <p className="font-semibold">{fullName}</p>
          <p className="text-xs text-base-content/50">
            {student.roleName || "student"}
          </p>
        </div>
      </td>

      <td>{student.email || "-"}</td>

      <td>{student.phoneNumber || "-"}</td>

      <td>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${isActive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-600"
            }`}
        >
          {isActive ? "Aktif" : "Pasif"}
        </span>
      </td>

      <td className="text-right">
        <TableActions
          onEdit={() => onEdit(student)}
          onDelete={() => onDelete(student.id)}
        />
      </td>
    </tr>
  );
}

export default StudentTableRow;