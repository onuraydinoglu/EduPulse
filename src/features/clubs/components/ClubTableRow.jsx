import { Link } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

import TableActions from "../../../components/ui/TableActions";

function ClubTableRow({ club, teachers = [], onEdit, onDelete }) {
  const clubId = club.id || club.Id;

  const clubName = club.name || club.Name || "-";

  const advisorTeacherId = club.advisorTeacherId || club.AdvisorTeacherId;

  const advisorTeacherFromList = teachers.find(
    (teacher) => (teacher.id || teacher.Id) === advisorTeacherId,
  );

  const advisorTeacherName =
    club.advisorTeacherFullName ||
    club.AdvisorTeacherFullName ||
    club.teacherFullName ||
    club.TeacherFullName ||
    advisorTeacherFromList?.fullName ||
    advisorTeacherFromList?.FullName ||
    `${advisorTeacherFromList?.firstName || advisorTeacherFromList?.FirstName || ""} ${advisorTeacherFromList?.lastName || advisorTeacherFromList?.LastName || ""
      }`.trim() ||
    "-";

  const memberCount =
    club.memberCount ??
    club.MemberCount ??
    club.clubMemberCount ??
    club.ClubMemberCount ??
    0;

  const isActive = club.isActive ?? club.IsActive ?? true;

  return (
    <tr>
      <td>
        <div>
          <p className="font-semibold text-base-content">{clubName}</p>
          <p className="mt-1 text-xs text-base-content/50">
            Kulüp ID: {clubId}
          </p>
        </div>
      </td>

      <td>
        <span className="text-sm text-base-content/70">
          {advisorTeacherName}
        </span>
      </td>

      <td>
        <span className="font-medium text-base-content">{memberCount}</span>
      </td>

      <td>
        <span
          className={`badge ${isActive ? "badge-success" : "badge-error"
            } badge-sm text-white`}
        >
          {isActive ? "Aktif" : "Pasif"}
        </span>
      </td>

      <td>
        <Link
          to={`/dashboard/clubs/${clubId}`}
          className="btn btn-sm border-base-300 bg-base-100 text-base-content hover:border-primary hover:bg-primary hover:text-primary-content"
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4" />
          Kulübe Git
        </Link>
      </td>

      <td className="text-right">
        <TableActions
          onEdit={() => onEdit(club)}
          onDelete={() => onDelete(clubId)}
        />
      </td>
    </tr>
  );
}

export default ClubTableRow;