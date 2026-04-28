import FormInput from "../../../components/ui/FormInput";

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
        onChange={(value) => updateField("fullName", value)}
      />

      <FormInput
        label="Soyad"
        placeholder="Örn: Demir"
        value={formData.lastName}
        onChange={(value) => updateField("lastName", value)}
      />

      <FormInput
        label="Telefon"
        placeholder="Örn: 0555 555 55 55"
        value={formData.phoneNumber}
        onChange={(value) => updateField("phoneNumber", value)}
      />

      <FormInput
        label="Email"
        type="email"
        placeholder="Örn: ayse.demir@mail.com"
        value={formData.email}
        onChange={(value) => updateField("email", value)}
      />

      <FormInput
        label="Şifre"
        type="password"
        placeholder="Öğretmen giriş şifresi"
        value={formData.password}
        onChange={(value) => updateField("password", value)}
      />
    </div>
  );
}

export default TeacherForm;