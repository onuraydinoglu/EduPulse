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
    <tr className="hover">
      <td>
        <div className="font-semibold text-base-content">
          {getClassName(classItem)}
        </div>
      </td>

      <td>{getClassTeacherName(classItem, teachers) || "-"}</td>

      <td>
        <span className="badge badge-ghost">
          {getClassStudentCount(classItem)}
        </span>
      </td>

      <td>
        <Link
          to={`/dashboard/classes/${classId}`}
          className="btn btn-sm btn-outline rounded-xl"
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4" />
          Sınıfa Git
        </Link>
      </td>

      <td className="text-right">
        {canManage && (
          <TableActions
            onEdit={() => onEdit(classItem)}
            onDelete={() => onDelete(classId)}
          />
        )}
      </td>
    </tr>
  );
}

export default ClassTableRow;