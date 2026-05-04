import EventMemberTableRow from "./EventMemberTableRow.jsx";

function EventMemberTable({ events = [], onDetail }) {
  const safeEvents = Array.isArray(events) ? events.filter(Boolean) : [];

  if (safeEvents.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 p-10 text-center text-sm text-gray-500">
        Katılımcısı olan etkinlik bulunamadı.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {safeEvents.map((event) => {
        const id = event.id || event.Id;

        return (
          <EventMemberTableRow key={id} event={event} onDetail={onDetail} />
        );
      })}
    </div>
  );
}

export default EventMemberTable;