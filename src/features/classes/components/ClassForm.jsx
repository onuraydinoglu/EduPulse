import FormInput from "../../../components/ui/FormInput";
import FormSelect from "../../../components/ui/FormSelect";

function ClassForm({ formData, setFormData, teachers = [] }) {
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
        value={formData.section}
        onChange={(value) => updateField("section", value.toUpperCase())}
      />

      <FormSelect
        label="Sınıf Öğretmeni"
        value={formData.teacherId}
        onChange={(value) => updateField("teacherId", value)}
        options={[
          { label: "Öğretmen seçilmedi", value: "" },
          ...teachers.map((teacher) => ({
            label:
              teacher.fullName ||
              `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim(),
            value: teacher.id,
          })),
        ]}
        className="md:col-span-2"
      />
    </div>
  );
}

export default ClassForm;