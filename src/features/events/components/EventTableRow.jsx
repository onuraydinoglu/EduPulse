import { Link } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

import TableActions from "../../../components/ui/TableActions";
import {
    getEventDateText,
    getEventId,
    getEventLocation,
    getEventName,
    getEventPaymentText,
    getEventResponsibleTeacherNames,
    getEventStatusText,
    getEventTimeText,
} from "../utils/eventFormatters";

function EventTableRow({
    event,
    teachers = [],
    canManage = true,
    onEdit,
    onDelete,
}) {
    const eventId = getEventId(event);
    const teacherNames = getEventResponsibleTeacherNames(event, teachers);
    const statusText = getEventStatusText(event);

    return (
        <tr className="border-b border-base-200 transition hover:bg-base-200/40 [&_td]:px-6">
            <td>
                <div>
                    <p className="font-semibold text-base-content">
                        {getEventName(event)}
                    </p>

                    <p className="text-xs text-base-content/50">
                        {getEventLocation(event)}
                    </p>
                </div>
            </td>

            <td>
                <div>
                    <p className="text-sm font-medium text-base-content">
                        {getEventDateText(event)}
                    </p>

                    <p className="text-xs text-base-content/50">
                        {getEventTimeText(event)}
                    </p>
                </div>
            </td>

            <td>
                <span className="text-sm text-base-content/70">
                    {teacherNames.length > 0 ? teacherNames.join(", ") : "-"}
                </span>
            </td>

            <td>
                <span className="badge rounded-xl border-0 bg-blue-100 px-3 py-3 text-xs font-medium text-blue-700">
                    {getEventPaymentText(event)}
                </span>
            </td>

            <td>
                <span
                    className={`badge rounded-xl border-0 px-3 py-3 text-xs font-medium ${statusText === "Aktif"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                >
                    {statusText}
                </span>
            </td>

            <td>
                <Link
                    to={`/dashboard/events/${eventId}/members`}
                    className="btn btn-sm rounded-xl border-base-300 bg-base-100 text-base-content hover:border-primary hover:bg-primary hover:text-primary-content"
                >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    Etkinliğe Git
                </Link>
            </td>

            {canManage && (
                <td className="text-right">
                    <TableActions
                        onEdit={() => onEdit(event)}
                        onDelete={() => onDelete(eventId)}
                    />
                </td>
            )}
        </tr>
    );
}

export default EventTableRow;