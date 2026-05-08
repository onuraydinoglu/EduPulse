import StatusBadge from "../../../components/ui/StatusBadge";
import TableActions from "../../../components/ui/TableActions";

import {
  getOfficerEmail,
  getOfficerFullName,
  getOfficerId,
  getOfficerPhoneNumber,
  getOfficerStatus,
  getOfficerTemporaryPassword,
} from "../utils/officerFormatters";

function OfficerTableRow({ officer, temporaryPasswords = {}, onEdit, onDelete }) {
  const officerId = getOfficerId(officer);
  const temporaryPassword = getOfficerTemporaryPassword(
    officer,
    temporaryPasswords,
  );

  return (
    <tr className="transition hover:bg-base-200/40">
      <td>
        <div className="font-semibold text-base-content">
          {getOfficerFullName(officer)}
        </div>
      </td>

      <td>{getOfficerEmail(officer) || "-"}</td>

      <td>{getOfficerPhoneNumber(officer) || "-"}</td>

      <td>
        <span className="badge badge-ghost font-mono">
          {temporaryPassword || "-"}
        </span>
      </td>

      <td>
        <StatusBadge status={getOfficerStatus(officer)} />
      </td>

      <td className="text-right">
        <TableActions
          onEdit={() => onEdit(officer)}
          onDelete={() => onDelete(officerId)}
        />
      </td>
    </tr>
  );
}

export default OfficerTableRow;