import FormFields from "../../../components/common/FormFields";

const officerFields = [
  {
    name: "firstName",
    label: "Ad",
    placeholder: "Örn: Ahmet",
  },
  {
    name: "lastName",
    label: "Soyad",
    placeholder: "Örn: Yılmaz",
  },
  {
    name: "email",
    label: "E-posta",
    type: "email",
    placeholder: "memur@mail.com",
  },
  {
    name: "phoneNumber",
    label: "Telefon",
    placeholder: "0555 123 45 67",
  },
];

function OfficerForm({ formData, setFormData, errors }) {
  return (
    <div>
      {errors?.general && (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {errors.general}
        </div>
      )}

      <FormFields
        fields={officerFields}
        formData={formData}
        setFormData={setFormData}
        errors={errors} // ✅ kritik
      />
    </div>
  );
}

export default OfficerForm;