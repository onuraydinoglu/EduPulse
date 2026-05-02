import FormSelect from "../../../components/ui/FormSelect";

function ClubMemberForm({ formData, setFormData, clubs = [], students = [] }) {
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clubOptions = clubs.map((club) => ({
    label: club.name || club.Name || "-",
    value: club.id || club.Id,
  }));

  const studentOptions = students.map((student) => ({
    label:
      student.fullName ||
      student.studentFullName ||
      student.userFullName ||
      `${student.firstName || ""} ${student.lastName || ""}`.trim() ||
      student.studentNumber ||
      "İsimsiz Öğrenci",
    value: student.id || student.Id,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormSelect
        label="Kulüp"
        value={formData.clubId}
        onChange={(value) => updateField("clubId", value)}
        options={clubOptions}
      />

      <FormSelect
        label="Öğrenci"
        value={formData.studentId}
        onChange={(value) => updateField("studentId", value)}
        options={studentOptions}
      />
    </div>
  );
}

export default ClubMemberForm;