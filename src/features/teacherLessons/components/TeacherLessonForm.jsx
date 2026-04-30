import FormSelect from "../../../components/ui/FormSelect";

function TeacherLessonForm({
  formData,
  setFormData,
  teachers = [],
  lessons = [],
  classrooms = [],
  onSubmit,
  isEdit = false,
}) {
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const teacherOptions = teachers.map((teacher) => ({
    value: teacher.id,
    label: `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim(),
  }));

  const lessonOptions = lessons.map((lesson) => ({
    value: lesson.id,
    label: lesson.name || lesson.lessonName || "-",
  }));

  const classroomOptions = classrooms.map((classroom) => ({
    value: classroom.id,
    label:
      classroom.name ||
      classroom.classroomName ||
      `${classroom.grade || ""}/${classroom.section || ""}`.trim() ||
      "-",
  }));

  const statusOptions = [
    { value: "true", label: "Aktif" },
    { value: "false", label: "Pasif" },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormSelect
        label="Öğretmen"
        value={formData.teacherId || ""}
        onChange={(value) => handleChange("teacherId", value)}
        options={teacherOptions}
      />

      <FormSelect
        label="Ders"
        value={formData.lessonId || ""}
        onChange={(value) => handleChange("lessonId", value)}
        options={lessonOptions}
      />

      <FormSelect
        label="Sınıf"
        value={formData.classroomId || ""}
        onChange={(value) => handleChange("classroomId", value)}
        options={classroomOptions}
      />

      {isEdit && (
        <FormSelect
          label="Durum"
          value={String(formData.isActive)}
          onChange={(value) => handleChange("isActive", value === "true")}
          options={statusOptions}
        />
      )}
    </form>
  );
}

export default TeacherLessonForm;