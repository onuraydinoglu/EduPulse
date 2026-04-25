import TableActions from "../../../components/ui/TableActions";

function ClassTableRow({ classItem, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-base-200/60">
      <td>
        <span className="badge badge-primary rounded-lg">
          {classItem.className}
        </span>
      </td>

      <td>{classItem.teacher}</td>

      <td>{classItem.studentCount}</td>

      <td className="text-right">
        <TableActions
          onEdit={() => onEdit(classItem)}
          onDelete={() => onDelete(classItem.id)}
        />
      </td>
    </tr>
  );
}

export default ClassTableRow;