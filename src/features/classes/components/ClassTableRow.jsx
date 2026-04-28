import TableActions from "../../../components/ui/TableActions";

function ClassTableRow({ classItem, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-base-200/60">
      <td>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          {classItem.name}
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