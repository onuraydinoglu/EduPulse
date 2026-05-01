import { RectangleGroupIcon } from "@heroicons/react/24/outline";

import Card from "../../../components/ui/Card";
import TableActions from "../../../components/ui/TableActions";
import StatusBadge from "../../../components/ui/StatusBadge";

function ClassTableRow({ classItem, teacherName, onEdit, onDelete, onDetail }) {
  const isActive = classItem.isActive !== false;

  const className =
    classItem.name ||
    classItem.Name ||
    `${classItem.grade || classItem.Grade}. Sınıf ${classItem.section || classItem.Section
    }`;

  const studentCount = classItem.studentCount || classItem.StudentCount || 0;

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
              <RectangleGroupIcon className="h-6 w-6" />
            </div>

            <div className="mt-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/40">
                Sınıf
              </p>

              <h3 className="truncate text-lg font-bold text-base-content">
                {className || "İsimsiz Sınıf"}
              </h3>
            </div>
          </div>

          {/* 🔥 BURASI DEĞİŞTİ */}
          <StatusBadge status={isActive ? "Aktif" : "Pasif"} />
        </div>

        <div className="mt-5 space-y-2 text-sm">
          <p className="text-base-content/70">
            <span className="font-medium text-base-content">
              Sınıf Öğretmeni:
            </span>{" "}
            <span className=" text-base-content">
              {teacherName || "Atanmamış"}
            </span>
          </p>

          <p className="text-base-content/70">
            <span className="font-medium text-base-content">
              Öğrenci Sayısı:
            </span>{" "}
            <span className="text-base-content">
              {studentCount} öğrenci
            </span>
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-base-300/60 pt-4">
          <span className="text-xs font-medium text-base-content/45">
            Sınıf işlemleri
          </span>

          <TableActions
            onDetail={onDetail ? () => onDetail(classItem) : undefined}
            onEdit={() => onEdit?.(classItem)}
            onDelete={() => onDelete?.(classItem.id || classItem.Id)}
          />
        </div>
      </div>
    </Card>
  );
}

export default ClassTableRow;