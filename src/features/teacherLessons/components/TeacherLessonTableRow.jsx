import TableActions from "../../../components/ui/TableActions";
import StatusBadge from "../../../components/ui/StatusBadge";

function TeacherLessonTableRow({ item, onEdit, onDelete }) {
  const isActive = item.isActive ?? item.IsActive ?? true;

  return (
    <tr className="hover:bg-base-200/60">
      <td className="font-medium">{item.teacherFullName || "-"}</td>

      <td>{item.lessonName || "-"}</td>

      <td>{item.classroomName || "-"}</td>

      <td>
        <StatusBadge status={isActive ? "Aktif" : "Pasif"} />
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