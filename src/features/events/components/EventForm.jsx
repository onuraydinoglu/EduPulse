import FormInput from "../../../components/ui/FormInput";
import FormSelect from "../../../components/ui/FormSelect";

function EventForm({
  formData,
  setFormData,
  teachers = [],
  isEditing = false,
}) {
  const teacherOptions = teachers.map((teacher) => ({
    value: teacher.id || teacher.Id,
    label:
      teacher.fullName ||
      teacher.FullName ||
      `${teacher.firstName || teacher.FirstName || ""} ${teacher.lastName || teacher.LastName || ""
        }`.trim(),
  }));

  const handleChange = (name, value) => {
    setFormData((prev) => {
      const next = { ...prev, [name]: value };

      if (name === "isPaid" && value === false) {
        next.pricePerStudent = "";
      }

      return next;
    });
  };

  const toggleTeacher = (teacherId) => {
    setFormData((prev) => {
      const current = prev.responsibleTeacherIds || [];
      const exists = current.includes(teacherId);

      return {
        ...prev,
        responsibleTeacherIds: exists
          ? current.filter((id) => id !== teacherId)
          : [...current, teacherId],
      };
    });
  };

  return (
    <div className="space-y-4">
      <FormInput
        label="Etkinlik Adı"
        placeholder="Örn: Bilim Gezisi"
        value={formData.name}
        onChange={(value) => handleChange("name", value)}
      />

      <FormInput
        label="Etkinlik Yeri"
        placeholder="Örn: Konferans Salonu"
        value={formData.location}
        onChange={(value) => handleChange("location", value)}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <FormInput
          label="Tarih"
          type="date"
          value={formData.eventDate}
          onChange={(value) => handleChange("eventDate", value)}
        />

        <FormInput
          label="Saat"
          type="time"
          value={formData.startTime}
          onChange={(value) => handleChange("startTime", value)}
        />
      </div>

      <FormSelect
        label="Ücret Durumu"
        value={formData.isPaid ? "paid" : "free"}
        onChange={(value) => handleChange("isPaid", value === "paid")}
        options={[
          { label: "Ücretsiz", value: "free" },
          { label: "Ücretli", value: "paid" },
        ]}
      />

      {formData.isPaid && (
        <FormInput
          label="Kişi Başı Ücret"
          type="number"
          placeholder="Örn: 250"
          value={formData.pricePerStudent}
          onChange={(value) => handleChange("pricePerStudent", value)}
        />
      )}

      <div>
        <label className="label">
          <span className="label-text font-medium">Sorumlu Öğretmenler</span>
        </label>

        <div className="max-h-48 space-y-2 overflow-y-auto rounded-xl border border-gray-200 bg-white p-3">
          {teacherOptions.length === 0 ? (
            <p className="text-sm text-gray-500">Öğretmen bulunamadı.</p>
          ) : (
            teacherOptions.map((teacher) => (
              <label
                key={teacher.value}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-blue-50"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  checked={(formData.responsibleTeacherIds || []).includes(
                    teacher.value,
                  )}
                  onChange={() => toggleTeacher(teacher.value)}
                />
                <span className="text-sm font-medium text-gray-700">
                  {teacher.label}
                </span>
              </label>
            ))
          )}
        </div>

        <p className="mt-1 text-xs text-gray-400">
          Sorumlu öğretmen zorunlu değil, daha sonra da atanabilir.
        </p>
      </div>

      {isEditing && (
        <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-sm"
            checked={formData.isActive}
            onChange={(e) => handleChange("isActive", e.target.checked)}
          />
          <span className="text-sm font-medium text-gray-700">
            Etkinlik aktif
          </span>
        </label>
      )}
    </div>
  );
}

export default EventForm;