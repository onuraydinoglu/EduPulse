function ClubMemberForm({
  formData,
  setFormData,
  clubs = [],
  students = [],
  errors = {},
}) {
  const clubOptions = clubs.map((club) => ({
    value: club.id || club.Id,
    label: club.name || club.Name || "-",
  }));

  const studentOptions = students.map((student) => {
    const id = student.id || student.Id;

    const fullName =
      student.fullName ||
      student.FullName ||
      `${student.firstName || student.FirstName || ""} ${student.lastName || student.LastName || ""
        }`.trim();

    return {
      value: id,
      label: fullName || "-",
    };
  });

  return (
    <div className="grid gap-4">
      <div>
        <label className="label">
          <span className="label-text font-medium">Kulüp</span>
        </label>

        <select
          className={`select w-full rounded-xl border bg-white text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 ${errors.clubId ? "border-error" : "border-gray-200"
            }`}
          value={formData.clubId}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              clubId: e.target.value,
            }))
          }
        >
          <option value="">Kulüp seçiniz</option>

          {clubOptions.map((club) => (
            <option key={club.value} value={club.value}>
              {club.label}
            </option>
          ))}
        </select>

        {errors.clubId && (
          <p className="mt-1 text-xs text-error">{errors.clubId}</p>
        )}
      </div>

      <div>
        <label className="label">
          <span className="label-text font-medium">Öğrenci</span>
        </label>

        <select
          className={`select w-full rounded-xl border bg-white text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 ${errors.studentId ? "border-error" : "border-gray-200"
            }`}
          value={formData.studentId}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              studentId: e.target.value,
            }))
          }
        >
          <option value="">Öğrenci seçiniz</option>

          {studentOptions.map((student) => (
            <option key={student.value} value={student.value}>
              {student.label}
            </option>
          ))}
        </select>

        {errors.studentId && (
          <p className="mt-1 text-xs text-error">{errors.studentId}</p>
        )}
      </div>
    </div>
  );
}

export default ClubMemberForm;