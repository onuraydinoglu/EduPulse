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
    placeholder: "Örn: 05555555555",
  },
];

function StudentForm({ formData, setFormData }) {
  return (
    <FormFields
      fields={studentFields}
      formData={formData}
      setFormData={setFormData}
    />
  );
}

export default StudentForm;