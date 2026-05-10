import StatusBadge from "../../../components/ui/StatusBadge";
import TableActions from "../../../components/ui/TableActions";

import {
  getTeacherLessonClassroomName,
  getTeacherLessonId,
  getTeacherLessonLessonName,
  getTeacherLessonStatus,
  getTeacherLessonTeacherName,
} from "../utils/teacherLessonFormatters";

function TeacherLessonTableRow({ teacherLesson, onEdit, onDelete }) {
  const teacherLessonId = getTeacherLessonId(teacherLesson);

  return (
    <tr className="transition hover:bg-base-200/40">
      <td>
        <div className="font-semibold text-base-content">
          {getTeacherLessonTeacherName(teacherLesson)}
        </div>
      </td>

      <td>{getTeacherLessonLessonName(teacherLesson)}</td>

      <td>{getTeacherLessonClassroomName(teacherLesson)}</td>

      <td>
        <StatusBadge status={getTeacherLessonStatus(teacherLesson)} />
      </td>

      <td className="text-right">
        <TableActions
          onEdit={() => onEdit(teacherLesson)}
          onDelete={() => onDelete(teacherLessonId)}
        />
      </td>
    </tr>
  );
}

export default TeacherLessonTableRow;