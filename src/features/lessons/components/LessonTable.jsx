import LessonTableRow from "./LessonTableRow";

function LessonTable({ lessons, onEdit, onDelete, onDetail }) {
  if (!lessons || lessons.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-base-300 bg-base-100 p-12 text-center text-base-content/60">
        Ders kaydı bulunamadı.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {lessons.map((lesson) => (
        <LessonTableRow
          key={lesson.id}
          lesson={lesson}
          onEdit={onEdit}
          onDelete={onDelete}
          onDetail={onDetail}
        />
      ))}
    </div>
  );
}

export default LessonTable;