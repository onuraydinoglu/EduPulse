import FormInput from "../../../components/ui/FormInput";
import FormSelect from "../../../components/ui/FormSelect";

function ClubForm({ formData, setFormData, teachers = [] }) {
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const teacherOptions = teachers.map((teacher) => ({
    label:
      teacher.fullName ||
      teacher.userFullName ||
      teacher.teacherFullName ||
      teacher.name ||
      `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim() ||
      "İsimsiz Öğretmen",
    value: teacher.id,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormInput
        label="Kulüp Adı"
        placeholder="Örn: Robotik Kulübü"
        value={formData.name}
        onChange={(value) => updateField("name", value)}
      />

      <FormSelect
        label="Sorumlu Öğretmen"
        value={formData.advisorTeacherId}
        onChange={(value) => updateField("advisorTeacherId", value)}
        options={teacherOptions}
      />

      <FormSelect
        label="Durum"
        value={String(formData.isActive)}
        onChange={(value) => updateField("isActive", value === "true")}
        options={[
          { label: "Aktif", value: "true" },
          { label: "Pasif", value: "false" },
        ]}
      />
    </div>
  );
}

export default ClubForm;