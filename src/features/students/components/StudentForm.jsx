import FormInput from "../../../components/ui/FormInput";
import FormSelect from "../../../components/ui/FormSelect";

function StudentForm({ formData, setFormData }) {
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
        placeholder="Örn: Ali"
        value={formData.firstName}
        onChange={(value) => updateField("firstName", value)}
      />

      <FormInput
        label="Soyad"
        placeholder="Örn: Yıldız"
        value={formData.lastName}
        onChange={(value) => updateField("lastName", value)}
      />

      <FormSelect
        label="Sınıf"
        value={formData.className}
        onChange={(value) => updateField("className", value)}
        options={[
          { label: "9-A", value: "9-A" },
          { label: "9-B", value: "9-B" },
          { label: "10-A", value: "10-A" },
          { label: "10-B", value: "10-B" },
          { label: "11-A", value: "11-A" },
          { label: "11-B", value: "11-B" },
          { label: "12-A", value: "12-A" },
          { label: "12-B", value: "12-B" },
        ]}
      />

      <FormInput
        label="Kulüp"
        placeholder="Örn: Robotik"
        value={formData.club}
        onChange={(value) => updateField("club", value)}
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

export default StudentForm;