import { Link } from "react-router-dom";
import {
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import TableActions from "../../../components/ui/TableActions";

import {
  getClubAdvisorTeacherName,
  getClubId,
  getClubIsActive,
  getClubMemberCount,
  getClubName,
} from "../utils/clubFormatters";

function ClubTableRow({
  club,
  teachers = [],
  canManage = true,
  onEdit,
  onDelete,
}) {
  const clubId = getClubId(club);
  const isActive = getClubIsActive(club);

  return (
    <tr className="transition hover:bg-base-200/60">
      <td>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <UserGroupIcon className="h-6 w-6" />
          </div>

          <div>
            <p className="font-semibold text-base-content">
              {getClubName(club)}
            </p>

            <p className="text-xs text-base-content/50">
              Kulüp kaydı
            </p>
          </div>
        </div>
      </td>

      <td>
        <span className="font-medium text-base-content/80">
          {getClubAdvisorTeacherName(club, teachers)}
        </span>
      </td>

      <td>
        <span className="badge badge-outline rounded-xl">
          {getClubMemberCount(club)} Üye
        </span>
      </td>

      <td>
        <span
          className={`badge rounded-xl ${isActive ? "badge-success" : "badge-error"
            }`}
        >
          {isActive ? "Aktif" : "Pasif"}
        </span>
      </td>

      <td>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/dashboard/club-members?clubId=${clubId}`}
            className="btn btn-sm rounded-xl border border-primary/20 bg-primary/10 text-primary hover:bg-primary hover:text-primary-content"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            Kulübe Git
          </Link>

          {canManage && (
            <TableActions
              onEdit={() => onEdit(club)}
              onDelete={() => onDelete(clubId)}
            />
          )}
        </div>
      </td>
    </tr>
  );
}

export default ClubTableRow;