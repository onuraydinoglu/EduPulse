import TableActions from "../../../components/ui/TableActions";

import {
  getEventMemberClassroomName,
  getEventMemberId,
  getEventMemberIsPaid,
  getEventMemberPaidAmount,
  getEventMemberStudentFullName,
  getEventMemberStudentNumber,
} from "../utils/eventMemberFormatters";

function EventMemberTableRow({ member, canManage = true, onDelete }) {
  const memberId = getEventMemberId(member);
  const isPaid = getEventMemberIsPaid(member);
  const paidAmount = getEventMemberPaidAmount(member);

  return (
    <tr className="border-b border-base-200 transition hover:bg-base-200/40 [&_td]:px-6">
      <td>
        <div className="font-semibold text-base-content">
          {getEventMemberStudentFullName(member)}
        </div>
      </td>

      <td>
        <span className="text-sm text-base-content/70">
          {getEventMemberStudentNumber(member) || "-"}
        </span>
      </td>

      <td>
        <span className="text-sm text-base-content/70">
          {getEventMemberClassroomName(member) || "-"}
        </span>
      </td>

      <td>
        <span
          className={`badge rounded-xl ${isPaid ? "badge-success" : "badge-warning"
            }`}
        >
          {isPaid ? "Ödendi" : "Ödenmedi"}
        </span>
      </td>

      <td>
        <span className="text-sm font-medium text-base-content/70">
          {paidAmount} ₺
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

export default EventMemberTableRow;