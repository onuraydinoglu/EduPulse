import TableActions from "../../../components/ui/TableActions";

function OfficerTableRow({ officer, temporaryPassword, onEdit, onDelete }) {
  const fullName = `${officer.firstName || ""} ${officer.lastName || ""}`.trim();

  return (
    <tr>
      <td className="font-medium text-gray-900">{fullName}</td>
      <td>{officer.email || "-"}</td>
      <td>{officer.phoneNumber || "-"}</td>
      <td>
        <span className="rounded-lg bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
          {temporaryPassword || officer.password || officer.generatedPassword || "-"}
        </span>
      </td>
      <td>
        <span className="badge badge-success badge-outline">Aktif</span>
      </td>
      <td className="text-right">
        <TableActions
          onEdit={() => onEdit(officer)}
          onDelete={() => onDelete(officer.id)}
        />
      </td>
    </tr>
  );
}

export default OfficerTableRow;