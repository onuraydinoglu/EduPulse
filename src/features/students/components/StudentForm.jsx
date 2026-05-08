import FormFields from "../../../components/common/FormFields";

function StudentForm({
  formData,
  setFormData,
  classrooms = [],
  errors = {},
  isEditing = false,
  lockedClassroomId = "",
  hideClassroomSelect = false,
}) {
  const classroomOptions = [
    { value: "", label: "Sınıf seçiniz" },
    ...classrooms.map((classroom) => ({
      value: classroom.id,
      label:
        classroom.name ||
        classroom.className ||
        `${classroom.grade || ""}/${classroom.section || ""}`,
    })),
  ];

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
      options: classroomOptions,
    },
  ];

  const visibleFields = hideClassroomSelect
    ? studentFields.filter((field) => field.name !== "classroomId")
    : studentFields;

  const preparedFormData = lockedClassroomId
    ? { ...formData, classroomId: lockedClassroomId }
    : formData;

  return (
    <FormFields
      fields={visibleFields}
      formData={preparedFormData}
      setFormData={setFormData}
      errors={errors}
      isEditing={isEditing}
    />
  );
}

export default StudentForm;