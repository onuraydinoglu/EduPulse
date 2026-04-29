import FormFields from "../../../components/common/FormFields";

const teacherFields = [
  { name: "firstName", label: "Ad", placeholder: "Örn: Ayşe" },
  { name: "lastName", label: "Soyad", placeholder: "Örn: Demir" },
  { name: "phoneNumber", label: "Telefon", placeholder: "Örn: 0555 555 55 55" },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Örn: ayse.demir@mail.com",
  },
];

function TeacherForm({ formData, setFormData }) {
  return (
    <FormFields
      fields={teacherFields}
      formData={formData}
      setFormData={setFormData}
    />
  );
}

export default TeacherForm;