import StatusBadge from "../../../components/ui/StatusBadge";
import TableActions from "../../../components/ui/TableActions";

function TeacherLessonTableRow({ item, onEdit, onDelete }) {
  const teacherLessonId = item.id || item.Id;
  const teacherFullName = item.teacherFullName || item.TeacherFullName || "-";
  const lessonName = item.lessonName || item.LessonName || "-";
  const classroomName = item.classroomName || item.ClassroomName || "-";
  const isActive = item.isActive ?? item.IsActive ?? true;

  return (
    <tr className="border-b border-base-200 transition hover:bg-base-200/40 [&_td]:px-6">
      <td>
        <div className="font-semibold text-base-content">
          {teacherFullName}
        </div>
      </td>

      <td>
        <span className="text-sm text-base-content/70">{lessonName}</span>
      </td>

      <td>
        <span className="text-sm text-base-content/70">{classroomName}</span>
      </td>

      <td>
        <StatusBadge status={isActive} />
      </td>

      <td>
        <div className="flex items-center justify-end">
          <TableActions
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(teacherLessonId)}
          />
        </div>
      </td>
    </tr>
  );
}

export default TeacherLessonTableRow;