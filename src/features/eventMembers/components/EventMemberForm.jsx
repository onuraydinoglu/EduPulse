import {
  getStudentFullName,
  getStudentId,
  getStudentNumber,
} from "../utils/eventMemberFormatters";

function EventMemberForm({
  formData,
  setFormData,
  students = [],
  errors = {},
}) {
  const studentOptions = students.map((student) => {
    const id = getStudentId(student);
    const fullName = getStudentFullName(student);
    const number = getStudentNumber(student);

    return {
      value: id,
      label: number ? `${fullName} - ${number}` : fullName,
    };
  });

  return (
    <div className="space-y-5">
      {errors.general && (
        <div className="alert alert-error rounded-2xl text-sm">
          {errors.general}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-base-content">
          Öğrenci
        </label>

        <select
          value={formData.studentId}
          onChange={(event) =>
            setFormData((prev) => ({
              ...prev,
              studentId: event.target.value,
            }))
          }
          className={`select select-bordered w-full rounded-xl ${errors.studentId ? "select-error" : ""
            }`}
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

      <div className="rounded-2xl border border-base-300 bg-base-200/40 p-4">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={formData.isPaid}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                isPaid: event.target.checked,
                paidAmount: event.target.checked ? prev.paidAmount : 0,
              }))
            }
            className="checkbox checkbox-primary"
          />

          <span className="text-sm font-medium text-base-content">
            Ödeme yapıldı
          </span>
        </label>

        {formData.isPaid && (
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-base-content">
              Ödenen Tutar
            </label>

            <input
              type="number"
              min="0"
              value={formData.paidAmount}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  paidAmount: event.target.value,
                }))
              }
              placeholder="0"
              className={`input input-bordered w-full rounded-xl ${errors.paidAmount ? "input-error" : ""
                }`}
            />

            {errors.paidAmount && (
              <p className="mt-1 text-sm text-error">{errors.paidAmount}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventMemberForm;