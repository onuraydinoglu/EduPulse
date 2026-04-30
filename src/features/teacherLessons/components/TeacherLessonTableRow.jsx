import TableActions from "../../../components/ui/TableActions";

function TeacherLessonTableRow({ item, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-base-200/60">
      <td className="font-medium">{item.teacherFullName}</td>
      <td>{item.lessonName}</td>
      <td>{item.classroomName}</td>
      <td>
        <span
          className={`badge ${item.isActive ? "badge-success" : "badge-error"
            } badge-outline`}
        >
          {item.isActive ? "Aktif" : "Pasif"}
        </span>
      </td>
      <td className="text-right">
        <TableActions
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
        />
      </td>
    </tr>
  );
}

export default TeacherLessonTableRow;