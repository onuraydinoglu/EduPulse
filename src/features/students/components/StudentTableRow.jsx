import TableActions from "../../../components/ui/TableActions";

function StudentTableRow({ student, onDetail, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-base-200/60">
      <td>
        <div>
          <p className="font-semibold">
            {student.firstName} {student.lastName}
          </p>
          <p className="text-xs text-base-content/50">
            {student.school}
          </p>
        </div>
      </td>

      <td>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          {student.className}
        </span>
      </td>

      <td>{student.club || "Yok"}</td>

      <td>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${student.status === "Aktif"
            ? "bg-emerald-50 text-emerald-600"
            : "bg-rose-50 text-rose-600"
            }`}
        >
          {student.status}
        </span>
      </td>

      <td className="text-right">
        <TableActions
          onDetail={() => onDetail(student)}
          onEdit={() => onEdit(student)}
          onDelete={() => onDelete(student.id)}
        />
      </td>
    </tr>
  );
}

export default StudentTableRow;