import FormInput from "../../../components/ui/FormInput";

function OfficerForm({ formData, setFormData, }) {
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
        placeholder="Örn: Mehmet"
        value={formData.firstName}
        onChange={(value) => updateField("firstName", value)}
      />

      <FormInput
        label="Soyad"
        placeholder="Örn: Yılmaz"
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
        label="E-posta"
        type="email"
        placeholder="Örn: memur@okul.com"
        value={formData.email}
        onChange={(value) => updateField("email", value)}
      />
    </div>
  );
}

export default OfficerForm;