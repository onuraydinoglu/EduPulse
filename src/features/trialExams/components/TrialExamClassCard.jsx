function TrialExamClassCard({ classItem, isSelected, onClick }) {
  return (
    <button
      onClick={() => onClick(classItem.className)}
      className={`radius-card border p-5 text-left transition ${isSelected
          ? "border-blue-200 bg-blue-50 text-blue-700"
          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        }`}
    >
      <p className="text-sm font-medium opacity-70">Sınıf</p>

      <h3 className="mt-2 text-2xl font-semibold tracking-tight">
        {classItem.className}
      </h3>

      <div className="mt-4 flex justify-between text-sm">
        <span className="opacity-60">Öğrenci</span>
        <span className="font-semibold">{classItem.studentCount}</span>
      </div>
    </button>
  );
}

export default TrialExamClassCard;