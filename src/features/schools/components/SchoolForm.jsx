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

  const handlePhoneChange = (value) => {
    let cleaned = value.replace(/\D/g, "");

    cleaned = cleaned.slice(0, 11);

    if (cleaned.length > 0 && cleaned[0] !== "0") {
      cleaned = "0" + cleaned.slice(0, 10);
    }

    updateField("phoneNumber", cleaned);
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
          placeholder="Örn: Atakum"
          value={formData.district}
          onChange={(value) => updateField("district", value)}
        />
        <ErrorMessage message={errors.district} />
      </div>

      <div>
        <FormInput
          label="Adres"
          placeholder="Örn: Cumhuriyet Mah. 100. Sokak No:5"
          value={formData.address}
          onChange={(value) => updateField("address", value)}
        />
        <ErrorMessage message={errors.address} />
      </div>

      <div>
        <FormInput
          label="Telefon"
          placeholder="05xxxxxxxxx"
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
        />
        <ErrorMessage message={errors.phoneNumber} />
      </div>

      <div>
        <FormInput
          label="Email"
          placeholder="Örn: okul@example.com"
          value={formData.email}
          onChange={(value) => updateField("email", value)}
        />
        <ErrorMessage message={errors.email} />
      </div>

      <div className="md:col-span-2">
        <FormInput
          label="Müdür Adı"
          placeholder="Örn: Ahmet Yılmaz"
          value={formData.principalName}
          onChange={(value) => updateField("principalName", value)}
        />
        <ErrorMessage message={errors.principalName} />
      </div>
    </div>
  );
}

export default SchoolForm;