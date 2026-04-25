import FormInput from "../../../components/ui/FormInput";
import FormSelect from "../../../components/ui/FormSelect";

function SchoolForm({ formData, setFormData }) {
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormInput
        label="Okul Adı"
        placeholder="Örn: Atatürk Anadolu Lisesi"
        value={formData.name}
        onChange={(value) => updateField("name", value)}
      />

      <FormInput
        label="Şehir"
        placeholder="Örn: Samsun"
        value={formData.city}
        onChange={(value) => updateField("city", value)}
      />

      <FormInput
        label="Müdür"
        placeholder="Örn: Ahmet Yılmaz"
        value={formData.principal}
        onChange={(value) => updateField("principal", value)}
      />

      <FormInput
        label="Öğrenci Sayısı"
        type="number"
        placeholder="Örn: 420"
        value={formData.studentCount}
        onChange={(value) => updateField("studentCount", value)}
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

export default SchoolForm;