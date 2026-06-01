import FormFields from "../../../components/common/FormFields";

const lessonFields = [
  {
    name: "name",
    label: "Ders Adı",
    placeholder: "Örn: Matematik",
  },
];

function LessonForm({ formData, setFormData, errors = {} }) {
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
    </>
  );
}

export default LessonForm;
