import { BookOpenIcon } from "@heroicons/react/24/outline";

import Card from "../../../components/ui/Card";
import TableActions from "../../../components/ui/TableActions";

function LessonTableRow({ lesson, onEdit, onDelete, onDetail }) {
  const isActive = lesson.isActive !== false;

  return (
    <Card
      hover={false}
      className="group relative overflow-hidden border border-base-300/70 bg-base-100 p-0 shadow-sm transition hover:border-primary/30 hover:bg-primary/[0.02]"
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-primary/70" />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
              <BookOpenIcon className="h-6 w-6" />
            </div>

            <div className="min-w-0 mt-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/40">
                Ders
              </p>

              <h3 className="truncate text-lg font-bold text-base-content">
                {lesson.name || lesson.Name || "İsimsiz Ders"}
              </h3>
            </div>
          </div>

          <span
            className={`shrink-0 inline-flex items-center rounded-xl border px-2.5 py-1 text-xs font-semibold ${isActive
              ? "border-success/30 bg-success/10 text-success"
              : "border-error/30 bg-error/10 text-error"
              }`}
          >
            {isActive ? "Aktif" : "Pasif"}
          </span>
        </div>



        <div className="mt-5 flex items-center justify-between rounded-xl py-3">
          <span className="text-xs font-medium text-base-content/50">
            Ders işlemleri
          </span>

          <TableActions
            onDetail={onDetail ? () => onDetail(lesson) : undefined}
            onEdit={() => onEdit?.(lesson)}
            onDelete={() => onDelete?.(lesson.id)}
          />
        </div>
      </div>
    </Card>
  );
}

export default LessonTableRow;