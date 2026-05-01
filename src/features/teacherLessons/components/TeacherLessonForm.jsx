import FormSelect from "../../../components/ui/FormSelect";
import ActiveCheckbox from "../../../components/ui/ActiveCheckbox";

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

  const teacherOptions = [
    { value: "", label: "Öğretmen seçiniz" },
    ...teachers.map((teacher) => ({
      value: teacher.id,
      label: `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim(),
    })),
  ];

  const lessonOptions = [
    { value: "", label: "Ders seçiniz" },
    ...lessons.map((lesson) => ({
      value: lesson.id,
      label: lesson.name || lesson.lessonName || "-",
    })),
  ];

  const classroomOptions = [
    { value: "", label: "Sınıf seçiniz" },
    ...classrooms.map((classroom) => ({
      value: classroom.id,
      label:
        classroom.name ||
        classroom.classroomName ||
        `${classroom.grade || ""}/${classroom.section || ""}`.trim() ||
        "-",
    })),
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
        <ActiveCheckbox
          checked={formData.isActive !== false}
          onChange={(value) => handleChange("isActive", value)}
        />
      )}
    </form>
  );
}

export default TeacherLessonForm;