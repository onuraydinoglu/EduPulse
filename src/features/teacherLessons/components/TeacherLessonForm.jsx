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

  const handleClassroomToggle = (classroomId) => {
    setFormData((prev) => {
      const selectedClassroomIds = Array.isArray(prev.classroomIds)
        ? prev.classroomIds
        : [];

      const nextClassroomIds = selectedClassroomIds.includes(classroomId)
        ? selectedClassroomIds.filter((id) => id !== classroomId)
        : [...selectedClassroomIds, classroomId];

      return {
        ...prev,
        classroomIds: nextClassroomIds,
      };
    });
  };

  const getClassroomLabel = (classroom) => {
    return (
      classroom.name ||
      classroom.classroomName ||
      `${classroom.grade || ""}-${classroom.section || ""}`.trim() ||
      "-"
    );
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
      label: getClassroomLabel(classroom),
    })),
  ];

  const selectedClassroomIds = Array.isArray(formData.classroomIds)
    ? formData.classroomIds
    : [];

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

      {isEdit ? (
        <FormSelect
          label="Sınıf"
          value={formData.classroomId || ""}
          onChange={(value) => handleChange("classroomId", value)}
          options={classroomOptions}
        />
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-base-content">
              Sınıflar
            </label>

            {selectedClassroomIds.length > 0 && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {selectedClassroomIds.length} sınıf seçildi
              </span>
            )}
          </div>

          <div className="max-h-56 overflow-y-auto rounded-xl border border-base-300 bg-base-100 p-3">
            {classrooms.length === 0 ? (
              <p className="text-sm text-base-content/60">
                Listelenecek sınıf bulunamadı.
              </p>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {classrooms.map((classroom) => {
                  const checked = selectedClassroomIds.includes(classroom.id);

                  return (
                    <label
                      key={classroom.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-sm transition ${checked
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-base-300 bg-base-100 text-base-content hover:bg-base-200/60"
                        }`}
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
                        checked={checked}
                        onChange={() => handleClassroomToggle(classroom.id)}
                      />

                      <span className="font-medium">
                        {getClassroomLabel(classroom)}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <p className="text-xs text-base-content/50">
            Aynı öğretmen ve ders için birden fazla sınıf seçebilirsiniz.
          </p>
        </div>
      )}

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