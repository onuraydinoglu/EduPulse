import {
  EyeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

function ClubMemberTableRow({ club, onDetail }) {
  if (!club) return null;

  const clubName = club.name || club.Name || "İsimsiz Kulüp";

  const teacherName =
    club.advisorTeacherFullName ||
    club.AdvisorTeacherFullName ||
    club.teacherFullName ||
    club.TeacherFullName ||
    "Atanmamış";

  const memberCount = club.memberCount ?? club.MemberCount ?? 0;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md">
      <div className="absolute left-0 top-0 h-full w-1.5 bg-primary" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary">
            <UserGroupIcon className="h-6 w-6" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-base-content/35">
              KULÜP
            </p>

            <h3 className="mt-0.5 text-lg font-bold text-base-content">
              {clubName}
            </h3>
          </div>
        </div>

        <span className="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
          Aktif
        </span>
      </div>

      <div className="mt-5 space-y-2 text-sm">
        <p className="font-semibold text-base-content/80">
          Sorumlu Öğretmen:{" "}
          <span className="font-bold text-base-content">{teacherName}</span>
        </p>

        <p className="font-semibold text-base-content/80">
          Üye Sayısı:{" "}
          <span className="font-bold text-base-content">
            {memberCount} öğrenci
          </span>
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-base-300/70 pt-4">
        <span className="text-xs font-bold text-base-content/70">
          Kulüp işlemleri
        </span>

        <button
          type="button"
          className="btn btn-sm rounded-xl border-primary/20 bg-primary/10 text-primary hover:border-primary/30 hover:bg-primary/15"
          onClick={() => onDetail?.(club)}
        >
          <EyeIcon className="h-4 w-4" />
          Üyeleri Gör
        </button>
      </div>
    </div>
  );
}

export default ClubMemberTableRow;