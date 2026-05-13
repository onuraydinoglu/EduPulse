import { Link } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

import TableActions from "../../../components/ui/TableActions";
import {
  getClassId,
  getClassName,
  getClassStudentCount,
  getClassTeacherName,
} from "../utils/classFormatters";

function ClassTableRow({
  classItem,
  teachers = [],
  canManage = true,
  onEdit,
  onDelete,
}) {
  const classId = getClassId(classItem);

  return (
    <tr className="border-b border-base-200 transition hover:bg-base-200/40 [&_td]:px-6">
      <td>
        <div className="font-semibold text-base-content">
          {getClassName(classItem)}
        </div>
      </td>

      <td>
        <span className="text-sm text-base-content/70">
          {getClassTeacherName(classItem, teachers) || "-"}
        </span>
      </td>

      <td>
        <span className="text-sm text-base-content/70">
          {getClassStudentCount(classItem)} öğrenci
        </span>
      </td>

      <td>
        <Link
          to={`/dashboard/classes/${classId}`}
          className="btn btn-sm rounded-xl border-base-300 bg-base-100 text-base-content hover:border-primary hover:bg-primary hover:text-primary-content"
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4" />
          Sınıfa Git
        </Link>
      </td>

      {canManage && (
        <td className="text-right">
          <TableActions
            onEdit={() => onEdit(classItem)}
            onDelete={() => onDelete(classId)}
          />
        </td>
      )}
    </tr>
  );
}

export default ClassTableRow;