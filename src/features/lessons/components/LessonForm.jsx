import FormFields from "../../../components/common/FormFields";

const lessonFields = [
  {
    name: "name",
    label: "Ders Adı",
    placeholder: "Örn: Matematik",
  },
];

function LessonForm({ formData, setFormData, errors = {}, isEditing = false }) {
  return (
    <>
      {errors?.general && (
        <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {errors.general}
        </div>
      )}

      <FormFields
        fields={lessonFields}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      {isEditing && (
        <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={formData.isActive}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                isActive: event.target.checked,
              }))
            }
          />

          <div>
            <p className="text-sm font-semibold text-gray-700">Aktif Ders</p>
            <p className="text-xs text-gray-500">
              Pasife alınan dersler listede pasif olarak görünür.
            </p>
          </div>
        </label>
      )}
    </>
  );
}

export default LessonForm;