import FormFields from "../../../components/common/FormFields";

import {
  classGradeOptions,
  classStatusOptions,
} from "../constants/classConstants";

import { mapTeachersToOptions } from "../utils/classFormatters";

function ClassForm({
  formData,
  setFormData,
  teachers = [],
  errors = {},
  isEditing = false,
}) {
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

  const handleStatusChange = (event) => {
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      isActive: value === "true",
    }));
  };

  return (
    <div className="space-y-4">
      {errors.general && (
        <div className="alert alert-error text-sm">{errors.general}</div>
      )}

      <FormFields
        fields={classFields}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      {isEditing && (
        <div className="form-control">
          <label className="label">
            <span className="label-text">Durum</span>
          </label>

          <select
            className="select select-bordered w-full"
            value={String(formData.isActive ?? true)}
            onChange={handleStatusChange}
          >
            {classStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {errors.isActive && (
            <span className="mt-1 text-xs text-error">{errors.isActive}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default ClassForm;