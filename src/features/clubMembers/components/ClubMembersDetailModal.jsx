import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";

function ClubMembersDetailModal({
  club,
  members = [],
  loading = false,
  onClose,
  onDelete,
}) {
  const clubName = club?.name || club?.Name || "Kulüp";

  return (
    <dialog id="club_members_detail_modal" className="modal">
      <div className="modal-box max-w-3xl rounded-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">
              Kulüp Üyeleri
            </p>

            <h3 className="mt-1 text-xl font-bold">
              {clubName}
            </h3>
          </div>

          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-base-300 bg-base-100 p-8 text-center text-base-content/60">
            Üyeler yükleniyor...
          </div>
        ) : members.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 p-8 text-center text-base-content/60">
            Bu kulüpte henüz öğrenci yok.
          </div>
        ) : (
          <div className="space-y-3">
            {members.map((member) => {
              const id = member.id || member.Id;

              const fullName =
                member.studentFullName ||
                member.StudentFullName ||
                member.studentName ||
                member.StudentName ||
                member.fullName ||
                member.FullName ||
                "-";

              const number =
                member.studentNumber ||
                member.StudentNumber ||
                member.number ||
                member.Number ||
                "-";

              return (
                <div
                  key={id}
                  className="flex items-center justify-between rounded-2xl border border-base-300 bg-base-100 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-base-content">
                      {fullName}
                    </p>
                    <p className="text-sm text-base-content/55">
                      Öğrenci No: {number}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-ghost btn-sm text-error"
                    onClick={() => onDelete?.(id)}
                    disabled={!id}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Kapat
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}

export default ClubMembersDetailModal;