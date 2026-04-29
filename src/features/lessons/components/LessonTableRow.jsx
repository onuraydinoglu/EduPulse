import TableActions from "../../../components/ui/TableActions";

function LessonTableRow({ lesson, onEdit, onDelete }) {
  return (
    <tr>
      <td className="font-medium text-gray-900">
        {lesson.name || "İsimsiz Ders"}
      </td>

      <td>
        <span className="badge badge-success badge-outline">
          {lesson.isActive === false ? "Pasif" : "Aktif"}
        </span>
      </td>

      <td className="text-right">
        <TableActions
          onEdit={() => onEdit(lesson)}
          onDelete={() => onDelete(lesson.id)}
        />
      </td>
    </tr>
  );
}

export default LessonTableRow;