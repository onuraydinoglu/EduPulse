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
        onChange={(value) => updateField("firstName", value)}
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
        label="Okul Id"
        placeholder="SchoolId giriniz"
        value={formData.schoolId}
        onChange={(value) => updateField("schoolId", value)}
        className="md:col-span-2"
      />
    </div>
  );
}

export default TeacherForm;