import FormFields from "../../../components/common/FormFields";

const teacherFields = [
  { name: "firstName", label: "Ad", placeholder: "Örn: Ayşe" },
  { name: "lastName", label: "Soyad", placeholder: "Örn: Demir" }, {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Örn: ayse.demir@mail.com",
  },
  { name: "phoneNumber", label: "Telefon", placeholder: "Örn: 0555 123 45 67" },

];

function TeacherForm({ formData, setFormData, errors = {} }) {
  return (
    <div>
      {errors.general && (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
          {errors.general}
        </div>
      )}

      <FormFields
        fields={teacherFields}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />
    </div>
  );
}

export default TeacherForm;