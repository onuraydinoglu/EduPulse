import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  PencilSquareIcon,
  TrashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

function EventCard({ event, onEdit, onDelete }) {
  const id = event.id || event.Id;

  const name = event.name || event.Name || "İsimsiz Etkinlik";
  const location = event.location || event.Location || "-";
  const eventDate = event.eventDate || event.EventDate || "";
  const startTime = event.startTime || event.EventTime || "";
  const isPaid = event.isPaid ?? event.IsPaid ?? false;
  const pricePerStudent = event.pricePerStudent ?? event.PricePerStudent ?? 0;
  const isActive = event.isActive ?? event.IsActive ?? true;

  const teachers =
    event.responsibleTeacherNames ||
    event.ResponsibleTeacherNames ||
    event.teacherNames ||
    event.TeacherNames ||
    [];

  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString("tr-TR")
    : "-";

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-950">{name}</h3>

            <span
              className={`badge badge-outline ${isActive ? "badge-success" : "badge-error"
                }`}
            >
              {isActive ? "Aktif" : "Pasif"}
            </span>

            <span
              className={`badge ${isPaid ? "badge-warning" : "badge-info"
                } badge-outline`}
            >
              {isPaid ? `${pricePerStudent} ₺` : "Ücretsiz"}
            </span>
          </div>

          <div className="mt-4 grid gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="h-4 w-4 text-blue-500" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-blue-500" />
              <span>{startTime || "-"}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-blue-500" />
              <span>{location}</span>
            </div>

            <div className="flex items-start gap-2">
              <UserGroupIcon className="mt-0.5 h-4 w-4 text-blue-500" />
              <span>
                {Array.isArray(teachers) && teachers.length > 0
                  ? teachers.join(", ")
                  : "Sorumlu öğretmen atanmadı"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(event)}
            className="btn btn-ghost btn-sm rounded-xl"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(id)}
            className="btn btn-ghost btn-sm rounded-xl text-error"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;