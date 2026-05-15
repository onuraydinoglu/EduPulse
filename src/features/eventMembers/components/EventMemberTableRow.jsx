import TableActions from "../../../components/ui/TableActions";
import {
  getEventMemberClassroomName,
  getEventMemberId,
  getEventMemberIsPaid,
  getEventMemberPaidAmount,
  getEventMemberStudentFullName,
  getEventMemberStudentNumber,
} from "../utils/eventMemberFormatters";

function EventMemberTableRow({
  member,
  canManage = true,
  canEditPayment = false,
  onEditPayment,
  onDelete,
}) {
  const memberId = getEventMemberId(member);
  const isPaid = getEventMemberIsPaid(member);
  const paidAmount = getEventMemberPaidAmount(member);

  return (
    <tr className="border-b border-base-200 transition hover:bg-base-200/40 [&_td]:px-6">
      <td>
        <div>
          <p className="font-semibold text-base-content">
            {getEventMemberStudentFullName(member)}
          </p>

          <p className="text-xs text-base-content/50">
            {getEventMemberStudentNumber(member)}
          </p>
        </div>
      </td>

      <td>
        <span className="text-sm text-base-content/70">
          {getEventMemberClassroomName(member) || "-"}
        </span>
      </td>

      <td>
        {canEditPayment ? (
          <span
            className={`badge rounded-xl ${isPaid ? "badge-success" : "badge-warning"
              }`}
          >
            {isPaid ? "Ödendi" : "Ödenmedi"}
          </span>
        ) : (
          <span className="badge badge-info rounded-xl">Ücretsiz</span>
        )}
      </td>

      <td>
        <span className="text-sm font-medium text-base-content/70">
          {canEditPayment ? `${paidAmount} ₺` : "Ücretsiz"}
        </span>
      </td>

      {canManage && (
        <td className="text-right">
          <div className="flex justify-end">
            <TableActions
              onEdit={
                canEditPayment && onEditPayment
                  ? () => onEditPayment(member)
                  : undefined
              }
              onDelete={() => onDelete(memberId)}
            />
          </div>
        </td>
      )}
    </tr>
  );
}

export default EventMemberTableRow;