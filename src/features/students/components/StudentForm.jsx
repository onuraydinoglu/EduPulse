import FormFields from "../../../components/common/FormFields";

import { getClassroomLabel } from "../utils/studentFormatters";

function StudentForm({
  formData,
  setFormData,
  classrooms = [],
  errors = {},
  isEditing = false,
}) {
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
      options: [
        {
          value: "",
          label: "Sınıf seçiniz",
        },
        ...classrooms.map((classroom) => ({
          value: classroom.id || classroom.Id,
          label: getClassroomLabel(classroom),
        })),
      ],
    },
  ];

  if (isEditing) {
    studentFields.push({
      name: "isActive",
      label: "Aktif mi?",
      type: "checkbox",
    });
  }

  return (
    <FormFields
      fields={studentFields}
      formData={formData}
      setFormData={setFormData}
      errors={errors}
    />
  );
}

export default StudentForm;