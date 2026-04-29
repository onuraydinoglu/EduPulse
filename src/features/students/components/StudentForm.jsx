import FormFields from "../../../components/common/FormFields";

const studentFields = [
  {
    name: "firstName",
    label: "Ad",
    placeholder: "Örn: Ali",
  },
  {
    name: "lastName",
    label: "Soyad",
    placeholder: "Örn: Yıldız",
  },
  {
    name: "email",
    label: "E-posta",
    type: "email",
    placeholder: "Örn: ali.yildiz@test.com",
  },
  {
    name: "phoneNumber",
    label: "Telefon",
    placeholder: "Örn: 0555 123 45 67",
  },
];

function StudentForm({ formData, setFormData, errors = {} }) {
  return (
    <div>
      {/* 🔴 Backend / genel hata */}
      {errors.general && (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
          {errors.general}
        </div>
      )}

      <FormFields
        fields={studentFields}
        formData={formData}
        setFormData={setFormData}
        errors={errors} // ✅ KRİTİK
      />
    </div>
  );
}

export default StudentForm;