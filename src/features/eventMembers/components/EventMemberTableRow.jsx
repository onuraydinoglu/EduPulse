import {
  CalendarDaysIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import Button from "../../../components/ui/Button";

function EventMemberTableRow({ event, onDetail }) {
  const id = event.id || event.Id;
  const name = event.name || event.Name || event.title || event.Title || "-";
  const location = event.location || event.Location || "-";
  const memberCount = event.memberCount ?? event.MemberCount ?? 0;
  const isPaidEvent = event.isPaid ?? event.IsPaid ?? false;
  const price = event.price ?? event.Price ?? 0;

  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <CalendarDaysIcon className="h-6 w-6" />
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-900">{name}</h3>

            <p className="mt-1 text-sm text-gray-500">Konum: {location}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-base-200 px-3 py-1 text-xs font-medium text-gray-600">
                <UserGroupIcon className="h-4 w-4" />
                {memberCount} öğrenci
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-base-200 px-3 py-1 text-xs font-medium text-gray-600">
                <CurrencyDollarIcon className="h-4 w-4" />
                {isPaidEvent ? `${price} ₺` : "Ücretsiz"}
              </span>
            </div>
          </div>
        </div>

        <Button size="sm" onClick={() => onDetail(event)} disabled={!id}>
          Öğrenciler
        </Button>
      </div>
    </div>
  );
}

export default EventMemberTableRow;