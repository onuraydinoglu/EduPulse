import TableActions from "../../../components/ui/TableActions";

function TeacherTableRow({ teacher, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-base-200/60">
      <td>
        <div>
          <p className="font-semibold">{teacher.fullName}</p>
        </div>
      </td>

      <td>
        <span>{teacher.branch}</span>
      </td>

      <td>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          {teacher.className || "Sınıf Atanmadı"}
        </span>
      </td>

      <td>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${teacher.status === "Aktif"
            ? "bg-emerald-50 text-emerald-600"
            : "bg-rose-50 text-rose-600"
            }`}
        >
          {teacher.status}
        </span>
      </td>

      <td className="text-right">
        <TableActions
          onEdit={() => onEdit(teacher)}
          onDelete={() => onDelete(teacher.id)}
        />
      </td>
    </tr>
  );
}

export default TeacherTableRow;