import { BookOpenIcon } from "@heroicons/react/24/outline";

import Card from "../../../components/ui/Card";
import TableActions from "../../../components/ui/TableActions";
import StatusBadge from "../../../components/ui/StatusBadge";

function LessonTableRow({ lesson, index = 0, onEdit, onDelete, onDetail }) {
  const lessonId = lesson.id || lesson.Id;
  const lessonName = lesson.name || lesson.Name || "İsimsiz Ders";
  const isActive = lesson.isActive !== false && lesson.IsActive !== false;

  const accentColors = [
    "bg-primary/70",
    "bg-secondary/70",
    "bg-accent/70",
    "bg-success/70",
    "bg-warning/70",
    "bg-info/70",
    "bg-error/70",
  ];

  const iconColors = [
    "bg-primary/10 text-primary ring-primary/15",
    "bg-secondary/10 text-secondary ring-secondary/15",
    "bg-accent/10 text-accent ring-accent/15",
    "bg-success/10 text-success ring-success/15",
    "bg-warning/10 text-warning ring-warning/15",
    "bg-info/10 text-info ring-info/15",
    "bg-error/10 text-error ring-error/15",
  ];

  const currentAccentColor = accentColors[index % accentColors.length];
  const currentIconColor = iconColors[index % iconColors.length];

  return (
    <Card
      hover={false}
      className="group relative overflow-hidden border border-base-300/70 bg-base-100 p-0 shadow-sm transition hover:border-primary/30 hover:bg-primary/[0.02]"
    >
      <div
        className={`absolute left-0 top-0 h-full w-1 ${currentAccentColor}`}
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-3">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${currentIconColor}`}
            >
              <BookOpenIcon className="h-6 w-6" />
            </div>

            <div className="mt-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/40">
                Ders
              </p>

              <h3 className="truncate text-lg font-bold text-base-content">
                {lessonName}
              </h3>
            </div>
          </div>

          <StatusBadge
            status={isActive ? "Aktif" : "Pasif"}
            variant="soft"
          />
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-base-300/60 pt-4">
          <span className="text-xs font-medium text-base-content/45">
            Ders işlemleri
          </span>

          <TableActions
            onDetail={onDetail ? () => onDetail(lesson) : undefined}
            onEdit={() => onEdit?.(lesson)}
            onDelete={() => onDelete?.(lessonId)}
          />
        </div>
      </div>
    </Card>
  );
}

export default LessonTableRow;