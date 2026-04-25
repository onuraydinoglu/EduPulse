import StatusBadge from "../../../components/ui/StatusBadge";
import TableActions from "../../../components/ui/TableActions";

function ClubTableRow({ club, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-base-200/60">
      <td>
        <div>
          <p className="font-semibold">{club.name}</p>
          <p className="text-xs text-base-content/50">
            Sorumlu: {club.teacher}
          </p>
        </div>
      </td>

      <td>
        <span className="font-semibold">{club.studentCount}</span>
      </td>

      <td>
        <StatusBadge status={club.status} />
      </td>

      <td className="text-right">
        <TableActions
          onEdit={() => onEdit(club)}
          onDelete={() => onDelete(club.id)}
        />
      </td>
    </tr>
  );
}

export default ClubTableRow;