import {
    CalendarDaysIcon,
    InformationCircleIcon,
    UserIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";

import StatCard from "../../../components/ui/StatCard";

import {
    getEventDateText,
    getEventLocation,
    getEventName,
    getEventPaymentTypeText,
    getEventPriceText,
    getEventResponsibleTeacherName,
    getEventTimeText,
} from "../utils/eventMemberFormatters";

function EventInfoCard({ event }) {
    return (
        <div className="rounded-3xl border border-success/20 bg-success/10 p-5 shadow-sm">
            <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-success/15 text-success">
                    <InformationCircleIcon className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                    <div className="mt-2 space-y-1 text-sm text-base-content">
                        <p>
                            <span className="font-semibold">Yer:</span>{" "}
                            {getEventLocation(event)}
                        </p>

                        <p>
                            <span className="font-semibold">Tarih:</span>{" "}
                            {getEventDateText(event)}
                        </p>

                        <p>
                            <span className="font-semibold">Saat:</span>{" "}
                            {getEventTimeText(event)}
                        </p>

                        <p>
                            <span className="font-semibold">Ücret:</span>{" "}
                            {getEventPaymentTypeText(event)}
                            {getEventPaymentTypeText(event) === "Ücretli" && (
                                <span className="ml-1 text-base-content/70">
                                    ({getEventPriceText(event)})
                                </span>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EventMemberStatsCards({ event, members = [] }) {
    return (
        <div className="grid gap-4 md:grid-cols-4">
            <StatCard
                title="Etkinlik"
                value={getEventName(event)}
                description="Aktif etkinlik alanı"
                icon={CalendarDaysIcon}
                color="info"
            />

            <StatCard
                title="Sorumlu"
                value={getEventResponsibleTeacherName(event)}
                description="Etkinlik sorumlusu"
                icon={UserIcon}
                color="warning"
            />

            <StatCard
                title="Katılımcı"
                value={members.length}
                description="Bu etkinliğe kayıtlı öğrenci sayısı"
                icon={UsersIcon}
                color="primary"
            />

            <EventInfoCard event={event} />
        </div>
    );
}

export default EventMemberStatsCards;