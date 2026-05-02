import ClubMemberTableRow from "./ClubMemberTableRow";

function ClubMemberTable({ clubs = [], onDetail }) {
  const safeClubs = Array.isArray(clubs) ? clubs.filter(Boolean) : [];

  if (safeClubs.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-base-300 bg-base-100 p-12 text-center text-base-content/60">
        Üyesi olan kulüp bulunamadı.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {safeClubs.map((club) => (
        <ClubMemberTableRow
          key={club.id || club.Id}
          club={club}
          onDetail={onDetail}
        />
      ))}
    </div>
  );
}

export default ClubMemberTable;