import StatusBadge from "../../../components/ui/StatusBadge";
import TableActions from "../../../components/ui/TableActions";

import {
  getStudentClassroomName,
  getStudentEmail,
  getStudentFullName,
  getStudentId,
  getStudentNumber,
  getStudentPhoneNumber,
  getStudentStatus,
} from "../utils/studentFormatters";

function StudentTableRow({ student, onEdit, onDelete }) {
  const studentId = getStudentId(student);

  return (
    <tr className="border-b border-base-200 transition hover:bg-base-200/40 [&_td]:px-6">
      <td>
        <div className="font-semibold text-base-content">
          {getStudentFullName(student)}
        </div>
      </td>

      <td>
        <span className="badge badge-ghost">
          {getStudentNumber(student) || "-"}
        </span>
      </td>

      <td>
        <span className="font-medium text-base-content/80">
          {getStudentClassroomName(student)}
        </span>
      </td>

      <td>{getStudentEmail(student) || "-"}</td>

      <td>{getStudentPhoneNumber(student) || "-"}</td>

      <td>
        <StatusBadge status={getStudentStatus(student)} />
      </td>

      <td className="text-right">
        <TableActions
          onEdit={() => onEdit(student)}
          onDelete={() => onDelete(studentId)}
        />
      </td>
    </tr>
  );
}

export default StudentTableRow;