import { Link } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import TableActions from "../../../components/ui/TableActions";
import {
  getClubAdvisorTeacherName,
  getClubId,
  getClubMemberCount,
  getClubName,
} from "../utils/clubFormatters";

function ClubTableRow({
  club,
  teachers = [],
  canManage = true,
  canOpenClub = true,
  onEdit,
  onDelete,
}) {
  const clubId = getClubId(club);

  return (
    <tr className="border-b border-base-200 transition hover:bg-base-200/40 [&_td]:px-6">
      <td>
        <div className="font-semibold text-base-content">
          {getClubName(club)}
        </div>
      </td>

      <td>
        <span className="text-sm text-base-content/70">
          {getClubAdvisorTeacherName(club, teachers) || "-"}
        </span>
      </td>

      <td>
        <span className="text-sm text-base-content/70">
          {getClubMemberCount(club)} üye
        </span>
      </td>

      {canOpenClub && (
        <td>
          <Link
            to={`/dashboard/clubs/${clubId}/members`}
            className="btn btn-sm rounded-xl border-base-300 bg-base-100 text-base-content hover:border-primary hover:bg-primary hover:text-primary-content"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            Kulübe Git
          </Link>
        </td>
      )}

      {canManage && (
        <td className="text-right">
          <TableActions
            onEdit={() => onEdit(club)}
            onDelete={() => onDelete(clubId)}
          />
        </td>
      )}
    </tr>
  );
}

export default ClubTableRow;