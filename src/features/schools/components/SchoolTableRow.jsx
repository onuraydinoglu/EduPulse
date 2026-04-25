import StatusBadge from "../../../components/ui/StatusBadge";
import TableActions from "../../../components/ui/TableActions";

function SchoolTableRow({ school, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-base-200/60">
      <td>
        <div>
          <p className="font-semibold">{school.name}</p>
          <p className="text-xs text-base-content/50">{school.city}</p>
        </div>
      </td>

      <td>{school.principal}</td>

      <td>
        <span className="font-semibold">{school.studentCount}</span>
      </td>

      <td>
        <StatusBadge status={school.status} />
      </td>

      <td className="text-right">
        <TableActions
          onEdit={() => onEdit(school)}
          onDelete={() => onDelete(school.id)}
        />
      </td>
    </tr>
  );
}

export default SchoolTableRow;