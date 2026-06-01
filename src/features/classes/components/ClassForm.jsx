import FormFields from "../../../components/common/FormFields";

import { classGradeOptions, emptyClassForm } from "../constants/classConstants";

import { mapTeachersToOptions } from "../utils/classFormatters";

function ClassForm({
  formData = emptyClassForm,
  setFormData,
  teachers = [],
  errors = {},
}) {
  const safeFormData = formData || emptyClassForm;
  const teacherOptions = mapTeachersToOptions(teachers);

  const classFields = [
    {
      name: "grade",
      label: "Sınıf Seviyesi",
      type: "select",
      options: classGradeOptions,
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
        {
          label: "Öğretmen seçilmedi",
          value: "",
        },
        ...teacherOptions,
      ],
      className: "md:col-span-2",
    },
  ];

  return (
    <div className="space-y-4">
      {errors.general && (
        <div className="alert alert-error text-sm">{errors.general}</div>
      )}

      <FormFields
        fields={classFields}
        formData={safeFormData}
        setFormData={setFormData}
        errors={errors}
      />
    </div>
  );
}

export default ClassForm;
