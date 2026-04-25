import FormInput from "../../../components/ui/FormInput";
import FormSelect from "../../../components/ui/FormSelect";

function ExamForm({ formData, setFormData }) {
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormInput
        label="Sınav Adı"
        placeholder="Örn: TYT Deneme Sınavı"
        value={formData.name}
        onChange={(value) => updateField("name", value)}
      />

      <FormSelect
        label="Sınıf"
        value={formData.className}
        onChange={(value) => updateField("className", value)}
        options={[
          { label: "9. Sınıf", value: "9. Sınıf" },
          { label: "10. Sınıf", value: "10. Sınıf" },
          { label: "11. Sınıf", value: "11. Sınıf" },
          { label: "12. Sınıf", value: "12. Sınıf" },
        ]}
      />

      <FormInput
        label="Tarih"
        type="date"
        value={formData.date}
        onChange={(value) => updateField("date", value)}
      />

      <FormInput
        label="Ortalama"
        type="number"
        placeholder="Örn: 72"
        value={formData.average}
        onChange={(value) => updateField("average", value)}
      />
    </div>
  );
}

export default ExamForm;