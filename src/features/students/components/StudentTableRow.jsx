import TableActions from "../../../components/ui/TableActions";

function StudentTableRow({ student, onEdit, onDelete }) {
  const fullName =
    student.fullName ||
    `${student.firstName || ""} ${student.lastName || ""}`.trim();

  const isActive = student.isActive ?? student.IsActive ?? true;

  return (
    <tr>
      <td className="font-medium text-gray-900">{fullName || "-"}</td>

      <td>{student.studentNumber || "-"}</td>

      <td>{student.classroomName || student.className || "-"}</td>

      <td>{student.email || "-"}</td>

      <td>{student.phoneNumber || "-"}</td>

      <td>
        <span
          className={`badge ${isActive ? "badge-success" : "badge-error"
            } badge-outline`}
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