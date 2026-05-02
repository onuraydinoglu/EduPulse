import TableActions from "../../../components/ui/TableActions";

function ClubTableRow({ club, onEdit, onDelete }) {
  const isActive = club.isActive ?? true;

  return (
    <tr className="hover:bg-base-200/60">
      <td className="font-medium">{club.name}</td>

      <td>{club.advisorTeacherFullName || "-"}</td>

      <td>
        <span className="badge badge-primary badge-outline">
          {club.memberCount ?? 0} Üye
        </span>
      </td>

      <td>
        <span
          className={`badge ${isActive ? "badge-success" : "badge-error"
            } badge-outline`}
        >
          {isActive ? "Aktif" : "Pasif"}
        </span>
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