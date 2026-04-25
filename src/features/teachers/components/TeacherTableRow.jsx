import StatusBadge from "../../../components/ui/StatusBadge";
import TableActions from "../../../components/ui/TableActions";

function TeacherTableRow({ teacher, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-base-200/60">
      <td>
        <div>
          <p className="font-semibold">{teacher.firstName + " " + teacher.lastName}</p>
        </div>
      </td>

      <td>
        <span>{teacher.branch}</span>
      </td>

      <td>
        <span className="badge badge-primary rounded-lg">
          {teacher.className || "Sınıf Atanmadı"}
        </span>
      </td>

      <td>
        <StatusBadge status={teacher.status} />
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