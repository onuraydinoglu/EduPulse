import TableActions from "../../../components/ui/TableActions";

function ExamTableRow({ exam, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-base-200/60">
      <td>
        <div>
          <p className="font-semibold">{exam.name}</p>
          <p className="text-xs text-base-content/50">{exam.date}</p>
        </div>
      </td>

      <td>
        <span className="badge badge-primary rounded-lg">
          {exam.className}
        </span>
      </td>

      <td>
        <div className="flex items-center gap-3">
          <progress
            className="progress progress-primary w-28"
            value={exam.average}
            max="100"
          ></progress>

          <span className="text-sm font-semibold">
            %{exam.average}
          </span>
        </div>
      </td>

      <td className="text-right">
        <TableActions
          onEdit={() => onEdit(exam)}
          onDelete={() => onDelete(exam.id)}
        />
      </td>
    </tr>
  );
}

export default ExamTableRow;