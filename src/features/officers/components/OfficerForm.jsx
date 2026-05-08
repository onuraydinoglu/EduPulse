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

function OfficerForm({ formData, setFormData, errors = {}, isEditing = false }) {
  return (
    <div className="space-y-4">
      {errors?.general && (
        <div className="rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
          {errors.general}
        </div>
      )}

      <FormFields
        fields={officerFields}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        isEditing={isEditing}
      />
    </div>
  );
}

export default OfficerForm;