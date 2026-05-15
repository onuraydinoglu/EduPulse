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
    <tr className="border-b border-base-200 transition hover:bg-base-200/40 [&_td]:px-6">
      <td>
        <div>
          <p className="font-semibold text-base-content">
            {getStudentFullName(member)}
          </p>
          <p className="text-xs text-base-content/50">
            {getStudentNumber(member)}
          </p>
        </div>
      </td>

      <td>
        <span className="text-sm text-base-content/70">
          {getClassroomName(member) || "-"}
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