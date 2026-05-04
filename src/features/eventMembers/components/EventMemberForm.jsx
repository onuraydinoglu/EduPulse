function EventMemberForm({
  formData,
  setFormData,
  events = [],
  students = [],
  errors = {},
}) {
  const eventOptions = events.map((event) => ({
    value: event.id || event.Id,
    label: event.name || event.Name || event.title || event.Title || "-",
  }));

  const studentOptions = students.map((student) => {
    const id = student.id || student.Id;

    const fullName =
      student.fullName ||
      student.FullName ||
      `${student.firstName || student.FirstName || ""} ${student.lastName || student.LastName || ""
        }`.trim();

    const number = student.studentNumber || student.StudentNumber || "";

    return {
      value: id,
      label: number ? `${fullName} - ${number}` : fullName || "-",
    };
  });

  return (
    <div className="space-y-4">
      <div>
        <label className="label">
          <span className="label-text font-medium">Etkinlik</span>
        </label>

        <select
          className="select select-bordered w-full"
          value={formData.eventId}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              eventId: e.target.value,
            }))
          }
        >
          <option value="">Etkinlik seçiniz</option>

          {eventOptions.map((event) => (
            <option key={event.value} value={event.value}>
              {event.label}
            </option>
          ))}
        </select>

        {errors.eventId && (
          <p className="mt-1 text-sm text-error">{errors.eventId}</p>
        )}
      </div>

      <div>
        <label className="label">
          <span className="label-text font-medium">Öğrenci</span>
        </label>

        <select
          className="select select-bordered w-full"
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
          <p className="mt-1 text-sm text-error">{errors.studentId}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex items-center gap-3 rounded-xl border border-base-300 bg-base-100 p-4">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={formData.isPaid}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isPaid: e.target.checked,
              }))
            }
          />
          <span className="text-sm font-medium">Ödeme yapıldı</span>
        </label>

        <div>
          <label className="label">
            <span className="label-text font-medium">Ödenen Tutar</span>
          </label>

          <input
            type="number"
            min="0"
            className="input input-bordered w-full"
            value={formData.paidAmount}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                paidAmount: e.target.value,
              }))
            }
            placeholder="0"
          />

          {errors.paidAmount && (
            <p className="mt-1 text-sm text-error">{errors.paidAmount}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventMemberForm;