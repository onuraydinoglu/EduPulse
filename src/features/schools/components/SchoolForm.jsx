import FormInput from "../../../components/ui/FormInput";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return <p className="mt-1 text-xs font-medium text-rose-500">{message}</p>;
};

function SchoolForm({ formData, setFormData, errors = {} }) {
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <FormInput
          label="Okul Adı"
          placeholder="Örn: Atatürk Anadolu Lisesi"
          value={formData.name}
          onChange={(value) => updateField("name", value)}
        />
        <ErrorMessage message={errors.name} />
      </div>

      <div>
        <FormInput
          label="Şehir"
          placeholder="Örn: Samsun"
          value={formData.city}
          onChange={(value) => updateField("city", value)}
        />
        <ErrorMessage message={errors.city} />
      </div>

      <div>
        <FormInput
          label="İlçe"
          placeholder="Örn: İlkadım"
          value={formData.district}
          onChange={(value) => updateField("district", value)}
        />
        <ErrorMessage message={errors.district} />
      </div>

      <div>
        <FormInput
          label="Adres"
          placeholder="Okul adresi"
          value={formData.address}
          onChange={(value) => updateField("address", value)}
        />
        <ErrorMessage message={errors.address} />
      </div>

      <div>
        <FormInput
          label="E-posta"
          placeholder="Örn: okul@edupulse.com"
          value={formData.email}
          onChange={(value) => updateField("email", value)}
        />
        <ErrorMessage message={errors.email} />
      </div>

      <div>
        <FormInput
          label="Telefon"
          placeholder="Örn: 0362 000 00 00"
          value={formData.phoneNumber}
          onChange={(value) => updateField("phoneNumber", value)}
        />
        <ErrorMessage message={errors.phoneNumber} />
      </div>
    </div>
  );
}

export default SchoolForm;