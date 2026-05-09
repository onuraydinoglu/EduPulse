import StatusBadge from "../../../components/ui/StatusBadge";
import TableActions from "../../../components/ui/TableActions";

import {
    getExam1,
    getExam2,
    getExamAverageLabel,
    getExamClassroomName,
    getExamId,
    getExamLessonName,
    getExamProject,
    getExamStatus,
    getExamStudentFullName,
} from "../utils/examFormatters";

function ExamTableRow({ exam, onEdit, onDelete }) {
    const examId = getExamId(exam);

    return (
        <tr className="transition hover:bg-base-200/60">
            <td>
                <div>
                    <p className="font-semibold text-base-content">
                        {getExamStudentFullName(exam)}
                    </p>
                    <p className="text-xs text-base-content/50">
                        {getExamClassroomName(exam)}
                    </p>
                </div>
            </td>

            <td className="text-sm text-base-content/70">
                {getExamClassroomName(exam)}
            </td>

            <td className="text-sm font-medium text-base-content">
                {getExamLessonName(exam)}
            </td>

            <td>
                <div className="flex flex-wrap gap-1">
                    <span className="rounded-full bg-base-200 px-2 py-1 text-xs text-base-content/70">
                        S1: {getExam1(exam) || "-"}
                    </span>
                    <span className="rounded-full bg-base-200 px-2 py-1 text-xs text-base-content/70">
                        S2: {getExam2(exam) || "-"}
                    </span>
                    <span className="rounded-full bg-base-200 px-2 py-1 text-xs text-base-content/70">
                        Proje: {getExamProject(exam) || "-"}
                    </span>
                </div>
            </td>

            <td>
                <span className="font-semibold text-base-content">
                    {getExamAverageLabel(exam)}
                </span>
            </td>

            <td>
                <StatusBadge status={getExamStatus(exam)} />
            </td>

            <td>
                <TableActions
                    onEdit={() => onEdit(exam)}
                    onDelete={() => onDelete(examId)}
                />
            </td>
        </tr>
    );
}

export default ExamTableRow;