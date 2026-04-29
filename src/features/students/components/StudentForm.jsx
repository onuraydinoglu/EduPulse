import FormInput from "../../../components/ui/FormInput";

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

      <FormInput
        label="E-posta"
        placeholder="Örn: ali.yildiz@test.com"
        value={formData.email}
        onChange={(value) => updateField("email", value)}
      />

      <FormInput
        label="Telefon"
        placeholder="Örn: 05555555555"
        value={formData.phoneNumber}
        onChange={(value) => updateField("phoneNumber", value)}
      />
    </div>
  );
}

export default StudentForm;