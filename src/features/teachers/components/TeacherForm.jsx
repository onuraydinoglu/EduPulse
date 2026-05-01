import FormFields from "../../../components/common/FormFields";

function TeacherForm({
  formData,
  setFormData,
  errors = {},
  lessons = [],
  isEditing = false,
}) {
  const teacherFields = [
    { name: "firstName", label: "Ad", placeholder: "Örn: Ayşe" },
    { name: "lastName", label: "Soyad", placeholder: "Örn: Demir" },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Örn: ayse.demir@mail.com",
    },
    {
      name: "phoneNumber",
      label: "Telefon",
      placeholder: "Örn: 0555 123 45 67",
    },
    {
      name: "branchLessonId",
      label: "Branş",
      type: "select",
      options: [
        { value: "", label: "Branş seçiniz" },
        ...lessons.map((lesson) => ({
          value: lesson.id,
          label: lesson.name || lesson.lessonName,
        })),
      ],
    },
    {
      name: "department",
      label: "Departman",
      placeholder: "Eğer öğretmeniniz branşı yoksa mezun olduğu bölümü yazınız.",
    },
  ];

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
        isEditing={isEditing}
      />
    </div>
  );
}

export default TeacherForm;