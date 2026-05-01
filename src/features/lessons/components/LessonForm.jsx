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
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {errors.general}
        </div>
      )}

      <FormFields
        fields={lessonFields}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        isEditing={isEditing}
      />
    </>
  );
}

export default LessonForm;