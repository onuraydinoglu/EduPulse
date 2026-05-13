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
    <tr className="border-b border-base-200 transition hover:bg-base-200/40 [&_td]:px-6">
      <td>
        <div className="font-semibold text-base-content">
          {getOfficerFullName(officer)}
        </div>
      </td>

      <td>
        <span className="text-sm text-base-content/70">
          {getOfficerEmail(officer) || "-"}
        </span>
      </td>

      <td>
        <span className="text-sm text-base-content/70">
          {getOfficerPhoneNumber(officer) || "-"}
        </span>
      </td>

      <td>
        {temporaryPassword ? (
          <span className="mt-1 inline-flex rounded-lg bg-warning/10 px-2 py-1 text-xs font-medium text-warning">
            Şifre: {temporaryPassword}
          </span>
        ) : (
          <span className="text-sm text-base-content/70">-</span>
        )}
      </td>

      <td>
        <StatusBadge status={getOfficerStatus(officer)} />
      </td>

      <td>
        <div className="flex items-center justify-end">
          <TableActions
            onEdit={() => onEdit(officer)}
            onDelete={() => onDelete(officerId)}
          />
        </div>
      </td>
    </tr>
  );
}

export default OfficerTableRow;