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
  const fullName = getStudentFullName(student);
  const studentNumber = getStudentNumber(student);
  const classroomName = getStudentClassroomName(student);
  const email = getStudentEmail(student);
  const phoneNumber = getStudentPhoneNumber(student);
  const status = getStudentStatus(student);

  return (
    <tr className="border-b border-base-200 transition hover:bg-base-200/40 [&_td]:px-6">
      <td>
        <div className="font-semibold text-base-content">{fullName}</div>
      </td>

      <td>
        <span className="text-sm text-base-content/70">
          {studentNumber || "-"}
        </span>
      </td>

      <td>
        <span className="text-sm text-base-content/70">
          {classroomName || "-"}
        </span>
      </td>

      <td>
        <span className="text-sm text-base-content/70">{email || "-"}</span>
      </td>

      <td>
        <span className="text-sm text-base-content/70">
          {phoneNumber || "-"}
        </span>
      </td>

      <td>
        <StatusBadge status={status} />
      </td>

      <td>
        <div className="flex items-center justify-end">
          <TableActions
            onEdit={() => onEdit(student)}
            onDelete={() => onDelete(studentId)}
          />
        </div>
      </td>
    </tr>
  );
}

export default StudentTableRow;