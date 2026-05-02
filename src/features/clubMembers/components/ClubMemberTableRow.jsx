import TableActions from "../../../components/ui/TableActions";

function ClubMemberTableRow({ member, onDelete }) {
  const isActive = member.isActive ?? true;

  return (
    <tr className="hover:bg-base-200/60">
      <td className="font-medium">{member.clubName || "-"}</td>

      <td>{member.studentFullName || "-"}</td>

      <td>{member.studentNumber || "-"}</td>

      <td>{member.classroomName || "-"}</td>

      <td>
        <span
          className={`badge ${isActive ? "badge-success" : "badge-error"
            } badge-outline`}
        >
          {isActive ? "Aktif" : "Pasif"}
        </span>
      </td>

      <td className="text-right">
        <TableActions onEdit={null} onDelete={() => onDelete(member.id)} />
      </td>
    </tr>
  );
}

export default ClubMemberTableRow;