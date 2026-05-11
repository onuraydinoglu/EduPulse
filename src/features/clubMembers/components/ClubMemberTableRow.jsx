import TableActions from "../../../components/ui/TableActions";

import {
  getClassroomName,
  getMemberId,
  getStudentFullName,
  getStudentNumber,
} from "../utils/clubMemberFormatters";

function ClubMemberTableRow({ member, canManage = true, onDelete }) {
  const memberId = getMemberId(member);

  return (
    <tr className="transition hover:bg-base-200/50">
      <td>
        <div className="font-semibold text-base-content">
          {getStudentFullName(member)}
        </div>
      </td>

      <td>
        <span className="badge badge-ghost rounded-xl">
          {getStudentNumber(member)}
        </span>
      </td>

      <td>
        <span className="text-sm text-base-content/70">
          {getClassroomName(member)}
        </span>
      </td>

      {canManage && (
        <td className="text-right">
          <TableActions onDelete={() => onDelete(memberId)} />
        </td>
      )}
    </tr>
  );
}

export default ClubMemberTableRow;