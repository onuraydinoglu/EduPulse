import FormFields from "../../../components/common/FormFields";

function ClassForm({ formData, setFormData, teachers = [], errors = {} }) {
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
    <div>
      {errors.general && (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
          {errors.general}
        </div>
      )}

      <FormFields
        fields={classFields}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />
    </div>
  );
}

export default ClassForm;