import TableActions from "../../../components/ui/TableActions";

function LessonTableRow({ lesson, onEdit, onDelete }) {
  return (
    <tr>
      <td className="font-medium text-gray-900">
        {lesson.name || "İsimsiz Ders"}
      </td>

      <td>
        <span
          className={`badge ${lesson.isActive ? "badge-success" : "badge-error"
            } badge-outline`}
        >
          {lesson.isActive ? "Aktif" : "Pasif"}
        </span>
      </td>

      <td>
        <div className="flex justify-end">
          <TableActions
            onEdit={() => onEdit(lesson)}
            onDelete={() => onDelete(lesson.id)}
          />
        </div>
      </td>
    </tr>
  );
}

export default LessonTableRow;