function TrialExamClassCard({ classItem, isSelected, onClick }) {
  return (
    <button
      onClick={() => onClick(classItem.className)}
      className={`rounded-2xl border p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${isSelected
          ? "border-primary bg-primary text-primary-content"
          : "border-base-300 bg-base-100"
        }`}
    >
      <p className="text-sm opacity-70">Sınıf</p>
      <h3 className="mt-1 text-2xl font-bold">{classItem.className}</h3>

      <div className="mt-4 flex justify-between text-sm">
        <span>Öğrenci</span>
        <span className="font-semibold">{classItem.studentCount}</span>
      </div>
    </button>
  );
}

export default TrialExamClassCard;