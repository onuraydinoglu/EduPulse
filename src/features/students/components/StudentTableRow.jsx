import StatusBadge from "../../../components/ui/StatusBadge";
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
        <span className="badge badge-primary rounded-lg">
          {student.className}
        </span>
      </td>

      <td>{student.club || "Yok"}</td>

      <td>
        <StatusBadge status={student.status} />
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