import { useNavigate } from "react-router-dom";

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

function StudentTableRow({ student, backPath, onEdit, onDelete }) {
  const navigate = useNavigate();

  const studentId = getStudentId(student);

  const handleOpenProfile = () => {
    if (!studentId) return;

    navigate(`/dashboard/profiles/student/${studentId}`, {
      state: {
        backPath: backPath || "/dashboard/students",
      },
    });
  };

  return (
    <tr className="border-b border-base-200 transition hover:bg-base-200/40 [&_td]:px-6">
      <td>
        <div>
          <p className="font-semibold text-base-content">
            {getStudentFullName(student)}
          </p>
          <p className="text-xs text-base-content/50">
            {getStudentNumber(student)}
          </p>
        </div>
      </td>

      <td>
        <span className="font-medium text-base-content/80">
          {getStudentClassroomName(student)}
        </span>
      </td>

      <td>{getStudentEmail(student) || "-"}</td>

      <td>{getStudentPhoneNumber(student) || "-"}</td>

      <td className="text-right">
        <TableActions
          onProfile={handleOpenProfile}
          onEdit={() => onEdit(student)}
          onDelete={() => onDelete(studentId)}
        />
      </td>
    </tr>
  );
}

export default StudentTableRow;