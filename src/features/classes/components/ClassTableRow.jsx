import TableActions from "../../../components/ui/TableActions";

function ClassTableRow({ classItem, teacherName, onEdit, onDelete }) {
  const className =
    classItem.name ||
    classItem.Name ||
    `${classItem.grade || classItem.Grade}-${classItem.section || classItem.Section}`;

  return (
    <tr className="hover:bg-base-200/60">
      <td>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          {className}
        </span>
      </td>

      <td>{teacherName || "-"}</td>

      <td>{classItem.studentCount || classItem.StudentCount || 0}</td>

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