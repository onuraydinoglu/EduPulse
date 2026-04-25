import FormInput from "../../../components/ui/FormInput";
import FormSelect from "../../../components/ui/FormSelect";
import { teachers } from "../../../data/mockData";

function ClassForm({ formData, setFormData }) {
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormSelect
        label="Sınıf Seviyesi"
        value={formData.grade}
        onChange={(value) => updateField("grade", value)}
        options={[
          { label: "9. Sınıf", value: "9" },
          { label: "10. Sınıf", value: "10" },
          { label: "11. Sınıf", value: "11" },
          { label: "12. Sınıf", value: "12" },
        ]}
      />

      <FormInput
        label="Şube"
        placeholder="Örn: A"
        value={formData.branch}
        onChange={(value) => updateField("branch", value.toUpperCase())}
      />

      <FormSelect
        label="Sınıf Öğretmeni"
        value={formData.teacher}
        onChange={(value) => updateField("teacher", value)}
        options={teachers.map((teacher) => ({
          label: teacher.fullName,
          value: teacher.fullName,
        }))}
        className="md:col-span-2"
      />
    </div>
  );
}

export default ClassForm;