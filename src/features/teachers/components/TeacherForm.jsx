import FormInput from "../../../components/ui/FormInput";
import FormSelect from "../../../components/ui/FormSelect";

function TeacherForm({ formData, setFormData }) {
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormInput
        label="Ad"
        placeholder="Örn: Ayşe"
        value={formData.firstName}
        onChange={(value) => updateField("firstName", value)}
      />

      <FormInput
        label="Soyad"
        placeholder="Örn: Demir"
        value={formData.lastName}
        onChange={(value) => updateField("lastName", value)}
      />

      <FormInput
        label="Yaş"
        type="text"
        placeholder="Örn: 35"
        value={formData.age}
        onChange={(value) => updateField("age", value)}
      />

      <FormInput
        label="Branş"
        placeholder="Örn: Matematik"
        value={formData.branch}
        onChange={(value) => updateField("branch", value)}
      />

      <FormSelect
        label="Durum"
        value={formData.status}
        onChange={(value) => updateField("status", value)}
        options={[
          { label: "Aktif", value: "Aktif" },
          { label: "Pasif", value: "Pasif" },
        ]}
        className="md:col-span-2"
      />
    </div>
  );
}

export default TeacherForm;