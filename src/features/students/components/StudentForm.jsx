import FormFields from "../../../components/common/FormFields";

import { getClassroomLabel } from "../utils/studentFormatters";

function StudentForm({
  formData,
  setFormData,
  classrooms = [],
  errors = {},
  lockedClassroomId = "",
  hideClassroomSelect = false,
}) {
  const preparedFormData = lockedClassroomId
    ? {
      ...formData,
      classroomId: lockedClassroomId,
    }
    : formData;

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
    {
      name: "studentNumber",
      label: "Öğrenci Numarası",
      placeholder: "Örn: 1001",
    },
    {
      name: "classroomId",
      label: "Sınıf",
      type: "select",
      placeholder: "Sınıf seçiniz",
      options: classrooms.map((classroom) => ({
        value: classroom.id || classroom.Id,
        label: getClassroomLabel(classroom),
      })),
    },
    {
      name: "motherFullName",
      label: "Anne Adı Soyadı",
      placeholder: "Örn: Ayşe Yıldız",
    },
    {
      name: "fatherFullName",
      label: "Baba Adı Soyadı",
      placeholder: "Örn: Mehmet Yıldız",
    },
    {
      name: "motherPhoneNumber",
      label: "Anne Telefon Numarası",
      placeholder: "Örn: 05555555555",
    },
    {
      name: "fatherPhoneNumber",
      label: "Baba Telefon Numarası",
      placeholder: "Örn: 05555555555",
    },
    {
      name: "address",
      label: "Adres",
      placeholder: "Örn: Atakum / Samsun",
    },
  ];

  const visibleFields = hideClassroomSelect
    ? studentFields.filter((field) => field.name !== "classroomId")
    : studentFields;

  return (
    <FormFields
      fields={visibleFields}
      formData={preparedFormData}
      setFormData={setFormData}
      errors={errors}
    />
  );
}

export default StudentForm;