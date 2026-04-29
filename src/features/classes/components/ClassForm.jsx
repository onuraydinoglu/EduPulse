import FormFields from "../../../components/common/FormFields";

function ClassForm({ formData, setFormData, teachers = [] }) {
  const teacherOptions = teachers.map((teacher) => ({
    label:
      teacher.fullName ||
      `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim(),
    value: teacher.id,
  }));

  const classFields = [
    {
      name: "grade",
      label: "Sınıf Seviyesi",
      type: "select",
      options: [
        { label: "9. Sınıf", value: "9" },
        { label: "10. Sınıf", value: "10" },
        { label: "11. Sınıf", value: "11" },
        { label: "12. Sınıf", value: "12" },
      ],
    },
    {
      name: "section",
      label: "Şube",
      placeholder: "Örn: A",
      transform: (value) => value.toUpperCase(),
    },
    {
      name: "teacherId",
      label: "Sınıf Öğretmeni",
      type: "select",
      options: [
        { label: "Öğretmen seçilmedi", value: "" },
        ...teacherOptions,
      ],
      className: "md:col-span-2",
    },
  ];

  return (
    <FormFields
      fields={classFields}
      formData={formData}
      setFormData={setFormData}
    />
  );
}

export default ClassForm;