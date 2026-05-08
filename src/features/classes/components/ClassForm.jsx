import FormFields from "../../../components/common/FormFields";

import { classGradeOptions } from "../constants/classConstants";
import { mapTeachersToOptions } from "../utils/classFormatters";

function ClassForm({ formData, setFormData, teachers = [], errors = {} }) {
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
        <div className="rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
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