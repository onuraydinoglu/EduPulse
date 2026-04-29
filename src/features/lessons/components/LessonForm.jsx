import FormFields from "../../../components/common/FormFields";

const lessonFields = [
  {
    name: "name",
    label: "Ders Adı",
    placeholder: "Örn: Matematik",
  },
];

function LessonForm({ formData, setFormData, errors }) {
  return (
    <FormFields
      fields={lessonFields}
      formData={formData}
      setFormData={setFormData}
      errors={errors}
    />
  );
}

export default LessonForm;