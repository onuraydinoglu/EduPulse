import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  getEventDateText,
  getEventId,
  getEventLocation,
  getEventName,
  getEventPaymentText,
  getEventTimeText,
} from "../utils/eventFormatters";

function StudentJoinedEventsSection({ events = [] }) {
  return (
    <div className="mb-6 rounded-3xl border border-base-300/70 bg-base-100 p-5">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-base-content">
          Katıldığım Etkinlikler
        </h2>

        <p className="mt-1 text-sm text-base-content/50">
          Size atanmış etkinlikleri görüntüleyin.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-base-300 p-5 text-center">
          <p className="text-sm font-medium text-base-content/60">
            Henüz katıldığınız bir etkinlik bulunmuyor.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => {
            const eventId = getEventId(event);

            return (
              <div
                key={eventId}
                className="rounded-2xl border border-base-300/70 p-4 transition hover:border-primary/30"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-base-content">
                      {getEventName(event)}
                    </h3>

                    <p className="mt-1 text-sm text-base-content/50">
                      {getEventPaymentText(event)}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    Kayıtlı
                  </span>
                </div>
                <div className="flex w-full items-end justify-between gap-3">
                  <div className="min-w-0 space-y-1 text-sm text-base-content/55">
                    <p className="truncate">{getEventLocation(event)}</p>

                    <p>
                      {getEventDateText(event)} · {getEventTimeText(event)}
                    </p>
                  </div>

                  <Link
                    to={`/dashboard/events/${eventId}/members`}
                    className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    Detaya Git
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default StudentJoinedEventsSection;
