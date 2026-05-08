import TableActions from "../../../components/ui/TableActions";

import {
  getClassId,
  getClassName,
  getClassStudentCount,
  getClassTeacherName,
} from "../utils/classFormatters";

function ClassTableRow({ classItem, teachers = [], onEdit, onDelete }) {
  const classId = getClassId(classItem);

  return (
    <tr className="transition hover:bg-base-200/40">
      <td>
        <div className="font-semibold text-base-content">
          {getClassName(classItem)}
        </div>
      </td>

      <td>
        <span className="text-base-content/80">
          {getClassTeacherName(classItem, teachers) || "-"}
        </span>
      </td>

      <td>
        <span className="badge badge-ghost">
          {getClassStudentCount(classItem)}
        </span>
      </td>

      <td className="text-right">
        <TableActions
          onEdit={() => onEdit(classItem)}
          onDelete={() => onDelete(classId)}
        />
      </td>
    </tr>
  );
}

export default ClassTableRow;