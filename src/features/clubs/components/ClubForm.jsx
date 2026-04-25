import FormInput from "../../../components/ui/FormInput";
import FormSelect from "../../../components/ui/FormSelect";
import { teachers } from "../../../data/mockData";

function ClubForm({ formData, setFormData }) {
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
        value={formData.teacher}
        onChange={(value) => updateField("teacher", value)}
        options={teachers.map((teacher) => ({
          label: teacher.fullName,
          value: teacher.fullName,
        }))}
      />

      <FormInput
        label="Öğrenci Sayısı"
        type="number"
        placeholder="Örn: 24"
        value={formData.studentCount}
        onChange={(value) => updateField("studentCount", value)}
      />

      <FormSelect
        label="Durum"
        value={formData.status}
        onChange={(value) => updateField("status", value)}
        options={[
          { label: "Aktif", value: "Aktif" },
          { label: "Pasif", value: "Pasif" },
        ]}
      />
    </div>
  );
}

export default ClubForm;