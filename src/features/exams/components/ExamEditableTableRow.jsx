import {
    ArrowPathIcon,
    CheckIcon,
} from "@heroicons/react/24/outline";

import { examGradeFields } from "../constants/examConstants";

function ExamEditableTableRow({
    row,
    onGradeChange,
    onSave,
    onReset,
    isSaving = false,
    error = "",
}) {
    const averageColor =
        Number(row.average || 0) >= 50
            ? "text-success"
            : Number(row.average || 0) > 0
                ? "text-error"
                : "text-base-content/50";

    return (
        <>
            <tr className="transition hover:bg-base-200/60">
                <td>
                    <div>
                        <p className="font-semibold text-base-content">
                            {row.studentFullName}
                        </p>
                        <p className="text-xs text-base-content/50">
                            No: {row.studentNumber}
                        </p>
                    </div>
                </td>

                {examGradeFields.map((field) => (
                    <td key={field.key}>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={row[field.key] ?? ""}
                            onChange={(event) =>
                                onGradeChange(row.studentId, field.key, event.target.value)
                            }
                            className="input input-sm input-bordered w-20 rounded-xl text-center focus:border-primary focus:outline-none"
                            placeholder="0"
                        />
                    </td>
                ))}

                <td>
                    <span className={`font-bold ${averageColor}`}>
                        {row.averageLabel}
                    </span>
                </td>

                <td>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            disabled={isSaving}
                            onClick={() => onSave(row)}
                            className="btn btn-sm rounded-xl bg-primary text-primary-content hover:bg-primary/90"
                        >
                            {isSaving ? (
                                <span className="loading loading-spinner loading-xs" />
                            ) : (
                                <CheckIcon className="h-4 w-4" />
                            )}
                            Kaydet
                        </button>

                        {row.isDirty && (
                            <button
                                type="button"
                                disabled={isSaving}
                                onClick={() => onReset(row.studentId)}
                                className="btn btn-ghost btn-sm rounded-xl text-base-content/60"
                            >
                                <ArrowPathIcon className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </td>
            </tr>

            {error && (
                <tr>
                    <td colSpan={9} className="bg-error/5 px-4 py-2 text-sm text-error">
                        {error}
                    </td>
                </tr>
            )}
        </>
    );
}

export default ExamEditableTableRow;