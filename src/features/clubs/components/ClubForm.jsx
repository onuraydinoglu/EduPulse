import FormInput from "../../../components/ui/FormInput";
import FormSelect from "../../../components/ui/FormSelect";

import { clubStatusOptions } from "../constants/clubConstants";
import { getTeacherSelectOptions } from "../utils/clubFormatters";

function ClubForm({
  formData,
  setFormData,
  teachers = [],
  errors = {},
  isEditing = false,
}) {
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const teacherOptions = [
    {
      label: "Sorumlu öğretmen seçiniz",
      value: "",
    },
    ...getTeacherSelectOptions(teachers),
  ];

  return (
    <div className="space-y-4">
      {errors.general && (
        <div className="rounded-2xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
          {errors.general}
        </div>
      )}

      <FormInput
        label="Kulüp Adı"
        placeholder="Örn: Robotik Kulübü"
        value={formData.name}
        error={errors.name}
        onChange={(value) => updateField("name", value)}
      />

      <FormSelect
        label="Sorumlu Öğretmen"
        value={formData.advisorTeacherId}
        options={teacherOptions}
        error={errors.advisorTeacherId}
        onChange={(value) => updateField("advisorTeacherId", value)}
      />

      {isEditing && (
        <FormSelect
          label="Durum"
          value={String(formData.isActive)}
          options={clubStatusOptions}
          error={errors.isActive}
          onChange={(value) => updateField("isActive", value)}
        />
      )}
    </div>
  );
}

export default ClubForm;