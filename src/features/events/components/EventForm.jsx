import FormInput from "../../../components/ui/FormInput";
import FormSelect from "../../../components/ui/FormSelect";
import ActiveCheckbox from "../../../components/ui/ActiveCheckbox";
import { eventPaymentOptions } from "../constants/eventConstants";
import { getTeacherSelectOptions } from "../utils/eventFormatters";

function EventForm({
  formData,
  setFormData,
  teachers = [],
  errors = {},
  isEditing = false,
}) {
  const updateField = (field, value) => {
    setFormData((prev) => {
      const next = {
        ...prev,
        [field]: value,
      };

      if (field === "isPaid" && value !== "true") {
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

  const teacherOptions = getTeacherSelectOptions(teachers);
  const isPaid = formData.isPaid === true || formData.isPaid === "true";

  return (
    <div className="space-y-4">
      {errors.general && (
        <div className="rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
          {errors.general}
        </div>
      )}

      <FormInput
        label="Etkinlik Adı"
        placeholder="Örn: Bilim Şenliği"
        value={formData.name}
        error={errors.name}
        onChange={(value) => updateField("name", value)}
      />

      <FormInput
        label="Etkinlik Yeri"
        placeholder="Örn: Konferans Salonu"
        value={formData.location}
        error={errors.location}
        onChange={(value) => updateField("location", value)}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <FormInput
          type="date"
          label="Etkinlik Tarihi"
          value={formData.eventDate}
          error={errors.eventDate}
          onChange={(value) => updateField("eventDate", value)}
        />

        <FormInput
          type="time"
          label="Etkinlik Saati"
          value={formData.startTime}
          error={errors.startTime}
          onChange={(value) => updateField("startTime", value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormSelect
          label="Ücret Durumu"
          value={String(formData.isPaid)}
          error={errors.isPaid}
          options={eventPaymentOptions}
          onChange={(value) => updateField("isPaid", value)}
        />

        {isPaid && (
          <FormInput
            type="number"
            label="Kişi Başı Ücret"
            placeholder="Örn: 250"
            value={formData.pricePerStudent}
            error={errors.pricePerStudent}
            onChange={(value) => updateField("pricePerStudent", value)}
          />
        )}
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-base-content">
            Sorumlu Öğretmenler
          </h4>

          <p className="text-xs text-base-content/50">
            Birden fazla öğretmen seçilebilir. Zorunlu değildir.
          </p>
        </div>

        {teacherOptions.length === 0 ? (
          <p className="rounded-xl bg-base-200 px-4 py-3 text-sm text-base-content/60">
            Aktif öğretmen bulunamadı.
          </p>
        ) : (
          <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
            {teacherOptions.map((teacher) => {
              const checked = formData.responsibleTeacherIds?.includes(
                teacher.value,
              );

              return (
                <label
                  key={teacher.value}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-base-300 px-4 py-3 transition hover:bg-base-200/60"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    checked={checked}
                    onChange={() => toggleTeacher(teacher.value)}
                  />

                  <span className="text-sm font-medium text-base-content">
                    {teacher.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {isEditing && (
        <ActiveCheckbox
          checked={formData.isActive === true || formData.isActive === "true"}
          onChange={(checked) => updateField("isActive", String(checked))}
        />
      )}
    </div>
  );
}

export default EventForm;
